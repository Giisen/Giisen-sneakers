const proddata = shopItemsData;

const prodlist = document.querySelector("#products");

for (const prod of proddata) {
  //Skapa element
  const card = document.createElement("li");
  const cardheader = document.createElement("div");
  const cardbody = document.createElement("div");
  const cardImg = document.createElement("img");
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
  cardImg.src = prod.img;
  cardText.innerText = prod.decription;
  trueButton.innerText = "Click Me!";

  //sätta event på element

  //Lägg till element i dom
  cardfooter.append(trueButton);
  cardbody.append(cardText, cardImg);
  card.append(cardheader, cardbody, cardfooter);
  prodlist.append(card);
}
