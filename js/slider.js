(function () {
   'use strict';

   /**
    * CardsHelper.js - Helper functions for cards and card-related data
    */

   const placeholderCardData = {
      title: "The Card Title",
      subtitle: "What will you find here",
      body:
         "Claw at curtains stretch and yawn nibble on tuna ignore human bite human hand push your water glass on the floor instead of drinking water from the cat bowl.",
      imageUrl: "http://lorempixel.com/g/300/150",
      avatarUrl: "http://lorempixel.com/g/50/50/food/",
      linkUrl: "#",
      linkText: "Learn More"
   };

   const dummyCardsDataUrl = "http://localhost:3000/cards";

   class CardHelper {
      /**
       * Fetches card data from the server by page (using the pagination queries from JSON Server).
       * @param {number} count How many card entries per page
       * @param {number} page Which page to get the card entries from
       * @returns {object[]}
       */
      static async fetchCardsData(
         count = 20,
         page = 1,
         cardsDataUrl = dummyCardsDataUrl
      ) {
         const serverResponse = await fetch(
            `${cardsDataUrl}?_page=${page}&_limit=${count}`
         );
         const cardsData = await serverResponse.json();
         const cards = [];

         cardsData.map((cardData) => {
            let card = {
               title: cardData.title || placeholderCardData.title,
               subtitle: cardData.subtitle || placeholderCardData.subtitle,
               body: cardData.text || placeholderCardData.body,
               imageUrl: cardData.image_url || placeholderCardData.imageUrl,
               avatarUrl: cardData.avatar_url || placeholderCardData.avatarUrl
            };

            cards.push(card);
         });

         return cards;
      }

      /**
       * Generates a DOM element for the given card data. Card data is provided as an object with these properties:
       * { title, subtitle, body, imageUrl, avatarUrl }. If any of these properties is missing, placeholder data
       * will be used.
       *
       * @param {object} cardData
       * @returns {Element}
       */
      static createCardElement(cardData = {}) {
         // Create the DOM elements

         const card = document.createElement("div");
         card.classList.add("card");

         const cardImage = document.createElement("div");
         cardImage.classList.add("card-image");
         cardImage.style.backgroundImage = `url("${cardData.imageUrl ||
         placeholderCardData.imageUrl}")`;

         const cardContents = document.createElement("div");
         cardContents.classList.add("card-contents");

         const cardHeader = document.createElement("div");
         cardHeader.classList.add("card-header");

         const cardAvatarContainer = document.createElement("div");
         cardAvatarContainer.classList.add("card-avatar-container");

         const cardAvatar = document.createElement("img");
         cardAvatar.classList.add("card-avatar");
         cardAvatar.alt = "Avatar";
         cardAvatar.src = cardData.avatarUrl || placeholderCardData.avatarUrl;

         const cardHeaderText = document.createElement("div");
         cardHeaderText.classList.add("card-header-text");

         const cardTitle = document.createElement("h1");
         cardTitle.classList.add("card-title");
         cardTitle.innerHTML = cardData.title || placeholderCardData.title;

         const cardSubtitle = document.createElement("h2");
         cardSubtitle.classList.add("card-subtitle");
         cardSubtitle.innerHTML =
            cardData.subtitle || placeholderCardData.subtitle;

         const cardBody = document.createElement("div");
         cardBody.classList.add("card-body");
         cardBody.innerHTML = cardData.body || placeholderCardData.body;

         const cardFooter = document.createElement("div");
         cardFooter.classList.add("card-footer");

         const cardLink = document.createElement("a");
         cardLink.classList.add("card-link");
         cardLink.innerHTML = cardData.linkText || placeholderCardData.linkText;
         cardLink.href = cardData.linkUrl || placeholderCardData.linkUrl;

         // Nest the DOM elements in the right order

         card.appendChild(cardImage);
         card.appendChild(cardContents);
         cardContents.appendChild(cardHeader);
         cardHeader.appendChild(cardAvatarContainer);
         cardAvatarContainer.appendChild(cardAvatar);
         cardHeader.appendChild(cardHeaderText);
         cardHeaderText.appendChild(cardTitle);
         cardHeaderText.appendChild(cardSubtitle);
         cardContents.appendChild(cardBody);
         cardContents.appendChild(cardFooter);
         cardFooter.appendChild(cardLink);

         return card;
      }
   }

   /**
    * CardSlider.js - The main controller class for a CardSlider. All initialization is self-contained;
    * just pass in the options and the constructor will do the rest.
    *
    * See CardSlider.constructor or the readme for details on the options.
    */

   const defaultOptions = {
      numVisibleCards: 3,
      parentSelector: "body",
      numTotalCards: 20,
      cardsDataUrl: "http://localhost:3000/cards",
      cardWidthValue: 308,
      cardWidthUnits: "px",
      cardSpacingValue: 26,
      cardSpacingUnits: "px"
   };

   class CardSlider {
      /**
       * Constructs a CardSlider and appends it to the provided slement, specified by the options.
       * The available options and their defaults are are:
       * {
       *    numVisibleCards: 3,
       *    parentSelector: "body",
       *    numTotalCards: 20,
       *    cardsDataUrl: "http://localhost:3000/cards",
       *    cardWidthValue: 308,
       *    cardWidthUnits: "px",
       *    cardSpacingValue: 26,
       *    cardSpacingUnits: "px"
       * }
       * @param {object} options
       */
      constructor(options) {
         this._initProperties(options);
         this._setCardsData().then(() => {
            this.sliderElement = this._createCardSliderElement();
            this._setCSSVariables();
            this._initCardElements();
            this._initNavigation();

            this._spawn();
         });
      }

      /**
       * PRIVATE: Initializes the CardSlider's properties based on the options
       * @param {object} options
       */
      _initProperties(options = {}) {
         this.numVisibleCards =
            options.numVisibleCards || defaultOptions.numVisibleCards;
         this.parentSelector =
            options.parentSelector || defaultOptions.parentSelector;
         this.numTotalCards =
            options.numTotalCards || defaultOptions.numTotalCards;
         this.cardsDataUrl = options.cardsDataUrl || defaultOptions.cardsDataUrl;
         this.cardWidthValue =
            options.cardWidthValue || defaultOptions.cardWidthValue;
         this.cardWidthUnits =
            options.cardWidthUnits || defaultOptions.cardWidthUnits;
         this.cardSpacingValue =
            options.cardSpacingValue || defaultOptions.cardSpacingValue;
         this.cardSpacingUnits =
            options.cardSpacingUnits || defaultOptions.cardSpacingUnits;
         this.ready = false;
      }

      /**
       * PRIVATE: Fetches the card data from the cardsData url and stores it
       */
      async _setCardsData() {
         this.cardsData = await CardHelper.fetchCardsData(
            this.numTotalCards,
            1,
            this.cardsDataUrl
         );
         this.numTotalCards = this.cardsData.length;
      }

      /**
       * PRIVATE: Creates a card slider element, with all functional parts nested
       */
      _createCardSliderElement() {
         // create the top level parent
         const cardSlider = document.createElement("div");
         cardSlider.classList.add("card-slider");

         // create the cards container
         const cards = document.createElement("div");
         cards.classList.add("cards");

         // create the navigation
         const cardNavContainer = document.createElement("div");
         cardNavContainer.classList.add("card-nav-container");

         const cardNav = document.createElement("div");
         cardNav.classList.add("card-nav");

         const navLeft = document.createElement("a");
         navLeft.classList.add("slider-nav-left");
         navLeft.textContent = "<";
         navLeft.href = "#";

         const navRight = document.createElement("a");
         navRight.classList.add("slider-nav-right");
         navRight.textContent = ">";
         navRight.href = "#";

         // Nest them all
         cardSlider.appendChild(cards);
         cardSlider.appendChild(cardNavContainer);
         cardNavContainer.appendChild(cardNav);
         cardNav.appendChild(navLeft);
         cardNav.appendChild(navRight);

         return cardSlider;
      }

      /**
       * PRIVATE: Sets the CSS variables of the contained slider element (crucial for styling)
       */
      _setCSSVariables() {
         this.sliderElement.style.setProperty(
            "--card-width",
            `${this.cardWidthValue}${this.cardWidthUnits}`
         );
         this.sliderElement.style.setProperty(
            "--num-visible-cards",
            this.numVisibleCards
         );
         this.sliderElement.style.setProperty(
            "--num-total-cards",
            this.numTotalCards
         );
         this.sliderElement.style.setProperty(
            "--card-spacing",
            `${this.cardSpacingValue}${this.cardSpacingUnits}`
         );
      }

      /**
       * PRIVATE: Initializes the card elements based on the contained card data
       */
      _initCardElements() {
         this.cardsElement = this.sliderElement.querySelector(".cards");
         this.cardElements = [];
         for (let cardData of this.cardsData) {
            const cardElement = CardHelper.createCardElement(cardData);
            this.cardElements.push(cardElement);
         }

         for (let cardElement of this.cardElements) {
            this._addCardElement(cardElement);
         }
      }

      /**
       * PRIVATE: Appends a card element to the card slider
       * @param {object} card
       */
      _addCardElement(card) {
         this.cardsElement.appendChild(card);
      }

      /**
       * PRIVATE: Initializes the navigation
       */
      _initNavigation() {
         this.sliderIndex = 0;
         const navLeft = this.sliderElement.querySelector(".slider-nav-left");
         const navRight = this.sliderElement.querySelector(".slider-nav-right");

         navLeft.addEventListener("click", this._handleLeftNav.bind(this));
         navRight.addEventListener("click", this._handleRightNav.bind(this));
      }

      /**
       * PRIVATE: Event handler for the left nav button
       * @param {Event} event the click event
       */
      _handleLeftNav(event) {
         event.preventDefault();
         if (!this.ready) {
            return;
         }
         this.ready = false;

         this.sliderIndex--;
         if (this.sliderIndex < 0) {
            this.sliderIndex = this.numTotalCards - this.numVisibleCards;
            this.cardsElement.classList.add("slow-transition");
            console.log("?");
         }
         this._updateSliderPosition();
      }

      /**
       * PRIVATE: Event handler for the right nav button
       * @param {Event} event the click event
       */
      _handleRightNav(event) {
         event.preventDefault();
         if (!this.ready) {
            return;
         }
         this.ready = false;

         this.sliderIndex++;
         if (this.sliderIndex > this.numTotalCards - this.numVisibleCards) {
            this.sliderIndex = 0;
            this.cardsElement.classList.add("slow-transition");
         }
         this._updateSliderPosition();
      }

      /**
       * PRIVATE: Updates the slider position based on the internal index tracker
       */
      _updateSliderPosition() {
         const xOffset =
            this.cardElements[this.sliderIndex].offsetLeft -
            this.cardsElement.offsetLeft;

         this.cardsElement.style.transform = `translateX(-${xOffset}px)`;
         this.cardsElement.addEventListener("transitionend", () => {
            this.ready = true;
            this.cardsElement.classList.remove("slow-transition");
         });
      }

      /**
       * PRIVATE: Brings this CardSlider to life
       */
      _spawn() {
         const parentElement = document.querySelector(this.parentSelector);
         parentElement.appendChild(this.sliderElement);
         this.ready = true;
      }
   }

   /*

      This is the main entry point, which adds the CardSlider functionality to the global object.

   */

   window.$cardSlider = (options) => {
      new CardSlider(options);
   };

}());
