const ApiToFetch = 'http://localhost:3000/api/teddies';

/*Récupération de l'id dans l'url au chargement de la page */

const UrlQueryString = window.location.search;
const UrlParams = new URLSearchParams(window.location.search);
const Id = UrlParams.get("id");

//récupération du panier
let basketOrder = JSON.parse(localStorage.getItem("basketItems"));
const BtnSendToBasket = document.querySelector("#btn-sendToBasket"); //bouton écouté

fetch(ApiToFetch + "/" + Id)
  .then(response => {
    if (response.ok){return response.json()}
    else{
      console.log("erreur :" + response.status)
    }
  })
  .then(teddyItem => {
        console.log (teddyItem)
        
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
        
        console.log(dataTeddyItem)
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
                   console.log(item.name);
                    // on ajoute la quantité saisie à celle déjà existante pour l'objet
                  item.quantity += parseInt(quantityInput.value, "10");
                  console.log(item.quantity)
                //   et on met à jour le storage
                  localStorage.setItem("basketItems", JSON.stringify(basketOrder));
                }
            };                       

            // s'il n'y est pas je rajoute l'obet et j'envoie au storage
            if(!isAlreadyExist){
              basketOrder.push(dataTeddyItem);
              localStorage.setItem("basketItems", JSON.stringify(basketOrder));
            }
        }
    })     
  }); 

   /******* Fonctions pour ajouter supprimer un artcile et afficher la quantité dans l'input ***** */
//  const BtnSendToBasket = document.querySelector("#btn-sendToBasket"); //bouton écouté

let quantityInput = document.querySelector(".quantity");
        //revoir plus tard pour mettre une regExp pour l'input
let plus = document.querySelector("#btn-plus"); 
let less = document.querySelector("#btn-less");

// // ajout de 1 dans le nombre d'articles dans l'input
function plusQuantity(){
 let quantity = parseInt(quantityInput.value, "10");
  if(quantity < 100){
  quantity += 1 ;
  }
  quantityInput.value = quantity;
  console.log("type de qty :" + typeof(quantity));
}
// // suppression de 1 dans le nombre d'articles dans l'input
function lessQuantity(){
  let quantity = parseInt(quantityInput.value, "10");
  if (quantityInput.value > 1){
    quantity -= 1;
    console.log("type de qte - :" + typeof(quantity));
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

plus.addEventListener("click", (e) => {
  plusQuantity();
  formatQuantity();
});
less.addEventListener("click", (e) => {
  lessQuantity();
  formatQuantity();
});

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

// plus.addEventListener("click", function(e){
//   let quantity = parseInt(quantityInput.value, "10");
//   if(quantity >= 100 || quantity < 1){
//       e.preventDefault();
//       alert("Veuillez ressaisir un nombre correct compris entre 1 et 100")
//   }else{
//   ableLess();
//   plusQuantity();
//   console.log(quantity)
//   console.log("type de qte :" + typeof(quantity));
//   }
  
// });


// less.addEventListener("click", lessQuantity);

// ecoute de la quantité saisie
// quantityInput.addEventListener("change", function(){
//   quantity = parseInt(quantityInput.value,"10");
//   verifInput(quantityInput)
//   this.reportValidity()
//   let quantity = parseInt(quantityInput.value, "10");
//   if(quantity === 1){
//     disableLess();
//   }else{
//     ableLess();
//     quantity = quantityInput.value;
//   }
//   // less.addEventListener("click", lessQuantity);
//   // plus.addEventListener("click", plusQuantity);


// changé là
// quantityInput.addEventListener("input", function(){
//   let quantity = parseInt(this.value, "10");           // PROBLEME DE VISION DES QTE -1 PAR LA MACHINE
//   this.reportValidity();
//   quantityInput.value = quantity;
//   if (quantity <= 0 || quantity > 100){
//       BtnSendToBasket.setAttribute("disabled", "");
//   }
//   else if (quantity <= 1) {
//       disableLess();
//   }
//   else{
//       ableLess();
//       BtnSendToBasket.removeAttribute("disabled");
//   };
//   // return qte
  
//   console.log(quantity)
//   console.log(typeof(quantity));
// });


//////////***** Gestion de l'input *****////////


// function verifInput(quantityInput){
//  //création de la regExp pour contrôler la saisie 
//  let inputRegexp = new RegExp ("^[0-9]{1,3}$");

// if(!inputRegexp.test(quantityInput.value)){
//     quantityInput.classList.add("text-danger");
//     BtnSendToBasket.setAttribute("disabled", "");
//     console.log("non pas bon la qte")
//  }
//  else{
//    if(inputRegexp.test(quantityInput.value)){
//   quantityInput.classList.remove("text-danger")
//   console.log("ok good")
//   BtnSendToBasket.removeAttribute("disabled");
//    }
//  }
// }

  // })
// });

//////**************VERSION MEDHI  TEST ******************/
// plus.addEventListener("click", (e) => {
//   addQte();
//   formatQte();
// });
// less.addEventListener("click", (e) => {
//   subQte();
//   formatQte();
// });

// function formatQte() {
//   let qte = parseInt(quantityInput.value);
//   if (qte < 1) {
//     qte = 1;
//   } else if (qte > 100) {
//     qte = 100;
//   }
//   if (qte === 1) {
//     less.setAttribute("disabled", true);
//   } else if (qte === 100) {
//     plus.setAttribute("disabled", true);
//   }
//   if (qte > 1) {
//     less.removeAttribute("disabled");
//   }
//   if (qte < 100) {
//     plus.removeAttribute("disabled");
//   }
//   quantityInput.value = qte;
// }
// function addQte() {
//   let qte = parseInt(quantityInput.value);
//   if (qte < 99) {
//     qte+= 1;
//   }
//   quantityInput.value = qte;
// }
// function subQte() {
//   let qte = parseInt(quantityInput.value);
//   if (qte > 1) {
//     qte-= 1;
//   }
//   quantityInput.value = qte;
// }
// formatQte();
// quantityInput.addEventListener("input", formatQte);
