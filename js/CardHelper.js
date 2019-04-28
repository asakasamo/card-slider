const placeholder = {
   title: "The Card Title",
   subtitle: "What will you find here",
   body:
      "Claw at curtains stretch and yawn nibble on tuna ignore human bite human hand push your water glass on the floor instead of drinking water from the cat bowl.",
   imageUrl: "http://lorempixel.com/g/300/150",
   avatarUrl: "http://lorempixel.com/g/50/50/food/",
   linkUrl: "#",
   linkText: "Learn More"
};

const serverUrl = "http://localhost:3000";

class CardHelper {
   /**
    * Fetches card data from the server by page (using the pagination queries from JSON Server).
    * @param {number} count How many card entries per page
    * @param {number} page Which page to get the card entries from
    * @returns {object[]}
    */
   static async fetchCardsData(count = 10, page = 1) {
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

   /**
    * Generates a DOM element for the given card data. Card data is provided as an object with these properties:
    * { title, subtitle, body, imageUrl, avatarUrl }. If any of these properties is missing, placeholder data
    * will be used.
    *
    * @param {object} cardData
    * @returns {Element}
    */
   static generateCardElement(cardData = {}) {
      // Create the DOM elements

      const card = document.createElement("div");
      card.classList.add("card");

      const cardImage = document.createElement("div");
      cardImage.classList.add("card-image");
      cardImage.style.backgroundImage = `url("${cardData.imageUrl ||
         placeholder.imageUrl}")`;

      const cardContents = document.createElement("div");
      cardContents.classList.add("card-contents");

      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");

      const cardAvatarContainer = document.createElement("div");
      cardAvatarContainer.classList.add("card-avatar-container");

      const cardAvatar = document.createElement("img");
      cardAvatar.classList.add("card-avatar");
      cardAvatar.alt = "Avatar";
      cardAvatar.src = cardData.avatarUrl || placeholder.avatarUrl;

      const cardHeaderText = document.createElement("div");
      cardHeaderText.classList.add("card-header-text");

      const cardTitle = document.createElement("h1");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = cardData.title || placeholder.title;

      const cardSubtitle = document.createElement("h2");
      cardSubtitle.classList.add("card-subtitle");
      cardSubtitle.textContent = cardData.subtitle || placeholder.subtitle;

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      cardBody.textContent = cardData.body || placeholder.body;

      const cardFooter = document.createElement("div");
      cardFooter.classList.add("card-footer");

      const cardLink = document.createElement("a");
      cardLink.classList.add("card-link");
      cardLink.textContent = cardData.linkText || placeholder.linkText;
      cardLink.href = cardData.linkUrl || placeholder.linkUrl;

      // Nest the DOM elements in the right order

      card.appendChild(cardImage);
      card.appendChild(cardContents);
      cardContents.appendChild(cardHeader);
      cardHeader.appendChild(cardAvatarContainer);
      cardAvatarContainer.appendChild(cardAvatar);
      cardHeader.appendChild(cardHeaderText);
      cardHeaderText.appendChild(cardTitle);
      cardHeaderText.appendChild(cardSubtitle);
      cardContents.appendChild(cardBody);
      cardContents.appendChild(cardFooter);
      cardFooter.appendChild(cardLink);

      return card;
   }
}

export default CardHelper;
