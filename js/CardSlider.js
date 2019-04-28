import CardHelper from "./CardHelper.js";

const defaultOptions = {
   numVisibleCards: 3,
   parentSelector: "body",
   cardsDataUrl: "http://localhost:3000/cards"
};

class CardSlider {
   constructor(options) {
      /*
         options: numVisibleCards, parentSelector, cardsDataUrl
      */
      this.numVisibleCards =
         options.numVisibleCards || defaultOptions.numVisibleCards;
      this.parentSelector =
         options.parentSelector || defaultOptions.parentSelector;
      this.cardsDataUrl = options.cardsDataUrl || defaultOptions.cardsDataUrl;

      this.numTotalCards = 20;

      // create the slider
      const slider = generateCardSlider();

      // get all of the card data from the server
      const cardsData = CardHelper.fetchCardsData(
         this.numTotalCards,
         1,
         this.cardsDataUrl
      );

      // create the cards from the card data
      const cardElements = [];
      for (let cardData of cardsData) {
         const cardElement = CardHelper.generateCardElement(cardData);
         cardElements.push(cardElement);
      }

      // append the cards to the slider
      const cardContainer = slider.querySelector(".cards");
      for (let cardElement of cardElements) {
         cardContainer.appendChild(cardElement);
      }

      // add action listeners to the navigation
      // bonus: modify the dimensions as needed
   }

   static generateCardSlider() {
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
}

export default CardSlider;
