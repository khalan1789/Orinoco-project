const ApiToFetch = 'http://localhost:3000/api/teddies';

/*Récupération de l'id dans l'url au chargement de la page */

const UrlQueryString = window.location.search;
const UrlParams = new URLSearchParams(window.location.search);
const Id = UrlParams.get("id");

//récupération du panier
let basketOrder = JSON.parse(localStorage.getItem("basketItems"));


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
        document.querySelector(".product-specification").id = teddyItem._id;

        //recuperation des couleurs en forme de liste déroulante
        for (let teddyColor of teddyItem.colors){
        document.querySelector("#color-list").innerHTML += 
        "<option>" + teddyColor + "</option>";   
        }             
        
   /************ Ajout d'un produit dans le localStorage*********/

    // bouton d'envoi au panier
    const BtnSendToBasket = document.querySelector("#btn-sendToBasket"); //bouton écouté

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
            };                       /********Jusqu'ici c'est fonctionnel!!!!****** */
            // s'il n'y est pas je rajoute l'obet et j'envoie au storage
            /****C'est ici que ça merde!!!!!!!!!! */
             if(!isAlreadyExist){
                    basketOrder.push(dataTeddyItem);
                    localStorage.setItem("basketItems", JSON.stringify(basketOrder));
            }
        }
    })    
        // localStorage.setItem("basketItems", JSON.stringify(basketOrder));
 
 });


   /******* Fonctions pour ajouter supprimer un artcile et afficher la quantité dans l'input ***** */


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

// });  //fin du fetch pour tests

/************  ancienne version d'envoi*************
 * 
 * 
//  clé du tableau pour le panier du localStorage*/
  
//  let dataItem = {
//     id : document.querySelector(".product-specification").id,          //objet et qté validés
//     name : document.querySelector(".product-title").innerText,
//     // image : teddyImage,
//     quantity : quantityInput.value,
//     // price : teddyPrice
// }
  
//   //envoi des du panier au storage
//   function sendToBasket(){
//     basketOrder.push(dataItem);  //j'ajoute mon panier au tableau qui contient déjà des choses
//        //je transforme de nouveau en string pour l'envoi
//       localStorage.setItem("basketItems",JSON.stringify(basketOrder));
//   }

//   //si le storage est vide
//   if (!localStorage.getItem("basketItems")){ 
//     basketOrder = []; //tableau pour envoi des données au storage
//     sendToBasket();
//   }
//   //si le storage contient déjà la clé
//   else {
//     sendToBasket();
//   }



//stop ici!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//objet et quantité à ajouter dans le panier

// let dataItem = {
//     id : teddyId,          //objet et qté validés
//     name : teddyName,
//     image : teddyImage,
//     quantity : quantityInput.value,
//     price : teddyPrice
//   }
//   console.log(dataItem)
  
//   //envoi des du panier au storage
//   function sendToBasket(){
//     basketOrder.push(dataItem);  //j'ajoute mon panier au tableau qui contient déjà des choses
//        //je transforme de nouveau en string pour l'envoi
//       localStorage.setItem("basketItems",JSON.stringify(basketOrder));
//   }

//   //si le storage est vide
//   if (!localStorage.getItem("basketItems")){ 
//     basketOrder = []; //tableau pour envoi des données au storage
//     sendToBasket();
//   }
//   //si le storage contient déjà la clé
//   else {
//     sendToBasket();
//   }