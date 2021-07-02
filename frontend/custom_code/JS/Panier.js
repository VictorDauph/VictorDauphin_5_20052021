//eraseBasketContainer() //effacer le conteneur
function eraseBasketContainer() //effacer le conteneur
 {
    productsContainer.innerHTML = " ";
    console.log("container erased");
 }
 function fetchProductsdata()
 {
     fetch() //comment faire pour récupérer toutes les données nécessaires sur les 3 apis en même temps?
 }

 //function createBasketContainer()

 function getBasketStorage()
 {
    let basket = JSON.parse(localStorage.getItem("basketStorage"));
    //const testObjectIsBack = JSON.parse(localStorage.getItem("testObjectStr"));
    console.log(basket);
    fetchProductsdata()
 }


 getBasketStorage();