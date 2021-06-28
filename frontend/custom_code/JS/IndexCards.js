/* Lancer le serveur, depuis JWDP5:
node server
*/

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





 

 







