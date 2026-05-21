# Como adicionar categorias e casos

A pasta `cases/` organiza o conteúdo do jogo por categoria.

Estrutura esperada:

- `cases/categoria1/`
- `cases/categoria2/`
- `cases/categoria3/`
- `cases/categoria4/`
- `cases/categoria5/`

Cada categoria pode conter uma ou mais pastas de caso, por exemplo:

- `cases/categoria2/caso1/`
- `cases/categoria2/caso2/`
- `cases/categoria3/caso1/`

Dentro de cada pasta de caso, mantenha sempre estes arquivos:

- `case.json`
- `database.sql`

## Como criar uma nova categoria

1. Crie uma nova pasta dentro de `cases/` seguindo o padrão `categoriaX`.
2. Escolha um nome para a categoria e atualize o catálogo do jogo para exibi-lo.
3. Adicione uma ou mais pastas de caso dentro dela.
4. Cada caso deve continuar com `case.json` e `database.sql`.

## Como criar um novo caso dentro de uma categoria

1. Crie uma nova pasta dentro da categoria desejada, por exemplo `cases/categoria2/caso6/`.
2. Crie o arquivo `case.json` com os dados do caso.
3. Crie o arquivo `database.sql` com o banco daquele caso.
4. Atualize o catálogo de casos para que a interface mostre o novo caso.

## Campos importantes do `case.json`

- `id`: identificador do caso no jogo.
- `slug`: identificador amigável.
- `title`: título exibido na interface.
- `category`: objeto com `id` e `title`.
- `narrative`: texto da história.
- `objective`: objetivo do caso.
- `initialClue`: pista inicial.
- `tables`: tabelas liberadas para o caso.
- `poll`: pergunta final com `options` e `correct`.
- `rewardXp`: XP ganho ao resolver.

## Observações

- Os casos já existentes podem ser reorganizados entre categorias sem alterar o conteúdo principal.
- Se uma categoria estiver vazia, tudo bem deixá-la preparada para futuros casos.
- Mantenha os nomes das pastas consistentes para facilitar a leitura automática do projeto.
