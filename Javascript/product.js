let serverUrlApi = `"http://localhost:3000/api/teddies/"`;

/*Récupération de l'id dans l'url au chargement de la page */

const UrlQueryString = window.location.search;
const UrlParams = new URLSearchParams(UrlQueryString);
const UrlId = UrlParams.get("id");
console.log(UrlId)
let apiItem = "'"+ serverUrlApi + UrlId + "'";
console.log(apiItem)

/** Envoi de la demande à l'api avec l'id récupérée */

// fetch('serveurUrlApi + urlId')
fetch("http://localhost:3000/api/teddies/" + UrlId)
.then(response => {
  if (response.ok){return response.json()}
  else{
    console.log("erreur :" + response.status)
  }
})
.then(teddyProduct => {
  console.log (teddyProduct)
  // document.querySelector("#color-list").innerHTML = teddyProduct.colors;
  document.querySelector(".product-title").innerText = teddyProduct.name;
  document.querySelector(".product-description").innerText = teddyProduct.description;
  document.querySelector(".product-price").innerText = "Prix : " + teddyProduct.price;
  document.querySelector(".product-img").innerHTML = `<img src="${teddyProduct.imageUrl}" alt="">`;
  for (let teddyColor of teddyProduct.colors){
    document.querySelector("#color-list").innerHTML += 
    "<option>" + teddyColor + "</option>";
    }
});
  

  /***fonction pour ajouter supprimer un artcile et l'afficher dans l'input**** */
let quantity = 1;
let quantityInput = document.querySelector("#quantity");        //revoir plus tard pour mettre une regExp pour l'input
let plus = document.querySelector("#btn-plus"); 
let less = document.querySelector("#btn-less");

// ajout de un dans le nombre d'articles dans l'input
function addQuantity() {   
  plus.addEventListener("click",function(){
    quantity += 1;
    console.log(quantity);
    return quantityInput.value = quantity;
  })};

// suppression de un dans le nombre d'articles dans l'input
 function removeQuantity(){
    less.addEventListener("click", function(event){
    if(quantity <= 1 ){
      event.preventDefault();
    }
    else{
      quantity -=1;
      console.log(quantity);
    return quantityInput.value = quantity;
    }
    console.log(quantity)
  })
};  

addQuantity();  //a voir si a mettre en await pour la validation d'input en attendant que le produit soit chargé
removeQuantity(); //pour ne pas qu'il y ai d'erreur d'envoi vide au storage