// Conteúdo do portfólio, extraído do currículo (Adrian_Widmer_Software Engineer.pdf).
// Separado do componente visual (components/synapse/*) pra trocar texto sem mexer em layout.
// Bilíngue (pt/en) exceto o painel do Agamoto, que fica só em português de propósito — é um
// projeto sobre eleições brasileiras, não faz sentido em inglês.

export type Text = { pt: string; en?: string };

export type Node = {
  id: string;
  label: Text;
  x: number; // posição no viewBox 0-100, escolhida à mão (rede orgânica, não grade)
  y: number;
  r: number; // raio do neurônio em repouso
  kind: "hub" | "primary" | "project";
  parent?: string; // dendrito principal: de qual nó parte a linha até este
  related?: string[]; // sinapses secundárias — conexão temática, não hierárquica (estilo grafo)
};

// Posições base num raio curto ao redor do hub (50,46) — o enxame agora vagueia sozinho
// (ver components/synapse/network.tsx, useSpacetime) dentro de um raio de contenção parecido,
// então a base só precisa dar o primeiro quadro antes do JS assumir; mais apertado = mais
// centralizado desde o primeiro instante.
export const NODES: Node[] = [
  { id: "hub", label: { pt: "AW" }, x: 50, y: 46, r: 3.2, kind: "hub" },

  { id: "sobre", label: { pt: "Sobre", en: "About" }, x: 33, y: 30, r: 2.1, kind: "primary", parent: "hub", related: ["formacao"] },
  {
    id: "experiencia",
    label: { pt: "Experiência", en: "Experience" },
    x: 67,
    y: 29,
    r: 2.1,
    kind: "primary",
    parent: "hub",
    related: ["competencias", "projetos"],
  },
  {
    id: "pesquisa",
    label: { pt: "Pesquisa", en: "Research" },
    x: 26,
    y: 50,
    r: 2.1,
    kind: "primary",
    parent: "hub",
    related: ["formacao", "competencias"],
  },
  { id: "projetos", label: { pt: "Projetos", en: "Projects" }, x: 50, y: 68, r: 2.2, kind: "primary", parent: "hub", related: ["competencias"] },
  { id: "competencias", label: { pt: "Competências", en: "Skills" }, x: 73, y: 52, r: 2.1, kind: "primary", parent: "hub" },
  { id: "formacao", label: { pt: "Formação", en: "Education" }, x: 62, y: 66, r: 1.9, kind: "primary", parent: "hub" },
  { id: "contato", label: { pt: "Contato", en: "Contact" }, x: 38, y: 66, r: 1.9, kind: "primary", parent: "hub" },

  { id: "jumpship", label: { pt: "JumpShip" }, x: 32, y: 78, r: 1.4, kind: "project", parent: "projetos" },
  { id: "archivist", label: { pt: "Archivist" }, x: 45, y: 82, r: 1.4, kind: "project", parent: "projetos" },
  { id: "ezdown", label: { pt: "ez.down" }, x: 58, y: 82, r: 1.4, kind: "project", parent: "projetos" },
  { id: "agamoto", label: { pt: "Agamoto" }, x: 71, y: 78, r: 1.4, kind: "project", parent: "projetos" },
];

export type PanelContent = {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  links?: { label: string; href: string }[];
};

// links não precisam de tradução (URLs e nomes próprios são iguais nos dois idiomas), então
// ficam só uma vez, fora do par pt/en.
export type PanelText = { pt: PanelContent; en?: Omit<PanelContent, "links"> };

