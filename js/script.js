$(document).ready(function() {
    $("input[type=password]").keyup(function() {
         var pswd = $(this).val();
         
         // Display Lower case letters to validate
         if (pswd.match(/[a-z]/)) {
              $("#letter").removeClass("invalid").addClass("valid");
         }
         else {
              $("#letter").removeClass("valid").addClass("invalid");
         }
  
         // Display Upper case letters to validate
         if (pswd.match(/[A-Z]/)) {
              $("#capital").removeClass("invalid").addClass("valid");
         }
         else {
              $("#capital").removeClass("valid").addClass("invalid");
         }
  
         // Display Numbers to validate
         if (pswd.match(/\d/)) {
              $("#number").removeClass("invalid").addClass("valid");
         }
         else {
              $("#number").removeClass("valid").addClass("invalid");
         }
  
         // Display Characters to validate
         if (pswd.match(/[^A-Za-z0-9]/)) {
              $("#symbol").removeClass("invalid").addClass("valid");
         }
         else {
              $("#symbol").removeClass("valid").addClass("invalid");
         }
  
         // Display the Length to validate
         if (pswd.length < 8) {
              $("#length").removeClass("valid").addClass("invalid");
         }
         else {
              $("#length").removeClass("invalid").addClass("valid");
         }
         
// Display password requirements
    }).focus(function() {
         $("#password-info").show();
    }).blur(function() {
         $("#password-info").hide();
    });
  });




// Shopping Cart


    if (document.readyState == "loading") {
     document.addEventListener("DOMContentLoaded", ready)
 } else {
     ready()
 }
 
  // Variables for changing, adding and removing quantity
 function ready() {
     var removeCartItemButtons = document.getElementsByClassName("btn-danger");
     for (var i = 0; i < removeCartItemButtons.length; i++) {
         var button = removeCartItemButtons[i];
         button.addEventListener("click", removeCartItem);
     }
 
     var quantityInputs = document.getElementsByClassName("cart-quantity-input");
     for (var i = 0; i < quantityInputs.length; i++) {
         var input = quantityInputs[i];
         input.addEventListener("change", quantityChanged);
     }
 
     var addToCartButtons = document.getElementsByClassName("shop-item-button");
     for (var i = 0; i < addToCartButtons.length; i++) {
         var button = addToCartButtons[i];
         button.addEventListener("click", addToCartClicked);
     }
 
     document.getElementsByClassName("btn-purchase")[0].addEventListener("click", placeOrder);
 }
 
 // Alert box of order placed when click the button
 function placeOrder() {
     window.alert("Your order has been successfully placed! Thank you!");
     var cartItems = document.getElementsByClassName("cart-items")[0];
     while (cartItems.hasChildNodes()) {
         cartItems.removeChild(cartItems.firstChild);
     }
     updateCartTotal();
 }
 
 // Update the total price when an item is removed from the cart
 function removeCartItem(event) {
     var buttonClicked = event.target;
     buttonClicked.parentElement.parentElement.remove();
     updateCartTotal();
 }
 
 // Update price to match quantity selected by the user
 function quantityChanged(event) {
     var input = event.target;
     if (isNaN(input.value) || input.value <= 0) {
         input.value = 1;
     }
     updateCartTotal();
 }
 



 // "Add to Order" button
 function addToCartClicked(event) {
     var button = event.target;
     var shopItem = button.parentElement.parentElement.parentElement.parentElement;
     var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
     var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
     var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
     addItemToCart(title, price, imageSrc);
     updateCartTotal();
 }
 
 // Add to cart action + alert box message if the same item was already added
 function addItemToCart(title, price, imageSrc) {
     var cartRow = document.createElement("div");
     cartRow.classList.add("cart-row");
     var cartItems = document.getElementsByClassName("cart-items")[0];
     var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
     for (var i = 0; i < cartItemNames.length; i++) {
         if (cartItemNames[i].innerText == title) {
             alert("This item has already been added to the order.");
             return;
         }
     }

     // Display of the product when added to the cart
     var cartRowContents = `
         <div class="cart-item cart-column">
             <img class="cart-item-image" src="${imageSrc}" width="80" height="80">
             <br>
             <span class="cart-item-title">${title}</span>
         </div>
        <strong> <span class="cart-price cart-column">${price}</span> </strong>
        <br>
         <div class="cart-quantity cart-column">
             <input class="cart-quantity-input" type="number" value="1">
             <button class="btnm btn-danger" type="button">REMOVE</button>
             <br><br>
         </div>`
     cartRow.innerHTML = cartRowContents;
     cartItems.append(cartRow);
     cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
     cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
 }
 
 // Update total price everytime the user add a new item
 function updateCartTotal() {
     var cartItemContainer = document.getElementsByClassName("cart-items")[0];
     var cartRows = cartItemContainer.getElementsByClassName("cart-row");
     var total = 0;
     for (var i = 0; i < cartRows.length; i++) {
         var cartRow = cartRows[i];
         var priceElement = cartRow.getElementsByClassName("cart-price")[0];
         var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
         var price = parseFloat(priceElement.innerText.replace("€", ""));
         var quantity = quantityElement.value;
         total = total + (price * quantity);
     }
     total = Math.round(total * 100) / 100;
     document.getElementsByClassName("cart-total-price")[0].innerText = "€" + total;
 }
