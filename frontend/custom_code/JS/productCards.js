/*
URLs API
Ours en peluche faits à la main : ​http://localhost:3000/api/teddies

Caméras vintage : ​http://localhost:3000/api/cameras

Meubles en chêne : ​http://localhost:3000/api/furniture
*/

//Récupérer le container d'affichage des produits.
const productsContainer= document.getElementById("productsContainer");

//Emplacement dynamique du titre
const titreProduit =  document.getElementById("titreProduit");

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
    constructor(cardType,product) //cardType fournit l'URL à aller chercher et prodcut correspond à l'index de l'objet à aller cherher.
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
                                const optionName = Object.keys(product)[0];
                                const optionChoices = Object.values(product)[0];

                                //création du cadre de la carte
                                const linkContainerCard = document.createElement("div");
                                productsContainer.appendChild(linkContainerCard);
                                linkContainerCard.classList.add("anim", "card", "col-md-3", "bg-light", "shadow", "text-decoration-none", "gx-0", "m-3");
                                
                                    
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
                                const cardTitleTag = document.createElement("h2");
                                cardTitleTag.classList.add("card-title", "text-center");
                                cardBody.appendChild(cardTitleTag);
                                cardTitleTag.appendChild(cardTitleContent);

                                //création description
                                const cardDescriptionTag = document.createElement("p");
                                cardDescriptionTag.classList.add("card-text");
                                cardBody.appendChild(cardDescriptionTag);
                                cardDescriptionTag.appendChild(cardDescriptionContent);

                                //création choix de personnalisation
                                //label
                                const cardOptionLabel = document.createElement("label");
                                cardBody.appendChild(cardOptionLabel);
                                cardOptionLabel.classList.add("d-block", "mb-3");
                                const cardOptionLabelContent = document.createTextNode(optionName + " options: ");
                                cardOptionLabel.appendChild(cardOptionLabelContent);

                                //tag liste d'options
                                const cardOptionListTag = document.createElement("select");
                                cardBody.appendChild(cardOptionListTag);

                                //création des listes de sélection d'options avec boucle forEach
                                OptionListCreation(optionChoices)                              
                                function OptionListCreation(optionChoices)
                                {
                                    optionChoices.forEach(item =>
                                        {
                                            const listElement = document.createElement("option");
                                            cardOptionListTag.appendChild(listElement);
                                            listElement.value = item;
                                            const listElementContent = document.createTextNode(item);
                                            listElement.appendChild(listElementContent);
                                        })
                                }
                            
                                //création input nombre à ajouter au panier
                                const numberInputLabel = document.createElement("label");
                                linkContainerCard.appendChild(numberInputLabel);
                                const numberInputLabelContent = document.createTextNode("Commander:");
                                numberInputLabel.appendChild(numberInputLabelContent);
                                const numberInputBasket = document.createElement("input");
                                linkContainerCard.appendChild(numberInputBasket);
                                numberInputLabel.classList.add("mx-3", "mb-3");
                                numberInputBasket.setAttribute("type","number");
                                numberInputBasket.classList.add("w-25", "mx-3","numberInput");

                               
                        })}}



// Pilotage de l'affichage des éléments de la page.
    function displayProduct(urlToFetch) 
        {
            console.log("display product lancé: ", urlToFetch);
            eraseProductsContainer()
            titleSelection(urlToFetch)
            fetch(urlToFetch) 
            .then(res => res.json()) // on parse la réponse de la requête en json
            .then(data => {
                
                data.forEach(item => {
                    let card = new productCards(urlToFetch,item)
                })
            
                        
                    
        })} 

//Selection du titre de la page
    function titleSelection(selection)
        {
            
            if (selection == "http://localhost:3000/api/teddies")
                {   console.log("titre = teddies");
                    titreProduit.innerHTML = "Nos Ours en peluche!"; 
                }
            else if (selection == "http://localhost:3000/api/cameras")
            {   console.log("titre = cameras");
            titreProduit.innerHTML = "Nos caméras!";
            }
            else if (selection == "http://localhost:3000/api/furniture")
            {   console.log("titre = furniture");
            titreProduit.innerHTML = "Nos meubles en chêne!";  
            }
        }
    
selectDisplay() //lancer la selection et l'affichage au chargement de la page.


//test localStorage
let obj1 = {"fruit": "banana"};
let obj2 = {"vegetable": "Cucumber"};

let testObject = Object.assign(obj1, obj2);


console.log (testObject.fruit);

localStorage.setItem ("testObjectStr", JSON.stringify(testObject));

const testObjectIsBack = JSON.parse(localStorage.getItem("testObjectStr"));
console.log ( testObjectIsBack.vegetable);

// Utiliser la technique précédente pour transmettre un objet qui contient le contenu du panier à la page panier.
// Comment l'utilisateur ajoute t-il un élément au panier? il entre un nombre dans une case, les cases mettent à jour automatiquement des variables... On utilise les ID pour relier un produit au nombre d'éléments dans le panier...
//quand on valide le panier avec l'un des deux boutons les variables sont assignées à un objet, qui est transmis à la page panier avec localstorage.

