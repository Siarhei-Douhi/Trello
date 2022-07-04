export function createAccordeon() {

    let acc = document.getElementsByClassName("info");
    let i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let cardsWrapp = this.nextElementSibling;
        if (cardsWrapp.style.display === "block") {
            cardsWrapp.style.display = "none";
        } else {
            cardsWrapp.style.display = "block";
        }
    });
}
}
