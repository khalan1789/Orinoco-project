//Récupérer les données du localStorage
// liste des produits
let teddiesListFromStorage = JSON.parse(localStorage.getItem("teddiesListForStorage"));

//liste dans le tableau panier
let basketOrderItemContain = 0;
let basketOrderItems = [];
// console.log(basketOrderContain)
// /*

/**************         PRIX TOTAL DU PANIER   ****************** */
let totalToPay = 0;

//coût total d'un produit par rapport à la quantité choisie
function totalPriceByItem (price, quantity){
  return price * quantity;
}
function totalPriceByItemAdded(itemTotalPrice){
  totalToPay += itemTotalPrice;
  return document.querySelector("#totalBasketPrice").innerHTML = totalToPay;
}
function removeItemTotalPrice(itemTotalPrice){
  totalToPay -= itemTotalPrice;
  return document.querySelector("#totalBasketPrice").innerHTML = totalToPay;
}

let itemTotalPrice
 // récupération et attribution des données dans le panier
for (let item of teddiesListFromStorage){
       
    //a condition que l'id de l'objet soit dans le localStorage comme nom d'objet
    if(localStorage.getItem(item._id)) {
      basketOrderItemContain +=1;
      
    //  //transformation des quantités en entier
    let itemQuantityInNumber = parseInt(JSON.parse(localStorage.getItem(item._id)), "10");
    itemTotalPrice = totalPriceByItem(item.price, itemQuantityInNumber);

    document.querySelector("#basketContain").insertAdjacentHTML("beforeend", `
      <div class="row mt-2 mb-3 border-bottom border-primary" data-id=${item._id}>
      <img src="${item.image}" class="col-12 col-md-4 col-lg-3" alt="photo de l'article">
          <div class="d-flex flex-column col-md-5 mb-4 ">
              <h4 class="col-sm mb-3 mt-3 text-center ">${item.name}</h4>
              <label class="col-12 col-sm mt-3 text-center"> Quantité</label>
              <div class="col-12 col-sm mt-4 d-flex justify-content-center">   
                  <button type="button" id="btn-less" class="btn mr-4" aria-labelledby ="button less"><i class="fas fa-minus"></i></button>
                  <input type="text" class="quantity" class="col-3 col-sm-4" value ="${itemQuantityInNumber}"></input>
                  <button type="button" id="btn-plus" class="btn ml-4" aria-labelledby ="button plus"><i class="fas fa-plus-square"></i></button>
              </div>
              </div>
              <div class="d-flex justify-content-center flex-column col-md-2 text-center mb-3 mt-3">
                <h4 class="col-sm">Prix Total</h4>
                <p class="col-sm mt-2 total-item-price" data-number =${itemTotalPrice}>${itemTotalPrice}</p>
              </div>
              <button type="reset" class="btn reset-btn sm-ml-4 mb-3 col col-md-1"><i class="far fa-trash-alt"></i></button>
          </div>
          
      `
    )
    totalPriceByItemAdded(totalPriceByItem(item.price, itemQuantityInNumber));
    basketOrderItems.push(item);
    }  
}
;
/**********Fonctions identiques au panier *************/
// Fonction pour ajouter supprimer un artcile et l'afficher dans l'input
const QuantityInput = document.querySelectorAll(".quantity");        //revoir plus tard pour mettre une regExp pour l'input
const Plus = document.querySelectorAll("#btn-plus"); 
const Less = document.querySelectorAll("#btn-less");
const ItemTotalPriceInBasket = document.querySelectorAll(".item-total-price");

for(let i = 0; i < basketOrderItems.length; i ++){
  const Item = basketOrderItems[i];
  const LessBtn = Less[i];
  const PlusBtn = Plus[i];
  let quantity = QuantityInput[i];
  const priceItem = basketOrderItems[i].price;
  const NewItemTotalPriceInBasket = ItemTotalPriceInBasket[i];


  function lessQuantity(){
    if (quantity.value > 1){
      quantity.value --;
      // quantity = parseInt(quantity.value, "10");
      console.log (typeof(quantity.value))
    }
  }
  LessBtn.addEventListener("click", lessQuantity);
  function plusQuantity(){
    quantity.value ++;
    quantity.innerHTML = parseInt(quantity.value, "10");
  }
  PlusBtn.addEventListener("click", plusQuantity);
console.log(i)
console.log(quantity.value)
} 
// for(let btnLess of less){
//   btnLess.addEventListener("click", lessQuantity);
// }


/****************** si besoin d'un bouton pour reset le panier
  document.querySelector("#deleteBasketButton").addEventListener("click",()=> {
    localStorage.removeItem("basketItems")
  })
********************/

/****reset de l'article au bouton */
let resetBtnList = document.getElementsByClassName("reset-btn");

for (let resetBtn of resetBtnList )
resetBtn.addEventListener("click", ()=> {
      // je récupère l'id de l'élément à supprimer
    let parentId = resetBtn.parentElement.getAttribute("data-id");
    console.log(parentId)
    
    //je supprime l'élément dans la fenêtre via une suppression dans la div
    document.querySelector("#basketContain").removeChild(resetBtn.parentElement);

    //j'enlève 1 au nombre d'article dans le panier
    basketOrderItemContain -=1;
    
    // je supprime l'id du storage
   localStorage.removeItem(parentId);

    // j'enlève le prix total de l'objet du panier total
    let totalPriceToRemove = parseInt(resetBtn.previousElementSibling.lastElementChild.innerHTML, "10")
    removeItemTotalPrice(totalPriceToRemove);
    // et je mets à jour le localStorage : si à zéro message panier vide, sinon j'envoi les données;
    // if(basketOrderItemContain == 0){
    //   return basketOrderContain === null;
    // }else{
    // localStorage.setItem("basketItems", JSON.stringify(basketOrderContain));
    // }
});


// function totalBasketPrice(){
  
//   totalBasketPrice.value += totalPriceByItem;
// }


// si le panier est vide changement du titre du panier
if (basketOrderItemContain === 0){
  document.querySelector("#text-basket").innerText = "Votre panier est vide !";
  
  } else{ 
     document.querySelector("#text-basket").innerText = "Votre panier contient :";
  }


// // test map
// let testArray = basketOrderContain.map((el) => {
//   console.log(el.quantity)
//   if(el.quantity){
//     el.quantity += el.quantity;
//   }
// })