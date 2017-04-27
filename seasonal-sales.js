var productData = {};
var catagoriesData = {};
var currentProduct;
var currentCat;
var seasonDiscount = "";
var productDOM = document.getElementById('displayProductsHere');
var saleEmt = document.getElementById('sale');
saleEmt.addEventListener("change", seasonAction);

function executeThisCodeIfXHRFails() {
    console.log("An error occurred while transferring");
}

function executeThisCodeAfterFileLoaded() {
    catagoriesData = JSON.parse(this.responseText);
    makeSeasonOptions(catagoriesData);
}

function executeThisCodeAfterFileLoaded1() {
    productData = JSON.parse(this.responseText);
    showDataInDOM();
}

// Function for making seasonal options in DOM
function makeSeasonOptions(catagoriesData) {
    var saleData = "<option disabled selected value> -- select an option -- </option>";
    var currentSale;
    for (var i = 0; i < catagoriesData.categories.length; i++) {
        currentSale = catagoriesData.categories[i];
        saleData += `<option>${currentSale.season_discount}</option>`;
    };
    saleEmt.innerHTML = saleData;
}
// Function to set discount 
function seasonAction() {
    saleSeason = saleEmt.value;
    var catId;
    for (var j = 0; j < catagoriesData.categories.length; j++) {
        if (catagoriesData.categories[j].season_discount == saleSeason) {
            saleDiscount = catagoriesData.categories[j].discount; // both hold the same discount
            catId = catagoriesData.categories[j]; // both hold entire obj
            break;
        }
    } // get the discount to apply
    for (var i = 0; i < productData.products.length; i++) {
        if (catagoriesData.categories[j].id == productData.products[i].category_id) { // both hold same Id
            productData.products[i].price *= (1 - saleDiscount); // subtracting 

        }
    }
    showDataInDOM();
}
// function to show products 
function showDataInDOM() {
    var productString = "";
    for (var i = 0; i < productData.products.length; i++) {
        currentProduct = productData.products[i];
        productDOM.innerHTML = "";
        productString += `<h4>${currentProduct.name}</h4>`;
        productString += "</div>";
        productString += "<div class='price'>";
        productString += currentProduct.price.toFixed(2);
        productString += "</div>";
    };
    productDOM.innerHTML = productString;
}
// XHR request Catagories JSON
var catagorieRequest = new XMLHttpRequest();
catagorieRequest.addEventListener("load", executeThisCodeAfterFileLoaded); //Callback
catagorieRequest.addEventListener("error", executeThisCodeIfXHRFails)
catagorieRequest.open("GET", "categories.json")
catagorieRequest.send();

// XHR request Products JSON
var productRequest = new XMLHttpRequest();
productRequest.addEventListener("load", executeThisCodeAfterFileLoaded1); //Callback
productRequest.addEventListener("error", executeThisCodeIfXHRFails)
productRequest.open("GET", "products.json")
productRequest.send();
