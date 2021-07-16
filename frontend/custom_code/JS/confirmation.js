console.log("confirmation loaded")

function loadPage()
{
    loadlocalstorage()
    //buildOrderConfirms()
}

function loadlocalstorage()
{
    let contactObjet = JSON.parse(localStorage.getItem("contact"))
    let firstName = contactObjet.firstName;
    let productsArray = JSON.parse(localStorage.getItem("productArray"))
    console.log("products array", productsArray)
    let orderObject =
    {
        firstName : false,
        teddies : false,
        cameras : false,
        furniture : false
    }
    fillOrderObject(productsArray)
    function fillOrderObject(productsArray)
    {
        productsArray.forEach( productArray =>       
        {
            console.log("product Array", productArray)
            let productType = productArray[0];
            console.log("product Type", productType)
        })
    }

}

//function buildOrderConfirms()

loadPage()