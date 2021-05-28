////****Récupérer les données du localStorage ********////
//récupération du panier
let basketOrder = JSON.parse(localStorage.getItem("basketItems"));

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
                  <input type="text" class="quantity" class="col-3 col-sm-4" value ="${item.quantity}"></input>
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
    )
    totalToPay += (item.price * item.quantity) / 100;
    // DisplayTotal.innerHTML = totalToPay + " €";
    totalCount();
  }
}
;
///********** FONCTIONNALITES POUR LA GESTION DU PANIER UNE FOIS AFFICHE DANS LA FENETRE ***********///

// Pour ajouter supprimer un artcile et l'afficher dans l'input
const QuantityInput = document.querySelectorAll(".quantity");        //revoir plus tard pour mettre une regExp pour l'input
const Plus = document.querySelectorAll("#btn-plus"); 
const Less = document.querySelectorAll("#btn-less");
let ItemTotalPrice = document.querySelectorAll(".total-item-price");
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
          console.log( Item.quantity);
          //on met à jour le contenu du panier au localStorage en enlevant la quantité à l'article concerné
          localStorage.setItem("basketItems", JSON.stringify(basketOrder));
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
        console.log( Item.quantity);
        //on met à jour le contenu du panier au localStorage en enlevant la quantité à l'article concerné
        localStorage.setItem("basketItems", JSON.stringify(basketOrder));
        //on affiche le changement de quantité à l'écran et on met le prix total de l'article à jour
        quantity.value = Item.quantity;
        NewItemTotalPrice.innerHTML = (parseInt(quantity.value, "10") * priceItem) / 100 + " \u20AC";
        //on met à jour le prix total à payer
        totalCount();

      }
      PlusBtn.addEventListener("click", plusQuantity);

      //Gestion des quantités lors de saisie par l'utlisateur
      let quantityInputAdded = quantity.addEventListener("change", ()=>{
        // la quantité saisie devient la valeur de l'article
        Item.quantity = quantity.value;
        //on met à jour le prix dans le panier dans le display
        NewItemTotalPrice.innerHTML = (parseInt(quantity.value, "10") * priceItem) / 100 + " \u20AC";
        // on met à jour les quantités de l'article
        localStorage.setItem("basketItems", JSON.stringify(basketOrder));
        totalCount();
    ;
    })
    } 
}
//calcul du prix total
function totalCount() {
  let totalToPay = 0;
  for (let item of basketOrder)
  totalToPay += (item.price * item.quantity) / 100;
  DisplayTotal.innerHTML = totalToPay + " \u20AC";

}
// for(let btnLess of less){
//   btnLess.addEventListener("click", lessQuantity);
// }


/****************** si besoin d'un bouton pour reset le panier
  document.querySelector("#deleteBasketButton").addEventListener("click",()=> {
    localStorage.removeItem("basketItems")
  })
********************/

/****RESET DE L'ARTICLE AU BOUTON ****/
let resetBtnList = document.getElementsByClassName("reset-btn");

//on récupère tous les boutons reset de la fenêtre
if(basketOrder){
for (let resetBtn of resetBtnList )
resetBtn.addEventListener("click", ()=> {
      // on récupère l'id de l'élément à supprimer
    let parentId = resetBtn.parentElement.getAttribute("data-id");
     
    //on supprime l'élément dans la fenêtre via une suppression dans la div
    document.querySelector("#basketContain").removeChild(resetBtn.parentElement);
    console.log("apres l'effacement il a :" + basketOrder.length);
    
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
      localStorage.setItem("basketItems", JSON.stringify(basketOrder));
    } else {
      localStorage.removeItem("basketItems");
      basketEmpty();
    }
    
    //on met à jour le prix total
    totalCount();

});
}


