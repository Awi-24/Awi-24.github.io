// Conteúdo do portfólio, extraído do currículo (Adrian_Widmer_Software Engineer.pdf).
// Separado do componente visual (components/synapse/*) pra trocar texto sem mexer em layout.

export type Node = {
  id: string;
  label: string;
  x: number; // posição no viewBox 0-100, escolhida à mão (rede orgânica, não grade)
  y: number;
  r: number; // raio do neurônio em repouso
  kind: "hub" | "primary" | "project";
  parent?: string; // dendrito: de qual nó parte a linha até este
};

export const NODES: Node[] = [
  { id: "hub", label: "AW", x: 50, y: 48, r: 5.5, kind: "hub" },

  { id: "sobre", label: "Sobre", x: 22, y: 24, r: 4, kind: "primary", parent: "hub" },
  { id: "experiencia", label: "Experiência", x: 78, y: 22, r: 4, kind: "primary", parent: "hub" },
  { id: "pesquisa", label: "Pesquisa", x: 14, y: 58, r: 4, kind: "primary", parent: "hub" },
  { id: "projetos", label: "Projetos", x: 50, y: 84, r: 4.2, kind: "primary", parent: "hub" },
  { id: "competencias", label: "Competências", x: 86, y: 60, r: 4, kind: "primary", parent: "hub" },
  { id: "formacao", label: "Formação", x: 68, y: 82, r: 3.6, kind: "primary", parent: "hub" },
  { id: "contato", label: "Contato", x: 30, y: 84, r: 3.6, kind: "primary", parent: "hub" },

  { id: "jumpship", label: "JumpShip", x: 32, y: 96, r: 2.6, kind: "project", parent: "projetos" },
  { id: "archivist", label: "Archivist", x: 50, y: 99, r: 2.6, kind: "project", parent: "projetos" },
  { id: "ezdown", label: "ez.down", x: 68, y: 96, r: 2.6, kind: "project", parent: "projetos" },
];

export type PanelContent = {
  eyebrow: string;
  title: string;
  body: React.ReactNode | string;
  bullets?: string[];
  links?: { label: string; href: string }[];
};

export const PANELS: Record<string, PanelContent> = {
  sobre: {
    eyebrow: "01 · Sobre",
    title: "Engenheiro de software & pesquisador",
    body: "3+ anos em desenvolvimento de produto na Ford Motor Company, na interseção entre machine learning, pesquisa aplicada e engenharia de sistemas. Lidero a padronização de processos de IA — de automações simples a sistemas agênticos — para um time multidisciplinar fora da área de tecnologia. Histórico ativo de publicações revisadas por pares em visão computacional, séries temporais, detecção de anomalias e modelagem estatística.",
    bullets: [
      "Bacharelando em Engenharia da Computação — SENAI CIMATEC (conclusão dez/2026)",
      "Cidadania brasileira e suíça — elegível para trabalhar na UE",
      "Salvador, BA, Brasil",
    ],
  },
  experiencia: {
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
  pesquisa: {
    eyebrow: "03 · Pesquisa",
    title: "SENAI CIMATEC — Iniciação Científica",
    body: "ago/2022–presente. Visão computacional aplicada em parceria com a Shell para detecção de vazamentos de óleo em ambientes subaquáticos de baixa visibilidade; pesquisa biomédica para detecção precoce de crises epilépticas via sinais EEG.",
    bullets: [
      "Modeling Ictal Sentences Characterized by the Occurrence of Seizures in a Setting of Neurological Disorder — XXVIII ENMC / XVI ECTM (2025)",
      "Statistical Study of Eco-Efficiency in Compact and Average Cars of Chevrolet, Ford, VW, Fiat, and Renault in Brazil — VIII SIINTEC (2022)",
      "Portal CSM da ONU para suporte a imigrantes; detecção de anomalias em gastos públicos federais (CEAP)",
    ],
  },
  competencias: {
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
  formacao: {
    eyebrow: "06 · Formação",
    title: "Engenharia da Computação",
    body: "SENAI CIMATEC · jan/2021–dez/2026",
    bullets: [
      "Machine Learning, Estatística, Visão Computacional, Sistemas Embarcados, Banco de Dados",
      "Certificado de Designer de Experimentos",
      "Certificado de Auxiliar de Engenharia",
    ],
  },
  contato: {
    eyebrow: "07 · Contato",
    title: "Vamos conversar",
    body: "Salvador, BA, Brasil",
    links: [
      { label: "adrianwidmer.work@gmail.com", href: "mailto:adrianwidmer.work@gmail.com" },
      { label: "linkedin.com/in/adrian-widmer-0587a9230", href: "https://linkedin.com/in/adrian-widmer-0587a9230" },
      { label: "github.com/Awi-24", href: "https://github.com/Awi-24" },
    ],
  },
  jumpship: {
    eyebrow: "Projeto · Open Source",
    title: "JumpShip",
    body: "Plataforma de busca de emprego com IA. FastAPI + React/TypeScript, integração de múltiplos providers de LLM com fallback automático. MVP entregue em menos de uma semana.",
    links: [
      { label: "Ver a ficha do projeto →", href: "/jumpship" },
      { label: "github.com/Awi-24/JumpShip", href: "https://github.com/Awi-24/JumpShip" },
    ],
  },
  archivist: {
    eyebrow: "Projeto · Open Source",
    title: "Archivist",
    body: "Aplicação desktop para revisões bibliográficas no método PRISMA-ScR, usando LLMs open source para filtrar e classificar materiais científicos. Stack: Rust, TypeScript, Tauri.",
    links: [{ label: "github.com/Awi-24/archivist", href: "https://github.com/Awi-24/archivist" }],
  },
  ezdown: {
    eyebrow: "Projeto · Open Source",
    title: "ez.down",
    body: "Editor e leitor Markdown WYSIWYG, leve e open source, para Windows e Linux. Edição estilo Typora com Milkdown, Mermaid, temas, abas e exportação em PDF.",
    links: [{ label: "github.com/Awi-24/ez.down", href: "https://github.com/Awi-24/ez.down" }],
  },
};
