class CardFetcher {
   static fetchCards(count) {
      const expected = {
         title: "We are Humans",
         subtitle: "What will you find here",
         body:
            "We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite.",
         imageUrl: "http://lorempixel.com/300/150/",
         avatarUrl: "http://lorempixel.com/50/50/food/"
      };

      return expected;
   }
}

module.exports = CardFetcher;
