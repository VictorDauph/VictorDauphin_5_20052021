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

// Fonction FecthCard pour aller fetcher les données en foncions de la carte cliquée

/*
function FetchCards(card)
{
    function()
    {
        if (card==cardCamera)
            {fetch('http://localhost:3000/api/cameras')}
        else if (card==cardOak)
            {fetch('http://localhost:3000/api/furniture')}
        else (card==cardTeddies)
            {fetch('http://localhost:3000/api/teddies')}
    }
    .then(res => res.json()) // on parse la réponse de la requête en json
    .then(data => 
        {
        const pictureCardUrl = data[0].imageUrl;
        const cardTitleContent = document.createTextNode(data[0].name);
        const cardDescriptionContent = document.createTextNode(data[0].description);
        }

}
*/
