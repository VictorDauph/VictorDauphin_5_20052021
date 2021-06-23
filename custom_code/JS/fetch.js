/*
URLs API
Ours en peluche faits à la main : ​http://localhost:3000/api/teddies

Caméras vintage : ​http://localhost:3000/api/cameras

Meubles en chêne : ​http://localhost:3000/api/furniture
*/


// On affiche les images des cartes principales de la page d'accueil.

fetch('http://localhost:3000/api/cameras')
    .then(res => res.json()) // on parse la réponse de la requête en json
    //.then(data => console.log(data)) //on affiche le résultat du parsing (array Json) dans la console
    .then(data => mainCameraImg.src =  data[0].imageUrl) // on extrait l'image de l'objet 0 de l'array et on l'envoie à l'emplacement de la carte

fetch('http://localhost:3000/api/furniture')
    .then(res => res.json()) // on parse la réponse de la requête en json
    //.then(data => console.log(data)) //on affiche le résultat du parsing (array Json) dans la console
    .then(data => mainOakImg.src =  data[1].imageUrl) // on extrait l'image de l'objet 0 de l'array et on l'envoie à l'emplacement de la carte

fetch('http://localhost:3000/api/teddies')
    .then(res => res.json()) // on parse la réponse de la requête en json
    //.then(data => console.log(data)) //on affiche le résultat du parsing (array Json) dans la console
    .then(data => mainTeddiesImg.src =  data[0].imageUrl) // on extrait l'image de l'objet 0 de l'array et on l'envoie à l'emplacement de la carte

// On récupère les données des appareils photos
//il faut apprendre promise.all()
/*
class cameraCards
{   
        
        constructor(img)
        {
            fetch('http://localhost:3000/api/cameras')
                .then(res => res.json())
                .then(data => mainCameraImg.src =  data[0].imageUrl
            
                    this.id= "cardcamera";
                    this.content=    `  <a href="./custom_code/pages_HTML/product.html" class=" anim card col-md-3 bg-light shadow text-decoration-none gx-0 m-3">
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
                                    </a>`;
        }
}
*/


