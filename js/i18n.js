/**
 * i18n.js — Internationalization module
 *
 * Handles switching between English and Portuguese.
 * Text content is mapped via data-i18n attributes on HTML elements.
 * User preference is saved to localStorage so it persists across visits.
 */

'use strict';

var i18n = (function () {

  var currentLang = 'en';

  var translations = {
    en: {
      // Nav
      nav_about: 'About',
      nav_skills: 'Skills',
      nav_experience: 'Experience',
      nav_projects: 'Projects',
      nav_education: 'Education',
      nav_contact: 'Contact',

      // Hero
      hero_greeting: "Hi, I'm",
      hero_role: 'Software Engineer',
      hero_subtitle: 'Computer Engineering @ UnB · Building reliable systems with Python, C++, and TypeScript',
      hero_cta_work: 'View My Work',
      hero_cta_contact: 'Get in Touch',
      hero_scroll: 'Scroll',

      // About
      about_title: 'About Me',
      about_p1: 'I\'m João — a 4th-semester <strong>Computer Engineering</strong> student at UnB who genuinely gets excited about making things work. Not just "it compiles" work, but <strong>runs-in-production-at-3am-without-waking-anyone-up</strong> work. That\'s the standard I hold myself to.',
      about_p2: 'My path into engineering started the way most do: breaking things and figuring out how to put them back together. These days I spend my time building <strong>real-time computer vision pipelines</strong>, writing automation bots that handle thousands of messages, and running game servers where actual players depend on my infrastructure decisions. I write mostly <strong>Python</strong>, <strong>C++</strong>, and <strong>TypeScript</strong>, but the language matters less to me than the architecture behind it.',
      about_p3: 'What I\'m chasing next: distributed systems, large-scale data pipelines, and anything that forces me to think about performance at a level most people skip. I\'m the kind of person who reads Linux kernel docs for fun and thinks <code>htop</code> is a perfectly valid form of entertainment.',

      // Details
      detail_location: 'Location',
      detail_university: 'University',
      detail_university_val: 'UnB — Computer Engineering',
      detail_languages: 'Languages',
      detail_languages_val: 'Portuguese (native) · English (fluent)',
      detail_interests: 'Interests',

      // Skills
      skills_title: 'Skills & Tools',
      skill_languages: 'Languages',
      skill_data: 'Data & Backend',
      skill_devops: 'DevOps & Tools',
      skill_practices: 'Practices',
      skill_cloud: 'Cloud & Infra',
      tag_modular: 'Modular Design',
      tag_monitoring: 'Monitoring',

      // Experience
      exp_title: 'Experience',
      exp_current: 'Current',
      exp1_title: 'IT Support Technician & Office Assistant',
      exp1_company: 'Escricontal Accounting',
      exp1_date: '2024 – Present · Brasília, DF',
      exp1_li1: 'Provided day-to-day IT support — workstations, printers, network basics, user access — troubleshooting and unblocking non-technical users',
      exp1_li2: 'Supported office routines with document organization and spreadsheets, improving reliability of administrative workflows',
      exp1_li3: 'Strengthened communication, ownership, prioritization, and deadline discipline through close collaboration with a multidisciplinary team',
      exp2_title: 'Academic Development — Programming Techniques II',
      exp2_company: 'University of Brasília (UnB)',
      exp2_li1: 'Built assignments using HTML, CSS, JavaScript, TypeScript, and Java with focus on readable, maintainable implementations',
      exp2_li2: 'Used ESLint and consistent lint/style rules to prevent common issues and improve long-term code quality',
      exp2_li3: 'Practiced unit testing and TDD fundamentals, following industry-style testing workflows',
      exp2_li4: 'Collaborated in team activities: splitting tasks, integrating contributions via Git, and giving/receiving peer feedback',

      // Projects
      proj_title: 'Projects',
      proj1_title: 'This Portfolio — JGlims.github.io',
      proj1_desc: 'The site you\'re looking at right now. Built entirely from scratch with zero frameworks or dependencies — just vanilla HTML, CSS, and JavaScript. Features a custom CSS design-token system using Custom Properties, BEM methodology for scalable styling, IntersectionObserver-driven scroll animations, a canvas-based particle system, perspective tilt effects via mousemove events, a typing animation engine, and full responsive support down to 320px. Deployed on GitHub Pages with automatic CI/CD on push.',
      proj2_title: 'Real-Time Face & Expression Recognition',
      proj2_desc: 'Real-time face detection, recognition, and expression classification using OpenCV and ML models. Desktop UI for enrollment management, recognition execution, and log inspection.',
      proj3_title: 'Telegram Bots — Reminders & Automation',
      proj3_desc: 'Bots automating messages, reminders, and group interactions via the Telegram API. Scheduled notifications with reliability strategies for 24/7 uptime — hosting, monitoring, and recovery patterns.',
      proj4_title: 'Production Minecraft Bedrock Server on Oracle Cloud',
      proj4_desc: 'Deployed and configured a Minecraft Bedrock server running on an Oracle Cloud Infrastructure Always Free VM. Set up the full environment from scratch — VCN networking, security lists, firewall rules, startup automation, scheduled backups, and performance tuning. The server runs 24/7 and handles real player traffic reliably.',
      proj5_title: 'Academic Financial System — Layered Architecture',
      proj5_desc: 'Layered C++ system with menu/UI, controllers, services, entities, and data layer. Robust validation, exception handling, and clean separation of responsibilities.',
      tag_architecture: 'Architecture',

      // Education
      edu_title: 'Education',
      edu1_degree: 'B.Sc. in Computer Engineering',
      edu1_date: '2024 – Present',
      edu1_school: 'University of Brasília (UnB) — Darcy Ribeiro Campus',
      edu_coursework_label: 'Relevant Coursework:',
      edu1_coursework: 'Algorithms & Programming · Data Structures · Programming Techniques I & II · Probability & Statistics · Calculus I–III · Signals and Systems · Intro to AI · Competitive Programming · Physics II · Numerical Calculus',
      edu2_degree: 'Advanced English Program',
      edu2_date: 'Completed 2023',
      edu2_desc: 'Full program completion with strong reading/writing skills for technical and academic contexts.',

      // Contact
      contact_title: 'Get in Touch',
      contact_text: 'I\'m currently looking for <strong>junior software engineering opportunities</strong> — internships, part-time, or full-time roles. Whether you have a question, a project idea, or just want to say hi, my inbox is always open.',
      contact_btn: 'Send an Email',

      // Footer
      footer_text: 'Designed & built by <strong>João Gabriel</strong>',
      footer_subtext: 'Vanilla HTML · CSS · JavaScript — No frameworks, no dependencies.'
    },

    pt: {
      // Nav
      nav_about: 'Sobre',
      nav_skills: 'Habilidades',
      nav_experience: 'Experiência',
      nav_projects: 'Projetos',
      nav_education: 'Formação',
      nav_contact: 'Contato',

      // Hero
      hero_greeting: 'Olá, eu sou',
      hero_role: 'Engenheiro de Software',
      hero_subtitle: 'Engenharia de Computação @ UnB · Construindo sistemas confiáveis com Python, C++ e TypeScript',
      hero_cta_work: 'Ver Meus Projetos',
      hero_cta_contact: 'Entre em Contato',
      hero_scroll: 'Role',

      // About
      about_title: 'Sobre Mim',
      about_p1: 'Eu sou o João — estudante de <strong>Engenharia de Computação</strong> no 4º semestre da UnB, e o que me motiva de verdade é fazer as coisas funcionarem. Não só o "compilou, tá valendo", mas o tipo de software que <strong>roda em produção às 3 da manhã sem acordar ninguém</strong>. Esse é o padrão que eu busco.',
      about_p2: 'Minha trajetória na engenharia começou como a da maioria: quebrando coisas e descobrindo como montar de volta. Hoje, passo meu tempo construindo <strong>pipelines de visão computacional em tempo real</strong>, escrevendo bots de automação que lidam com milhares de mensagens e administrando servidores de jogos onde jogadores reais dependem das minhas decisões de infraestrutura. Programo principalmente em <strong>Python</strong>, <strong>C++</strong> e <strong>TypeScript</strong>, mas a linguagem importa menos pra mim do que a arquitetura por trás.',
      about_p3: 'O que estou buscando agora: sistemas distribuídos, pipelines de dados em larga escala e qualquer coisa que me force a pensar em performance num nível que a maioria ignora. Sou o tipo de pessoa que lê documentação do kernel Linux por diversão e acha que <code>htop</code> é uma forma perfeitamente válida de entretenimento.',

      // Details
      detail_location: 'Localização',
      detail_university: 'Universidade',
      detail_university_val: 'UnB — Engenharia de Computação',
      detail_languages: 'Idiomas',
      detail_languages_val: 'Português (nativo) · Inglês (fluente)',
      detail_interests: 'Interesses',

      // Skills
      skills_title: 'Habilidades & Ferramentas',
      skill_languages: 'Linguagens',
      skill_data: 'Dados & Backend',
      skill_devops: 'DevOps & Ferramentas',
      skill_practices: 'Práticas',
      skill_cloud: 'Cloud & Infra',
      tag_modular: 'Design Modular',
      tag_monitoring: 'Monitoramento',

      // Experience
      exp_title: 'Experiência',
      exp_current: 'Atual',
      exp1_title: 'Técnico de Suporte de TI & Assistente Administrativo',
      exp1_company: 'Escricontal Contabilidade',
      exp1_date: '2024 – Presente · Brasília, DF',
      exp1_li1: 'Suporte diário de TI — estações de trabalho, impressoras, rede básica, problemas de acesso — resolvendo problemas e desbloqueando usuários não técnicos',
      exp1_li2: 'Apoio em rotinas administrativas com organização de documentos e planilhas, melhorando a confiabilidade dos fluxos de trabalho',
      exp1_li3: 'Fortaleci comunicação, responsabilidade, priorização e disciplina com prazos através de colaboração próxima com equipe multidisciplinar',
      exp2_title: 'Desenvolvimento Acadêmico — Técnicas de Programação II',
      exp2_company: 'Universidade de Brasília (UnB)',
      exp2_li1: 'Desenvolvi trabalhos usando HTML, CSS, JavaScript, TypeScript e Java com foco em implementações legíveis e manuteníveis',
      exp2_li2: 'Utilizei ESLint e regras consistentes de estilo para prevenir problemas comuns e melhorar a qualidade do código a longo prazo',
      exp2_li3: 'Pratiquei fundamentos de testes unitários e TDD, seguindo fluxos de trabalho de teste no padrão da indústria',
      exp2_li4: 'Colaborei em atividades em equipe: divisão de tarefas, integração de contribuições via Git e feedback entre colegas',

      // Projects
      proj_title: 'Projetos',
      proj1_title: 'Este Portfólio — JGlims.github.io',
      proj1_desc: 'O site que você está vendo agora. Construído inteiramente do zero sem frameworks ou dependências — apenas HTML, CSS e JavaScript puros. Possui sistema de design tokens com Custom Properties, metodologia BEM para CSS escalável, animações de scroll com IntersectionObserver, sistema de partículas em canvas, efeito tilt com perspectiva via mousemove, engine de digitação animada e suporte responsivo completo até 320px. Deploy no GitHub Pages com CI/CD automático a cada push.',
      proj2_title: 'Reconhecimento Facial & de Expressões em Tempo Real',
      proj2_desc: 'Detecção facial em tempo real, reconhecimento e classificação de expressões usando OpenCV e modelos de ML. Interface desktop para gerenciamento de cadastros, execução de reconhecimento e inspeção de logs.',
      proj3_title: 'Bots do Telegram — Lembretes & Automação',
      proj3_desc: 'Bots que automatizam mensagens, lembretes e interações em grupos via API do Telegram. Notificações agendadas com estratégias de confiabilidade para uptime 24/7 — hospedagem, monitoramento e padrões de recuperação.',
      proj4_title: 'Servidor Minecraft Bedrock em Produção na Oracle Cloud',
      proj4_desc: 'Deploy e configuração de um servidor Minecraft Bedrock rodando em uma VM Always Free da Oracle Cloud Infrastructure. Configurei todo o ambiente do zero — rede VCN, security lists, regras de firewall, automação de inicialização, backups agendados e ajuste de performance. O servidor roda 24/7 e lida com tráfego real de jogadores de forma confiável.',
      proj5_title: 'Sistema Financeiro Acadêmico — Arquitetura em Camadas',
      proj5_desc: 'Sistema em C++ com arquitetura em camadas: menu/UI, controladores, serviços, entidades e camada de dados. Validação robusta, tratamento de exceções e separação clara de responsabilidades.',
      tag_architecture: 'Arquitetura',

      // Education
      edu_title: 'Formação',
      edu1_degree: 'Bacharelado em Engenharia de Computação',
      edu1_date: '2024 – Presente',
      edu1_school: 'Universidade de Brasília (UnB) — Campus Darcy Ribeiro',
      edu_coursework_label: 'Disciplinas Relevantes:',
      edu1_coursework: 'Algoritmos e Programação · Estruturas de Dados · Técnicas de Programação I & II · Probabilidade e Estatística · Cálculo I–III · Sinais e Sistemas · Introdução à IA · Programação Competitiva · Física II · Cálculo Numérico',
      edu2_degree: 'Programa Avançado de Inglês',
      edu2_date: 'Concluído em 2023',
      edu2_desc: 'Conclusão completa do programa com fortes habilidades de leitura/escrita para contextos técnicos e acadêmicos.',

      // Contact
      contact_title: 'Entre em Contato',
      contact_text: 'Estou em busca de <strong>oportunidades em engenharia de software júnior</strong> — estágios, meio período ou tempo integral. Se você tem uma pergunta, uma ideia de projeto, ou só quer trocar uma ideia, minha caixa de entrada está sempre aberta.',
      contact_btn: 'Enviar um Email',

      // Footer
      footer_text: 'Projetado e desenvolvido por <strong>João Gabriel</strong>',
      footer_subtext: 'HTML · CSS · JavaScript puros — Sem frameworks, sem dependências.'
    }
  };

  /**
   * Apply translations to all elements with data-i18n attribute.
   * Uses innerHTML to support <strong>, <code>, etc. inside translations.
   */
  function applyTranslations(lang) {
    var elements = document.querySelectorAll('[data-i18n]');
    var dict = translations[lang];

    for (var i = 0; i < elements.length; i++) {
      var key = elements[i].getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        elements[i].innerHTML = dict[key];
      }
    }

    document.documentElement.lang = lang;
  }

  /**
   * Update the toggle button labels (both desktop and mobile).
   * When current language is EN, show the PT option (flag + label) and vice versa.
   */
  function updateToggleButtons(lang) {
    var ids = [
      ['langFlag', 'langLabel'],
      ['langFlagMobile', 'langLabelMobile']
    ];

    for (var i = 0; i < ids.length; i++) {
      var flagEl = document.getElementById(ids[i][0]);
      var labelEl = document.getElementById(ids[i][1]);
      if (flagEl && labelEl) {
        if (lang === 'en') {
          flagEl.textContent = '\uD83C\uDDE7\uD83C\uDDF7'; // BR flag
          labelEl.textContent = 'PT';
        } else {
          flagEl.textContent = '\uD83C\uDDFA\uD83C\uDDF8'; // US flag
          labelEl.textContent = 'EN';
        }
      }
    }
  }

  /**
   * Toggle between en and pt.
   */
  function toggle() {
    currentLang = currentLang === 'en' ? 'pt' : 'en';
    applyTranslations(currentLang);
    updateToggleButtons(currentLang);

    try {
      localStorage.setItem('jg-lang', currentLang);
    } catch (e) {
      // localStorage not available — no problem, just won't persist
    }

    // Dispatch custom event so other modules (like the typing animation) can react
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
  }

  /**
   * Initialize: check saved preference, apply it, wire up buttons.
   */
  function init() {
    try {
      var saved = localStorage.getItem('jg-lang');
      if (saved === 'pt' || saved === 'en') {
        currentLang = saved;
      }
    } catch (e) {
      // ignore
    }

    applyTranslations(currentLang);
    updateToggleButtons(currentLang);

    var btn1 = document.getElementById('langToggle');
    var btn2 = document.getElementById('langToggleMobile');
    if (btn1) btn1.addEventListener('click', toggle);
    if (btn2) btn2.addEventListener('click', toggle);
  }

  /**
   * Returns the current language code.
   */
  function getLang() {
    return currentLang;
  }

  return {
    init: init,
    getLang: getLang
  };

})();