///////////**********GESTION DU FORMULAIRE ***********///////////
//fonction pour indiquer visuellement que ce n'est pas valide
function ifDanger(value){
  if (value.classList.contains("border-success")) {
    value.classList.remove("border-success");
   }
   value.classList.add("border-danger");
  
  console.log("oh oui c'est bon ça!!" + this.value);
}
//fonction pour indiquer visuellement que c'est ok pour la saisie
function ifSuccess(value){
  if(value.classList.contains("border-danger")){
    value.classList.remove("border-danger");
 }
 value.classList.add("border-success")
}
//fonction pour enlever les indicateurs visuels si l'input redevient à 0 après une saisie
function noMoreInput(element){
  if (element.classList.contains("border-danger", "text-danger")) {
    element.classList.remove("border-danger", "text-danger");
  }
  else if (element.classList.contains("border-success", "text-success")){
    element.classList.remove("border-success", "text-success");
  }
}

// let onlyLetterRegExp = new RegExp("^[A-Za-z- ]+$", "g");


//nom
const UserName = document.querySelector("#userName");
let userNameValid = false;
UserName.addEventListener("change", function(){
  //création de la regExp pour la saisie de texte
  let onlyLetterRegExp = new RegExp("^[A-Za-z- ]+$", "g");
  console.log("n°1" + this.value);
 //test de la regExp
  let textRegExp = onlyLetterRegExp.test(this.value);
 //ciblage du paragraphe sous l'input
  let small = this.nextElementSibling;

 console.log("n°2" + textRegExp);
 console.log("n°3" + this.value);
 //si le test est bon 
 /****Ca merdsouille ici à reprendrre*** */
 if (!this.value) {
    noMoreInput(this);
    small.innerHTML = "";
    userNameValid = false;
  }else{
  //si le contrôle regExp est ok
    if(textRegExp){
      ifSuccess(this) 
      small.innerHTML = '<p class="text-right"><i class="fas fa-check text-success"></i></p>'
      console.log("hum tu sens que ça viens là" + this.value);
      userNameValid = true;
      console.log("verif si nom est bon " + userNameValid );
    }else{
      ifDanger(this);
      small.innerHTML = '<p class="text-center text-danger font-italic">Saisie incorrecte! Veuillez saisir un nom correct, les chiffres et autres caractères sont interdits';
      userNameValid = false;
      console.log("verif si nom est pas bon " + userNameValid );
    }
  }
});



/////////////////////////////////////

// //prénom
const UserFirstName = document.querySelector("#userFirstName");
let userFirstNameValid = false;
UserFirstName.addEventListener("change", function(){
  let onlyLetterRegExp = new RegExp("^[A-Za-z- ]+$", "g")
  let textRegExp = onlyLetterRegExp.test(this.value);
  let small = this.nextElementSibling;

  if (!this.value) {
    noMoreInput(this);
    small.innerHTML = "";
    userFirstNameValid = false;
  }else{
      if(textRegExp){
      ifSuccess(this) 
      small.innerHTML = '<p class="text-right"><i class="fas fa-check text-success"></i></p>'
      userFirstNameValid = true;
      console.log("hum tu sens que ça viens là" + this.value);
    }else{
      ifDanger(this);
      small.innerHTML = '<p class="text-center text-danger font-italic">Saisie incorrecte! Veuillez saisir un prénom correct, les chiffres et autres caractères sont interdits';
      userFirstNameValid = false;
    }
  }
});

// //adress
const UserAdress = document.querySelector("#userAddress");
let userAdressValid = false;
UserAdress.addEventListener("change",function (){
  let onlyLetterRegExp = new RegExp("^[A-Za-z- 0-9']+$", "g")
  let textRegExp = onlyLetterRegExp.test(this.value);
  let small = this.nextElementSibling;

  if (!this.value) {
    noMoreInput(this);
    small.innerHTML = "";
    userAdressValid = false;
  }else{
      if(textRegExp){
      ifSuccess(this) 
      small.innerHTML = '<p class="text-right"><i class="fas fa-check text-success"></i></p>'
      console.log("hum tu sens que ça viens là" + this.value);
      userAdressValid = true;
    }else{
      ifDanger(this);
      small.innerHTML = '<p class="text-center text-danger font-italic">Saisie incorrecte! Veuillez saisir une adresse correcte, les caractères spéciaux (&,",@ etc...) sont interdits';
      userAdressValid = false;
    }
  }

});

