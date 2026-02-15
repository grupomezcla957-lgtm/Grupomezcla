       /* ============================
       JavaScript: control del menú móvil
       ============================ */

    // Selecciona elementos necesarios
    const hamb = document.getElementById('hamburger');
    const panel = document.getElementById('mobilePanel');
    let open = false; // estado del panel (abierto/cerrado)

    // Añade listener para abrir/cerrar el panel al hacer clic en el hamburger
    hamb && hamb.addEventListener('click', () => {
      open = !open;
      // mostramos/ocultamos el panel
      panel.style.display = open ? 'block' : 'none';
      // actualizamos el atributo aria-hidden por accesibilidad
      panel.setAttribute('aria-hidden', (!open).toString());
    });

    // Listener para cerrar el panel si cambiamos a un ancho de pantalla mayor
    // (por ejemplo, cuando se gira el dispositivo o se redimensiona la ventana)
    window.addEventListener('resize', () => {
      if(window.innerWidth > 980){
        panel.style.display = 'none';
      }
    });

    /* Notas:
       - El menú móvil actual es sencillo (muestra/oculta el panel).
       - Si deseas animaciones o cerrar al hacer clic fuera, se pueden añadir fácilmente.
    */
    
    // Marca la opción del menú activa según la URL actual
    function markActiveMenu(){
      const links = document.querySelectorAll('.nav__menu a, .mobile-panel a');
      // Decodificar el pathname para comparar nombres de archivo con espacios u otros caracteres
      const rawPath = location.pathname.split('/').pop() || 'index.html';
      const path = decodeURIComponent(rawPath).toLowerCase();
      links.forEach(a => {
        const rawHref = (a.getAttribute('href') || '').split('/').pop() || '';
        const href = decodeURIComponent(rawHref).toLowerCase();
        // Comparar por el nombre del archivo; también intentar endsWith sobre href completo
        const isActive = (href && href === path) || (href && location.href.toLowerCase().endsWith(encodeURI(href)));
        a.classList.toggle('active', isActive);
        if(isActive){
          a.setAttribute('aria-current','page');
        } else {
          a.removeAttribute('aria-current');
        }
      });
    }

    /* ============================
       Internacionalización simple (cliente)
       - Traducciones en memoria para 'es' y 'en'
       - Aplica texto a links del menú (por href) y a elementos con `data-i18n`
       - Guarda la preferencia en localStorage
    */
    const translations = {
      es: {
        menu: {
          'index.html':'Inicio',
          'quienes somos.html':'¿Quiénes somos?',
          'nuestros servicios.html':'Nuestros servicios',
          'ingenierias.html':'Ingenierías',
          'proyectos.html':'Proyectos | Construcción',
          'telecomunicaciones.html':'Telecomunicaciones',
          'contacto.html':'Contacto',
          'contacto':'Contacto',
          'Contacto':'Contacto'
        },
          'page.aboutTitle':'¿Quiénes somos?',
          'page.mission':'Misión',
          'page.vision':'Visión',
          'page.values':'Nuestros Valores',
          'page.contactTitle':'Contacto',
          'contact.emailLabel':'Email:',
          'contact.officeLabel':'Oficina:',
          'contact.cellLabel':'Cel:',
          'hero.welcome':'BIENVENIDOS',
          'hero.title1':'GRUPO MEXCLA',
          'hero.title2':'ASOCIADOS',
          'hero.lead':'¡10 años construyendo innovación: arquitectura, ingeniería y telecomunicaciones que conectan a México!',
          'footer.linksTitle':'Enlaces',
          'brand.name':'Grupo Mexcla & Asociados',
          'brand.sub':'Innovación en arquitectura, ingeniería y telecomunicaciones',
          'footer.link.home':'Inicio',
          'footer.link.about':'¿Quiénes somos?',
          'footer.link.services':'Nuestros Servicios',
          'footer.link.engineering':'Ingenierías',
          'footer.link.projects ':'Proyectos | Construcción',
          'footer.link.telecom':'Telecomunicaciones',
          'footer.link.videos':'Videos',
          'footer.link.contact':'Contacto',
          'footer.contactTitle':'Contacto',
          'footer.description':'Somos un equipo con 10 años de experiencia desarrollando proyectos integrales que conectan a México. Ofrecemos soluciones en diseño, ingeniería y construcción.',
          'about.intro':'Grupo Mexcla y Asociados es una empresa 100% mexicana con más de 10 años de experiencia, especializada en construcción, gestión de proyectos bajo metodologías de clase mundial, y desarrollo de proyectos de ingeniería y diseño en redes de fibra óptica y telecomunicaciones. Nuestro equipo multidisciplinario está conformado por arquitectos e ingenieros de diversas especialidades, lo que nos permite ofrecer soluciones integrales, eficientes y de alta calidad. Comprometidos con la innovación y la excelencia operativa, garantizamos resultados sólidos que impulsan la conectividad y el desarrollo en México.',
          'about.missionText':'Somos una empresa mexicana especializada en brindar servicios de construcción civiles, arquitectónicos y telecomunicaciones. Brindando servicios de consultoría IT para el diseño de soluciones, También consultoría en Administración de Proyectos, estamos constituidos como un equipo de trabajo especializado con amplia experiencia y comprometido en alcanzar la satisfacción total de nuestros clientes.',
          'about.visionText':'Somos una empresa mexicana especializada en brindar servicios de construcción civiles, arquitectónicos y telecomunicaciones. Brindando servicios de consultoría IT para el diseño de soluciones, También consultoría en Administración de Proyectos, estamos constituidos como un equipo de trabajo especializado con amplia experiencia y comprometido en alcanzar la satisfacción total de nuestros clientes.',
          'about.valuesAlt':'Imagen de nuestros valores',
          'value.honesty':'HONESTIDAD',
          'value.quality':'CALIDAD',
          'value.productivity':'PRODUCTIVIDAD',
          'value.professionalism':'PROFESIONALISMO',
          'value.trust':'CONFIANZA',
          'page.engineeringTitle':'Ingenierías',
          'eng.card1':'Cableado estructurado',
          'eng.card2':'Cálculo estructural',
          'eng.card3':'Media tensión',
          'eng.card4':'CCTV Y Red',
          'eng.card5':'Fibra óptica',
          'page.servicesTitle':'Nuestros servicios',
          'services.intro':'Somos una empresa 100% mexicana dedicada a la construcción de obra civil, arquitectura, ingeniería y telecomunicaciones.',
          'services.architecture':'Arquitectura',
          'services.civil':'Ingeniería civil',
          'services.visualization':'Visualización digital',
          'services.telecom':'Telecomunicaciones',
          'services.methodsTitle':'Desarrollo de proyectos con metodologías:',
          'services.toolsTitle':'Desarrollo de proyectos con:',
          'services.arch.item1':'Proyecto conceptual',
          'services.arch.item2':'Anteproyecto',
          'services.arch.item3':'Proyecto ejecutivo',
          'services.arch.item4':'Diseño de interiores',
          'services.civil.item1':'Cálculo estructural',
          'services.civil.item2':'Memorias de cálculo',
          'services.civil.item3':'Proyecto estructural',
          'services.civil.item4':'Ingenierías MEP',
          'services.vis.item1':'Renders',
          'services.vis.item2':'Recorridos virtuales',
          'services.vis.item3':'Fotogrametría con drone',
          'services.telecom.item1':'Diseño de redes de fibra óptica',
          'services.telecom.item2':'Cableado estructurado',
          'services.telecom.item4':'Servicios de administración de proyectos utilizando las metodologías tradicionales como PMP, también la utilización de marcos de trabajo Ágiles',
          'services.telecom.item5':'Servicios de consultoría para administración de Proyectos',
          'services.telecom.item6':'Supervisión de Planta Externa / Planta Interna (OSP/ISP)',
          'services.telecom.item7':'Servicios de Diseño tecnologías HFC, GPON, FTTH',
          'services.telecom.item8':'Servicios profesionales de TI',
          'services.valueEngineering':'Ingenierías de valor',
          'services.methods.pmi':'PMI',
          'services.methods.scrum':'SCRUM',
          'services.methods.lean':'LEAN',
          'services.tools.revit':'Revit + BIM',
          'services.methods.1':'Acompañamiento en la profesionalización de tu equipo',
          'services.methods.2':'Competitividad frente a tus pares y los grandes',
          'services.methods.3':'Escalabilidad y calidad de Red',
          'services.methods.4':'Entrenamiento Basado en Procesos',
          'services.methods.5':'Cumplimiento regulatorio',
          'services.ispTitle':'Empresas ISP PYMES, Grupo Mexcla te ofrece:',
          'services.featuredAlt':'Imagen destacada de servicio',
          'page.projectsTitle':'Proyectos',
          'project.subtitle.industrial':'Nave industrial',
          'project.subtitle.commercial':'Comercial',
          'project.label.location':'Ubicación:',
          'project.label.area':'Área:',
          'project.label.year':'Año de proyecto:',
          'page.telecomTitle':'Telecomunicaciones',
          'telecom.project1.name':'BL &IRAZU Technology /COMCAST',
          'telecom.project1.subtitle':'800 millas, proyectos de Fibra óptica FTTH y HFC',
          'telecom.project1.location':'Estados Unidos de Norteamerica',
          'telecom.project1.year':'2021 hasta la fecha',
          'telecom.project2.name':'AT&T',
          'telecom.project3.name':'Administración de proyectos',
          'telecom.project4.name':'Supervisión de proyectos',
          'project.subtitle.cabling':'Cableado estructurado',
            'project.subtitle.fiber':'Instalación de fibra',
              'project.name.stcmetro':'STC METRO',
              'project.name.estevezj':'Estevez J',
              'project.name.design':'Diseño de proyectos',
              'project.name.acambay':'Acambay',
              'project.name.tlatlauquitepec':'Tlatlauquitepec',
              'project.name.atizapan':'Atizapán',
              'project.name.insurgentes':'Insurgentes 414',
              'project.name.iztaccihuatl':'Iztaccihuatl 6',
              'project.name.montevideo':'Montevideo 211',
              'project.name.pabellon':'Pabellon Metepec',
              'project.name.reforma':'Reforma 355',
              'project.name.salinas':'Oficinas de Crédito y Cobranza Grupo Salinas',
              'project.name.villas':'Remodelación Villas Xaltipa',
              'project.name.zaragoza':'Remodelación Ignacio Zaragoza',
              'footer.contact.email':'Email:',
              'footer.contact.office':'Oficina:',
              'footer.contact.tel':'Tel:',
              'page.videosTitle':'Videos',
              'video.title1':'Título del Video 1',
              'video.desc1':'Descripción del video 1',
              'video.title2':'Título del Video 2',
              'video.desc2':'Descripción del video 2',
              'video.title3':'Título del Video 3',
              'video.desc3':'Descripción del video 3',
              'video.title4':'Título del Video 4',
              'video.desc4':'Descripción del video 4',
              'footer.copyright':'Todos los derechos reservados'

      },
      en: {
        menu: {
          'index.html':'Home',
          'quienes somos.html':'About us',
          'nuestros servicios.html':'Our services',
          'ingenierias.html':'Engineering',
          'proyectos.html':'Projects | Construction',
          'telecomunicaciones.html':'Telecommunications',
          'contacto.html':'Contact',
          'contacto':'Contact',
          'Contacto':'Contact'
        },
        'page.aboutTitle':'About us',
        'page.mission':'Mission',
        'page.vision':'Vision',
        'page.values':'Our Values',
        'page.contactTitle':'Contact',
        'contact.emailLabel':'Email:',
        'contact.officeLabel':'Office:',
        'contact.cellLabel':'Mobile:',
        'hero.welcome':'WELCOME',
        'hero.title1':'GRUPO MEXCLA',
        'hero.title2':'ASSOCIATES',
        'hero.lead':'10 years building innovation: architecture, engineering and telecommunications connecting Mexico!',
        'footer.linksTitle':'Links',
        'brand.name':'Grupo Mexcla & Associates',
        'brand.sub':'Innovation in architecture, engineering and telecommunications',
        'footer.link.home':'Home',
        'footer.link.about':'About us',
        'footer.link.services':'Our Services',
        'footer.link.engineering':'Engineering',
        'footer.link.projects':'Projects | Construction',
        'footer.link.telecom':'Telecommunications',
        'footer.link.videos':'Videos',
        'footer.link.contact':'Contact',
        'footer.contactTitle':'Contact',
        'footer.description':'We are a team with 10 years of experience delivering integrated projects across Mexico. We provide design, engineering and construction solutions.',
        'about.intro':'Grupo Mexcla and Associates is a 100% Mexican company with over 10 years of experience, specialized in construction, project management using world-class methodologies, and the development of engineering and design projects in fiber optic networks and telecommunications. Our multidisciplinary team consists of architects and engineers from various specialties, allowing us to offer comprehensive, efficient, and high-quality solutions. Committed to innovation and operational excellence, we guarantee solid results that drive connectivity and development in Mexico.',
        'about.missionText':'We are a Mexican company specialized in providing civil, architectural, and telecommunications construction services. We offer IT consulting services for solution design, as well as consulting in Project Management. We are established as a specialized work team with extensive experience, committed to achieving total customer satisfaction.',
        'about.visionText':'We are a Mexican company specialized in providing civil, architectural, and telecommunications construction services. We offer IT consulting services for solution design, as well as consulting in Project Management. We are established as a specialized work team with extensive experience, committed to achieving total customer satisfaction.',
        'about.valuesAlt':'Our values image',
        'value.honesty':'HONESTY',
        'value.quality':'QUALITY',
        'value.productivity':'PRODUCTIVITY',
        'value.professionalism':'PROFESSIONALISM',
        'value.trust':'TRUST',
        'page.engineeringTitle':'Engineering',
        'eng.card1':'Structured Cabling',
        'eng.card2':'Structural Calculation',
        'eng.card3':'Medium Voltage',
        'eng.card4':'CCTV and Network',
        'eng.card5':'Fiber Optic',
        'page.servicesTitle':'Our services',
        'services.intro':'We are a 100% Mexican company dedicated to civil construction, architecture, engineering and telecommunications.',
        'services.architecture':'Architecture',
        'services.civil':'Civil engineering',
        'services.visualization':'Digital visualization',
        'services.telecom':'Telecommunications',
        'services.methodsTitle':'Project development with methodologies:',
        'services.toolsTitle':'Project development with:',
        'services.arch.item1':'Conceptual design',
        'services.arch.item2':'Preliminary design',
        'services.arch.item3':'Construction documents',
        'services.arch.item4':'Interior design',
        'services.civil.item1':'Structural calculation',
        'services.civil.item2':'Calculation reports',
        'services.civil.item3':'Structural project',
        'services.civil.item4':'MEP engineering',
        'services.vis.item1':'Renders',
        'services.vis.item2':'Virtual tours',
        'services.vis.item3':'Drone photogrammetry',
        'services.telecom.item1':'Fiber optic network design',
        'services.telecom.item2':'Structured cabling',
        'services.telecom.item4':'Project administration services using traditional methodologies like PMP, as well as Agile work frameworks',
        'services.telecom.item5':'Consulting services for Project Management',
        'services.telecom.item6':'External Plant / Internal Plant Supervision (OSP/ISP)',
        'services.telecom.item7':'Design Services for HFC, GPON, FTTH technologies',
        'services.telecom.item8':'Professional IT services',
        'services.valueEngineering':'Value engineering',
        'services.methods.pmi':'PMI',
        'services.methods.scrum':'SCRUM',
        'services.methods.lean':'LEAN',
        'services.tools.revit':'Revit + BIM',
        'services.methods.1':'Support in the professionalization of your team',
        'services.methods.2':'Competitiveness against your peers and the big ones',
        'services.methods.3':'Network scalability and quality',
        'services.methods.4':'Process-Based Training',
        'services.methods.5':'Regulatory compliance',
        'services.ispTitle':'For ISP SMEs, Grupo Mexcla offers you:',
        'services.featuredAlt':'Featured service image',
        'page.projectsTitle':'Projects',
        'project.subtitle.industrial':'Industrial building',
        'project.subtitle.commercial':'Commercial',
        'project.label.location':'Location:',
        'project.label.area':'Area:',
        'project.label.year':'Project year:',
        'page.telecomTitle':'Telecommunications',
        'telecom.project1.name':'BL &IRAZU Technology /COMCAST',
        'telecom.project1.subtitle':'800 miles, FTTH and HFC fiber optic projects',
        'telecom.project1.location':'United States of America',
        'telecom.project1.year':'2021 to present',
        'telecom.project2.name':'AT&T',
        'telecom.project3.name':'Project Management',
        'telecom.project4.name':'Project Supervision',
        'project.subtitle.cabling':'Structured Cabling',
        'project.subtitle.fiber':'Fiber installation',
        'project.name.stcmetro':'STC METRO',
        'project.name.estevezj':'Estevez J',
        'project.name.design':'Project design',
        'project.name.acambay':'Acambay',
        'project.name.tlatlauquitepec':'Tlatlauquitepec',
        'project.name.atizapan':'Atizapan',
        'project.name.insurgentes':'Insurgentes 414',
        'project.name.iztaccihuatl':'Iztaccihuatl 6',
        'project.name.montevideo':'Montevideo 211',
        'project.name.pabellon':'Pabellon Metepec',
        'project.name.reforma':'Reforma 355',
        'project.name.salinas':'Salinas Credit and Collection Offices',
        'project.name.villas':'Villas Xaltipa Remodeling',
        'project.name.zaragoza':'Ignacio Zaragoza Remodeling',
        'footer.contact.email':'Email:',
        'footer.contact.office':'Office:',
        'footer.contact.tel':'Phone:',
        'page.videosTitle':'Videos',
        'video.title1':'Video Title 1',
        'video.desc1':'Video description 1',
        'video.title2':'Video Title 2',
        'video.desc2':'Video description 2',
        'video.title3':'Video Title 3',
        'video.desc3':'Video description 3',
        'video.title4':'Video Title 4',
        'video.desc4':'Video description 4',
        'footer.copyright':'All rights reserved'
      }
    };

    function getSavedLang(){
      return localStorage.getItem('lang') || (navigator.language && navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en');
    }

    function setLang(lang){
      localStorage.setItem('lang', lang);
      applyTranslations(lang);
      markActiveMenu();
      const sel = document.getElementById('langSelector');
      if(sel) sel.value = lang;
    }

    function applyTranslations(lang){
      const dict = translations[lang] || translations.es;
      // Traduce menú (basado en el nombre de archivo del href)
      const links = document.querySelectorAll('.nav__menu a, .mobile-panel a');
      links.forEach(a =>{
        const rawHref = (a.getAttribute('href') || '').split('/').pop() || '';
        const key = decodeURIComponent(rawHref).toLowerCase();
        const txt = dict.menu && (dict.menu[key] || dict.menu[key.toLowerCase()]);
        if(txt) a.textContent = txt;
      });

      // Traduce elementos con data-i18n (texto)
      const nodes = document.querySelectorAll('[data-i18n]');
      nodes.forEach(n =>{
        const k = n.getAttribute('data-i18n');
        if(k && dict[k]) n.textContent = dict[k];
      });

      // Traduce placeholders
      const ph = document.querySelectorAll('[data-i18n-placeholder]');
      ph.forEach(n =>{
        const k = n.getAttribute('data-i18n-placeholder');
        if(k && dict[k]) n.setAttribute('placeholder', dict[k]);
      });

      // Traduce title
      const tt = document.querySelectorAll('[data-i18n-title]');
      tt.forEach(n =>{
        const k = n.getAttribute('data-i18n-title');
        if(k && dict[k]) n.setAttribute('title', dict[k]);
      });

      // Traduce alt
      const alts = document.querySelectorAll('[data-i18n-alt]');
      alts.forEach(n =>{
        const k = n.getAttribute('data-i18n-alt');
        if(k && dict[k]) n.setAttribute('alt', dict[k]);
      });
    }

    // Crear selector de idioma si no existe y añadir listener
    function ensureLangSelector(){
      let sel = document.getElementById('langSelector');
      if(!sel){
        const actions = document.querySelector('.nav__actions') || document.querySelector('header');
        if(actions){
          sel = document.createElement('select');
          sel.id = 'langSelector';
          sel.setAttribute('aria-label','Seleccionar idioma');
          sel.style.cssText = 'margin-right:10px;padding:6px;border-radius:6px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:inherit';
          const op1 = document.createElement('option'); op1.value='es'; op1.textContent='ES';
          const op2 = document.createElement('option'); op2.value='en'; op2.textContent='EN';
          sel.appendChild(op1); sel.appendChild(op2);
          actions.insertBefore(sel, actions.firstChild);
        }
      }
      if(sel){
        sel.removeEventListener && sel.removeEventListener('change', () => {});
        sel.addEventListener('change', (e)=> setLang(e.target.value));
        const initial = getSavedLang();
        sel.value = initial;
      }
    }

    // Ejecutar al cargar (script se carga con defer en el HTML)
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', ()=>{
        ensureLangSelector();
        const lang = getSavedLang();
        applyTranslations(lang);
        markActiveMenu();
      });
    } else {
      ensureLangSelector();
      const lang = getSavedLang();
      applyTranslations(lang);
      markActiveMenu();
    }

    // Cerrar panel móvil al hacer clic en un enlace del panel
    const mobileLinks = document.querySelectorAll('#mobilePanel a');
    mobileLinks.forEach(a => a.addEventListener('click', () => {
      if(panel){ panel.style.display = 'none'; panel.setAttribute('aria-hidden','true'); open = false; }
    }));

    // Ejecutar al cargar (script se carga con defer en el HTML)
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', markActiveMenu);
    } else {
      markActiveMenu();
    }
  
