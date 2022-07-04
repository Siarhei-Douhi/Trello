export function createAccordeon() {
    const acc = document.getElementsByClassName('info');
    for(let i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', () => {
            const cardsWrapp = acc[i].nextElementSibling;
            if(cardsWrapp.style.maxHeight) {
                cardsWrapp.style.maxHeight = null;
            } else {
                cardsWrapp.style.maxHeight = "100%";              
            }
        });
    }
}
