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



// selectDisplay prend l'URL dans le localstrorage puis la fecth et appelle la fonction d'afficgahe

function selectDisplay()
    {
        let urlToFetch = localStorage.getItem("urlToFetch");
        console.log("LocalStorage récupéré: ", urlToFetch);
        displayProduct(urlToFetch);
    }

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
                let card = new productCards(urlToFetch,item,false) //cette boucle construit des instances de la classe product Cards: les cartes produits.
                //console.log("card: ",item);
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
    
//la classe productCards produit une carte produit

class productCards
{
    toggleButtons() //permet de faire apparaître et disparaître les boutons de commande
    {
        const buttons = document.getElementById("buttons")
        buttons.classList.toggle("d-none");
    }
    
    constructor(cardType,product,selected) //cardType fournit l'URL à aller chercher et product correspond à l'index de l'objet à aller cherher. Selected est un booléen, false quand affichage liste et true quand une carte est sélecionnéé
    {
                    {
                                //création des variables fetch
                                const pictureCardUrl = product.imageUrl;
                                const cardTitleContent = document.createTextNode(product.name);
                                const cardDescriptionContent = document.createTextNode(product.description);
                                const optionName = Object.keys(product)[0];
                                const optionChoices = Object.values(product)[0];
                                const idCard = product._id;
                                

                                //création du cadre de la carte
                                const containerCard = document.createElement("a");
                                productsContainer.appendChild(containerCard);
                                containerCard.classList.add("anim", "card", "col-md-3", "bg-light", "shadow", "text-decoration-none", "gx-0", "m-3", "cursor-pointer");
                                containerCard.id = idCard;
                                if(selected == false)
                                    {containerCard.href = "#productsContainer";}
                                    
                                //création image de la carte
                                const pictureCardTag = document.createElement("img");
                                containerCard.appendChild(pictureCardTag);
                                pictureCardTag.classList.add("card-img-top", "border-bottom", "border-secondary");
                                pictureCardTag.setAttribute("src", pictureCardUrl );

                                //création card-body
                                const cardBody = document.createElement("div");
                                containerCard.appendChild(cardBody);
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
                                const customOptionsContainer = document.createElement("div");
                                cardBody.appendChild(customOptionsContainer);
                                    if (selected == false)
                                    {customOptionsContainer.classList.add("d-none");}
                                    
                                
                                

                                //label
                                const cardOptionLabel = document.createElement("label");
                                customOptionsContainer.appendChild(cardOptionLabel);
                                cardOptionLabel.classList.add("d-block", "mb-3");
                                const cardOptionLabelContent = document.createTextNode(optionName + " options: ");
                                cardOptionLabel.appendChild(cardOptionLabelContent);

                                //tag liste d'options
                                const cardOptionListTag = document.createElement("select");
                                customOptionsContainer.appendChild(cardOptionListTag);

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
                                customOptionsContainer.appendChild(numberInputLabel);
                                const numberInputLabelContent = document.createTextNode("Commander:");
                                numberInputLabel.appendChild(numberInputLabelContent);
                                const numberInputBasket = document.createElement("input");
                                customOptionsContainer.appendChild(numberInputBasket);
                                numberInputLabel.classList.add("mx-3", "mb-3");
                                numberInputBasket.setAttribute("type","number");
                                numberInputBasket.setAttribute("value","1");
                                numberInputBasket.classList.add("w-25", "mx-3"); 

                                //fonctions d'affichage de la carte produit sélectionnée
                                
                                if (selected ==false)
                                    {
                                        containerCard.addEventListener('click', selectId);
                                        function selectId()
                                        {
                                            displaySelectedProduct(product); // Créer une fonction qui efface le contenu du container et affiche une nouvelle carte
                                        }

                                        function displaySelectedProduct(product)
                                        {
                                            eraseProductsContainer();
                                            new productCards(cardType,product,true);                        
                                        }
                                    }
                                const validate = document.getElementById("validate");
                                if (selected ==true) //apparition des boutons et surveillance de l'input de commande
                                    {
                                        numberInputBasket.addEventListener('change', readQuantity);
                                        this.toggleButtons()
                                        validate.addEventListener("click", putQuantityinBuffer);
                                    }

                                function readQuantity()
                                {
                                    let quantity = numberInputBasket.value;
                                }

                                function putQuantityinBuffer()
                                {
                                    let quantity = numberInputBasket.value;
                                    let bufferInCard = [idCard,quantity];
                                    addBufferToBasket(bufferInCard);
                                }
                    }
    }                        
}



function addBufferToBasket(buffer)
    {
        let basketJSON = localStorage.getItem("basketStorage");
            console.log(basketJSON);
            if (basketJSON === null)
            {
                let basket = ["rien", "rien"];
                add(basket);
            }
            
            else
            {
            let basket = JSON.parse(basketJSON);
            console.log("parsing basketJSON");
            add(basket);
            }
        
        function add(basket)
        {
            console.log("basket:", basket);
            console.log("buffer:", buffer);
            basket = Object.assign(basket, buffer); //à améliorer...
            console.log("new basket:", basket);
            localStorage.setItem ("basketStorage", JSON.stringify(basket));
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
console.log ( testObjectIsBack);

// Utiliser la technique précédente pour transmettre un objet qui contient le contenu du panier à la page panier.
// Comment l'utilisateur ajoute t-il un élément au panier? il entre un nombre dans une case, les cases mettent à jour automatiquement des variables... On utilise les ID pour relier un produit au nombre d'éléments dans le panier...
//quand on valide le panier avec l'un des deux boutons les variables sont assignées à un objet, qui est transmis à la page panier avec localstorage.


                         
