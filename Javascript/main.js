const ApiToFetch = 'http://localhost:3000/api/teddies';

// Récupération des données à l"API
  fetch(ApiToFetch)
    .then(response => response.json())
    .catch((error)=>{
      console.log(error)
      window.location.assign("error.html");
    })
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
  );
    
