//variables affichage des produits. Elements du DOM
const productsContainer= document.getElementById("productsContainer");
const mainCameraImg = document.getElementById("mainCameraImg");
const mainOakImg = document.getElementById("mainOakImg");
const mainTeddiesImg = document.getElementById("mainTeddiesImg");

//localisation des cartes
const cameraProduct = document.getElementById("cameraProduct");
const oakProduct = document.getElementById("oakProduct");
const teddiesProduct = document.getElementById("teddiesProduct");

//variables affichage des produits. Cartes à afficher

const cardcamera = 
{
id: "cardcamera",
content:    `<a href="./custom_code/pages_HTML/product.html" class=" anim card col-md-3 bg-light shadow text-decoration-none gx-0 m-3">
<img src="JWDP5/images/vcam_1.jpg" class="card-img-top border-bottom border-secondary" alt="appareil photo">
<div class="card-body">
    <h3 class="card-title text-center">Nos appareils photos</h3>
    <p class="card-text">
        Nous excellents appareils
        photos viennent de 
        Dordogne et contiennent
        des pixels argentiques.
    </p>
</div>
</a>`
};

const cardOak = 
{
    id:"cardOak",
    content: "cardOak"
};

const cardTeddies = 
{
    id:"cardTeddies",
    content: "cardTeddies"
};