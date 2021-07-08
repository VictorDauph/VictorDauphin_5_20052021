window.alert("est-ce que le site fonctionne sans live server?");
//Fonctions de récupération et d'affichage des images
//Récupérer emplacements d'images cartes index dans le DOM

const mainCameraImg = document.getElementById("mainCameraImg");
const mainOakImg = document.getElementById("mainOakImg");
const mainTeddiesImg = document.getElementById("mainTeddiesImg");

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


//Fonction de pilotage de la page products
//Récupération emplacement cartes
const cameraProduct = document.getElementById("cameraProduct");
const oakProduct = document.getElementById("oakProduct");
const teddiesProduct = document.getElementById("teddiesProduct");

// surveiller les cartes produits, et déclencher la fonction local storage en fonction de la carte clickée 
cameraProduct.addEventListener('click', StorageCamera);
oakProduct.addEventListener('click', StorageOak); 
teddiesProduct.addEventListener('click', StorageTeddies); 

//Fonctions intermédiaires d'appel de localStorage(argument)
function StorageCamera()
    {
        Storage("http://localhost:3000/api/cameras");
    }

function StorageOak()
    {
        Storage("http://localhost:3000/api/furniture");
    }

function StorageTeddies()
    {
        Storage("http://localhost:3000/api/teddies");
    }


//Fonction localStorage, variable sotckée sur le navigateur à utiliser par le script product

function Storage(urlToFetch)
    {
        localStorage.setItem("urlToFetch",urlToFetch);
        console.log("storing " + urlToFetch);
    }


 

 







