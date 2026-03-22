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
    schema: {
      people: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "name", type: "TEXT", notnull: true },
        { name: "age", type: "INTEGER", notnull: false },
        { name: "city", type: "TEXT", notnull: false },
        { name: "occupation", type: "TEXT", notnull: false }
      ],
      crime_reports: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "date", type: "TEXT", notnull: true },
        { name: "location", type: "TEXT", notnull: true },
        { name: "victim_name", type: "TEXT", notnull: true },
        { name: "summary", type: "TEXT", notnull: true }
      ],
      interviews: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "person_id", type: "INTEGER", notnull: true },
        { name: "date", type: "TEXT", notnull: true },
        { name: "transcript", type: "TEXT", notnull: true }
      ],
      vehicles: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "owner_id", type: "INTEGER", notnull: true },
        { name: "plate", type: "TEXT", notnull: true },
        { name: "model", type: "TEXT", notnull: true },
        { name: "color", type: "TEXT", notnull: true }
      ]
    },
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
    schema: {
      employees: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "name", type: "TEXT", notnull: true },
        { name: "department", type: "TEXT", notnull: true }
      ],
      accounts: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "name", type: "TEXT", notnull: true },
        { name: "company", type: "TEXT", notnull: true }
      ],
      transactions: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "employee_id", type: "INTEGER", notnull: true },
        { name: "account_id", type: "INTEGER", notnull: true },
        { name: "amount", type: "REAL", notnull: true },
        { name: "date", type: "TEXT", notnull: true }
      ]
    },
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
    schema: {
      employees: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "name", type: "TEXT", notnull: true },
        { name: "department", type: "TEXT", notnull: true }
      ],
      login_logs: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "employee_id", type: "INTEGER", notnull: true },
        { name: "time", type: "TEXT", notnull: true },
        { name: "ip", type: "TEXT", notnull: true }
      ],
      server_access: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "employee_id", type: "INTEGER", notnull: true },
        { name: "resource", type: "TEXT", notnull: true },
        { name: "time", type: "TEXT", notnull: true }
      ]
    },
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
    schema: {
      employees: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "name", type: "TEXT", notnull: true },
        { name: "department", type: "TEXT", notnull: true }
      ],
      documents: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "title", type: "TEXT", notnull: true },
        { name: "classification", type: "TEXT", notnull: true }
      ],
      document_access: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "employee_id", type: "INTEGER", notnull: true },
        { name: "document_id", type: "INTEGER", notnull: true },
        { name: "date", type: "TEXT", notnull: true }
      ],
      external_contacts: [
        { name: "id", type: "INTEGER", notnull: true, pk: true },
        { name: "employee_id", type: "INTEGER", notnull: true },
        { name: "company", type: "TEXT", notnull: true }
      ]
    },
    poll: {
      question: "Quem provavelmente vazou o documento TOP SECRET?",
      options: ["Lucas Andrade", "Marina Duarte", "Felipe Rocha", "Renata Campos"],
      correct: "Renata Campos"
    },
    rewardXp: 250
  }
];

export type CaseData = typeof cases[number];
