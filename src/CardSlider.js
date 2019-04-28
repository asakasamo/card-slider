/**
 * CardSlider.js - The main controller class for a CardSlider. All initialization is self-contained;
 * just pass in the options and the constructor will do the rest.
 *
 * See CardSlider.constructor or the readme for details on the options.
 */

/*
   -- Sample HTML for a complete card slider with 1 card --
      
      <div class="card-slider">
         <div class="cards">
            <div class="card">
               <div class="card-image"></div>

               <div class="card-contents">
                  <div class="card-header">
                     <div class="card-avatar-container">
                        <img
                           src="./images/avatar.png"
                           alt="Avatar"
                           class="card-avatar"
                        />
                     </div>

                     <div class="card-header-text">
                        <h1 class="card-title">We are Humans</h1>
                        <h2 class="card-subtitle">
                           What will you find here
                        </h2>
                     </div>
                  </div>

                  <div class="card-body">
                     We act like humans, we talk like humans, and we think like
                     humans. And we call out anyone who does the opposite.
                  </div>

                  <div class="card-footer">
                     <a href="#" class="card-link">
                        Learn More
                     </a>
                  </div>
               </div>
            </div>
         </div>

         <div class="card-nav-container">
            <div class="card-nav">
               <a href="#" class="slider-nav-left"><</a>
               <a href="#" class="slider-nav-right">></a>
            </div>
         </div>
      </div>
*/

import CardHelper from "./CardHelper.js";

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

export { CardSlider };
