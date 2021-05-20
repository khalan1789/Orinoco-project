//Récupérer les données du localStorage

let basketOrderContain = JSON.parse(localStorage.getItem("basketItems"));
console.log(basketOrderContain)

//si le panier est vide changement du titre du panier
if (basketOrderContain === null){
document.querySelector("#text-basket").innerText = "Votre panier est vide !";

} else{ 
   document.querySelector("#text-basket").innerText = "Votre panier contient :";

  // récupération et attribution des données dans le panier
  for (let item of basketOrderContain){
    //transformation des quantités en entier
    let itemQuantityInNumber = parseInt(item.quantity, "10")
   console.log(itemQuantityInNumber)
    //condition ici avant pour voir si l'article est déjà là?

    document.querySelector("#basketContain").insertAdjacentHTML("beforeend", `
      <div class="row mt-2 mb-3 border-bottom border-primary" data-id=${item.id}>
      <img src="${item.image}" class="col-12 col-md-4 col-lg-3">
          <div class="d-flex flex-column col-md-5 mb-4 ">
              <h4 class="col-sm mb-3 mt-3 text-center ">${item.name}</h4>
              <label class="col-12 col-sm mt-3 text-center"> Quantité</label>
              <div class="col-12 col-sm mt-4 d-flex justify-content-center">   
                  <button type="button" id="btn-less" class="btn mr-4 "><i class="fas fa-minus"></i></button>
                  <input type="text" class="quantity" value="${itemQuantityInNumber}" class="col-3 col-sm-4"></input>
                  <button type="button" id="btn-plus" class="btn ml-4 "><i class="fas fa-plus-square"></i></button>
              </div>
              </div>
              <div class="d-flex justify-content-center flex-column col-sm-2 text-center mb-3 mt-3">
                <h4 class="col-sm">Prix</h4>
                <p class="col-sm mt-2">${item.price}</p>
              </div>
              <button type="reset" class="btn reset-btn sm-ml-4 mb-3 col col-sm-1"><i class="far fa-trash-alt"></i></button>
          </div>
      `
   )
  } 
}
;

// for (let item of basketOrderContain){
//   if(basketContain.children.data-id)


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
    
    //je supprime l'élément dans la fenêtre via une suppression dans la div
    document.querySelector("#basketContain").removeChild(resetBtn.parentElement);

    // je supprime l'id de mon tableau
    basketOrderContain = basketOrderContain.filter(teddyInBasket => (teddyInBasket.id != parentId))
    
    // et je mets à jour le localStorage : si à zéro message panier vide, sinon j'envoi les données;
    if(basketOrderContain == 0){
      localStorage.removeItem("basketItems")
      return basketOrderContain === null;
    }else{
    localStorage.setItem("basketItems", JSON.stringify(basketOrderContain));
    }
});









// // test map
// let testArray = basketOrderContain.map((el) => {
//   console.log(el.quantity)
//   if(el.quantity){
//     el.quantity += el.quantity;
//   }
// })