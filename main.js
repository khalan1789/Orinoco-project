

 class Article {
  constructor(description, name, price){
    this.description = description,
    this.name = name,
    this.price = price
    }
  }

// Récupération des données à l"API
fetch('http://localhost:3000/api/teddies')
  .then(response => response.json())
  .then(teddiesList => {
   console.log(teddiesList);

     for (let teddy of teddiesList){
     console.log(teddy.name);
    //  let teddy = this.teddyItem;
      document.querySelector("#main-home").insertAdjacentHTML("beforeend", `
      <div class="teddy-card" id="${teddy._id}">
      <img src="${teddy.imageUrl}" class="card-img-top" alt="">
        <div class="teddy-detail">
            <h5 class="card-title">${teddy.name}</h5>
            <p class="card-text">${teddy.description}</p>
            <p class="card-price">Prix : ${teddy.price}</p>
            <button class="btn btn-info" type="submit">Voir le produit</button>
          </div>
      </div>`
      );
    } 

  } 
)
