# Expandir conteúdo do AFRIC.Fauna

**Data:** 2026-08-13
**Status:** Aprovado

## Contexto

O site é uma página estática (HTML/CSS/JS puro) com um motor de pesquisa simples sobre um array `dados.js`. Atualmente tem apenas 3 animais, e o campo `imagem` de cada entrada está sempre vazio, apesar do README prometer uma experiência "visualmente envolvente".

## Objetivo

Expandir a base de dados para ~20 animais africanos icónicos, com descrições e imagens reais, e corrigir os problemas técnicos que impediriam essa expansão de funcionar corretamente.

## Abordagem

Dados (descrição, link, imagem) são obtidos via API pública da Wikipedia em português (`pt.wikipedia.org/api/rest_v1/page/summary/...`) em vez de escritos de memória ou com URLs adivinhados — evita imagens partidas e descrições imprecisas. O resultado fica gravado de forma estática em `dados.js` (sem chamadas de rede em produção).

## Mudanças

1. **`dados.js`** — de 3 para ~20-21 animais (Big Five, primatas, aves, répteis, etc.), cada entrada com `título`, `descrição`, `link`, `espécie`, `imagem` e `tags` preenchidos. As 3 entradas existentes também recebem `imagem` real.
2. **`app.js`** — corrigir bug onde todo resultado de pesquisa aponta para o mesmo link fixo (deve usar `dado.link`); adicionar `<img>` no template de resultado consumindo `dado.imagem`; alinhar nome de classe `descrição-meta` → `descricao-meta` (corresponde ao CSS existente).
3. **`styles.css`** — estilo para a nova imagem dentro de `.item-resultado` (tamanho, `object-fit`, cantos arredondados).

## Fora de escopo

Redesign visual maior, filtros/categorias, pesquisa dinâmica em tempo real, acessibilidade/ARIA, e correções não relacionadas (ex.: `@font-face` para fontes inexistentes no repositório).
