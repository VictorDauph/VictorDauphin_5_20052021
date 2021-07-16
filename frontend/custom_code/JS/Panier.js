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
   localStorage.setItem("totalPrice",total)
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
   return productArraysinObjectSorted
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
orderContainer.addEventListener("mousein",StartGatheringdatas);
passOrder.addEventListener("focus",StartGatheringdatas);

function relocate()
{
   let contactvalidated = JSON.parse(localStorage.getItem("contact"))
   console.log("contact validated",contactvalidated)
   if (contactvalidated !== undefined)
   {
      document.location.href="confirmation.html" //la relocation dit être dans promise.all pour s'activer après la collecte des données.... Activer l'enregistrement des données à la fin du formulaire et changer de page sur le bouton commander
   }
}

let contact ={};

function resetContact()
{
   contact= {
   firstName: false,
   lastName: false, 
   address: false,
   city: false,
   email: false
   }
}

// fonction de pilotage afin de poster les données
function StartGatheringdatas()
{
   //récupération des données formulaires
   let formatedContact = collectFormDatas();
   console.log("formated Contact", formatedContact); //utiliser formated contact pour la méthode post
   
   function toggleRelocate(formatedContact)
   {
      if (formatedContact !== undefined) //si le contact est validé, le bouton commander permet de passer àa la page suivante.
         {
            console.log("relocate allowed")
            passOrder.addEventListener("click",relocate)
         }
      else if (formatedContact == undefined)
         {
            console.log("relocate not allowed")
            passOrder.removeEventListener("click",relocate)
         }
   }

   //récupération des données produits
   let productArraysinObject = {teddies:[], cameras:[],furniture:[]};
   let basketStorageTempJSON = localStorage.getItem("basketStorage")
   let basketStorageTemp = JSON.parse(basketStorageTempJSON);
   productArraysinObject = collectProductArray(basketStorageTemp,productArraysinObject); //Cette fonction sert à construire les products Arrays à envoyer au serveur backend
   console.log("productArraysinObject",productArraysinObject)
   localStorage.setItem("basketStorageTemp", basketStorageTempJSON )
   let typestopost = Object.keys(productArraysinObject);
   console.log("types to check",typestopost)
   postLoop(typestopost, productArraysinObject,formatedContact)
   console.log("posted")

   toggleRelocate(formatedContact)
   
}


function postLoop(typestopost, productArraysinObject,formatedContact)
{
   
   let types=[];
  let Map = [];
  let MapProm=[];
  let MapOfTypes=[Map,types];
  

  let typesMap = typestopost.map( typetopost => 
   postConfig(typetopost, productArraysinObject,formatedContact))
   console.log("typesMap",typesMap)

   typesMap.forEach( element =>
   {
   if (element !== false)
   {
      Map.push(element.postPromise)
      types.push(element.type)
   }

   })
   console.log("Mapoftypes",MapOfTypes)
   let ConfirmedProductArray =[]

   PromiseAll()
   function PromiseAll()
   {
      Promise.all(Map).then(promises => {
      console.log("Map Promises",promises)
      
      promises.forEach(promise =>{
         let postPromise = promise
         console.log("PostPromise", postPromise)
      processPromises(promise.json(),types)
      })}).catch(err => console.log(err))
   

      function processPromises(prom,types)
      {
         prom.then(prom =>{
            
            MapProm.push(prom);
            console.log("Mapprom",MapProm,types)
            localStorage.setItem("contact",JSON.stringify(prom.contact))
            let promIndex = MapProm.indexOf(prom)
            let promType = types[promIndex]
            let promrow = [promType,prom.products]
            console.log("promrow",promrow)
            ConfirmedProductArray.push(promrow)
            console.log("productArray",ConfirmedProductArray)
            StorageforConfirmation(ConfirmedProductArray)

         })
      }
      
   }
   function StorageforConfirmation(ConfirmedProductArray)
   {
      localStorage.setItem("productArray",JSON.stringify(ConfirmedProductArray))
   }
}
                  

  
/*
   Promise.all(typesMap).then(promises => JSON.parse(promises[0]))
   .then (res => console.log("resProm",res) )
*/
     
     //passOrder.addEventListener("click",relocate)//la redirection est JS parcequ'il y'a des tâches à effectuer avant de changer de page.) 




   //fonction qui envoie les données en fonction du type d'objet

   function postConfig(type,productsObject,contact)
   {
      let postPromise
      console.log("post type", type )
      let URLS= 
      {  
         teddies:"http://localhost:3000/api/teddies/order",
         cameras:"http://localhost:3000/api/cameras/order",
         furniture:"http://localhost:3000/api/furniture/order"
      }
      let products = productsObject[type];//prendre dans l'objet products l'array qui correspond au type à envoyer.
      console.log("contact to post", contact)

      if (products.length !== 0) //vérifier que l'array n'est pas vide pour ne pas envoyer des posts sans produits.
      {
         console.log("products to post", products)
         let requestBodyToStringify =
         {
            contact:contact,
            products: products
         }
         console.log("requestBodyToStringify",requestBodyToStringify);
         let requestBody = JSON.stringify(requestBodyToStringify);
         console.log ("request body",requestBody)
         let requestHeaders = {"Content-Type":"application/json"};
         const init =
         {
         method: "POST",
         body: requestBody,
         headers : requestHeaders,
         };


         console.log("Post request Body",requestBody)
         let URLtopost = URLS[type];
         console.log("URL type", URLtopost);
            
         

            postPromise = post(init,URLtopost,type)
            console.log("postPromise", postPromise)
            return {"postPromise":postPromise,"type":type}
      }
      else{ return false}
      
   
      
   }


