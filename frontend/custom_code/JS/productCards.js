/*
URLs API
Ours en peluche faits à la main : ​http://localhost:3000/api/teddies

Caméras vintage : ​http://localhost:3000/api/cameras

Meubles en chêne : ​http://localhost:3000/api/furniture
*/

//Récupérer le container d'affichage des produits.
const productsContainer= document.getElementById("productsContainer");

// génération de cartes produits page principale

//eraseProductsContainer(); //effacer le conteneur au chargement de la page
function eraseProductsContainer() //effacer le conteneur
 {
    productsContainer.innerHTML = " ";
    console.log("container erased");
 }



// les fonctions displays appellent la fonction d'affichage en passant des arguments différents. Ces arguments sont les noms des objets à afficher.

function selectDisplay()
    {
        let urlToFetch = localStorage.getItem("urlToFetch");
        console.log("LocalStorage récupéré: ", urlToFetch);
        displayProduct(urlToFetch);
    }
    
//la classe productCards produit une carte produit

class productCards
{
    constructor(cardType,product) //cardType fournit l'URL à aller chercher (ficher variables.js) et cardNumber correspond à l'index de l'objet à aller cherher.
    {
        fetch(cardType)// remplacer Url par variable cardType
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




    function displayProduct(urlToFetch) 
        {
            console.log("display product lancé: ", urlToFetch);
            eraseProductsContainer()
            fetch(urlToFetch) 
            .then(res => res.json()) // on parse la réponse de la requête en json
            .then(data => {
                
                data.forEach(item => {
                    console.log(item._id)
                    let card = new productCards(urlToFetch,item)
                })
            
                        
                    
        })} 
    
selectDisplay() //lancer la selection et l'affichage au chargement de la page.




