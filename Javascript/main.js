
// Classe constructor pour le rajout d'un article si besoin
/* class Article {
  constructor(description, name, price, _id){
    this.description = description,
    this.name = name,
    this.price = price,
    this._id = _id
    }
}*/

// Récupération des données à l"API
    fetch('http://localhost:3000/api/teddies')
    .then(response => response.json())
    .then(teddiesList => {
      // Récupération du array des teddy et implantation de chacun dans le html
      for (let teddy of teddiesList){
      document.querySelector("#main-home").insertAdjacentHTML("beforeend", `
        <div class="teddy-card" data-id="${teddy._id}">
        <img src="${teddy.imageUrl}" class="card-img-top" alt="">
          <div class="teddy-detail">
              <h5 class="card-title">${teddy.name}</h5>
              <p class="card-text">${teddy.description}</p>
              <p class="card-price">Prix : ${teddy.price}</p>
              <a class="btn btn-info choice" href="product.html?id=${teddy._id}" type="button">Voir le produit</a>
            </div>
        </div>`
        );
      } 

      /****Test de l'api dans le fetch pour voir si j'arrive à cliquer sur chacun des
       * boutons indépendamment
       */
       //sélection de tous les boutons pour l'écoute
      const buttonList = document.getElementsByClassName("choice"); 
      console.log(buttonList) //j'obtiens un array avec ma liste de btn
      let clicSum = 0;
      for (let btn of buttonList){ //je veux qu'au clic cela ajoute 1 au total
      btn.addEventListener("click", function(btn){
     clicSum +=1 ;
      console.log(clicSum) //>>>pourquoi ça me rajoute 3 par 3 à chaque clic??
      }
    )
    } 
    console.log(teddiesList)
  }
  )


//fonction pour au clic de l'objet choisi cela aille voir sa fiche


