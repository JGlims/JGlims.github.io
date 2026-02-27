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
      hero_subtitle: 'Computer Engineering @ UnB \u00B7 Building reliable systems with Python, C++, and TypeScript',
      hero_cta_work: 'View My Work',
      hero_cta_contact: 'Get in Touch',
      hero_scroll: 'Scroll',

      // About
      about_title: 'About Me',
      about_p1: 'I\'m Jo\u00E3o \u2014 a 5th-semester <strong>Computer Engineering</strong> student at UnB with a deep interest in building software that actually holds up in production. I care about reliability, clean architecture, and understanding what happens under the hood. That\'s the standard I hold myself to.',
      about_p2: 'My path into engineering started the way most do: breaking things and figuring out how to put them back together. These days I spend my time building <strong>real-time computer vision pipelines</strong>, writing automation bots that handle thousands of messages, and running game servers on cloud infrastructure where real players depend on my ops decisions. I write mostly <strong>Python</strong>, <strong>C++</strong>, and <strong>TypeScript</strong>, but the language matters less to me than the architecture behind it.',
      about_p3: 'What I\'m chasing next: distributed systems, large-scale data pipelines, and anything that forces me to think about performance at a level most people skip. I genuinely enjoy digging into Linux internals, reading documentation that most people avoid, and figuring out why things break before they actually do.',

      // Details
      detail_location: 'Location',
      detail_university: 'University',
      detail_university_val: 'UnB \u2014 Computer Engineering',
      detail_languages: 'Languages',
      detail_languages_val: 'Portuguese (native) \u00B7 English (fluent)',
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
      exp1_date: '2024 \u2013 Present \u00B7 Bras\u00EDlia, DF',
      exp1_li1: 'Provided day-to-day IT support \u2014 workstations, printers, network basics, user access \u2014 troubleshooting and unblocking non-technical users',
      exp1_li2: 'Supported office routines with document organization and spreadsheets, improving reliability of administrative workflows',
      exp1_li3: 'Strengthened communication, ownership, prioritization, and deadline discipline through close collaboration with a multidisciplinary team',
      exp2_title: 'Academic Development \u2014 Programming Techniques II',
      exp2_company: 'University of Bras\u00EDlia (UnB)',
      exp2_li1: 'Built assignments using HTML, CSS, JavaScript, TypeScript, and Java with focus on readable, maintainable implementations',
      exp2_li2: 'Used ESLint and consistent lint/style rules to prevent common issues and improve long-term code quality',
      exp2_li3: 'Practiced unit testing and TDD fundamentals, following industry-style testing workflows',
      exp2_li4: 'Collaborated in team activities: splitting tasks, integrating contributions via Git, and giving/receiving peer feedback',

      // Projects
      proj_title: 'Projects',
      proj1_title: 'This Portfolio \u2014 JGlims.github.io',
      proj1_desc: 'The site you\'re looking at right now. Built entirely from scratch with zero frameworks or dependencies \u2014 just vanilla HTML, CSS, and JavaScript. Features a custom CSS design-token system using Custom Properties, BEM methodology for scalable styling, IntersectionObserver-driven scroll animations, a canvas-based particle system, perspective tilt effects via mousemove events, a typing animation engine, and full responsive support down to 320px. Deployed on GitHub Pages with automatic CI/CD on push.',
      proj2_title: 'Real-Time Face & Expression Recognition',
      proj2_desc: 'Real-time face detection, recognition, and expression classification using OpenCV and ML models. Desktop UI for enrollment management, recognition execution, and log inspection.',
      proj3_title: 'Telegram Bots \u2014 Reminders & Automation',
      proj3_desc: 'Bots automating messages, reminders, and group interactions via the Telegram API. Scheduled notifications with reliability strategies for 24/7 uptime \u2014 hosting, monitoring, and recovery patterns.',
      proj4_title: 'Production Minecraft Bedrock Server on Oracle Cloud',
      proj4_desc: 'Deployed and configured a Minecraft Bedrock server on an Oracle Cloud Infrastructure Always Free ARM VM. Set up the full environment from scratch \u2014 VCN networking, security lists, iptables firewall rules, startup automation via systemd, scheduled backups, and performance tuning. Built a custom real-time monitoring dashboard: a Python service pings the server every 60 seconds via raw UDP, collects CPU, RAM, disk, and player metrics, and writes rolling JSON consumed by a vanilla JavaScript front end served through Nginx. The server and dashboard run 24/7 and handle real player traffic reliably. <a href="http://144.22.198.184" target="_blank" rel="noopener noreferrer">View Live Dashboard \u2192</a>',
      proj5_title: 'Academic Financial System \u2014 Layered Architecture',
      proj5_desc: 'Layered C++ system with menu/UI, controllers, services, entities, and data layer. Robust validation, exception handling, and clean separation of responsibilities.',
      tag_architecture: 'Architecture',

      // Education
      edu_title: 'Education',
      edu1_degree: 'B.Sc. in Computer Engineering',
      edu1_date: '2024 \u2013 Present',
      edu1_school: 'University of Bras\u00EDlia (UnB) \u2014 Darcy Ribeiro Campus',
      edu_coursework_label: 'Relevant Coursework:',
      edu1_coursework: 'Algorithms & Programming \u00B7 Data Structures \u00B7 Programming Techniques I & II \u00B7 Probability & Statistics \u00B7 Calculus I\u2013III \u00B7 Signals and Systems \u00B7 Intro to AI \u00B7 Competitive Programming \u00B7 Physics II \u00B7 Numerical Calculus',
      edu2_degree: 'Advanced English Program',
      edu2_date: 'Completed 2023',
      edu2_desc: 'Full program completion with strong reading/writing skills for technical and academic contexts.',

      // Contact
      contact_title: 'Get in Touch',
      contact_text: 'I\'m currently looking for <strong>junior software engineering opportunities</strong> \u2014 internships, part-time, or full-time roles. Whether you have a question, a project idea, or just want to say hi, my inbox is always open.',
      contact_btn: 'Send an Email',

      // Footer
      footer_text: 'Designed & built by <strong>Jo\u00E3o Gabriel</strong>',
      footer_subtext: 'Vanilla HTML \u00B7 CSS \u00B7 JavaScript \u2014 No frameworks, no dependencies.'
    },

    pt: {
      // Nav
      nav_about: 'Sobre',
      nav_skills: 'Habilidades',
      nav_experience: 'Experi\u00EAncia',
      nav_projects: 'Projetos',
      nav_education: 'Forma\u00E7\u00E3o',
      nav_contact: 'Contato',

      // Hero
      hero_greeting: 'Ol\u00E1, eu sou',
      hero_role: 'Engenheiro de Software',
      hero_subtitle: 'Engenharia de Computa\u00E7\u00E3o @ UnB \u00B7 Construindo sistemas confi\u00E1veis com Python, C++ e TypeScript',
      hero_cta_work: 'Ver Meus Projetos',
      hero_cta_contact: 'Entre em Contato',
      hero_scroll: 'Role',

      // About
      about_title: 'Sobre Mim',
      about_p1: 'Eu sou o Jo\u00E3o \u2014 estudante de <strong>Engenharia de Computa\u00E7\u00E3o</strong> no 5\u00BA semestre da UnB, com um interesse profundo em construir software que realmente se sustenta em produ\u00E7\u00E3o. Me importo com confiabilidade, arquitetura limpa e entender o que acontece por baixo dos panos. Esse \u00E9 o padr\u00E3o que eu busco.',
      about_p2: 'Minha trajet\u00F3ria na engenharia come\u00E7ou como a da maioria: quebrando coisas e descobrindo como montar de volta. Hoje, passo meu tempo construindo <strong>pipelines de vis\u00E3o computacional em tempo real</strong>, escrevendo bots de automa\u00E7\u00E3o que lidam com milhares de mensagens e administrando servidores de jogos em infraestrutura cloud onde jogadores reais dependem das minhas decis\u00F5es de opera\u00E7\u00E3o. Programo principalmente em <strong>Python</strong>, <strong>C++</strong> e <strong>TypeScript</strong>, mas a linguagem importa menos pra mim do que a arquitetura por tr\u00E1s.',
      about_p3: 'O que estou buscando agora: sistemas distribu\u00EDdos, pipelines de dados em larga escala e qualquer coisa que me force a pensar em performance num n\u00EDvel que a maioria ignora. Eu genuinamente gosto de mergulhar nos internals do Linux, ler documenta\u00E7\u00F5es que a maioria evita e entender por que as coisas quebram antes que elas realmente quebrem.',

      // Details
      detail_location: 'Localiza\u00E7\u00E3o',
      detail_university: 'Universidade',
      detail_university_val: 'UnB \u2014 Engenharia de Computa\u00E7\u00E3o',
      detail_languages: 'Idiomas',
      detail_languages_val: 'Portugu\u00EAs (nativo) \u00B7 Ingl\u00EAs (fluente)',
      detail_interests: 'Interesses',

      // Skills
      skills_title: 'Habilidades & Ferramentas',
      skill_languages: 'Linguagens',
      skill_data: 'Dados & Backend',
      skill_devops: 'DevOps & Ferramentas',
      skill_practices: 'Pr\u00E1ticas',
      skill_cloud: 'Cloud & Infra',
      tag_modular: 'Design Modular',
      tag_monitoring: 'Monitoramento',

      // Experience
      exp_title: 'Experi\u00EAncia',
      exp_current: 'Atual',
      exp1_title: 'T\u00E9cnico de Suporte de TI & Assistente Administrativo',
      exp1_company: 'Escricontal Contabilidade',
      exp1_date: '2024 \u2013 Presente \u00B7 Bras\u00EDlia, DF',
      exp1_li1: 'Suporte di\u00E1rio de TI \u2014 esta\u00E7\u00F5es de trabalho, impressoras, rede b\u00E1sica, problemas de acesso \u2014 resolvendo problemas e desbloqueando usu\u00E1rios n\u00E3o t\u00E9cnicos',
      exp1_li2: 'Apoio em rotinas administrativas com organiza\u00E7\u00E3o de documentos e planilhas, melhorando a confiabilidade dos fluxos de trabalho',
      exp1_li3: 'Fortaleci comunica\u00E7\u00E3o, responsabilidade, prioriza\u00E7\u00E3o e disciplina com prazos atrav\u00E9s de colabora\u00E7\u00E3o pr\u00F3xima com equipe multidisciplinar',
      exp2_title: 'Desenvolvimento Acad\u00EAmico \u2014 T\u00E9cnicas de Programa\u00E7\u00E3o II',
      exp2_company: 'Universidade de Bras\u00EDlia (UnB)',
      exp2_li1: 'Desenvolvi trabalhos usando HTML, CSS, JavaScript, TypeScript e Java com foco em implementa\u00E7\u00F5es leg\u00EDveis e manuten\u00EDveis',
      exp2_li2: 'Utilizei ESLint e regras consistentes de estilo para prevenir problemas comuns e melhorar a qualidade do c\u00F3digo a longo prazo',
      exp2_li3: 'Pratiquei fundamentos de testes unit\u00E1rios e TDD, seguindo fluxos de trabalho de teste no padr\u00E3o da ind\u00FAstria',
      exp2_li4: 'Colaborei em atividades em equipe: divis\u00E3o de tarefas, integra\u00E7\u00E3o de contribui\u00E7\u00F5es via Git e feedback entre colegas',

      // Projects
      proj_title: 'Projetos',
      proj1_title: 'Este Portf\u00F3lio \u2014 JGlims.github.io',
      proj1_desc: 'O site que voc\u00EA est\u00E1 vendo agora. Constru\u00EDdo inteiramente do zero sem frameworks ou depend\u00EAncias \u2014 apenas HTML, CSS e JavaScript puros. Possui sistema de design tokens com Custom Properties, metodologia BEM para CSS escal\u00E1vel, anima\u00E7\u00F5es de scroll com IntersectionObserver, sistema de part\u00EDculas em canvas, efeito tilt com perspectiva via mousemove, engine de digita\u00E7\u00E3o animada e suporte responsivo completo at\u00E9 320px. Deploy no GitHub Pages com CI/CD autom\u00E1tico a cada push.',
      proj2_title: 'Reconhecimento Facial & de Express\u00F5es em Tempo Real',
      proj2_desc: 'Detec\u00E7\u00E3o facial em tempo real, reconhecimento e classifica\u00E7\u00E3o de express\u00F5es usando OpenCV e modelos de ML. Interface desktop para gerenciamento de cadastros, execu\u00E7\u00E3o de reconhecimento e inspe\u00E7\u00E3o de logs.',
      proj3_title: 'Bots do Telegram \u2014 Lembretes & Automa\u00E7\u00E3o',
      proj3_desc: 'Bots que automatizam mensagens, lembretes e intera\u00E7\u00F5es em grupos via API do Telegram. Notifica\u00E7\u00F5es agendadas com estrat\u00E9gias de confiabilidade para uptime 24/7 \u2014 hospedagem, monitoramento e padr\u00F5es de recupera\u00E7\u00E3o.',
      proj4_title: 'Servidor Minecraft Bedrock em Produ\u00E7\u00E3o na Oracle Cloud',
      proj4_desc: 'Deploy e configura\u00E7\u00E3o de um servidor Minecraft Bedrock em uma VM ARM Always Free da Oracle Cloud Infrastructure. Configurei todo o ambiente do zero \u2014 rede VCN, security lists, regras de firewall iptables, automa\u00E7\u00E3o de inicializa\u00E7\u00E3o via systemd, backups agendados e ajuste de performance. Constru\u00ED um painel de monitoramento em tempo real: um servi\u00E7o Python faz ping no servidor a cada 60 segundos via UDP raw, coleta m\u00E9tricas de CPU, RAM, disco e jogadores, e grava JSON rotativo consumido por um front end em JavaScript puro servido pelo Nginx. O servidor e o dashboard rodam 24/7 com tr\u00E1fego real de jogadores. <a href="http://144.22.198.184" target="_blank" rel="noopener noreferrer">Ver Dashboard ao Vivo \u2192</a>',
      proj5_title: 'Sistema Financeiro Acad\u00EAmico \u2014 Arquitetura em Camadas',
      proj5_desc: 'Sistema em C++ com arquitetura em camadas: menu/UI, controladores, servi\u00E7os, entidades e camada de dados. Valida\u00E7\u00E3o robusta, tratamento de exce\u00E7\u00F5es e separa\u00E7\u00E3o clara de responsabilidades.',
      tag_architecture: 'Arquitetura',

      // Education
      edu_title: 'Forma\u00E7\u00E3o',
      edu1_degree: 'Bacharelado em Engenharia de Computa\u00E7\u00E3o',
      edu1_date: '2024 \u2013 Presente',
      edu1_school: 'Universidade de Bras\u00EDlia (UnB) \u2014 Campus Darcy Ribeiro',
      edu_coursework_label: 'Disciplinas Relevantes:',
      edu1_coursework: 'Algoritmos e Programa\u00E7\u00E3o \u00B7 Estruturas de Dados \u00B7 T\u00E9cnicas de Programa\u00E7\u00E3o I & II \u00B7 Probabilidade e Estat\u00EDstica \u00B7 C\u00E1lculo I\u2013III \u00B7 Sinais e Sistemas \u00B7 Introdu\u00E7\u00E3o \u00E0 IA \u00B7 Programa\u00E7\u00E3o Competitiva \u00B7 F\u00EDsica II \u00B7 C\u00E1lculo Num\u00E9rico',
      edu2_degree: 'Programa Avan\u00E7ado de Ingl\u00EAs',
      edu2_date: 'Conclu\u00EDdo em 2023',
      edu2_desc: 'Conclus\u00E3o completa do programa com fortes habilidades de leitura/escrita para contextos t\u00E9cnicos e acad\u00EAmicos.',

      // Contact
      contact_title: 'Entre em Contato',
      contact_text: 'Estou em busca de <strong>oportunidades em engenharia de software j\u00FAnior</strong> \u2014 est\u00E1gios, meio per\u00EDodo ou tempo integral. Se voc\u00EA tem uma pergunta, uma ideia de projeto, ou s\u00F3 quer trocar uma ideia, minha caixa de entrada est\u00E1 sempre aberta.',
      contact_btn: 'Enviar um Email',

      // Footer
      footer_text: 'Projetado e desenvolvido por <strong>Jo\u00E3o Gabriel</strong>',
      footer_subtext: 'HTML \u00B7 CSS \u00B7 JavaScript puros \u2014 Sem frameworks, sem depend\u00EAncias.'
    }
  };

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
          flagEl.textContent = '\uD83C\uDDE7\uD83C\uDDF7';
          labelEl.textContent = 'PT';
        } else {
          flagEl.textContent = '\uD83C\uDDFA\uD83C\uDDF8';
          labelEl.textContent = 'EN';
        }
      }
    }
  }

  function toggle() {
    currentLang = currentLang === 'en' ? 'pt' : 'en';
    applyTranslations(currentLang);
    updateToggleButtons(currentLang);

    try {
      localStorage.setItem('jg-lang', currentLang);
    } catch (e) {}

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
  }

  function init() {
    try {
      var saved = localStorage.getItem('jg-lang');
      if (saved === 'pt' || saved === 'en') {
        currentLang = saved;
      }
    } catch (e) {}

    applyTranslations(currentLang);
    updateToggleButtons(currentLang);

    var btn1 = document.getElementById('langToggle');
    var btn2 = document.getElementById('langToggleMobile');
    if (btn1) btn1.addEventListener('click', toggle);
    if (btn2) btn2.addEventListener('click', toggle);
  }

  function getLang() {
    return currentLang;
  }

  return {
    init: init,
    getLang: getLang
  };

})();
