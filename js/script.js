/*

   This is the script that runs on the page. 

*/

import { CardSlider } from "./CardSlider.js";

// create a CardSlider with default options
// const slider = new CardSlider();

// create a CardSlider with provided options
const options = {
   numVisibleCards: 2,
   parentSelector: "#slider"
};
const slider2 = new CardSlider(options);
