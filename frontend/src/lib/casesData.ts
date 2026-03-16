export const cases = [
  {
    id: 1,
    slug: "caso1-assassinato",
    title: "Caso 1 — Assassinato",
    narrative: {
      titulo: "Relatório policial",
      texto:
        "Vítima: Ricardo Viana. Local: Beco da Aurora, Centro. Horário estimado: 22:40.\n\n" +
        "Depoimentos foram coletados. Um veículo foi visto saindo rapidamente. Sua missão é identificar o principal suspeito usando SQL."
    },
    objective:
      "Usando o banco de dados (people, crime_reports, interviews, vehicles), descubra quem é o principal suspeito.",
    initialClue:
      "Um sedã prata com placa começando em 'DDT' foi visto deixando o local do crime.",
    tables: ["people", "crime_reports", "interviews", "vehicles"],
    poll: {
      question: "Quem é o principal suspeito pelo assassinato?",
      options: ["Marina Rocha", "Bruno Lima", "Sofia Martins", "Igor Batista"],
      correct: "Sofia Martins"
    },
    rewardXp: 200
  },
  {
    id: 2,
    slug: "caso2-fraude-financeira",
    title: "Caso 2 — Fraude Financeira",
    narrative: {
      titulo: "Relatório de Compliance",
      texto:
        "A empresa Aurora Investments detectou movimentações financeiras suspeitas em seu sistema interno.\n\n" +
        "Nos últimos dias, várias transferências de alto valor foram feitas para contas externas sem justificativa.\n" +
        "O setor de compliance acredita que um funcionário está desviando dinheiro para uma empresa fantasma."
    },
    objective:
      "Descobrir qual conta está recebendo as transferências suspeitas, qual empresa controla essa conta e qual funcionário está realizando as transferências.",
    initialClue: "Transferências acima de 8000 foram marcadas como suspeitas.",
    tables: ["employees", "accounts", "transactions"],
    poll: {
      question: "Quem é o funcionário responsável pela fraude financeira?",
      options: ["Carlos Mendes", "Ana Ribeiro", "Bruno Costa", "Juliana Prado"],
      correct: "Carlos Mendes"
    },
    rewardXp: 220
  },
  {
    id: 3,
    slug: "caso3-ataque-hacker",
    title: "Caso 3 — Ataque Hacker",
    narrative: {
      titulo: "Incidente de Segurança",
      texto:
        "A empresa Nexus Systems sofreu um ataque hacker. Dados de clientes foram acessados durante a madrugada.\n\n" +
        "Os logs mostram que o acesso foi feito usando credenciais internas, sugerindo envolvimento de um funcionário."
    },
    objective:
      "Descobrir quem fez login fora do horário normal, quem acessou arquivos sensíveis e qual funcionário realizou o ataque.",
    initialClue: "O acesso ocorreu após 23:30 e veio de um IP externo.",
    tables: ["employees", "login_logs", "server_access"],
    poll: {
      question: "Quem é o principal responsável pelo ataque hacker?",
      options: ["Rafael Lima", "Camila Torres", "Diego Martins", "Paula Alves"],
      correct: "Diego Martins"
    },
    rewardXp: 230
  },
  {
    id: 4,
    slug: "caso4-espionagem",
    title: "Caso 4 — Vazamento de Espionagem",
    narrative: {
      titulo: "Relatório de Contrainteligência",
      texto:
        "A empresa Helix Defense trabalha com tecnologia militar. Um documento classificado como TOP SECRET foi vazado.\n\n" +
        "A suspeita é que um funcionário esteja passando informações para uma empresa rival."
    },
    objective:
      "Descobrir quem acessou documentos TOP SECRET, quem possui contatos com empresas externas e quem provavelmente vazou o documento.",
    initialClue: "O documento vazado tinha classificação TOP SECRET.",
    tables: ["employees", "documents", "document_access", "external_contacts"],
    poll: {
      question: "Quem provavelmente vazou o documento TOP SECRET?",
      options: ["Lucas Andrade", "Marina Duarte", "Felipe Rocha", "Renata Campos"],
      correct: "Renata Campos"
    },
    rewardXp: 250
  }
];

export type CaseData = typeof cases[number];
