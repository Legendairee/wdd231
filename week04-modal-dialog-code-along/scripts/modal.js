const openButton1 = document.querySelector("#openButton1");
const openButton2 = document.querySelector("#openButton2");
const openButton3 = document.querySelector("#openButton3");


const dialogBox = document.querySelector("#dialogBox");
const dialogBoxText = document.querySelector("#dialogBox div");
const closeButton = document.querySelector("#closeButton");

openButton1.addEventListener("click", () => {
    dialogBoxText.innerHTML = "An Apple has 95 Calories"
    dialogBox.showModal();
});
openButton2.addEventListener("click", () => {
    dialogBoxText.innerHTML = "An Orange has 45 Calories"
    dialogBox.showModal();
});
openButton3.addEventListener("click", () => {
    dialogBoxText.innerHTML = "A Banana has 105 Calories"
    dialogBox.showModal();
});

closeButton.addEventListener("click", () => {

    dialogBox.close();
})