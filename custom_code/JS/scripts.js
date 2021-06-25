/* Lancer le serveur, depuis JWDP5:
node server
*/

// fonctions d'affichage des produits

eraseProductsContainer(); //effacer le conteneur
function eraseProductsContainer() //effacer le conteneur
 {
    productsContainer.innerHTML = " ";
    console.log("container erased");
 }

// surveiller les cartes produits, et déclencher les fonctions display en fonction de la carte clickée 
cameraProduct.addEventListener('click', displayCamera);
oakProduct.addEventListener('click', displayOak); 
teddiesProduct.addEventListener('click', displayTeddies); 
 
// les fonctions displays appellent la fonction d'affichage en passant des arguments différents. Ces arguments sont les noms des objets à afficher.

function displayTeddies()
    {displayProduct(cardTeddies);} 

function displayOak()
    {displayProduct(cardOak);} 

function displayCamera()
    {displayProduct(cardCamera);} 


 

 







