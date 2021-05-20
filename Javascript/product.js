//récupération de la liste des articles via le tableau de storage

let teddiesListFromStorage = JSON.parse(localStorage.getItem("teddiesListForStorage"));

/*Récupération de l'id dans l'url au chargement de la page */

const UrlQueryString = window.location.search;
const UrlParams = new URLSearchParams(UrlQueryString);
const UrlId = UrlParams.get("id");

/*********************PARTIE RECUP DES PORDUITS VIA LE STORAGE ET ASSIGNATION DU BON PRODUIT */
// Récupération de chacun des produits et assignations de leurs éléments
let teddyImage
let teddyPrice

   //itération à travers des articles récupérés via le tableau teddiesListFromStorage
for (let teddyProduct of teddiesListFromStorage){
    //si le id de l'url correspond à l'id du teddy
    if(teddyProduct._id === UrlId){
    document.querySelector(".product-title").innerText = teddyProduct.name;
    document.querySelector(".product-description").innerText = teddyProduct.description;
    document.querySelector(".product-price").innerText = "Prix : " + teddyProduct.price;
    document.querySelector(".product-img").innerHTML = `<img src="${teddyProduct.image}" alt="">`;
    document.querySelector(".product-specification").id = teddyProduct._id;

    //recuperation des couleurs en forme de liste déroulante
    for (let teddyColor of teddyProduct.colors){
      document.querySelector("#color-list").innerHTML += 
      "<option>" + teddyColor + "</option>";   
     }
     teddyImage = teddyProduct.image;
     teddyPrice = teddyProduct.price;
    }
};


 /******* Fonction pour ajouter supprimer un artcile et l'afficher dans l'input ***** */
let quantity = 1;
let quantityInput = document.querySelector(".quantity");        //revoir plus tard pour mettre une regExp pour l'input
let plus = document.querySelector("#btn-plus"); 
let less = document.querySelector("#btn-less");

// ajout de 1 dans le nombre d'articles dans l'input
function plusQuantity(){
  quantityInput.value ++;
}
plus.addEventListener("click", plusQuantity);

// suppression de 1 dans le nombre d'articles dans l'input
function lessQuantity(){
  if (quantityInput.value > 1){
    quantityInput.value --;
  }
}
less.addEventListener("click", lessQuantity);


// ecoute de la quantité saisie
let quantityInputAdded = quantityInput.addEventListener("change", ()=>{
  quantity = quantityInput.value;
 ;
})

/************ Ajout d'un produit dans le localStorage*********/

// bouton d'envoi au panier
const BtnSendToBasket = document.querySelector("#btn-sendToBasket"); //bouton écouté

// Fonction d'envoi au clic la quantité du panier dans le local storage
BtnSendToBasket.addEventListener("click", ()=>{
  //clé du tableau pour le panier du localStorage
  let basketOrder = JSON.parse(localStorage.getItem("basketItems"));
  
  //objet et quantité à ajouter dans le panier
  let dataItem = {
    id : document.querySelector(".product-specification").id,          //objet et qté validés
    name : document.querySelector(".product-title").innerText,
    image : teddyImage,
    quantity : quantityInput.value,
    price : teddyPrice
  }
  
  //envoi des du panier au storage
  function sendToBasket(){
    basketOrder.push(dataItem);  //j'ajoute mon panier au tableau qui contient déjà des choses
       //je transforme de nouveau en string pour l'envoi
      localStorage.setItem("basketItems",JSON.stringify(basketOrder));
  }

  //si le storage est vide
  if (!localStorage.getItem("basketItems")){ 
    basketOrder = []; //tableau pour envoi des données au storage
    sendToBasket();
  }
  //si le storage contient déjà la clé
  else {
    sendToBasket();
  }
});
