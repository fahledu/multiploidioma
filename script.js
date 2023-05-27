// Identifica o idioma do navegador
const language = navigator.language.substring(0, 2);

// Trata o idioma do navegador e, se for diferente de pt, en ou es, atribui por padrão en
const supportedLanguages = ["pt", "es", "en"];
let normalizedLanguage = supportedLanguages.includes(language) ? language : "en";

// Cria o caminho do arquivo e plota o conteúdo na div
let page = `lang/${normalizedLanguage}.html`;

// Função para carregar o conteúdo HTML na div
const includeHTML = () => {
    const elmnt = document.querySelector("div");
    const file = elmnt.getAttribute("w3-include-html");
    if (file) {
        fetch(file)
            .then(response => response.text())
            .then(text => {
                elmnt.innerHTML = text;
                elmnt.removeAttribute("w3-include-html");
            });
    }
};

const updateFlagClass = () => {
    const images = document.querySelectorAll("img");
    images.forEach(image => {
        image.classList.toggle("blocked", image.id === normalizedLanguage)
    });


};

document.addEventListener('DOMContentLoaded', () => {
    // Cria e adiciona as imagens das bandeiras
    const flagsList = ["pt-flag.gif", "es-flag.gif", "en-flag.gif"];
    const header = document.createElement("header");
    const fragment = document.createDocumentFragment();
    
    flagsList.forEach(item => {
        const flag = document.createElement("img");
        flag.src = "flags/" + item;
        flag.id = item.substring(0, 2);
        flag.alt = item.substring(0, 7);
        fragment.appendChild(flag);
  
 

        //Muda o conteudo conforme bandeira clicada.
        flag.addEventListener('click', () => {
            normalizedLanguage = flag.id;
            page = `lang/${normalizedLanguage}.html`;
            attrDiv.setAttribute("w3-include-html", page);
            includeHTML();
            updateFlagClass();
        });
    });
    // }
    header.appendChild(fragment);
    document.body.appendChild(header);

    // Cria a div onde o conteúdo será inserido
    const attrDiv = document.createElement("div");
    attrDiv.setAttribute("w3-include-html", page);
    document.body.appendChild(attrDiv);

    includeHTML();
    updateFlagClass();
});
