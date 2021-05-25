//Récupérer les données du localStorage
//récupération du panier
let basketOrder = JSON.parse(localStorage.getItem("basketItems"));


/**************         PRIX TOTAL A L'IMPORT DU PANIER   ****************** */
let totalToPay = 0;
const DisplayTotal = document.querySelector("#totalBasketPrice");
 // récupération et attribution des données dans le panier
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
                <p class="col-sm mt-2 total-item-price">${(item.price * item.quantity) / 100} €</p>
              </div>
              <button type="reset" class="btn reset-btn sm-ml-4 mb-3 col col-md-1"><i class="far fa-trash-alt"></i></button>
          </div>
          
      `
    )
    totalToPay += (item.price * item.quantity) / 100;
    // DisplayTotal.innerHTML = totalToPay + " €";
    totalCount();
}
;
/********** FONCTIONNALITES POUR LA GESTION DU PANIER UNE FOIS AFFICHE DANS LA FENETRE *************/

// Pour ajouter supprimer un artcile et l'afficher dans l'input
const QuantityInput = document.querySelectorAll(".quantity");        //revoir plus tard pour mettre une regExp pour l'input
const Plus = document.querySelectorAll("#btn-plus"); 
const Less = document.querySelectorAll("#btn-less");
let ItemTotalPrice = document.querySelectorAll(".total-item-price");

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
      NewItemTotalPrice.innerHTML = (parseInt(quantity.value, "10") * priceItem) / 100 + " €";
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
    NewItemTotalPrice.innerHTML = (parseInt(quantity.value, "10") * priceItem) / 100 + " €";
    //on met à jour le prix total à payer
    totalCount();

  }
  PlusBtn.addEventListener("click", plusQuantity);

  //Gestion des quantités lors de saisie par l'utlisateur
  let quantityInputAdded = quantity.addEventListener("change", ()=>{
    // la quantité saisie devient la valeur de l'article
    Item.quantity = quantity.value;
    //on met à jour le prix dans le panier dans le display
    NewItemTotalPrice.innerHTML = (parseInt(quantity.value, "10") * priceItem) / 100 + " €";
    // on met à jour les quantités de l'article
    localStorage.setItem("basketItems", JSON.stringify(basketOrder));
    totalCount();
 ;
})
} 

//calcul du prix total
function totalCount() {
  let totalToPay = 0;
  for (let item of basketOrder)
  totalToPay += (item.price * item.quantity) / 100;
  DisplayTotal.innerHTML = totalToPay + " €";

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
for (let resetBtn of resetBtnList )
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
      localStorage.setItem("basketItems", JSON.stringify(basketOrder));
    } else {
      localStorage.removeItem("basketItems");
      titleOfBasket()
    }
    console.log (basketOrderWithoutIt);
    totalCount();
    
    // on enlève le prix total de l'objet du panier total

  //   let totalPriceToRemove = parseInt(resetBtn.previousElementSibling.lastElementChild.innerHTML, "10")
  //  ;
    // et on met à jour le localStorage : si à zéro message panier vide, sinon on envoi les données;
    titleOfBasket();
});


// si le panier est vide changement du titre du panier
function titleOfBasket(){
  if (basketOrder === 0 || !basketOrder){
  document.querySelector("#text-basket").innerText = "Votre panier est vide !";
  
  } else{ 
     document.querySelector("#text-basket").innerText = "Votre panier contient :";
  }
}
titleOfBasket();
