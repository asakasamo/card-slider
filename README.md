## Card Slider, by Al-John Sakasamo
A component for displaying HTML content using the Card design pattern

## How to run the demo
1. Clone the repository to a local directory
2. Open index.html in a browser.

That's all!

## Usage in your own project
The Card Slider is ready for use in your project. Simply:
1. Add js/slider.js and css/slider.js to your ``<head>`` tag
2. Call ``$cardSlider([options])`` to add a Card Slider to the DOM.

``options`` is an object with the properties and defaults below. If any properties are not specified, the default values will be used.

    numVisibleCards: 3,
    parentSelector: "body",
    numTotalCards: 20,
    cardsDataUrl: "http://localhost:3000/cards",
    cardWidthValue: 308,
    cardWidthUnits: "px",
    cardSpacingValue: 26,
    cardSpacingUnits: "px"

## Unit testing
Unit tests are implemented using Jest, and can be run using ``npm run test`` (you must ``npm install`` first).
