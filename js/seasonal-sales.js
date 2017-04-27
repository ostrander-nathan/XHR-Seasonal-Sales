// console.log("First line in JS file");
 // Iife wrapped 
var mainIife = (function(){
  // var declared to hold data 
  var seasonSale ="";
  var productData = {};
  var categoriesData = {};
  var totalSale = {};
  var saleDiscount = 0;

  var seasonInput = document.getElementById('seasons');
  seasonInput.addEventListener("change", getSeason);
 
  // function once season is selected
  function getSeason() {
    seasonSale = categoriesData.value;
    for (var i = 0; i < totalSale.categories.length; i++) {
      if (totalSale.categories[i].season_discount == seasonSale) {
        saleDiscount = totalSale.categories[i].discount;
        break;
      }
    }
  };

  // function to push to DOM
  function addToDom (){
    for (var i = 0; i < products.length; i++) {
      var productDisplay = "<div id= 'products'>";
      var closingDisplay = "</div>";
      body.innerHTML += productDisplay + i + closingDisplay;
    }
  }
  // function to show if XHR fails
  function executeThisCodeIfXHRFails () {
    console.log("An error occurred while transferring");
  }
  // what to do once file is loaded
  function executeThisCodeAfterFileLoaded () {
    // console.log("executeThisCodeAfterFileLoaded time");
    console.log("this.responseText:", this.responseText);
    categoriesData = JSON.parse(this.responseText);
    // console.log("data", data);
  }
    function executeThisCodeAfterFileLoaded1 () {
    // console.log("executeThisCodeAfterFileLoaded time");
    console.log("this.responseText:", this.responseText);
    productData = JSON.parse(this.responseText);
    // console.log("data", data);
  }

  // XHR request 
  var catagorieRequest = new XMLHttpRequest();

  catagorieRequest.addEventListener("load", executeThisCodeAfterFileLoaded); //Callback
  catagorieRequest.addEventListener("error", executeThisCodeIfXHRFails)
  catagorieRequest.open("GET", "categories.json")
  catagorieRequest.send();

  var productRequest = new XMLHttpRequest();

  productRequest.addEventListener("load", executeThisCodeAfterFileLoaded1); //Callback
  productRequest.addEventListener("error", executeThisCodeIfXHRFails)
  productRequest.open("GET", "products.json")
  productRequest.send();
// console.log(categoriesData, productData);
})();