/*
URLs API
Ours en peluche faits à la main : ​http://localhost:3000/api/teddies

Caméras vintage : ​http://localhost:3000/api/cameras

Meubles en chêne : ​http://localhost:3000/api/furniture
*/

// On affiche les images des cartes principales de la page d'accueil.

fetch('http://localhost:3000/api/cameras')
    .then(res => res.json()) // on parse la réponse de la requête en json
    .then(data => mainCameraImg.src =  data[0].imageUrl) // on extrait l'image de l'objet 0 de l'array et on l'envoie à l'emplacement de la carte

fetch('http://localhost:3000/api/furniture')
    .then(res => res.json()) // on parse la réponse de la requête en json
    .then(data => mainOakImg.src =  data[1].imageUrl) // on extrait l'image de l'objet 0 de l'array et on l'envoie à l'emplacement de la carte

fetch('http://localhost:3000/api/teddies')
    .then(res => res.json()) // on parse la réponse de la requête en json
    .then(data => mainTeddiesImg.src =  data[0].imageUrl) // on extrait l'image de l'objet 0 de l'array et on l'envoie à l'emplacement de la carte



// génération de cartes produits page principale
//la classe productCards produit une carte produit

class productCards
{
    constructor(cardType,product) //cardType fournit l'URL à aller chercher (ficher variables.js) et cardNumber correspond à l'index de l'objet à aller cherher.
    {
        fetch(cardType.url)
            .then(res => res.json()) // on parse la réponse de la requête en json
            //.then(data => console.log(data)) //on affiche le résultat du parsing (array Json) dans la console
            .then(data => 
                        {
                            
                                //création des variables fetch
                                const pictureCardUrl = product.imageUrl;
                                const cardTitleContent = document.createTextNode(product.name);
                                const cardDescriptionContent = document.createTextNode(product.description);
                                
                                
                                //création du cadre de la carte
                                const linkContainerCard = document.createElement("a");
                                productsContainer.appendChild(linkContainerCard);
                                linkContainerCard.classList.add("anim", "card", "col-md-3", "bg-light", "shadow", "text-decoration-none", "gx-0", "m-3");
                                linkContainerCard.setAttribute("href","./custom_code/pages_HTML/product.html")
                                    
                                //création image de la carte
                                const pictureCardTag = document.createElement("img");
                                linkContainerCard.appendChild(pictureCardTag);
                                pictureCardTag.classList.add("card-img-top", "border-bottom", "border-secondary");
                                pictureCardTag.setAttribute("src", pictureCardUrl );

                                //création card-body
                                const cardBody = document.createElement("div");
                                linkContainerCard.appendChild(cardBody);
                                cardBody.classList.add("card-body");
                                
                                //création titre
                                const cardTitleTag = document.createElement("h3");
                                cardTitleTag.classList.add("card-title", "text-center");
                                cardBody.appendChild(cardTitleTag);
                                cardTitleTag.appendChild(cardTitleContent);

                                //création description
                                const cardDescriptionTag = document.createElement("p");
                                cardDescriptionTag.classList.add("card-text");
                                cardBody.appendChild(cardDescriptionTag);
                                cardDescriptionTag.appendChild(cardDescriptionContent);
                        })}}




    function displayProduct(cardType) 
        {
            eraseProductsContainer()
            fetch(cardType.url)
            .then(res => res.json()) // on parse la réponse de la requête en json
            .then(data => {
                
                data.forEach(item => {
                    console.log(item._id)
                    let card = new productCards(cardType,item)
                })
            
                        
                    
        })} 
    





