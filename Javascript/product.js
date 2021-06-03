const ApiToFetch = 'http://localhost:3000/api/teddies';

/*Récupération de l'id dans l'url au chargement de la page */

const UrlParams = new URLSearchParams(window.location.search);
const Id = UrlParams.get("id");

//récupération du panier
let basketOrder = JSON.parse(localStorage.getItem("basketItems"));
const BtnSendToBasket = document.querySelector("#btn-sendToBasket"); //bouton écouté

fetch(ApiToFetch + "/" + Id)
  .then(response => {
    if (response.ok){
      return response.json()
    }
    else{
      console.log("erreur :" + response.status)
    }
  })
  .catch((error)=>{
    console.log(error)
    window.location.assign("error.html");
  })
  .then(teddyItem => {
    //récupération des informations de l'objet en question et insertions des infos 
    document.querySelector(".product-title").innerText = teddyItem.name;
    document.querySelector(".product-description").innerText = teddyItem.description;
    document.querySelector(".product-price").innerText = "Prix : " + teddyItem.price / 100 + " \u20AC";
    document.querySelector(".product-img").innerHTML = `<img src="${teddyItem.imageUrl}" alt="">`;
    document.querySelector(".product-specification").setAttribute("id", teddyItem._id);
    document.querySelector(".quantity").value = parseInt(quantityInput.value, "10");
      //recuperation des couleurs en forme de liste déroulante
    for (let teddyColor of teddyItem.colors){
      document.querySelector("#color-list").innerHTML += 
      "<option>" + teddyColor + "</option>";   
    }             
        
   /************ Ajout d'un produit dans le localStorage*********/

    BtnSendToBasket.addEventListener("click", ()=>{ 
    //Création de l'objet à mettre dans le panier    
      let dataTeddyItem = {
        name : teddyItem.name,
        description : teddyItem.description,
        id : teddyItem._id,
        price : teddyItem.price,
        image : teddyItem.imageUrl,
        quantity : parseInt(quantityInput.value, "10")
      }
    //Si le panier du Storage est vide    
      if (!basketOrder){ 
         //on crée le panier et on met l'objet avec la quantité et ses infos dedans
        basketOrder = [];
        basketOrder.push(dataTeddyItem)
            
        //on l'envoi au local storage
        localStorage.setItem("basketItems", JSON.stringify(basketOrder));
      }
      else{ //sinon s'il y a déjà le panier dans le local storage
        //   variable pour savoir s'il existe  
        let isAlreadyExist = false;

         //vérification des objets du panier
          for (let item of basketOrder){
            // si oui il y est déjà
            if(item.name == dataTeddyItem.name){
              isAlreadyExist = true;
              // on ajoute la quantité saisie à celle déjà existante pour l'objet
              item.quantity += parseInt(quantityInput.value, "10");
              //   et on met à jour le storage
              localStorage.setItem("basketItems", JSON.stringify(basketOrder));
            };
          };                       
            // si l'objet n'est pas dans le tableau, on l'ajoute et on envoie au storage
          if(!isAlreadyExist){
            basketOrder.push(dataTeddyItem);
            localStorage.setItem("basketItems", JSON.stringify(basketOrder));
          };
      };
      window.alert("Quantité ajoutée au panier !"); 
    });     
  }); 

  /******* Fonctions pour ajouter supprimer un artcile et afficher la quantité dans l'input ***** */

let quantityInput = document.querySelector(".quantity");
let plus = document.querySelector("#btn-plus"); 
let less = document.querySelector("#btn-less");

// // ajout de 1 dans le nombre d'articles dans l'input
function plusQuantity(){
  let quantity = parseInt(quantityInput.value, "10");
  if(quantity < 100){
  quantity += 1 ;
  }
  quantityInput.value = quantity;
}

// // suppression de 1 dans le nombre d'articles dans l'input
function lessQuantity(){
  let quantity = parseInt(quantityInput.value, "10");
  if (quantityInput.value > 1){
    quantity -= 1;
  }
  quantityInput.value = quantity;
};

//gestion du format des quantités dans l'input
function formatQuantity(){
  let quantity = parseInt(quantityInput.value);
  if (quantity < 1) {
    quantity = 1;
  } else if (quantity > 100) {
    quantity = 100;
  }
  if (quantity === 1) {
    less.setAttribute("disabled", true);
  } else if (quantity === 100) {
    plus.setAttribute("disabled", true);
  }
  if (quantity > 1) {
    less.removeAttribute("disabled");
  }
  if (quantity <100) {
    plus.removeAttribute("disabled");
  }
  quantityInput.value = quantity;
}

plus.addEventListener("click", () => {
  plusQuantity();
  formatQuantity();
});
less.addEventListener("click", () => {
  lessQuantity();
  formatQuantity();
});

//appel de la fonction format pour qu'à l'affichage le bouton moins soit désactivé au visuel
formatQuantity();

quantityInput.addEventListener("change", () =>{
  if(!quantityInput.value){
    BtnSendToBasket.setAttribute("disabled", true);
    alert("Une quantité doit être saisie !");
  }else{
    BtnSendToBasket.removeAttribute("disabled");
    formatQuantity();
  }
});


