import CardHelper from "./CardHelper.js";

const defaultOptions = {
   numVisibleCards: 4,
   parentSelector: "body",
   numTotalCards: 20,
   cardsDataUrl: "http://localhost:3000/cards",
   cardWidthValue: 308,
   cardWidthUnits: "px",
   cardSpacingValue: 26,
   cardSpacingUnits: "px"
};

class CardSlider {
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

   _initProperties(options = {}) {
      this.numVisibleCards = options.numVisibleCards || 4;
      this.parentSelector = options.parentSelector || "body";
      this.numTotalCards = options.numTotalCards || 20;
      this.cardsDataUrl = options.cardsDataUrl || "http://localhost:3000/cards";
      this.cardWidthValue = options.cardWidthValue || 308;
      this.cardWidthUnits = options.cardWidthUnits || "px";
      this.cardSpacingValue = options.cardSpacingValue || 26;
      this.cardSpacingUnits = options.cardSpacingUnits || "px";
   }

   async _setCardsData() {
      this.cardsData = await CardHelper.fetchCardsData(
         this.numTotalCards,
         1,
         this.cardsDataUrl
      );
      this.numTotalCards = this.cardsData.length;
   }

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

   _setCSSVariables() {
      this.sliderElement.style.setProperty(
         "--num-visible-cards",
         this.numVisibleCards
      );
      this.sliderElement.style.setProperty(
         "--card-width",
         `${this.cardWidthValue}${this.cardWidthUnits}`
      );
      this.sliderElement.style.setProperty(
         "--card-spacing",
         `${this.cardSpacingValue}${this.cardSpacingUnits}`
      );
      this.sliderElement.style.setProperty(
         "--num-total-cards",
         this.numTotalCards
      );
   }

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

   _addCardElement(card) {
      this.cardsElement.appendChild(card);
   }

   _initNavigation() {
      this.sliderIndex = 0;
      const navLeft = this.sliderElement.querySelector(".slider-nav-left");
      const navRight = this.sliderElement.querySelector(".slider-nav-right");

      navLeft.addEventListener("click", this._handleLeftNav.bind(this));
      navRight.addEventListener("click", this._handleRightNav.bind(this));
   }

   _handleLeftNav(event) {
      event.preventDefault();
      this.sliderIndex--;
      if (this.sliderIndex < 0) {
         this.sliderIndex = this.numTotalCards - 1;
      }
      this._updateSliderPosition();
   }

   _handleRightNav(event) {
      event.preventDefault();
      this.sliderIndex++;
      if (this.sliderIndex > this.numTotalCards - this.numVisibleCards) {
         this.sliderIndex = 0;
      }
      this._updateSliderPosition();
   }

   _updateSliderPosition() {
      const xOffset =
         this.cardElements[this.sliderIndex].offsetLeft -
         this.cardsElement.offsetLeft;

      this.cardsElement.style.transform = `translateX(-${xOffset}px)`;
   }

   _spawn() {
      const parentElement = document.querySelector(this.parentSelector);
      parentElement.appendChild(this.sliderElement);
   }
}

export { CardSlider };
