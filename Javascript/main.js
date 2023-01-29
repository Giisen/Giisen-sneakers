let shop = document.getElementById('shop');

let shopItemsData = [{
    id: "sneaker1",
    name: "Earthbound",
    price: 1499,
    decription: "Solid sneaker that does not heart your eyes, it's earthy and looks good even in a casula business environment.",
    img: "/img/Sneaker1.png"
},
{
    id: "sneaker2",
    name: "Rosie",
    price: 1899,
    decription: "The romance is absolute, you can ignore it. Embed your self in soft rose pedles.",
    img: "/img/Sneaker2.png"
},
{
    id: "sneaker4",
    name: "Smack",
    price: 1199,
    decription: "Smack right in the dirt. Are you the wild kid on the block. Get a sneaker that can keep up!",
    img: "/img/Sneaker4.png"
},
{
    id: "sneaker5",
    name: "Retro high top",
    price: 1499,
    decription: "Did you grow up wathing street ball in LA? So did this sneaker",
    img: "/img/Sneaker5.png"
}]

let shoppingCart = JSON.parse(localStorage.getItem("localStorageData")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, decription, img } = x;
        let search = shoppingCart.find((x) => x.id === id) || []
        return `
    <div id=product-id-${x.id} class="item">
    <img width="215" src=${x.img} alt=${x.name}>
    <div class="details">
        <h3>${x.name}</h3>
        <p>${x.decription}</p>
        <div class="price-quantity">
            <h2>${x.price} kr</h2>
            <div class="buttons">
                <i onclick="removeOneItem(${x.id})" class="bi bi-dash-lg"></i>
                <div id=${x.id} class="quantity">${search.item === undefined? 0 : search.item}</div>
                <i onclick="addOneItem(${x.id})" class="bi bi-plus-lg"></i>
            </div>
        </div>
    </div>
</div>
    `}).join(""));
};

generateShop()

let addOneItem = (id) => {
    let selectedItem = id;
    let search = shoppingCart.find((x) => x.id == selectedItem.id);

    if (search === undefined) {
        shoppingCart.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    
    update(selectedItem.id);
    localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
};
let removeOneItem = (id) => {
    let selectedItem = id;
    let search = shoppingCart.find((x) => x.id == selectedItem.id);
    if (search === undefined) return;
    else if (search.item === 0)
        return;
    else {
        search.item -= 1;
    }
    
    update(selectedItem.id);
    shoppingCart = shoppingCart.filter((x) => x.item !== 0);

    localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
};

let update = (id) => {
    let search = shoppingCart.find((x) => x.id == id);
    document.getElementById(id).innerHTML = search.item;
    totalItemsInCart();
};

let totalItemsInCart = () => {
    let cartTotal = document.getElementById("cartAmount");
    cartTotal.innerHTML = shoppingCart.map((x) => x.item).reduce((x, y) => x + y, 0);

};
totalItemsInCart();