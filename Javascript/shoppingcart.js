let shoppingCart = JSON.parse(localStorage.getItem("localStorageData")) || [];

let totalItemsInCart = () => {
    let cartTotal = document.getElementById("cartAmount");
    cartTotal.innerHTML = shoppingCart.map((x) => x.item).reduce((x, y) => x + y, 0);

};
totalItemsInCart();