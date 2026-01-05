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
      const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      links.forEach(a => {
        const href = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
        // Comparar por el nombre del archivo; también intentar includes sobre href completo
        const isActive = href === path || (href && location.href.toLowerCase().endsWith(href));
        a.classList.toggle('active', isActive);
      });
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
  
