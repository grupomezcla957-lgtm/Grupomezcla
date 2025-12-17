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
  
