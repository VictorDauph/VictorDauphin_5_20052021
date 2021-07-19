//fonction de pilotage de chargement de la page.
function loadPage()
{
    //récupération des données dans le localStorage et stockage dans OrderObject
    let orderObject = loadlocalstorage()
    //construction des confirmations de commande
    buildOrderConfirms(orderObject)
}

function loadlocalstorage()
{
    let contactObjet = JSON.parse(localStorage.getItem("contact"))
    let firstName = contactObjet.firstName;
    let productsArray = JSON.parse(localStorage.getItem("productArray"))
    console.log("products Array from localstroage", productsArray)
    let price = JSON.parse(localStorage.getItem("totalPrice"))
    let formatedPrice= (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price/100));
    let orderObject =
    {
        firstName : firstName,
        price: formatedPrice,
        products : []
    }

    //construction et remplissage de orderObject
    fillOrderObject(productsArray)
    function fillOrderObject(productsArray)
    {
        productsArray.forEach( productArrayGlobal =>       
        {
            console.log("product Array Global", productArrayGlobal)
            let orderId = productArrayGlobal[0]
            let productType = productArrayGlobal[1];
            console.log("product Type", productType)
            let productArrayByProduct = productArrayGlobal[2];
            console.log("productArrayByProduct", productArrayByProduct)
            let productNames =[]
            productArrayByProduct.forEach(product =>
                {
                    let productName = product.name
                    console.log("product name",productName)
                    productNames.push(productName)
                    console.log("product names",productNames)
                })
                orderObject.products.push([productType, productNames,orderId]);
            console.log("orderObject",orderObject)

        })  
    }
    localStorage.clear();
    return orderObject;
}

function buildOrderConfirms(orderObject)
    {
        console.log("build",orderObject)
        //conteneurs HTML
        let priceContainer = document.getElementById("priceContainer")
        let firstNameContainer = document.getElementById("firstNameContainer")
        //variables
        let firstName = orderObject.firstName
        let price = orderObject.price
        let productsArrays = orderObject.products
        console.log("products build arrays",productsArrays)
        //inscriptions prénom et prix total
        firstNameContainer.innerHTML = firstName;
        priceContainer.innerHTML = price;
        //résumés de commande
        productsArrays.forEach( productArray =>{
            console.log("products build array", productArray)
            let Type = productArray[0];
            let Names = productArray[1];
            let Id = productArray[2];
            new orderLine(Type,Names,Id);
        })
    }

    //affichage des données dans des lignes ordonnées
class orderLine 
{
    constructor (Type,Names,Id)
    {
        //emplacements éléments
        const ordersContainer = document.getElementById("ordersContainer")
        const orderRow = document.createElement("div")
        const orderRowFirstLine = document.createElement("div")
        const orderRowSecondLine = document.createElement("div")
        const orderRowThirdLine = document.createElement("div")
        const lineClasses = "pt-3"
        orderRowFirstLine.classList.add(lineClasses)
        orderRowSecondLine.classList.add(lineClasses)
        orderRowThirdLine.classList.add(lineClasses)
        let frenchType= false
        //traduction types
        if (Type=="cameras")
        {frenchType= "caméras"}
        else if (Type=="teddies")
        {frenchType= "peluches"}
        else if (Type=="furniture")
        {frenchType= "meubles"}

        
        ordersContainer.appendChild(orderRow)
        orderRow.classList.add("row", "shadow", "rounded","my-3","pb-3","bg-white")
        orderRow.appendChild(orderRowFirstLine)
        const orderRowContent = document.createTextNode("Vous avez commandé des "+ frenchType  +":")
        orderRowFirstLine.appendChild(orderRowContent)
        orderRow.appendChild(orderRowSecondLine)
        const orderRowSecondLineContent= document.createTextNode("Produits : ")
        orderRowSecondLine.appendChild(orderRowSecondLineContent)
        orderRow.appendChild(orderRowThirdLine)
        const orderRowThirdLineContent = document.createTextNode("Numéro de commande : " + Id)
        orderRowThirdLine.appendChild(orderRowThirdLineContent)

        Names.forEach(Name =>{
            const productName = document.createTextNode(Name +", ")
            orderRowSecondLine.appendChild(productName)
        })
    }
}

loadPage()