import CardHelper from "../js/CardHelper";

describe("Test the functions that fetch cards from the server", () => {
   const subtitle = "What will you find here";
   const avatarUrl = "http://lorempixel.com/g/50/50/food/";

   test("Should fetch the first card from the database", async () => {
      const cards = await CardHelper.fetchCardsData(1);
      const firstCard = cards[0];

      const expected = {
         title: "We are Humans",
         subtitle,
         body:
            "We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite.",
         imageUrl: "http://lorempixel.com/300/150/",
         avatarUrl
      };

      expect(firstCard).toEqual(expect.objectContaining(expected));
   });

   test("Should fetch the first three cards from the database", async () => {
      const firstThreeCards = await CardHelper.fetchCardsData(3);

      const expected = [
         {
            title: "We are Humans",
            subtitle,
            body:
               "We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite.",
            imageUrl: "http://lorempixel.com/300/150/",
            avatarUrl
         },
         {
            title: "We work together",
            subtitle,
            body:
               "We insist on working collaborativelly. <strong>No rockstars</strong>. No departments. The whole owns the whole project together.",
            imageUrl: "http://lorempixel.com/300/150/",
            avatarUrl
         },
         {
            title: "We change",
            subtitle,
            body:
               "Nothing is sacred, from our habits to our rituals, to our enviroment. Change is a natural part of the human life, and we prefer to embrace it.",
            imageUrl: "http://lorempixel.com/300/150/",
            avatarUrl
         }
      ];

      expect(firstThreeCards).toEqual(expect.objectContaining(expected));
   });

   test("Should fetch cards 7, 8, and 9 (3 cards from the 3rd page, with 3 cards per page)", async () => {
      const cardsFromPage3 = await CardHelper.fetchCardsData(3, 3);

      const expected = [
         {
            title: "Human Truths #1",
            subtitle,
            body:
               "Humans are not perfect. Don’t be afraid to fail. And when you do, you might as well fail spectacularly. This is how we grow and learn.",
            imageUrl: "http://lorempixel.com/300/150/",
            avatarUrl
         },
         {
            title: "Human Truths #2",
            subtitle,
            body:
               "Humans are unique. Do you love Portugueses Pop Music (<em>Pimba</em>)? Do you prefer your desk covered with sunflowers? There’s no need to hide it. Be yourself. That’s how you’ll fit in here.",
            imageUrl: "http://lorempixel.com/300/150/",
            avatarUrl
         },
         {
            title: 'Humans are not "resources"',
            subtitle,
            body:
               "We don’t have an HR department. New hires are interviewed by the people who will be working with them. So get ready to care a lot about the people you work with.",
            imageUrl: "http://lorempixel.com/300/150/",
            avatarUrl
         }
      ];

      expect(cardsFromPage3).toEqual(expect.objectContaining(expected));
   });
});

test("Should create a properly nested DOM element for a given set of card data", () => {
   const cardData = {
      title: "Is this the Real Life?",
      subtitle: "Is this just Fantasy?",
      body:
         "Caught in a landslide, no escape from reality... Open your eyes, look up to the skies and seeeeeeeeeeee!...",
      imageUrl: "http://lorempixel.com/400/200/nature",
      avatarUrl: "http://lorempixel.com/50/50/cats"
   };

   // Removes the wrapping "url()" from a css url string
   function stripUrlFromUrlString(urlString) {
      return urlString.substring(4, urlString.length - 1);
   }

   const cardElement = CardHelper.createCardElement(cardData);
   const cardElementContent = {
      title: cardElement.querySelector(".card-title").textContent,
      subtitle: cardElement.querySelector(".card-subtitle").textContent,
      body: cardElement.querySelector(".card-body").textContent,
      imageUrl: stripUrlFromUrlString(
         cardElement.querySelector(".card-image").style.backgroundImage
      ),
      avatarUrl: cardElement.querySelector(".card-avatar").src
   };

   expect(cardElementContent).toEqual(expect.objectContaining(cardData));
});
