const proddata = shopItemsData;

const prodlist = document.querySelector("#products");

for (const prod of proddata) {
  //Skapa element
  const card = document.createElement("li");
  const cardheader = document.createElement("div");
  const cardbody = document.createElement("div");
  const cardText = document.createElement("div");
  const cardfooter = document.createElement("div");
  const trueButton = document.createElement("button");

  //Styla Element
  card.classList.add("card", "mb-2");
  cardheader.classList.add("card-header", "bg-info", "fw-bold");
  cardbody.classList.add("card-body", "bg-dark", "text-warning");
  cardText.classList.add("card-text");
  cardfooter.classList.add("card-footer", "bg-info");
  trueButton.classList.add("btn", "border", "border-2", "mx-1", "btn-success");

  // innehåll i element

  cardheader.innerText = prod.name;
  cardText.innerText = prod.decription;
  trueButton.innerText = "Click Me!";

  //sätta event på element

  //Lägg till element i dom
  cardfooter.append(trueButton);
  cardbody.append(cardText);
  card.append(cardheader, cardbody, cardfooter);
  prodlist.append(card);
}

// class Question {
//   constructor(statement, correctAnswer) {
//     this.statement = statement;
//     this.correctAnswer = correctAnswer;
//   }
// }

// const questions = [
//   new Question("Gillar Niklas kaffe?", true),
//   new Question("Är jorden platt?", false),
//   new Question("Är Giisen ditt smeknamn?", true),
// ];

// for (const question of shopItemsData) {
//   //Skapa element
//   const card = document.createElement("li");
//   const cardheader = document.createElement("div");
//   const cardbody = document.createElement("div");
//   const cardText = document.createElement("h4");
//   const cardfooter = document.createElement("div");
//   const trueButton = document.createElement("button");
//   const falseButton = document.createElement("button");

//   //Styla Element
//   card.classList.add("card", "mb-2");
//   cardheader.classList.add("card-header", "bg-info", "fw-bold");
//   cardbody.classList.add("card-body", "bg-dark", "text-warning");
//   cardText.classList.add("card-text");
//   cardfooter.classList.add("card-footer", "bg-info");
//   trueButton.classList.add("btn", "border", "border-2", "mx-1", "btn-success");
//   falseButton.classList.add("btn", "border", "border-2", "mx-1", "btn-danger");

//   // innehåll i element

//   cardheader.innerText = questions.indexOf(question) + 1;
//   cardText.innerText = question.statement;
//   trueButton.innerText = "True";
//   falseButton.innerText = "False";

//   //sätta event på element

//   //Lägg till element i dom
//   cardfooter.append(trueButton, falseButton);
//   cardbody.append(cardText);
//   card.append(cardheader, cardbody, cardfooter);
//   prodlist.append(card);
// }

// const html = `
//     <div class="card mb-2">
//     <div class="card-header"></div>

//         <div class="card-body">
//             <h4 class="card-text">${question.statement}</h4>
//         </div>

//         <div class="card-footer">
//             <button class="btn btn-primary">True</button>
//             <button class="btn btn-primary">False</button>
//         </div>
// </div>
//     `;
// qlist.innerHTML += html;

// let shop = document.getElementById("shop");

// let shoppingCart = JSON.parse(localStorage.getItem("localStorageData")) || [];

// let generateShop = () => {
//   return (shop.innerHTML = shopItemsData
//     .map((x) => {

//       return `
//     <div id=product-id-${x.id} class="item">
//             <img class="shopImg" width="220px" height="217px"src=${x.img} alt=${x.name}>
//         <div class="details">
//             <h3>${x.name}</h3>
//             <h2>${x.price} kr</h2>
//         </div>
//     </div>
//     `;
//     })
//     .join(""));
// };

// generateShop();
