//variables affichage des produits. Elements du DOM
const productsContainer= document.getElementById("productsContainer");
const mainCameraImg = document.getElementById("mainCameraImg");
const mainOakImg = document.getElementById("mainOakImg");
const mainTeddiesImg = document.getElementById("mainTeddiesImg");

//localisation des 3 cartes principale d'index.html
const cameraProduct = document.getElementById("cameraProduct");
const oakProduct = document.getElementById("oakProduct");
const teddiesProduct = document.getElementById("teddiesProduct");

//variables affichage des produits. Cartes à afficher

const cardCamera = 
{
    id: "cardcamera",
    url: "http://localhost:3000/api/cameras"
};

const cardOak = 
{
    id:"cardOak",
    url: "http://localhost:3000/api/furniture"
};

const cardTeddies = 
{
    id:"cardTeddies",
    url: "http://localhost:3000/api/teddies"
};
