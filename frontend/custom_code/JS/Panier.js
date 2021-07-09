//scripts tableau panier
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
   constructor (name,price,quantity,ID,cardType)
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
         let bufferInCard = [ID,quantity,cardType];
         console.log("bufferInCard", bufferInCard);
         callBasket(bufferInCard);
      }
   }
}

//Fonction qui va chercher les données necéssaires pour créer les lignes du tableau et calculer le total
 function fetchProductsdata()
{
   // Chargement basketStorage
   const basket = JSON.parse(localStorage.getItem("basketStorage"));
   console.log("basket",basket);    
   basket.forEach( basketElement =>
   {
      const cardType = basketElement[2]
      console.log("fetched",cardType)
      fetch(cardType)
      .then(res => res.json())
      .then(fetchedData =>{
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
            new BasketLine(fetchedProductName,fetchedProductPrice,basketElementQuantity,fetchedProductId,cardType); //création d'une ligne
         } 
      })})
            
   })
         
}
 
// fonctions de modification du buffer et du panier en local storage
//cette fonction sert à convertir basketstorage en JSON et appelle add.
function callBasket(buffer)
    {
        let basketJSON = localStorage.getItem("basketStorageTemp");
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
            // checkBasketQuantity(basket);
            checkBufferId(basket,buffer)
            }
    }

//Cette Fonction vérifie les id et supprime les doublons
function checkBufferId(basket,buffer)
    {
       
       console.log("buffer to check:",buffer);
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

    //Cette fonction ajoute le buffer au basket 
function pushbuffertoBasket(basket,buffer)
    {
        let push = basket.push(buffer);
        console.log("basket pushed",basket);
        checkBasketQuantity (basket);
    }

//fonction qui vérifie qui supprime les valeurs négatives et nulles  dans le panier et l'envoie dans basketStorageTemp
function checkBasketQuantity(basket) 
{
    console.log("array basket to check:",basket);
    basket.forEach(element => 
    {
        if (element[1] < 1) 
        {
            let index = basket.indexOf(element)
         let suppressed = basket.splice(index,1);
         console.log("suppressed <1", suppressed);
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
   let productArraysinObject = {teddies:[], cameras:[],furniture:[]};
   initBasketContainer()
   let basketStorageTempJSON = localStorage.getItem("basketStorage")
   let basketStorageTemp = JSON.parse(basketStorageTempJSON);
   collectProductArray(basketStorageTemp,productArraysinObject); //Cette fonction sert à construire les products Arrays à envoyer au serveur backend
   localStorage.setItem("basketStorageTemp", basketStorageTempJSON )
  fetchProductsdata();
}

validate.addEventListener("click",refreshPage);

function refreshPage()
{
  let basketStorageTemp = localStorage.getItem("basketStorageTemp");
  localStorage.setItem("basketStorage", basketStorageTemp);
  totalArray =[];
   loadPage();
}





//scripts formulaire et envoie données
// récupérations données produits
// objet de stockage des id des produits triés par type
let productArraysinObjectSorted = {};
//Récupération données produits pour envoi au backend.
function collectProductArray(basketStorageTemp,productArraysinObject)
{
   basketStorageTemp.forEach( product => {
      const productID = product[0]
      const productType = product[2]
      console.log ("product array ID",productID)
      console.log ("product array Type",productType);
      productArraysinObjectSorted = sortingProducts(productID,productType,productArraysinObject); //tri des id par types de produits.
      console.log("product Array Stock Sorted", productArraysinObjectSorted);
   })
   console.log ("product array",basketStorageTemp);
}

//Trie les produits dans 3 arrays stockés dans l'objet productArraysinObject
function sortingProducts(productID,productType,productArraysinObject)
{
   console.log ("product Array Stock", productArraysinObject)
   if (productType == "http://localhost:3000/api/teddies")
      {
         productArraysinObject.teddies.push(productID)
         console.log ("teddiepush product Array Stock", productArraysinObject)
      }
   else if (productType == "http://localhost:3000/api/cameras")
   {
      productArraysinObject.cameras.push(productID)
      console.log ("camerapush product Array Stock", productArraysinObject)
   }
   else if (productType == "http://localhost:3000/api/furniture")
   {
      productArraysinObject.furniture.push(productID)
      console.log ("furniturepush product Array Stock", productArraysinObject)
   }
   else {console.log("unknown type")};
   return productArraysinObject
}

// Récupération constantes formulaire
let formDatas = document.getElementsByClassName("form-control");
console.log("formdatas",formDatas[4].value);
const passOrder = document.getElementById("passOrder");
passOrder.addEventListener("click",post);

let contact ={
   firstName: "string", 
   lastName: "string", 
   address: "string",
   city: "string",
   email: "string@string.com"
   }
   let products = ["5be1ed3f1c9d44000030b061","5be9c4c71c9d440000a730e9"]; //erreur 500 si le serveur ne reconnaît pas l'id.
   
   let order =
   {
      contact : contact,
      products: products
   }
   
   
let requestBody= JSON.stringify(order);
let requestHeaders = {"Content-Type":"application/json"};

const init =
{
   method: "POST",
   body: requestBody,
   headers : requestHeaders,
};


function post()
{
   collectFormDatas();
   localStorage.setItem("c'est good?","bof")
   console.log(requestBody)
   fetch("http://localhost:3000/api/cameras/order",init)
   .then(res => res.json())
      .then(fetchedData => {storageFetechedDatas(fetchedData)
      //document.location.href="confirmation.html" //la redirection est JS parcequ'il y'a des tâches à effectuer avant de changer de page.)
         }) 
      .catch(error => {console.log("POST error", error)
                     localStorage.setItem("c'est good?","non")})
            //possible d'envoyer tous les id dans le même array puis de récupérer les données avec une boucle forEach"
}

function collectFormDatas()
{
      let formDatas = document.getElementsByClassName("form-control");
      console.log("formdatas",formDatas);
        let formInputs = Object.values(formDatas);
         formInputs.forEach( input => {
            console.log("formValue",input.id, input.value);
            let Validation = checkValue(input)
         })
        
}

function checkValue(input)
{
   let inputValue= input.value //chaque inputValue représente la valeur rentrée dans un input du formulaire
   let inputId = input.id
    if (typeof(inputValue)==="string" && inputValue !== "") // il faut utiliser des regex pour voir si certains inputs contiennent des nombres (l'adresse et l'email peuvent en contenir mais pas les autres) et si l'email est bien un email.
      {
         console.log( inputId, "OK")
      }
   else
   {
      console.log( inputId, "not OK")
   }
}

function storageFetechedDatas(fetchedData)
{  
console.log("post fetched",fetchedData.products)
         fetchedData.products.forEach(element =>
            console.log("post fetched name",element.name ))
            localStorage.setItem("c'est good?","oui")
            
}



loadPage();