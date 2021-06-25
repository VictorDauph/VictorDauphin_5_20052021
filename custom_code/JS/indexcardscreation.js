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



// fonction de génération de cartes page principale
function displayProduct(card) 
    {
        eraseProductsContainer()
        fetch(card.url)
        .then(res => res.json()) // on parse la réponse de la requête en json
        //.then(data => console.log(data)) //on affiche le résultat du parsing (array Json) dans la console
        .then(data => {
                        //création des variables fetch
                        const pictureCardUrl = data[0].imageUrl;
                        const cardTitleContent = document.createTextNode(data[0].name);
                        const cardDescriptionContent = document.createTextNode(data[0].description);
                        
                        
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
                    
                
            }) 
    }