// //postal code
const UserPostalCode = document.querySelector("#postalCode");
let userPostalCodeValid = false;
UserPostalCode.addEventListener("change", function(){
  let onlyLetterRegExp = new RegExp("^[0-9]{4,6}$", "g")
  let textRegExp = onlyLetterRegExp.test(this.value);
  let small = this.nextElementSibling;

  if (!this.value) {
    noMoreInput(this);
    small.innerHTML = "";
    userPostalCodeValid = false;
  }else{
      if(textRegExp){
      ifSuccess(this) 
      small.innerHTML = '<p class="text-right"><i class="fas fa-check text-success"></i></p>'
      console.log("hum tu sens que ça viens là" + this.value);
      userPostalCodeValid = true;
    }else{
      ifDanger(this);
      small.innerHTML = '<p class="text-center text-danger font-italic">Saisie incorrecte! Veuillez saisir un code postal valide de 4 à 6 chiffres</p>';
      userPostalCodeValid = false;
    }
  }
})

// //city
const UserCity = document.querySelector("#city");
let userCityValid = false;
UserCity.addEventListener("change", function(){
  let onlyLetterRegExp = new RegExp("^[A-Za-z- ]{2,58}$", "g")
  let textRegExp = onlyLetterRegExp.test(this.value);
  let small = this.nextElementSibling;

  if (!this.value) {
    noMoreInput(this);
    small.innerHTML = "";
    userCityValid = false;
  }else{
      if(textRegExp){
      ifSuccess(this) 
      small.innerHTML = '<p class="text-right"><i class="fas fa-check text-success"></i></p>'
      console.log("hum tu sens que ça viens là" + this.value);
      userCityValid = true;
    }else{
      ifDanger(this);
      small.innerHTML = '<p class="text-center text-danger font-italic">Saisie incorrecte! Veuillez saisir un nom de ville correct, les chiffres et autres caractères sont interdits';
      userCityValid = false;
    }
  }
});

//country
const UserCountry = document.querySelector("#country");
let userCountryValid = false;
UserCountry.addEventListener("change", function(){
  let onlyLetterRegExp = new RegExp("^[A-Za-z- ]{3,60}$", "g")
  let textRegExp = onlyLetterRegExp.test(this.value);
  let small = this.nextElementSibling;

  if (!this.value) {
    noMoreInput(this);
    small.innerHTML = "";
    userCountryValid = false;
  }else{
      if(textRegExp){
      ifSuccess(this) 
      small.innerHTML = '<p class="text-right"><i class="fas fa-check text-success"></i></p>'
      console.log("hum tu sens que ça viens là" + this.value);
      userCountryValid = true;
    }else{
      ifDanger(this);
      small.innerHTML = '<p class="text-center text-danger font-italic">Saisie incorrecte! Veuillez saisir un nom de pays correct, les chiffres et autres caractères sont interdits';
      userCountryValid = false;
    }
  }
});

//email
const UserEmail = document.querySelector("#userEmail");
let userEmailValid = false;

UserEmail.addEventListener("change", function(){
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,8}$', 'g')
  console.log(this.value)
  let testEmail = emailRegExp.test(this.value);
  let small = this.nextElementSibling;

  if (!this.value) {
    noMoreInput(this);
    small.innerHTML = "";
    userEmailValid = false;
  }else{
     if(testEmail){
      ifSuccess(this) 
      small.innerHTML = '<p class="text-right"><i class="fas fa-check text-success"></i></p>'
      userEmailValid = true;
    }
    else{
        small.innerHTML = '<p class="text-center text-danger font-italic">Adresse mail non valide,vérifiez votre saisie"</p>';
        ifDanger(this);
        userEmailValid = false;
        
    }
  }  
});

//validation du formulaire au clic
btnFormValid.addEventListener("click", function(e){
  if(!userNameValid == true || !userFirstNameValid == true || !userAdressValid == true || !userPostalCodeValid == true || !userCityValid == true || !userCountryValid == true || !userEmailValid == true ){
    e.preventDefault();
  }
  else{
    e.preventDefault();
    console.log("données validées : " + UserName.value + " "+ UserFirstName.value+ " "+UserAdress.value +" "+UserPostalCode.value + " "+UserCity.value + " "+UserCountry.value +" " +UserEmail.value+ "");
  }
})