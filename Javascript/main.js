const ApiToFetch = 'http://localhost:3000/api/teddies';

// Classe constructor pour le rajout d'un article si besoin
class TeddyArticle {
  constructor(description, name, price,image, colors, _id){
    this.description = description,
    this.name = name,
    this.price = price,
    this.image = image,
    this.colors = colors,
    this._id = _id
  }
}

// Récupération des données à l"API
    fetch(ApiToFetch)
    .then(response => response.json())
    .then(teddiesList => {
      // Récupération du array des teddy et implantation de chacun dans le html
      for (let teddy of teddiesList){
      document.querySelector("#main-home").insertAdjacentHTML("beforeend", `
        <div class="teddy-card" data-id="${teddy._id}">
        <img src="${teddy.imageUrl}" class="card-img-top" alt="">
          <div class="teddy-detail">
              <h5 class="card-title">${teddy.name}</h5>
              <p class="card-price">Prix : ${teddy.price /100} \u20AC</p>
              <a class="btn btn-info choice" href="./product.html?id=${teddy._id}" type="button">Voir le produit</a>
            </div>
        </div>`
        ); 
      }    
    }
    )

  /*//si le storage a déjà le tavleau de la liste
  if(localStorage.getItem("teddiesListForStorage")){
    localStorage.removeItem("teddiesListForStorage");
    localStorage.setItem("teddiesListForStorage", JSON.stringify(teddiesListFromBackEnd))
  }else{
    localStorage.setItem("teddiesListForStorage", JSON.stringify(teddiesListFromBackEnd))
  }

*/


  // console.log(teddiesListFromBackEnd)
//fonction pour au clic de l'objet choisi cela aille voir sa fiche

 //   // teddiesListFromBackEnd.push(teddiesList);
      
    // //si le storage a déjà le tableau de la liste on le récupère et remplace
    // //sinon on le crée et on l'envoi
    // if(localStorage.getItem("teddiesListForStorage")){
    //   localStorage.removeItem("teddiesListForStorage");
    //   localStorage.setItem("teddiesListForStorage", JSON.stringify(TeddiesListFromBackEnd))
    // }else{
    //   localStorage.setItem("teddiesListForStorage", JSON.stringify(TeddiesListFromBackEnd))
    // }
// //Récupération du tableau de l'api pour le reproduire en local 
// TeddiesListFromBackEnd.push(new TeddyArticle(teddy.description, teddy.name, teddy.price, teddy.imageUrl, teddy.colors, teddy._id));
            