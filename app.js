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
                <h2>
                    <a href="https://ecoangola.com/tudo-o-que-precisas-saber-palanca-negra-gigante/" target="_blank">${dado.título}</a>
                </h2>
                <p class="descrição-meta"> ${dado.descrição}</p>
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
     
    