//stockage des URLS à fetch dans un array
const URLs = ["http://localhost:3000/api/teddies","http://localhost:3000/api/cameras","http://localhost:3000/api/furniture"];



//emplacement basketContainer: table de rendu
const basketContainer = document.getElementById("basketContainer");

//initialisation prix Total, l'array sert à stocker les valeurs intérmédiaire pour calcul avec reducer
let totalArray= [];

//Création bouton valider
const validateContainer = document.getElementById("validate");
const validate = document.createElement("button");
const validateContent = document.createTextNode("Valider");
validate.appendChild(validateContent);
validateContainer.appendChild(validate);
validate.classList.add("btn-light", "col-12", "text-primary", "btn-sm");
validate.addEventListener("click", animatebutton);

//classe qui permet de créer une ligne du panier à partir des données nécessaires
class BasketLine
{
   constructor (name,price,quantity,ID)
   {
      
      let formatedPrice= (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price/100));
      const row = document.createElement("tr");
      basketContainer.appendChild(row);
      row.classList.add("anim");
      const col1 = document.createElement("td");
      row.appendChild(col1);
      const col1Content = document.createTextNode(quantity);
      col1.appendChild(col1Content);
      const col2 = document.createElement("td");
      row.appendChild(col2);
      const col2Content = document.createTextNode(name);
      col2.appendChild(col2Content);
      const col3 = document.createElement("td");
      row.appendChild(col3);
      const col3Content = document.createTextNode(formatedPrice);
      col3.appendChild(col3Content);
      updateTotal(quantity,price);

      
      //input de modification
      const col4 = document.createElement("td");
      row.appendChild(col4);
      col4.classList.add("w-25");
      const numberInputModif = document.createElement("input");
      col4.appendChild(numberInputModif);
      numberInputModif.setAttribute("type","number");
      numberInputModif.setAttribute("value",quantity);
      numberInputModif.classList.add("w-75");

      //fonctions de modification
      numberInputModif.addEventListener("change", putQuantityinBuffer);
      function putQuantityinBuffer()
         {
            let quantity = numberInputModif.value;
            let bufferInCard = [[ID,quantity]];
            console.log("bufferInCard", bufferInCard);
            addBufferToBasket(bufferInCard)
         }
   }
}

//Fonction qui va chercher les données necéssaires pour créer les lignes du tableau et calculer le total
 function fetchProductsdata(URLs)
 {
   // Chargement basketStorage
   const basket = JSON.parse(localStorage.getItem("basketStorage"));
   console.log("basket",basket);
   URLs.forEach(URL =>
      {
         //console.log("fetched",URL)
         fetch(URL)
         .then(res => res.json())
         .then(fetchedData =>
            {
               basket.forEach( basketElement =>
               {
                  fetchedData.forEach( fetchedElement =>{
                  // création des variables à partir des données fetchée et du panier qui vient du local storage
                  const fetchedProductId = fetchedElement._id
                  const fetchedProductName = fetchedElement.name
                  const fetchedProductPrice = parseInt(fetchedElement.price,10);
                  const basketElementId = basketElement[0];
                  const basketElementQuantity = parseInt(basketElement[1],10);
                  const recherche = basketElementId.includes(fetchedProductId);
                  //console.log(fetchedData[0]._id, basketElement[0], recherche );
                  if (recherche == true)
                     {
                        //console.log(recherche);
                        //console.log("element", basketElement);
                        //console.log("name", fetchedProductName);
                        //console.log("price", fetchedProductPrice);
                        new BasketLine(fetchedProductName,fetchedProductPrice,basketElementQuantity,fetchedProductId); //création d'une ligne
                     } 
                  })})
            }
      )
      });   
}
 
// fonctions de modification du buffer et du panier en local storage
//cette fonction sert à convertir basketstorage en JSON et appelle add.
function addBufferToBasket(buffer)
    {
        let basketJSON = localStorage.getItem("basketStorageTemp");
            console.log(basketJSON);
            if (basketJSON === null)
            {
                let basket = [["rien", 0, "www.rien.com"]];
                console.log("creating empty basket");
                add(basket);
            }
            
            else
            { 
            let basket = JSON.parse(basketJSON);
            console.log("parsing basketJSON");
            add(basket);
            }

//Cette fonction sert à transformer les arrays basket et buffer en object pour pouvoir appliquer la methode Object.assign, puis les reconvertie en array appelle la fonction de vérification.
        function add(basket)
        {
            console.log("basket:", basket); 
            console.log("buffer:", buffer); 
            //basket et buffer sont des array, on les transforme en objet pour pouvoir les manipuler avec Object.assign
            let basketObject = Object.fromEntries(basket);
            let bufferObject = Object.fromEntries(buffer);
            basketObject = Object.assign(basketObject,bufferObject);
            console.log("basketObject:", basketObject);
            basket = Object.entries(basketObject); //on reconvertit basket en array pour manipulations utlérieures
            console.log("new basket:", basket);
            checkBasketValues(basket);
        }
    }

//fonction qui vérifie qui supprime les valeurs négatives et nulles dans le panier.
function checkBasketValues(basket) 
{
    console.log("array basket to check:",basket);
    basket.forEach(element => 
    {
        if (element[1] < 1) 
        {
            let index = basket.indexOf(element)
         console.log("found it! index:", index , "element:", element);
         let suppressed = basket.splice(index,1);
         console.log("suppressed!", suppressed);
        }
    });
    console.log("array basket checked:",basket);
    localStorage.setItem ("basketStorageTemp", JSON.stringify(basket));
}

//animation du bouton valider au click
function animatebutton()
   {
      validate.classList.add("validation-anim");
      setTimeout(() => { validate.classList.remove("validation-anim")}, 1000);
   }

 function initBasketContainer() //effacer le conteneur
 {
    basketContainer.innerHTML = " ";
    console.log("container initialized");
 }

function updateTotal(quantity,price) //Calcul u ntotal intermédiaire pour la ligne, l'ajoutes à l'array total puis réduit l'array en faisant la somme de ses lignes
{
   const productTotal = quantity*price;
   console.log("price", price)
   //console.log("producttotal", typeof productTotal);
   totalArray.push(productTotal),
   console.log("totalarray:", totalArray);
   let total = totalArray.reduce(sum,0);
   const totalDisplay = document.getElementById("total");
   const formatedTotal = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(total/100);
   totalDisplay.innerHTML = `${formatedTotal}`;
}

//fonction de réduction pour additionner les totaux intermédiaires dans totalArray et en faire un nombre.
function sum (total, num)
{
   return total + num;
}

//fonction d'initialisation de la page
function loadPage()
{
   initBasketContainer()
   localStorage.setItem("basketStorageTemp", localStorage.getItem("basketStorage"))
  fetchProductsdata(URLs);
}

validate.addEventListener("click",refreshPage);

function refreshPage()
{
  let basketStorageTemp = localStorage.getItem("basketStorageTemp");
  localStorage.setItem("basketStorage", basketStorageTemp);
  totalArray =[];
   loadPage();
}

loadPage();

