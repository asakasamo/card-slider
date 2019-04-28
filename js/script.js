/*

1. Fetch the data for the card
2. Pass the data into the card element generator

*/

import CardHelper from "./CardHelper.js";
import CardSlider from "./CardSlider.js";
/*
const cardData = {
   title: "Is this the Real Life?",
   subtitle: "Is this just Fantasy?",
   body:
      "Caught in a landslide, no escape from reality... Open your eyes, look up to the skies and seeeeeeeeeeee!...",
   imageUrl: "http://lorempixel.com/400/200/nature",
   avatarUrl: "http://lorempixel.com/50/50/cats"
};

const card = CardHelper.generateCardElement(cardData);

const cards = document.querySelector(".cards");
cards.appendChild(card);

const slider = CardSlider.generateCardSlider();

document.querySelector("#slider").appendChild(slider);
*/

const numVisibleCards = 4;
const parentSelector = "#slider";
let numTotalCards = 20;
const cardsDataUrl = "http://localhost:3000/cards";
let cardWidthValue = 308;
let cardWidthUnits = "px";
let cardSpacingValue = 26;
let cardSpacingUnits = "px";

///

let slider;
let cardsContainer;
const cardElements = [];

CardHelper.fetchCardsData(numTotalCards, 1, cardsDataUrl).then((cardsData) => {
   numTotalCards = cardsData.length;

   //set the css variables
   const root = document.documentElement;
   root.style.setProperty("--num-visible-cards", numVisibleCards);
   root.style.setProperty("--card-width", `${cardWidthValue}${cardWidthUnits}`);
   root.style.setProperty(
      "--card-spacing",
      `${cardSpacingValue}${cardSpacingUnits}`
   );
   root.style.setProperty("--num-total-cards", numTotalCards);

   slider = CardSlider.generateCardSlider();
   cardsContainer = slider.querySelector(".cards");

   for (let cardData of cardsData) {
      const cardElement = CardHelper.generateCardElement(cardData);
      cardElements.push(cardElement);
   }

   for (let cardElement of cardElements) {
      cardsContainer.appendChild(cardElement);
   }

   const navLeft = slider.querySelector(".slider-nav-left");
   const navRight = slider.querySelector(".slider-nav-right");

   let sliderIndex = 0;
   navLeft.addEventListener("click", () => {
      sliderIndex--;
      if (sliderIndex < 0) {
         sliderIndex = numTotalCards - 1;
      }
      updateSliderPosition();
   });

   navRight.addEventListener("click", () => {
      sliderIndex++;
      if (sliderIndex > numTotalCards - numVisibleCards) {
         sliderIndex = 0;
      }
      updateSliderPosition();
   });

   function updateSliderPosition() {
      const xOffset =
         cardElements[sliderIndex].offsetLeft - cardsContainer.offsetLeft;
      cardsContainer.style.transform = `translateX(-${xOffset}px)`;
   }

   const parentElement = document.querySelector(parentSelector);
   parentElement.appendChild(slider);
});
