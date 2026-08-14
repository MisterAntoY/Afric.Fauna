const botaoMenu = document.getElementById('menuG');
const menu = document.getElementById('menuB');
const menuOverlay = document.getElementById('menuOverlay');

function abrirMenu() {
    menu.classList.add('ativo');
    menuOverlay.classList.add('ativo');
    botaoMenu.setAttribute('aria-expanded', 'true');
}

function fecharMenu() {
    menu.classList.remove('ativo');
    menuOverlay.classList.remove('ativo');
    botaoMenu.setAttribute('aria-expanded', 'false');
}

botaoMenu.addEventListener('click', () => {
    if (menu.classList.contains('ativo')) {
        fecharMenu();
    } else {
        abrirMenu();
    }
});

menuOverlay.addEventListener('click', fecharMenu);

menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', fecharMenu);
});

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        fecharMenu();
    }
});


function pesquisar() {
    let loading = document.getElementById("loading");
    loading.style.display = "block"; // Exibe o ícone de carregamento
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value;
    
    if (!campoPesquisa) {
        section.innerHTML ="<p class='error'>Por favor, digite o nome de um animal</p>";
        return;
    }
    
    campoPesquisa = campoPesquisa.toLowerCase()
    console.log(campoPesquisa);
    
    // Inicializa uma string vazia para armazenar os resultados da pesquisa
    let resultados = "";
    let título = "";
    let descrição = "";
    let tags = "";

    // Itera sobre cada elemento do array 'dados'
    for (let dado of dados) {
        título = dado.título.toLowerCase();
        descrição = dado.descrição.toLowerCase();
        tags = dado.tags.toLowerCase();

        // se titulo includes campoPesquisa
         if (título.includes(campoPesquisa)||
             descrição.includes(campoPesquisa) || 
             tags.includes(campoPesquisa)) 
            {
            resultados += `
            <div class="item-resultado">
                <img class="imagem-resultado" src="${dado.imagem}" alt="${dado.título}" loading="lazy">
                <h2>
                    <a href="${dado.link}" target="_blank">${dado.título}</a>
                </h2>
                <p class="descricao-meta"> ${dado.descrição}</p>
                <a href="${dado.link}" target="_blank">Mais Informações</a>
            </div>
        `;
        
     } 
    }
    {
        if (!resultados) { 
            resultados = "<p>Nada foi encontrado, nenhum animal correspondente</p>"} section.innerHTML = resultados;
    }
    section.innerHTML = resultados;
    loading.style.display = "none"; // Oculta o ícone de carregamento 
    }     

