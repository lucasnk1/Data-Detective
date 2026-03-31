# 🕵️ Data Detective
> Resolva crimes. Analise dados. Domine SQL.

**Data Detective** é um jogo educativo onde o jogador resolve investigações utilizando **SQL**.

A ideia do projeto é ensinar e praticar SQL de uma forma mais divertida: investigando casos, analisando bancos de dados e descobrindo quem é o culpado.

O projeto foi inspirado no **SQL Murder Mystery**, mas com uma interface mais moderna e com diferentes tipos de investigações.

---

# 🎮 Como funciona

O jogador assume o papel de um **Data Detective**, um analista que resolve investigações através da análise de dados.

Cada caso possui:

- uma história
- um banco de dados
- pistas
- vários suspeitos

O jogador pode executar **queries SQL** para investigar os dados e descobrir quem é o culpado.

Como existem várias formas de chegar ao resultado usando SQL, o sistema não valida uma query específica.  
No final da investigação o jogador escolhe o suspeito correto.

---

# 🖥️ Interface

O site terá uma interface inspirada em **computadores antigos**, como se o jogador estivesse usando um sistema operacional de investigação.

Elementos da interface:

- tela de inicialização (boot screen)
- login estilo sistemas antigos
- área de trabalho (desktop)
- aplicativos de investigação
- pasta com casos
- editor SQL

Também existe um guia chamado **Operador Vega**, que ajuda o jogador durante o jogo.

---

# 📁 Casos

Atualmente o jogo possui os seguintes casos:

### Caso 1 — Assassinato
Investigação de um homicídio usando registros e depoimentos.

### Caso 2 — Fraude Financeira
Transferências suspeitas indicam possível desvio de dinheiro dentro de uma empresa.

### Caso 3 — Ataque Hacker
Logs de acesso indicam que alguém dentro da empresa ajudou em um ataque cibernético.

### Caso 4 — Vazamento de Espionagem
Um documento classificado como **Top Secret** foi vazado para uma empresa rival.

### Caso 5 — Fuga no Estacionamento
Uma fuga após tentativa de extorsão exige cruzar placas, proprietários e depoimentos.

### Caso 6 — Pagamentos em Lote
Auditoria encontra transferências repetidas e suspeitas para a mesma conta.

### Caso 7 — Vazamento Coordenado
Acessos noturnos e contatos externos sugerem ação interna para vazamento de informação.

---

# 🧠 Tutorial SQL

Para quem não sabe SQL, o jogo possui um **tutorial interativo** que ensina:

- SELECT
- WHERE
- ORDER BY
- GROUP BY
- JOIN

Assim qualquer pessoa pode aprender SQL jogando.

---

# 👥 Equipe

Este projeto está sendo desenvolvido por:

- **Lucas Leuck de Oliveira ( github.com/lucasnk1 )** – idealização do projeto / desenvolvimento
- **Augusto Kulzer ( github.com/gutokulzer )** – desenvolvimento / criação de casos
- **Eduardo Dias ( github.com/eduudiass )** – desenvolvimento / banco de dados
- **Pedro Sangalli ( github.com/pSangali )** – desenvolvimento / criação de casos

---

# 🏆 Sistema de Progressão

O jogador ganha **XP** ao resolver casos.

Cargos possíveis:

- Data Detective Júnior
- Data Detective
- Investigador Sênior
- Chefe de Investigação de Dados

Também existem **conquistas** e **tempo de resolução** de cada caso.

---

# 💾 Progresso do Jogador

O progresso do jogador por enquanto é salvo diretamente no navegador utilizando **localStorage**.

Isso inclui:

- casos já resolvidos
- nível do jogador
- conquistas
- tempo de resolução dos casos

Dessa forma o jogador pode fechar o site e continuar depois do ponto em que parou.

> Obs: como os dados ficam armazenados no navegador; usar outro pc, limpar o cache ou os dados do navegador pode apagar o progresso.

---

# 🛠️ Tecnologias

O projeto está sendo desenvolvido com:

- React
- Next.js
- Node.js
- SQLite
- TailwindCSS
- Monaco Editor

---

# 👥 Colaboração

Este projeto está sendo desenvolvido em colaboração com colegas como forma de:

- estudar programação
- praticar SQL
- aprender desenvolvimento web
- construir projetos para portfólio

Também estamos usando o projeto para ensinar SQL na prática.

---

# 🚧 Status do projeto

Projeto em desenvolvimento.

Ideias futuras:

- mais casos investigativos
- leaderboard
- novos tipos de banco de dados
- criação de casos pela comunidade

---

# 💡 Motivação

Esse projeto começou como um experimento de **vibe coding** para aprender mais sobre:

- SQL
- desenvolvimento web
- criação de projetos interativos

A ideia é transformar aprendizado técnico em algo mais divertido e prático.
