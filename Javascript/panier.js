////****Récupérer les données du localStorage ********////
//récupération du panier
let basketOrder = JSON.parse(localStorage.getItem("basketItems"));

// tableau des id pour le POST
const products = [];

//////****** VERIFICATION SI LE PANIER CONTIENT DES CHOSES OU NON ******///////
function basketEmpty(){
  document.querySelector("#text-basket").innerText = "Votre panier est vide !";
  document.querySelector("#text-basket").classList.add("mt-5", "mb-5");
  document.querySelector("#form-order").classList.add("text-black-50");
  document.querySelector(".total").classList.add("d-none");
  btnFormValid.classList.add("d-none");
}

function basketNotEmpty(){
  document.querySelector("#text-basket").innerText = "Votre panier contient :";
  document.querySelector("#text-basket").classList.remove("mt-5", "mb-5");
  document.querySelector("#form-order").classList.remove("text-black-50");
  DisplayTotal.classList.remove("d-none");
  btnFormValid.classList.remove("d-none");
}

////**************         PRIX TOTAL A L'IMPORT DU PANIER   ****************** *////
let totalToPay = 0;
const DisplayTotal = document.querySelector("#totalBasketPrice");
const btnFormValid = document.querySelector("#btn-form-valid");

 // récupération et attribution des données dans le panier
if(!basketOrder){
  basketEmpty();
}else{
  basketNotEmpty();
  //affichage des articles du panier
  for (let item of basketOrder){
    document.querySelector("#basketContain").insertAdjacentHTML("beforeend", `
      <div class="row mt-2 mb-3 border-bottom border-primary" data-id=${item.id}>
      <img src="${item.image}" class="col-12 col-md-4 col-lg-3" alt="photo de l'article">
        <div class="d-flex flex-column col-md-5 mb-4 ">
            <h4 class="col-sm mb-3 mt-3 text-center ">${item.name}</h4>
            <label class="col-12 col-sm mt-3 text-center"> Quantité</label>
            <div class="col-12 col-sm mt-4 d-flex justify-content-center">   
                <button type="button" id="btn-less" class="btn mr-4" aria-labelledby ="button less"><i class="fas fa-minus"></i></button>
                <input type="number" class="quantity" class="col-3 col-sm-4" max="100" value ="${item.quantity}" pattern="^[0-9]$"></input>
                <button type="button" id="btn-plus" class="btn ml-4" aria-labelledby ="button plus"><i class="fas fa-plus-square"></i></button>
            </div>
            </div>
            <div class="d-flex justify-content-center flex-column col-md-2 text-center mb-3 mt-3">
              <h4 class="col-sm">Prix Total</h4>
              <p class="col-sm mt-2 total-item-price">${(item.price * item.quantity) / 100} \u20AC</p>
            </div>
            <button type="reset" class="btn reset-btn sm-ml-4 mb-3 col col-md-1"><i class="far fa-trash-alt"></i></button>
        </div>  
      `
    );
    totalToPay += (item.price * item.quantity) / 100;
    // DisplayTotal.innerHTML = totalToPay + " €";
    totalCount();
    products.push(item.id);
  }
}
;

//calcul du prix total
function totalCount() {
  let totalToPay = 0;
  for (let item of basketOrder)
  totalToPay += (item.price * item.quantity) / 100;
  DisplayTotal.innerHTML = totalToPay + " \u20AC";
}

///********** FONCTIONNALITES POUR LA GESTION DU PANIER UNE FOIS AFFICHE DANS LA FENETRE ***********///

// Pour ajouter supprimer un artcile et l'afficher dans l'input

const QuantityInput = document.querySelectorAll(".quantity");        
const Plus = document.querySelectorAll("#btn-plus"); 
const Less = document.querySelectorAll("#btn-less");
const ItemTotalPrice = document.querySelectorAll(".total-item-price");

function sendBasketOrderToStorage(){
  localStorage.setItem("basketItems", JSON.stringify(basketOrder));
}

if(basketOrder){  
  for(let i = 0; i < basketOrder.length; i ++){
    const Item = basketOrder[i];
    const LessBtn = Less[i];
    const PlusBtn = Plus[i];
    let quantity = QuantityInput[i];
    const priceItem = basketOrder[i].price;
    let NewItemTotalPrice = ItemTotalPrice[i];

      //on supprime un de la quantité de l'article du panier
    function lessQuantity(){
      if (quantity.value > 1){
        Item.quantity --;
        //on met à jour le contenu du panier au localStorage en enlevant la quantité à l'article concerné
        sendBasketOrderToStorage();
        //on affiche le changement de quantité à l'écran et on met le prix total de l'article à jour
        quantity.value = Item.quantity;
        NewItemTotalPrice.innerHTML = (parseInt(quantity.value, "10") * priceItem) / 100 + " \u20AC";
         //on met à jour le prix total à payer
        totalCount();
      }
    }
    LessBtn.addEventListener("click", lessQuantity);

    //on ajoute un à la quantité de l'article du panier
    function plusQuantity(){
      Item.quantity ++;
      //on met à jour le contenu du panier au localStorage en enlevant la quantité à l'article concerné
      sendBasketOrderToStorage();
      //on affiche le changement de quantité à l'écran et on met le prix total de l'article à jour
      quantity.value = Item.quantity;
      NewItemTotalPrice.innerHTML = (parseInt(quantity.value, "10") * priceItem) / 100 + " \u20AC";
      //on met à jour le prix total à payer
      totalCount();
    }
    PlusBtn.addEventListener("click", plusQuantity);

    //Gestion des quantités lors de saisie par l'utlisateur              
    quantity.addEventListener("change", function(){
      // let quantityInput = this.value;
      let quantityRegExp = new RegExp("^[0-9]{1,3}$");
      let quantityTest = quantityRegExp.test(this.value)
      if(quantityTest){
        // la quantité saisie devient la valeur de l'article
        Item.quantity = parseInt(quantity.value, "10");
        //on met à jour le prix dans le panier dans le display
        NewItemTotalPrice.innerHTML = (parseInt(quantity.value, "10") * priceItem) / 100 + " \u20AC";
        // on met à jour les quantités de l'article
        sendBasketOrderToStorage();
        totalCount();
      }
      else{
        alert("Saisie incorrecte pour cet article"); // A VOIR ICI
        this.value = 1;
        Item.quantity = parseInt(quantity.value, "10");
        NewItemTotalPrice.innerHTML = (parseInt(quantity.value, "10") * priceItem) / 100 + " \u20AC";
        sendBasketOrderToStorage();
        totalCount()
        };
    })
  } 
}

