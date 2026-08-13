# Expandir Conteúdo do AFRIC.Fauna — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expandir `dados.js` de 3 para ~21 animais africanos com descrições e imagens reais (via API da Wikipedia PT), e corrigir os bugs em `app.js`/`styles.css` que impediriam essa expansão de funcionar corretamente.

**Architecture:** Site estático (HTML/CSS/JS puro, sem build step, sem framework, sem chamadas de rede em produção). Os dados são obtidos uma única vez durante a implementação (via API pública da Wikipedia) e gravados como array estático em `dados.js`.

**Tech Stack:** HTML5, CSS3, JavaScript vanilla (ES6+). Sem dependências, sem `package.json`, sem test runner — verificação é manual no browser, como o resto do projeto.

## Global Constraints

- Manter o formato de objeto já usado em `dados.js`: `{ título, descrição, link, espécie, imagem, tags }` (nomes de propriedade acentuados, tal como já existe).
- Não inventar URLs de imagem — todo `imagem` deve vir de uma resposta real da API da Wikipedia (`https://pt.wikipedia.org/api/rest_v1/page/summary/<título>`), campo `thumbnail.source` (preferir `originalimage.source` se `thumbnail` não existir).
- Não adicionar dependências, build tools, ou frameworks — o projeto continua HTML/CSS/JS puro servido como ficheiros estáticos.
- Não tocar em `@font-face`/fontes em falta, filtros, ARIA/acessibilidade, ou pesquisa dinâmica — fora de escopo (ver spec `docs/superpowers/specs/2026-08-13-expandir-conteudo-design.md`).

---

### Task 1: Coletar dados reais dos ~18 novos animais via API da Wikipedia

**Files:**
- Nenhum ficheiro do repositório é alterado nesta tarefa — é uma tarefa de investigação cujo resultado (JSON) alimenta a Task 2.

**Interfaces:**
- Produces: uma lista JSON de objetos, um por animal, no formato:
  ```json
  {
    "título": "Leão",
    "descrição": "...(1-3 frases, resumo da extract da Wikipedia, em português)...",
    "link": "https://pt.wikipedia.org/wiki/Le%C3%A3o",
    "espécie": "Panthera leo",
    "imagem": "https://upload.wikimedia.org/.../Lion_waiting_in_Namibia.jpg",
    "tags": "leão savana felino grande predador áfrica ... (palavras-chave em minúsculas separadas por espaço)"
  }
  ```

- [ ] **Step 1: Definir a lista de animais-alvo**

Lista de 18 espécies (nomes de página em pt.wikipedia.org, sujeitos a ajuste se o título real for outro):

```
Leão, Elefante-africano, Girafa, Hiena-malhada, Leopardo, Chita,
Zebra-das-planícies, Hipopótamo, Crocodilo-do-Nilo, Gorila-da-montanha,
Chimpanzé, Rinoceronte-branco, Gnu-azul, Facóquero, Cudo-maior,
Avestruz, Pinguim-africano, Suricato
```

- [ ] **Step 2: Para cada animal, chamar a API REST da Wikipedia**

Formato do pedido (usar WebFetch ou equivalente):
```
GET https://pt.wikipedia.org/api/rest_v1/page/summary/<Título-URL-encoded>
```

Extrair da resposta JSON:
- `title` → campo `título`
- `extract` → base para `descrição` (cortar para 2-3 frases se for muito longo, mantendo sentido completo)
- `content_urls.desktop.page` → campo `link`
- `thumbnail.source` (fallback: `originalimage.source`) → campo `imagem`
- `espécie` (nome científico/binomial): extrair da `extract` se mencionado, senão usar conhecimento geral verificável (nomes binomiais são factos estáveis, ex. `Panthera leo` para leão)
- `tags`: gerar a partir do título, nomes comuns/alternativos e 5-10 palavras-chave relevantes do `extract` (habitat, classificação, características), tudo em minúsculas

Se a página não existir com esse título exato, tentar variantes (ex. "Chita" vs "Guepardo", "Cudo-maior" vs "Kudu") ou pesquisar o título correto antes de desistir da entrada.

- [ ] **Step 3: Validar a lista coletada**

Confirmar que:
- Todas as 18 entradas têm os 6 campos preenchidos (nenhum vazio/`undefined`)
- Todos os `imagem` são URLs `https://upload.wikimedia.org/...` (não URLs adivinhados)
- Todos os `link` são URLs `https://pt.wikipedia.org/wiki/...` reais devolvidos pela API (não construídos manualmente)

Se alguma entrada falhar a validação, corrigir antes de avançar para a Task 2.

---

### Task 2: Reescrever `dados.js` com os dados coletados

**Files:**
- Modify: `dados.js` (ficheiro inteiro)

**Interfaces:**
- Consumes: a lista JSON produzida na Task 1, mais as 3 entradas já existentes (Palanca negra gigante, Bufalo Africano, Rinoceronte Negro) às quais falta apenas o campo `imagem` — obter essas 3 imagens da mesma forma (API da Wikipedia) e preencher.
- Produces: `let dados = [...]` com 21 objetos, cada um com `título, descrição, link, espécie, imagem, tags` preenchidos — este é o array que `app.js` itera em `pesquisar()`.