function post(init,URLtopost,type)
{
   let postPromise = fetch(URLtopost,init)
   return postPromise

}

//initialisation variable d'annulation du processus de traitement des données formulaire
let inputProcessAbort = false

//Cette fonction collecte les données du formulaire et annule le traitement si une donnée a été signalée false.
function collectFormDatas()
{
      let formDatas = document.getElementsByClassName("form-control");
      console.log("formdatas",formDatas);
        let formInputs = Object.values(formDatas);
        inputProcessAbort = false
        resetContact()
         formInputs.forEach( input => {
            if (inputProcessAbort ==false)
               {
                  console.log("formValue",input.id, input.value);
                  //process inputs stock les données du formulaire dans l'objet contact ou supprime le contenu de l'objet contact si une donée est fausse.
                  let inputValidated = checkValue(input)
                  console.log("inputValidated",inputValidated)
                  processinputs(input,inputValidated);

                  
               }
            else
            {
               return contact
            }
      })
      return contact
}

function processinputs(input,inputValidated)
{
   if (inputValidated == false)
      {
         input.classList.add("border-danger");
         //setTimeout(() => {input.classList.remove("border-danger");}, 5000);
         inputProcessAbort = true;
         contact = resetContact()
         console.log("contact deleted", contact)
      }
   else
      {
         contact[inputValidated.id] = inputValidated.value;
         console.log("input contact object getting filled", contact)
         input.classList.remove("border-danger")
      }
}

function checkValue(input)
{
   let inputValue= input.value; //chaque inputValue représente la valeur rentrée dans un input du formulaire
   let inputId = input.id;
   let inputTypes ={onlyText:["firstName","lastName","city"], address:["address"], email: ["email"] }
   onlyTextExp = new RegExp("^[A-zÀ-ú/-\\s]+$");
   emailEXP= new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
   addressEXP = new RegExp("^[A-zÀ-ú0-9,/-\\s]+$")
   console.log ("inputTypes.onlyText",inputTypes.onlyText);

//regex pour les champs de texte seulement
   inputTypes.onlyText.forEach( inputType => {
      if (inputId == inputType) 
         {
            if (typeof(inputValue)==="string" && inputValue !== "" && onlyTextExp.test(inputValue)) // il faut utiliser des regex pour voir si certains inputs contiennent des nombres (l'adresse et l'email peuvent en contenir mais pas les autres) et si l'email est bien un email.
               {
                  console.log( "inputId:", inputId, "OK")
               }
            else
               {
                  console.log("inputId:", inputId, "not OK")
                  input = false;
               }
         }})

//regex pour les champs d'e-mail seulement
   inputTypes.email.forEach( inputType => {
      if (inputId == inputType) 
         {
            if (typeof(inputValue)==="string" && inputValue !== ""  && emailEXP.test(inputValue) ) // il faut utiliser des regex pour voir si certains inputs contiennent des nombres (l'adresse et l'email peuvent en contenir mais pas les autres) et si l'email est bien un email.
               {
                  console.log( "inputId:", inputId, "OK")
               }
            else
               {
                  console.log("inputId:", inputId, "not OK")
                  input = false;
               }
         }})

//regex pour les champs d'adresse
inputTypes.address.forEach( inputType => {
   if (inputId == inputType) 
      {
         if (typeof(inputValue)==="string" && inputValue !== ""  && addressEXP.test(inputValue) ) // il faut utiliser des regex pour voir si certains inputs contiennent des nombres (l'adresse et l'email peuvent en contenir mais pas les autres) et si l'email est bien un email.
            {
               console.log( "inputId:", inputId, "OK")
            }
         else
            {
               console.log("inputId:", inputId, "not OK")
               input = false;
            }
      }})

return input

}





loadPage();