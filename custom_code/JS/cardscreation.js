// variable container productsContainer
// variable carte photo 

function displayProduct(card) 
    {
        eraseProductsContainer()
        fetch('http://localhost:3000/api/cameras')
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
                    
                
                    })}
        
        


