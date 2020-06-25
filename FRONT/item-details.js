const productDetails = document.getElementById("product-details");
const itemPath = window.location.search;
console.log(itemPath);

function itemDetails() {
    var searchProduct = new XMLHttpRequest();
    if (searchProduct.readyState == XMLHttpRequest.DONE && searchItems.status == 200) {
        let itemDetails = JSON.parse(searchProduct.response);
        console.log("itemDetails");
    }

    searchProduct.open("GET" , "http://localhost:3000/api/furniture");
    searchProduct.send();
}




itemDetails();

//?id=5be9cc611c9d440000c1421e - CROSS TABLE
//?id=5beaadda1c9d440000a57d98 - COFFEE TABLE
//?id=5beaae361c9d440000a57d99 - DINING TABLE 
//?id=5beaaf2e1c9d440000a57d9a - BENCH
//?id=5beab2061c9d440000a57d9b - VINTAGE CHAIR