/****RESET DE L'ARTICLE AU BOUTON ****/

let resetBtnList = document.getElementsByClassName("reset-btn");

//on récupère tous les boutons reset de la fenêtre
if(basketOrder){
  for (let resetBtn of resetBtnList ){
    resetBtn.addEventListener("click", ()=> {
      // on récupère l'id de l'élément à supprimer
    let parentId = resetBtn.parentElement.getAttribute("data-id");
     
    //on supprime l'élément dans la fenêtre via une suppression dans la div
    document.querySelector("#basketContain").removeChild(resetBtn.parentElement);
    
    //création d'une fonction pour filtrer les Id 
    function filterById(resetBtn){
      if(resetBtn.id != parentId){
        return true
      }else{
        return false
      }
    }
    //on supprime l'élément dans le panier en filtrant le tableau
     let basketOrderWithoutIt = basketOrder.filter(filterById);
    
     //on met à jour le tableau filtré
    basketOrder = basketOrderWithoutIt;

    //on met à jour le local storage
    if (basketOrder.length >= 1) {
      sendBasketOrderToStorage();
    } else {
      localStorage.removeItem("basketItems");
      basketEmpty();
    }
    
    //on met à jour le prix total
    totalCount();
    });
  };  
};


///////////**********GESTION DU FORMULAIRE ***********///////////

//fonction pour indiquer visuellement que ce n'est pas valide
function ifDanger(value){
  if (value.classList.contains("border-success")){
    value.classList.remove("border-success");
  }
  value.classList.add("border-danger");
};

//fonction pour indiquer visuellement que c'est ok pour la saisie
function ifSuccess(value){
  if(value.classList.contains("border-danger")){
    value.classList.remove("border-danger");
  }
  value.classList.add("border-success")
};

//fonction pour enlever les indicateurs visuels si l'input redevient à 0 après une saisie
function noMoreInput(element){
  if (element.classList.contains("border-danger", "text-danger")){
    element.classList.remove("border-danger", "text-danger");
  }
  else if(element.classList.contains("border-success", "text-success")){
    element.classList.remove("border-success", "text-success");
  }
};

//vérification que tout est bien bon après la saisie dans un input
let formInputs = document.querySelectorAll("#form-order input");
for (let input of formInputs){
  input.addEventListener("change", function(){
    //si la saisie est correcte ou non changer le visuel de l'imput
    if(input.reportValidity()){
      ifSuccess(input);
    }else{
      ifDanger(input);
    };
  });
};

//actions de vérification du formulaire au moment de l'envoi    
const FormOrder = document.querySelector("#form-order");                  
FormOrder.addEventListener("submit", function(e){
  e.preventDefault();
    //variable pour vérifier si la saisie est correcte et retourne true
  let inputValid = true;
    //parcours de chacun des inputs pour vérification
  for (let input of document.querySelectorAll("#form-order input")){
    // vérification que les champs inputs saisis soient corrects   
    inputValid = inputValid && input.reportValidity;
    if(input.reportValidity()){
      ifSuccess(input);
      inputValid = true;
    }else{
      ifDanger(input);
      inputValid = false;
    };
  }; 
    
  if(inputValid){
      //si donc tous les imputs sont valides
    //récupération des infos et création de l'objet à envoyer
    let contact = getUserInfo();
    let dataOrder = {contact, products};
    
    //envoi de l'objet dataOrder à l'api
    fetch('http://localhost:3000/api/teddies/order', {
      method: "POST",
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(dataOrder)
    })
    .then(function(response){
      if(response.ok){
        return response.json()
      }
    })
    .then(order => {
      // on envoie la commande dans le localStorage, on supprime le panier et on dirige vers la page commande
      localStorage.setItem("order", JSON.stringify(order));
      localStorage.removeItem("basketItems")
      window.location.assign("order.html");
    })
  }
  e.stopPropagation();
});

/****** MISE EN PLACE DE L'OBJET CONTACT ET DU TABLEAU POUR POST ******/

//Objet contact
class contact {
  constructor (lastName, firstName, address, city, email, postal, totalCount){
    this.lastName = lastName,
    this.firstName = firstName,
    this.address = address,
    this.city = city,
    this.email = email
    this.postal = postal,
    this.totalCount = totalCount
  }
};

//Récupération des infops user pour le POST
function getUserInfo(){
  let lastName = document.querySelector("#userName").value;
  let firstName =  document.querySelector("#userFirstName").value;
  let address =  document.querySelector("#userAddress").value;
  let city =  document.querySelector("#city").value;
  let email =  document.querySelector("#userEmail").value;
  let postal = document.querySelector("#postalCode").value;
  let totalCount = document.querySelector("#totalBasketPrice").innerHTML;
  
  const user = new contact(lastName, firstName, address, city, email, postal, totalCount);
  return user
};
