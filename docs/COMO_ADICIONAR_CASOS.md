# Como adicionar novos casos no Data Detective

Este guia explica o fluxo completo para cadastrar um novo caso no projeto, funcionando tanto no backend (API Node) quanto no frontend em modo mock (Vercel).

## Visao geral

Para um novo caso aparecer e funcionar, voce precisa atualizar:

1. Catalogo de casos do backend.
2. Catalogo de casos do frontend (inclui schema para o visualizador).
3. Banco SQLite do backend (se o caso usar tabelas novas).
4. Banco mock do frontend em sql.js (se o caso usar tabelas novas ou novos dados).

## 1) Adicionar caso no backend

Edite o arquivo:

- backend/game/casesData.js

Adicione um novo objeto no array `cases` com os campos:

- `id`: numero sequencial unico (ex.: 8)
- `slug`: identificador amigavel
- `title`: titulo exibido na UI
- `narrative`: objeto com `titulo` e `texto`
- `objective`: objetivo investigativo
- `initialClue`: pista inicial
- `tables`: tabelas liberadas no schema viewer
- `poll`: pergunta final com `options` e `correct`
- `rewardXp`: XP ganho ao acertar

Observacao:

- O desbloqueio dos casos e sequencial pelo `id` e pela ordem no array.

## 2) Adicionar caso no frontend

Edite o arquivo:

- frontend/src/lib/casesData.ts

Adicione o mesmo caso com os mesmos campos do backend e inclua tambem:

- `schema`: definicao das colunas por tabela (nome, tipo, notnull, pk)

Esse `schema` e usado no modo mock para mostrar estrutura no componente de schema.

## 3) Se usar tabelas novas no backend

Edite o arquivo:

- backend/database/db.js

Passos:

1. Criar as tabelas no bloco `db.exec` com `CREATE TABLE IF NOT EXISTS`.
2. Popular dados iniciais no seed de forma idempotente.
3. Se o banco ja existe em ambiente local, garanta migracao por verificacao de contagem (nao depender so de uma tabela antiga para semear tudo).

Dica:

- Sempre mantenha IDs estaveis no seed para facilitar testes e queries do tutorial.

## 4) Se usar tabelas novas no mock (Vercel)

Edite o arquivo:

- frontend/src/lib/api.ts

No metodo `getSqlDb()`:

1. Adicione `CREATE TABLE` no primeiro `db.run`.
2. Adicione os `INSERT` correspondentes no segundo `db.run`.

Importante:

- O modo Vercel pode rodar sem backend externo. Entao os dados do mock precisam refletir os casos novos.
- Em strings SQL, para incluir aspas simples dentro de texto use duas aspas simples (`''texto''`).

## 5) Teste rapido recomendado

1. Abrir o jogo e verificar se o caso aparece na lista.
2. Entrar no caso e confirmar se o schema mostra as tabelas esperadas.
3. Executar query basica por tabela (ex.: `SELECT * FROM tabela LIMIT 5`).
4. Confirmar que a enquete final aceita a resposta correta.

## 6) Checklist antes de commit

- Caso novo em backend/game/casesData.js
- Caso novo em frontend/src/lib/casesData.ts
- Tabelas e seed atualizados em backend/database/db.js (se necessario)
- Tabelas e seed atualizados em frontend/src/lib/api.ts (se necessario)
- Sem erros de TypeScript/ESLint nas alteracoes

Seguindo esse fluxo, novos casos entram sem quebrar o que ja esta funcionando em localhost e no Vercel.
