const Order = JSON.parse(localStorage.getItem("order"))


document.querySelector("#titleConfirm").innerHTML = `Félicitations ${Order.contact.firstName.toUpperCase()}, votre commande est validée !`;
document.querySelector("#orderLine").innerHTML = `Nous vous remercions d'avoir choisi Orinoco pour vos achats. Votre commande d'un montant total de ${Order.contact.totalCount} porte le numéro <strong>${Order.orderId}</strong>`;
document.querySelector("#delivery").innerHTML =`Elle vous sera envoyée dans les plus brefs délais à l'adresse que vous nous avez fournie lors de la validation à savoir : </br>
${Order.contact.address} ${Order.contact.postal} ${Order.contact.city} </br>
Les informations de suivi vous serons envoyées par mail à l'adresse <i>${Order.contact.email}<i>`

//suppression de la commande dès que l'on sort de la page
const Links = document.getElementsByTagName("a");
for (let link of Links){
    link.addEventListener("click", () => localStorage.removeItem("order"));
}
