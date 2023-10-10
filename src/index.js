let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
const toyCollection = document.getElementById("toy-collection");

fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((toy) => {
      const toyCard = createToyCard(toy);
      toyCollection.appendChild(toyCard);
    });
  });
  function createToyCard(toy) {
    const card = document.createElement("div");
    card.className = "card";
  
    const name = document.createElement("h2");
    name.textContent = toy.name;
  
    const image = document.createElement("img");
    image.src = toy.image;
    image.className = "toy-avatar";
  
    const likes = document.createElement("p");
    likes.textContent = `${toy.likes} Likes`;
  
    const likeButton = document.createElement("button");
    likeButton.textContent = "Like ❤️";
    likeButton.className = "like-btn";
    likeButton.id = toy.id;
  
    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(likes);
    card.appendChild(likeButton);
  
    return card;
  }
  const addButton = document.getElementById("new-toy-btn");
const toyForm = document.querySelector(".container");

addButton.addEventListener("click", () => {
  toyForm.style.display = toyForm.style.display === "none" ? "block" : "none";
});
const form = document.querySelector("form.add-toy-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = event.target.name.value;
  const image = event.target.image.value;

  const newToy = {
    name,
    image,
    likes: 0,
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newToy),
  })
    .then((response) => response.json())
    .then((toy) => {
      const toyCard = createToyCard(toy);
      toyCollection.appendChild(toyCard);
      // Hide the form after adding a new toy
      toyForm.style.display = "none";
    });
});
toyCollection.addEventListener("click", (event) => {
  if (event.target.className === "like-btn") {
    const toyId = event.target.id;

    // Find the corresponding toy object and update its likes count
    const toyCard = toyCollection.querySelector(`.card[id="${toyId}"]`);
    const likesElement = toyCard.querySelector("p");

    // Update the likes count locally
    const currentLikes = parseInt(likesElement.textContent);
    const newLikes = currentLikes + 1;
    likesElement.textContent = `${newLikes} Likes`;

    // Send a "PATCH" request to update the likes in the API
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: newLikes }),
    });
  }
});