- [ ] **Step 1: Obter `imagem` para as 3 entradas existentes**

Chamar a mesma API para "Palanca-negra-gigante", "Búfalo-africano" e "Rinoceronte-negro", extrair `thumbnail.source`/`originalimage.source`, e preencher o campo `imagem` (hoje `" "`) de cada uma das 3 entradas atuais em `dados.js`.

- [ ] **Step 2: Escrever o array completo**

Substituir o conteúdo de `dados.js` por um array com as 3 entradas existentes (agora com `imagem` preenchida) seguidas das 18 novas entradas da Task 1, mantendo exatamente esta forma por objeto:

```js
let dados = [
{
título: "Leão",
descrição: "...",
link: "https://pt.wikipedia.org/wiki/...",
espécie: "Panthera leo",
imagem: "https://upload.wikimedia.org/...",
tags: "leão savana felino ...",
},
// ...restantes 20 entradas
];
```

- [ ] **Step 3: Verificar a sintaxe e o conteúdo**

Rodar:
```bash
node -e "const fs=require('fs'); let src=fs.readFileSync('dados.js','utf8'); eval(src.replace('let dados','global.dados')); console.log('total:', dados.length); console.log('sem imagem:', dados.filter(d=>!d.imagem||d.imagem.trim()==='').length); console.log('sem link:', dados.filter(d=>!d.link).length);"
```
Expected: `total: 21`, `sem imagem: 0`, `sem link: 0`

- [ ] **Step 4: Commit**

```bash
git add dados.js
git commit -m "content: expandir base de dados para 21 animais com imagens reais"
```

---

### Task 3: Corrigir `app.js` — link dinâmico, classe CSS, e renderização de imagem

**Files:**
- Modify: `app.js:32-40` (bloco que monta `resultados` dentro do `for`)

**Interfaces:**
- Consumes: `dado.título`, `dado.descrição`, `dado.link`, `dado.imagem` de cada objeto em `dados` (produzido na Task 2).
- Produces: HTML de resultado com link correto por animal e imagem visível, inserido em `#resultados-pesquisa` (consumido por `styles.css` na Task 4 via a nova classe `.imagem-resultado`).

- [ ] **Step 1: Substituir o bloco de template do resultado**

Em `app.js`, o bloco atual (linhas 32-40):
```js
resultados += `
<div class="item-resultado">
    <h2>
        <a href="https://ecoangola.com/tudo-o-que-precisas-saber-palanca-negra-gigante/" target="_blank">${dado.título}</a>
    </h2>
    <p class="descrição-meta"> ${dado.descrição}</p>
    <a href="${dado.link}" target="_blank">Mais Informações</a>
</div>
`;
```

passa a:
```js
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
```

Mudanças: o `<h2><a>` usa `dado.link` em vez do URL fixo; a classe do parágrafo passa de `descrição-meta` para `descricao-meta` (sem acento, corresponde ao CSS existente); nova linha `<img class="imagem-resultado">` no topo do cartão.

- [ ] **Step 2: Verificar manualmente no browser**

Abrir `index.html` num browser, pesquisar por "leão" e depois por "búfalo". Confirmar:
- Os dois resultados mostram uma imagem
- O link do título de cada resultado abre uma página da Wikipedia diferente e correta para cada animal (não sempre a mesma)
- O texto da descrição aparece estilizado (cor `#45474B`, não a cor padrão do browser)

- [ ] **Step 3: Commit**

```bash
git add app.js
git commit -m "fix: corrigir link fixo nos resultados e exibir imagem do animal"
```

---

### Task 4: Estilizar a imagem em `styles.css`

**Files:**
- Modify: `styles.css` (adicionar regra após `.item-resultado`, por volta da linha 118)

**Interfaces:**
- Consumes: classe `.imagem-resultado` produzida na Task 3.

- [ ] **Step 1: Adicionar a regra CSS**

Adicionar depois do bloco `.item-resultado` (após a linha 118):
```css
.imagem-resultado {
    width: 100%;
    max-height: 12rem;
    object-fit: cover;
    border-radius: 0.6rem;
    margin-bottom: 0.75rem;
    display: block;
}
```

- [ ] **Step 2: Verificar responsividade**

No browser, redimensionar a janela (ou DevTools em modo mobile, ~375px de largura) e pesquisar um animal. Confirmar que a imagem não estica/distorce e mantém `border-radius` em qualquer largura.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "style: adicionar estilo da imagem nos cartões de resultado"
```

---

### Task 5: Verificação final end-to-end

**Files:**
- Nenhum (apenas verificação manual).

- [ ] **Step 1: Testar pesquisas variadas no browser**

Abrir `index.html`, testar pesquisas por: um título exato ("Girafa"), uma tag ("savana"), um termo que não existe ("dragão"), e o campo vazio (botão "Pesquisar" sem digitar nada). Confirmar respetivamente: 1 resultado com imagem e link próprio; ≥1 resultado; mensagem "Nada foi encontrado..."; mensagem de erro pedindo para digitar um nome.

- [ ] **Step 2: Confirmar que não há regressões**

Confirmar visualmente que o layout do cabeçalho, campo de pesquisa e rodapé continuam iguais a antes desta mudança (nenhuma alteração foi feita em `index.html` nem no CSS fora da nova regra `.imagem-resultado`).
