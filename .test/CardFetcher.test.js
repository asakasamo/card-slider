import CardFetcher from "../js/CardFetcher";

test("Should fetch the first card from the database", async () => {
   const cards = await CardFetcher.fetchCards(1);
   const firstCard = cards[0];

   const expected = {
      title: "We are Humans",
      subtitle: "What will you find here",
      body:
         "We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite.",
      imageUrl: "http://lorempixel.com/300/150/",
      avatarUrl: "http://lorempixel.com/g/50/50/food/"
   };

   expect(firstCard).toEqual(expected);
});

test.skip("Should fetch the first three cards from the database", () => {
   const firstThreeCards = CardFetcher.fetchCards(3);

   const expected = [
      {
         title: "Get autonomous",
         body:
            "You’re given an incredible amount of freedom and autonomy at Mindera. That goes for everyone.",
         imageUrl: "http://lorempixel.com/300/150/"
      },
      {
         title: "We work together",
         body:
            "We insist on working collaborativelly. <strong>No rockstars</strong>. No departments. The whole owns the whole project together.",
         imageUrl: "http://lorempixel.com/300/150/"
      },
      {
         title: "We change",
         body:
            "Nothing is sacred, from our habits to our rituals, to our enviroment. Change is a natural part of the human life, and we prefer to embrace it.",
         imageUrl: "http://lorempixel.com/300/150/"
      }
   ];

   expect(firstThreeCards).toEqual(expected);
});
