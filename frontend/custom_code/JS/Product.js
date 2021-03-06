//Récupérer le container d'affichage des produits.
const productsContainer= document.getElementById("productsContainer");

//Emplacement dynamique du titre
const titreProduit =  document.getElementById("titreProduit");

// génération de cartes produits page principale
//eraseProductsContainer(); //effacer le conteneur
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
                console.log("card: ",item);
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
                                const price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.price/100);

                                //création du cadre de la carte
                                const containerCard = document.createElement("a");
                                productsContainer.appendChild(containerCard);
                                containerCard.classList.add("anim", "card", "col-lg-3", "bg-light", "shadow", "text-decoration-none", "gx-0", "m-3", "cursor-pointer");
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

                                //création prix carte
                                const cardPriceLabel = document.createElement("p");
                                cardBody.appendChild(cardPriceLabel);
                                const cardpriceContent = document.createTextNode(price);
                                cardPriceLabel.appendChild(cardpriceContent);

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
                                    
                                //options container
                                const optionsSelectContainer = document.createElement("div");
                                customOptionsContainer.appendChild(optionsSelectContainer);
                                
                                //label
                                const cardOptionLabel = document.createElement("label");
                                optionsSelectContainer.appendChild(cardOptionLabel);
                                cardOptionLabel.classList.add("mb-3");
                                const cardOptionLabelContent = document.createTextNode(optionName + " options: ");
                                cardOptionLabel.appendChild(cardOptionLabelContent);

                                //tag liste d'options
                                const cardOptionListTag = document.createElement("select");
                                cardOptionListTag.classList.add("mb-3","mx-2");
                                optionsSelectContainer.appendChild(cardOptionListTag);

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
                                //Order container
                                const orderContainer = document.createElement("div");
                                customOptionsContainer.appendChild(orderContainer);

                                //création input nombre à ajouter au panier
                                const numberInputLabel = document.createElement("label");
                                orderContainer.appendChild(numberInputLabel);
                                const numberInputLabelContent = document.createTextNode("Commander:");
                                numberInputLabel.appendChild(numberInputLabelContent);
                                const numberInputBasket = document.createElement("input");
                                orderContainer.appendChild(numberInputBasket);
                                numberInputLabel.classList.add( "mb-3");
                                numberInputBasket.setAttribute("type","number");
                                numberInputBasket.setAttribute("value","1");
                                numberInputBasket.classList.add("w-25","mx-3"); 

                                //Création zone bouton
                                const cardButtons = document.createElement("div")
                                customOptionsContainer.appendChild(cardButtons)
                                cardButtons.classList.add("d-flex")

                                //Création bouton valider
                                const validate = document.createElement("button");
                                const validateContent = document.createTextNode("Valider");
                                validate.appendChild(validateContent);
                                cardButtons.appendChild(validate);
                                validate.classList.add("btn-primary", "col-5", "text-light", "btn-lg","mx-3");

                                //Création bouton supprimer
                                const deleteProduct = document.createElement("button");
                                const deleteContent = document.createTextNode("Supprimer");
                                deleteProduct.appendChild(deleteContent);
                                cardButtons.appendChild(deleteProduct);
                                deleteProduct.classList.add("btn-primary", "col-5", "text-light", "btn-lg","mx-3");

                                //création zone validation textuelle
                                const validationArea = document.createElement("p")
                                customOptionsContainer.appendChild(validationArea)

                                //texte validation
                                const validationAreaContent = document.createTextNode("Le produit a bien été ajouté au panier")
                                validationArea.appendChild(validationAreaContent)
                                validationArea.classList.add("text-success", "d-none","mt-5")

                                //création zone suppression textuelle
                                const deleteArea = document.createElement("p")
                                customOptionsContainer.appendChild(deleteArea)

                                //texte suppression
                                const deleteAreaContent = document.createTextNode("Le produit a bien été supprimé du panier")
                                deleteArea.appendChild(deleteAreaContent)
                                deleteArea.classList.add("text-danger","d-none","mt-5")

                                //texte suppression

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
                                
                                if (selected ==true) //surveillance bouton de validation et supprimer
                                    {
                                        validate.addEventListener("click", putQuantityinBuffer);
                                        validate.addEventListener("click", displayValidation);
                                        this.toggleButtons();
                                        deleteProduct.addEventListener("click", deleteFromBuffer);
                                        deleteProduct.addEventListener("click", displayDelete);
                                    }
                                function displayValidation()
                                {
                                    validate.classList.add("validation-anim");
                                    setTimeout(() => { validate.classList.remove("validation-anim")}, 3000);
                                    validationArea.classList.remove("d-none"); // nope ça marche po...
                                    setTimeout(() => { validationArea.classList.add("d-none")}, 3000);
                                }

                                function displayDelete()
                                {
                                    deleteProduct.classList.add("delete-anim");
                                    setTimeout(() => { deleteProduct.classList.remove("delete-anim")}, 3000);
                                    deleteArea.classList.remove("d-none");
                                    setTimeout(() => { deleteArea.classList.add("d-none")}, 3000);
                                }

                                function deleteFromBuffer()
                                {
                                    let bufferInCard = [idCard,0,cardType];
                                    console.log("bufferInCard", bufferInCard);
                                    callBasket(bufferInCard);
                                }

                                function putQuantityinBuffer()
                                {
                                    let quantity = numberInputBasket.value;
                                    let bufferInCard = [idCard,quantity,cardType];
                                    console.log("bufferInCard", bufferInCard);
                                    callBasket(bufferInCard);
                                }
                    }
    }                        
}

// fonctions de modification du buffer et du panier en local storage
//cette fonction sert à convertir basketstorage en JSON et appelle add.
function callBasket(buffer)
    {
        let basketJSON = localStorage.getItem("basketStorage");
            console.log(basketJSON);
            if (basketJSON === null)
            {
                let basket = [["rien", 0, "NoType"]];
                console.log("creating empty basket");
                checkBufferId(basket,buffer)
            }
            
            else
            { 
            let basket = JSON.parse(basketJSON);
            console.log("parsing basketJSON");
            checkBufferId(basket,buffer)
            }
    }

function checkBufferId(basket,buffer)
    {
        basket.forEach( basketLine => {
            let bufferId = buffer[0]
            let basketLineId =basketLine[0]
            console.log("comparing ID", bufferId, basketLineId )
            if (bufferId === basketLineId)
                {
                    let index = basket.indexOf(basketLine);
                    let suppressed = basket.splice(index,1);
                    console.log("suppressed duplicate", suppressed);
                }
        })
        pushbuffertoBasket(basket,buffer)
    } 

function pushbuffertoBasket(basket,buffer)
    {
        let push = basket.push(buffer);
        console.log("basket pushed",basket);
        checkBasketQuantity (basket);
    }

//fonction qui vérifie qui supprime les valeurs négatives et nulles  dans le panier et l'envoie dans le local storage
function checkBasketQuantity(basket) 
{
    console.log("array basket to check:",basket);
    basket.forEach(element => 
    {
        if (element[1] < 1) 
        {
            let index = basket.indexOf(element)
         console.log("found it! index:", index , "element:", element);
         let suppressed = basket.splice(index,1);
         console.log("suppressed <1", suppressed);
        }
    });
    console.log("array basket checked:",basket);
    localStorage.setItem ("basketStorage", JSON.stringify(basket));
}

//lancer la selection et l'affichage au chargement de la page.
selectDisplay() 
