# Graph Report - Afric.Fauna  (2026-10-28)

## Corpus Check
- 13 files · ~9,510 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: .css 9, (none) 1, .ico 1)

## Summary
- 68 nodes · 79 edges · 14 communities (5 shown, 9 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `30cee87a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app.js
- script.js
- checkAnswer
- Expandir conteúdo do AFRIC.Fauna
- renderLeaderboard
- dados.js
- README.md

## God Nodes (most connected - your core abstractions)
1. `hideCards()` - 6 edges
2. `checkAnswer()` - 6 edges
3. `Global Constraints` - 6 edges
4. `Expandir conteúdo do AFRIC.Fauna` - 6 edges
5. `startQuiz()` - 5 edges
6. `displayTime()` - 5 edges
7. `renderLeaderboard()` - 5 edges
8. `countdown()` - 4 edges
9. `endQuiz()` - 4 edges
10. `storeScore()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Task 2: Reescrever `dados.js` com os dados coletados` --references--> `pesquisar()`  [INFERRED]
  !superpowers/plans/2026-08-13-expandir-conteudo.md → app.js

## Import Cycles
- None detected.

## Communities (14 total, 9 thin omitted)

### Community 0 - "app.js"
Cohesion: 0.13
Nodes (11): botaoMenu, menu, menuOverlay, pesquisar(), Expandir Conteúdo do AFRIC.Fauna — Plano de Implementação, Global Constraints, Task 1: Coletar dados reais dos ~18 novos animais via API da Wikipedia, Task 2: Reescrever `dados.js` com os dados coletados (+3 more)

### Community 1 - "script.js"
Cohesion: 0.13
Nodes (14): backButton, clearButton, inputElement, leaderboardCard, leaderboardLink, questionCard, questions, resultDiv (+6 more)

### Community 2 - "checkAnswer"
Cohesion: 0.27
Nodes (11): checkAnswer(), countdown(), displayQuestion(), displayTime(), endQuiz(), hideCards(), hideResultText(), optionIsCorrect() (+3 more)

### Community 3 - "Expandir conteúdo do AFRIC.Fauna"
Cohesion: 0.29
Nodes (6): Abordagem, Contexto, Expandir conteúdo do AFRIC.Fauna, Fora de escopo, Mudanças, Objetivo

### Community 4 - "renderLeaderboard"
Cohesion: 0.40
Nodes (6): clearHighscores(), getLeaderboard(), renderLeaderboard(), sortLeaderboard(), storeScore(), updateStoredLeaderboard()

## Knowledge Gaps
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 2 inferred relationships involving `checkAnswer()` (e.g. with `script.js` and `hideResultText()`) actually correct?**
  _`checkAnswer()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Are the 2 inferred relationships involving `startQuiz()` (e.g. with `script.js` and `countdown()`) actually correct?**
  _`startQuiz()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `script.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._