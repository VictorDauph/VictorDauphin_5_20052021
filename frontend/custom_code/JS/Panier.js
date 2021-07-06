//stockage des URLS à fetch dans un array
const URLs = ["http://localhost:3000/api/teddies","http://localhost:3000/api/cameras","http://localhost:3000/api/furniture"];

// Chargement basketStorage
const basket = JSON.parse(localStorage.getItem("basketStorage"));
console.log("basket",basket);

//emplacement basketContainer: table de rendu
const basketContainer = document.getElementById("basketContainer");

//initialisation prix Total, l'array sert à stocker les valeurs intérmédiaire pour calcul avec reducer
let totalArray= [];


 function fetchProductsdata(URLs)
 {
   initBasketContainer()
   URLs.forEach(URL =>
      {
         console.log("fetched",URL)
         fetch(URL)
         .then(res => res.json())
         .then(fetchedData =>
            {
               basket.forEach( basketElement =>
               {
                  fetchedData.forEach( fetchedElement =>{
                  const fetchedProductId = fetchedElement._id
                  const fetchedProductName = fetchedElement.name
                  const fetchedProductPrice = parseInt(fetchedElement.price,10);
                  const basketElementId = basketElement[0];
                  const basketElementQuantity = parseInt(basketElement[1],10);
                  
                  const recherche = basketElementId.includes(fetchedProductId);
                  //console.log(fetchedData[0]._id, basketElement[0], recherche );
                  if (recherche == true)
                     {
                        console.log(recherche);
                        console.log("element", basketElement);
                        console.log("name", fetchedProductName);
                        console.log("price", fetchedProductPrice);
                        new BasketLine(fetchedProductName,fetchedProductPrice,basketElementQuantity); 
                        
                     } 
                  })})
            }
      )
      });   
 }
 
class BasketLine
{
   constructor (name,price,quantity)
   {
      
      let formatedPrice= (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price/100));
      const row = document.createElement("tr");
      basketContainer.appendChild(row);
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
   }
}

//Création bouton valider
const validateContainer = document.getElementById("validate");
const validate = document.createElement("button");
const validateContent = document.createTextNode("Valider");
validate.appendChild(validateContent);
validateContainer.appendChild(validate);
validate.classList.add("btn-light", "col-12", "text-primary", "btn-sm");
validate.addEventListener("click", animatebutton);

function animatebutton()
   {
      validate.classList.add("validation-anim");
      setTimeout(() => { validate.classList.remove("validation-anim")}, 1000);
   }



 fetchProductsdata(URLs);

 function initBasketContainer() //effacer le conteneur et construire le cadre du tableau
 {
    basketContainer.innerHTML = " ";
    console.log("container initialized");
 }

function updateTotal(quantity,price) //ça marche pas et j'ai mal à la tête.... Il considère qu'il y'a deux totaux différents. La méthode de calcul n'est pas bonne. Faut faire un array et calculer à partir de lui?
{
   const productTotal = quantity*price;
   console.log("price", price)
   console.log("producttotal", typeof productTotal);
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