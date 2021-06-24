// variable container productsContainer
// variable carte photo 

function displayProduct(card) 
    {
        eraseProductsContainer()
        fetch('http://localhost:3000/api/cameras')
        .then(res => res.json()) // on parse la réponse de la requête en json
        //.then(data => console.log(data)) //on affiche le résultat du parsing (array Json) dans la console
        .then(data => console.log(  data[0].imageUrl)) 
                    
                        //console.log(data[0].imageURL) //l'URL est undefined.... Pourquoi?!!! Bah OUI COUILLON C'EST imageUrl !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                
                    
                    //création des variables
                    
                    /*
                    const pictureCardTag = document.createElement("img");
                    console.log(data[0].imageURL);
                    const linkContainerCard = document.createElement("a");
                    
                    
                    //création du cadre de la carte
                    productsContainer.appendChild(linkContainerCard);
                    linkContainerCard.classList.add("anim", "card", "col-md-3", "bg-light", "shadow", "text-decoration-none", "gx-0", "m-3");
                    linkContainerCard.setAttribute("href","./custom_code/pages_HTML/product.html")
                        
                    //création image de la carte
                    linkContainerCard.appendChild(pictureCardTag);
                    pictureCardTag.setAttribute("src", data[0].imageURL);
                    */
                
        
        
        
            /*const newdivexample = document.createElement("a");
        const newcontent = document.createTextNode("1");
        newdivexample.appendChild(newcontent);
        productsContainer.appendChild(newdivexample);
        newdivexample.classList.add("anim", "card", "col-md-3", "bg-light", "shadow", "text-decoration-none", "gx-0", "m-3");
        newdivexample2.classList.add("anim", "card", "col-md-3", "bg-light", "shadow", "text-decoration-none", "gx-0", "m-3");
        productsContainer.innerHTML = card.content;
        console.log("container", card.id); */
    }

