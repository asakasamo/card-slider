/*

   This is the main entry point, which adds the CardSlider functionality to the global object.

*/

import { CardSlider } from "./CardSlider.js";

window.$cardSlider = (options) => {
   new CardSlider(options);
};
