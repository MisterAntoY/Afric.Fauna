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

if (botaoMenu) {
    botaoMenu.addEventListener('click', () => {
        if (menu.classList.contains('ativo')) {
            fecharMenu();
        } else {
            abrirMenu();
        }
    });
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', fecharMenu);
}

if (menu) {
    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', fecharMenu);
    });
}

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        fecharMenu();
    }
});

function pesquisar() {
    let loading = document.getElementById("loading");
    if (loading) loading.style.display = "block";
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value;
    
    if (!campoPesquisa) {
        section.innerHTML = "<p class='error'>Por favor, digite o nome de um animal</p>";
        if (loading) loading.style.display = "none";
        return;
    }
    
    campoPesquisa = campoPesquisa.toLowerCase();
    
    let resultados = "";
    let título = "";
    let descrição = "";
    let tags = "";

    if (typeof dados !== "undefined" && Array.isArray(dados)) {
        for (let dado of dados) {
            título = dado.título ? dado.título.toLowerCase() : "";
            descrição = dado.descrição ? dado.descrição.toLowerCase() : "";
            tags = dado.tags ? dado.tags.toLowerCase() : "";

            if (título.includes(campoPesquisa) || descrição.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
                resultados += `
                <div class="item-resultado">
                    <img class="imagem-resultado" src="${dado.imagem}" alt="${dado.título}" loading="lazy">
                    <h2>
                        <a href="${dado.link}" target="_blank">${dado.título}</a>
                    </h2>
                    <p class="descricao-meta">${dado.descrição}</p>
                    <a href="${dado.link}" target="_blank">Mais Informações</a>
                </div>
            `;
            }
        }
    }

    if (!resultados) { 
        resultados = "<p>Nada foi encontrado, nenhum animal correspondente</p>";
    }
    section.innerHTML = resultados;
    if (loading) loading.style.display = "none";
}
