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
