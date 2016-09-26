var mainIife = (function() {
  // var declared to hold data
  var productData = {};
  var catagoriesData = {};
  var productString = "";
  var currentProduct;
  var currentCat;
  var seasonDiscount = "";
  var productDOM = document.getElementById('displayProductsHere');
  // Event Listener for Seasons
  var seasons = document.getElementById("seasons");
  seasons.addEventListener('change',makeProduct);
  // XHR FUNCTIONS TO EXECUTE 
  function executeThisCodeIfXHRFails() {
    console.log("An error occurred while transferring");
  }

  function executeThisCodeAfterFileLoaded() {
    // console.log("this.responseText:", this.responseText);
    catagoriesData = JSON.parse(this.responseText);
    makeCat();
  }
  
  function executeThisCodeAfterFileLoaded1() {
    // console.log("this.responseText:", this.responseText);
    productData = JSON.parse(this.responseText);
    makeProduct();
  }
  // Functions for making catergories & products in DOM
  function makeCat() {
   for (var i = 0; i < catagoriesData.categories.length; i++) {
      currentCat = catagoriesData.categories[i];
      seasonDiscount += `<h3>${currentCat.season_discount}</h3>`;
    }
    seasons.innerHTML += seasonDiscount;
    // Shows discount value of categories 
    console.log("discountValue",currentCat.discount);
  };

  function makeProduct () {
    for (var i = 0; i < productData.products.length; i++) {
      currentProduct = productData.products[i];
      productDOM.innerHTML = "";
      productString += `<h4>${currentProduct.name}</h4>`;
      productString += "</div>";
      productString += "<div class='price'>";
      productString += currentProduct.price;
      productString += "</div>";
    };
    productDOM.innerHTML = productString;
    var discoutRate = (currentProduct.price * (1.0 - currentCat.discount)).toFixed(2);  
  };  
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
})();