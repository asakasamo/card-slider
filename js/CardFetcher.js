const placeholder = {
   title: "The Card Title",
   subtitle: "What will you find here",
   body:
      "Claw at curtains stretch and yawn nibble on tuna ignore human bite human hand push your water glass on the floor instead of drinking water from the cat bowl.",
   imageUrl: "http://lorempixel.com/g/300/150",
   avatarUrl: "http://lorempixel.com/g/50/50/food/"
};

const serverUrl = "http://localhost:3000";

class CardFetcher {
   static async fetchCards(count = 10, page = 1) {
      const serverResponse = await fetch(
         `${serverUrl}/cards?_page=${page}&_limit=${count}`
      );
      const cardsData = await serverResponse.json();
      const cards = [];

      cardsData.map((cardData) => {
         let card = {
            title: cardData.title || placeholder.title,
            subtitle: cardData.subtitle || placeholder.subtitle,
            body: cardData.text || placeholder.body,
            imageUrl: cardData.image_url || placeholder.imageUrl,
            avatarUrl: cardData.avatar_url || placeholder.avatarUrl
         };

         cards.push(card);
      });

      return cards;
   }
}

export default CardFetcher;