export const PANELS: Record<string, PanelText> = {
  sobre: {
    pt: {
      eyebrow: "01 · Sobre",
      title: "Engenheiro de software & pesquisador",
      body: "3+ anos em desenvolvimento de produto na Ford Motor Company, na interseção entre machine learning, pesquisa aplicada e engenharia de sistemas. Lidero a padronização de processos de IA — de automações simples a sistemas agênticos — para um time multidisciplinar fora da área de tecnologia. Histórico ativo de publicações revisadas por pares em visão computacional, séries temporais, detecção de anomalias e modelagem estatística.",
      bullets: [
        "Bacharelando em Engenharia da Computação — SENAI CIMATEC (conclusão dez/2026)",
        "Cidadania brasileira e suíça — elegível para trabalhar na UE",
        "Salvador, BA, Brasil",
      ],
    },
    en: {
      eyebrow: "01 · About",
      title: "Software engineer & researcher",
      body: "3+ years in product development at Ford Motor Company, at the intersection of machine learning, applied research and systems engineering. I lead the standardization of AI processes — from simple automations to agentic systems — for a multidisciplinary team outside the tech field. Active track record of peer-reviewed publications in computer vision, time series, anomaly detection and statistical modeling.",
      bullets: [
        "B.Eng. in Computer Engineering — SENAI CIMATEC (expected Dec/2026)",
        "Brazilian and Swiss citizenship — eligible to work in the EU",
        "Salvador, BA, Brazil",
      ],
    },
  },
  experiencia: {
    pt: {
      eyebrow: "02 · Experiência",
      title: "Ford Motor Company",
      body: "",
      bullets: [
        "AI Lead & Software Engineer — ML & Dados · mai/2024–presente (Camaçari, BA)",
        "Liderança técnica da padronização de processos de IA do time de Underbody Systems, fora da área de tecnologia",
        "Pipeline de detecção de fraude/anomalias sem dados rotulados (IsolationForest + Autoencoder + One-Class SVM) — revelou um erro real confirmado",
        "Sistema RAG com vector store unificando catálogos veiculares, ligado a um chatbot agêntico para engenheiros",
        "Scoring estatístico + LLM para busca de fixadores automotivos — de horas para minutos",
        "ETL em larga escala (BigQuery + Python) e infraestrutura de experimentação",
        "Estagiário de Engenharia — Automação · jan/2023–mai/2024 (Salvador, BA)",
      ],
    },
    en: {
      eyebrow: "02 · Experience",
      title: "Ford Motor Company",
      body: "",
      bullets: [
        "AI Lead & Software Engineer — ML & Data · May/2024–present (Camaçari, BA)",
        "Technical leadership of AI process standardization for the Underbody Systems team, outside the tech field",
        "Fraud/anomaly detection pipeline with no labeled data (IsolationForest + Autoencoder + One-Class SVM) — surfaced a real, confirmed error",
        "RAG system with vector store unifying fragmented vehicle catalogs, connected to an agentic chatbot for engineers",
        "Statistical scoring + LLM for automotive fastener search — from hours down to minutes",
        "Large-scale ETL pipelines (BigQuery + Python) and experimentation infrastructure",
        "Engineering Intern — Automation · Jan/2023–May/2024 (Salvador, BA)",
      ],
    },
  },
  pesquisa: {
    pt: {
      eyebrow: "03 · Pesquisa",
      title: "SENAI CIMATEC — Iniciação Científica",
      body: "ago/2022–presente. Visão computacional aplicada em parceria com a Shell para detecção de vazamentos de óleo em ambientes subaquáticos de baixa visibilidade; pesquisa biomédica para detecção precoce de crises epilépticas via sinais EEG.",
      bullets: [
        "Modeling Ictal Sentences Characterized by the Occurrence of Seizures in a Setting of Neurological Disorder — XXVIII ENMC / XVI ECTM (2025)",
        "Statistical Study of Eco-Efficiency in Compact and Average Cars of Chevrolet, Ford, VW, Fiat, and Renault in Brazil — VIII SIINTEC (2022)",
        "Portal CSM da ONU para suporte a imigrantes; detecção de anomalias em gastos públicos federais (CEAP)",
      ],
    },
    en: {
      eyebrow: "03 · Research",
      title: "SENAI CIMATEC — Undergraduate Research",
      body: "Aug/2022–present. Applied computer vision in partnership with Shell for oil leak detection in low-visibility underwater environments; biomedical research for early epileptic seizure detection via EEG signals.",
      bullets: [
        "Modeling Ictal Sentences Characterized by the Occurrence of Seizures in a Setting of Neurological Disorder — XXVIII ENMC / XVI ECTM (2025)",
        "Statistical Study of Eco-Efficiency in Compact and Average Cars of Chevrolet, Ford, VW, Fiat, and Renault in Brazil — VIII SIINTEC (2022)",
        "UN CSM portal supporting immigrants; anomaly detection in federal public spending data (CEAP)",
      ],
    },
  },
  competencias: {
    pt: {
      eyebrow: "05 · Competências",
      title: "Stack técnica",
      body: "",
      bullets: [
        "Linguagens — Python, SQL, TypeScript, Rust, C++, Verilog",
        "ML & Pesquisa — scikit-learn, Keras/TensorFlow, detecção de anomalias, modelagem estatística, RAG, desenho experimental",
        "Dados & Cloud — BigQuery, GCP (Vertex AI, Cloud Run), PostgreSQL, Terraform, Docker, CI/CD, AWS SageMaker",
        "Full Stack — FastAPI, React, REST APIs",
      ],
    },
    en: {
      eyebrow: "05 · Skills",
      title: "Technical stack",
      body: "",
      bullets: [
        "Languages — Python, SQL, TypeScript, Rust, C++, Verilog",
        "ML & Research — scikit-learn, Keras/TensorFlow, anomaly detection, statistical modeling, RAG, experimental design",
        "Data & Cloud — BigQuery, GCP (Vertex AI, Cloud Run), PostgreSQL, Terraform, Docker, CI/CD, AWS SageMaker",
        "Full Stack — FastAPI, React, REST APIs",
      ],
    },
  },
  formacao: {
    pt: {
      eyebrow: "06 · Formação",
      title: "Engenharia da Computação",
      body: "SENAI CIMATEC · jan/2021–dez/2026",
      bullets: [
        "Machine Learning, Estatística, Visão Computacional, Sistemas Embarcados, Banco de Dados",
        "Certificado de Designer de Experimentos",
        "Certificado de Auxiliar de Engenharia",
      ],
    },
    en: {
      eyebrow: "06 · Education",
      title: "Computer Engineering",
      body: "SENAI CIMATEC · Jan/2021–Dec/2026",
      bullets: [
        "Machine Learning, Statistics, Computer Vision, Embedded Systems, Databases",
        "Design of Experiments Certificate",
        "Engineering Assistant Certificate",
      ],
    },
  },
  contato: {
    pt: {
      eyebrow: "07 · Contato",
      title: "Vamos conversar",
      body: "Salvador, BA, Brasil",
    },
    en: {
      eyebrow: "07 · Contact",
      title: "Let's talk",
      body: "Salvador, BA, Brazil",
    },
  },
  jumpship: {
    pt: {
      eyebrow: "Projeto · Open Source · v1.0",
      title: "JumpShip",
      body: "Busca de emprego guiada por IA em torno do seu currículo. Agrega JobSpy (LinkedIn, Indeed, Glassdoor…) e o JumpShip Scrapper (Greenhouse, Lever, Workday, páginas com Playwright), pontua cada vaga com LLM local ou em nuvem e gera PDF de currículo sob medida por vaga. Kanban de candidaturas e entrevista simulada opcional.",
    },
    en: {
      eyebrow: "Project · Open Source · v1.0",
      title: "JumpShip",
      body: "AI-guided job search built around your résumé. Aggregates JobSpy (LinkedIn, Indeed, Glassdoor…) and the JumpShip Scrapper (Greenhouse, Lever, Workday, Playwright-driven pages), scores each job with a local or cloud LLM and generates a tailored résumé PDF per job. Kanban application tracker and optional mock interview.",
    },
  },
  archivist: {
    pt: {
      eyebrow: "Projeto · Open Source · alpha",
      title: "Archivist",
      body: "Aplicação desktop para revisão bibliográfica sistemática (PRISMA), guiada por um agente de IA em chat. Busca em bases acadêmicas, triagem estruturada, PDFs de acesso aberto e relatório PRISMA — tudo rodando localmente (Ollama + embeddings). Stack: Rust, Tauri 2, React/TypeScript.",
    },
    en: {
      eyebrow: "Project · Open Source · alpha",
      title: "Archivist",
      body: "Desktop app for systematic literature reviews (PRISMA), guided by a chat AI agent. Search across academic databases, structured screening, open-access PDFs and a PRISMA report — all running locally (Ollama + embeddings). Stack: Rust, Tauri 2, React/TypeScript.",
    },
  },
  ezdown: {
    pt: {
      eyebrow: "Projeto · Open Source · v1.0.3",
      title: "ez.down",
      body: "Editor e leitor Markdown WYSIWYG, leve e open source, para Windows, Linux e macOS. Edição estilo Typora (sem sintaxe crua), diagramas Mermaid, onze temas e exportação em PDF. Stack: Tauri 2, Milkdown/Crepe.",
    },
    en: {
      eyebrow: "Project · Open Source · v1.0.3",
      title: "ez.down",
      body: "Lightweight, open-source WYSIWYG Markdown editor & reader for Windows, Linux and macOS. Typora-style editing (no raw syntax), Mermaid diagrams, eleven themes and PDF export. Stack: Tauri 2, Milkdown/Crepe.",
    },
  },
  // só em português, de propósito — projeto sobre as eleições brasileiras
  agamoto: {
    pt: {
      eyebrow: "Projeto · Dados abertos + IA",
      title: "Agamoto",
      body: "Arquivo eleitoral independente para as eleições 2026 no Brasil, construído sobre dados oficiais (TSE + Câmara dos Deputados) e apuração de achados por IA, um candidato de cada vez, com fonte obrigatória e checagem de identidade antes de publicar. Next.js 16, SQLite, export estático publicado no GitHub Pages.",
    },
  },
};

// links vivem fora do par pt/en (URLs e nomes próprios não mudam com o idioma)
export const PANEL_LINKS: Record<string, { label: string; href: string }[]> = {
  contato: [
    { label: "adrianwidmer.work@gmail.com", href: "mailto:adrianwidmer.work@gmail.com" },
    { label: "linkedin.com/in/adrian-widmer-0587a9230", href: "https://linkedin.com/in/adrian-widmer-0587a9230" },
    { label: "github.com/Awi-24", href: "https://github.com/Awi-24" },
  ],
  jumpship: [
    { label: "Ver a ficha do projeto →", href: "/jumpship" },
    { label: "github.com/Awi-24/JumpShip", href: "https://github.com/Awi-24/JumpShip" },
  ],
  archivist: [
    { label: "Ver a ficha do projeto →", href: "/archivist" },
    { label: "github.com/Awi-24/archivist", href: "https://github.com/Awi-24/archivist" },
  ],
  ezdown: [
    { label: "Ver a ficha do projeto →", href: "/ez-down" },
    { label: "github.com/Awi-24/ez.down", href: "https://github.com/Awi-24/ez.down" },
  ],
  agamoto: [{ label: "awi-24.github.io/agamoto →", href: "https://awi-24.github.io/agamoto" }],
};
