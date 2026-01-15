'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});


/**
 * SLIDER AUTOMÁTICO CON BUCLE INFINITO (CLON)
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function(currentSlider) {
  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderImages = sliderContainer.children;
  
  // Guardamos la cantidad original de imágenes antes de clonar
  const originalTotalSlides = sliderImages.length; 
  
  // 1. CLONAR LA PRIMERA IMAGEN
  // Esto agrega una copia de la primera imagen al final de la lista
  const firstSlideClone = sliderImages[0].cloneNode(true);
  sliderContainer.appendChild(firstSlideClone);

  let currentSlidePos = 0;
  const intervalTime = 3000; // Tiempo entre cada cambio (3 segundos)
  const transitionTime = 1000; // Tiempo que tarda la animación en moverse (1 segundo)
  let slideInterval;

  // Función para mover el slider
  const moveSliderItem = function (useTransition = true) {
    if (useTransition) {
      // Activamos la animación suave
      sliderContainer.style.transition = `transform ${transitionTime}ms ease-in-out`;
    } else {
      // Desactivamos la animación para el "salto secreto"
      sliderContainer.style.transition = 'none';
    }
    
    // Movemos el contenedor basándonos en la posición de la imagen actual
    // Usamos sliderImages[currentSlidePos] para asegurar que el ancho sea correcto
    const slideWidth = sliderImages[0].clientWidth; // Asumiendo que todas miden lo mismo
    sliderContainer.style.transform = `translateX(-${currentSlidePos * slideWidth}px)`;
  }

  /**
   * NEXT SLIDE LÓGICO
   */
  const slideNext = function () {
    currentSlidePos++; // Avanzamos a la siguiente
    moveSliderItem(true); // Movemos con animación

    // VERIFICACIÓN DEL BUCLE
    // Si hemos llegado al clon (que está en la posición igual a originalTotalSlides)
    if (currentSlidePos === originalTotalSlides) {
      
      // Esperamos exactamente lo que dura la transición para hacer el cambio
      setTimeout(() => {
        // 1. Quitamos la animación
        // 2. Regresamos el contador a 0 (la imagen real original)
        // 3. Movemos el slider instantáneamente
        currentSlidePos = 0;
        moveSliderItem(false); 
      }, transitionTime); 
    }
  }

  /**
   * Inicia el intervalo
   */
  const startAutoSlide = function() {
    // Evitamos múltiples intervalos si ya existe uno
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(slideNext, intervalTime);
  }

  /**
   * Detiene el intervalo
   */
  const stopAutoSlide = function() {
    clearInterval(slideInterval);
  }

  // Iniciar solo si hay imágenes
  if (originalTotalSlides > 1) {
    // Ajuste inicial de estilos para asegurar que el CSS no interfiera
    sliderContainer.style.display = 'flex'; 
    
    startAutoSlide();

    // Eventos para pausar
    currentSlider.addEventListener('mouseenter', stopAutoSlide);
    currentSlider.addEventListener('mouseleave', startAutoSlide);
    
    // Eventos táctiles
    currentSlider.addEventListener('touchstart', stopAutoSlide);
    currentSlider.addEventListener('touchend', function() {
      setTimeout(startAutoSlide, 3000);
    });
  }
}

// Inicializar todos los sliders
for (let i = 0, len = sliders.length; i < len; i++) { 
  initSlider(sliders[i]); 
}




/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion = accordions[0];

const initAccordion = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  const expandAccordion = function () {
    if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
      lastActiveAccordion.classList.remove("expanded");
    }

    currentAccordion.classList.toggle("expanded");

    lastActiveAccordion = currentAccordion;
  }

  accordionBtn.addEventListener("click", expandAccordion);

}

for (let i = 0, len = accordions.length; i < len; i++) { initAccordion(accordions[i]); }
