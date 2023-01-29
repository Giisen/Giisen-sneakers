let label = document.getElementById('label');
let shopC = document.getElementById('shopping-cart');

let shoppingCart = JSON.parse(localStorage.getItem("localStorageData")) || [];

let totalItemsInCart = () => {
    let cartTotal = document.getElementById("cartAmount");
    cartTotal.innerHTML = shoppingCart.map((x) => x.item).reduce((x, y) => x + y, 0);

};
totalItemsInCart();

let generateCartItems = () => {
    if (shoppingCart.length !== 0) {
        console.log("Cart not empty");
    }
    else {
        console.log("Empty");
    }
};
generateCartItems();