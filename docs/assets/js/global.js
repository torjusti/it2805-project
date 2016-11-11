/**
 * -----------------------
 * Global helper functions
 * -----------------------
 */

/**
 * Show a little fixed notification on the top of the page.
 * Similar to Android toast-notifications.
 */
function toast(message, timeout) {
  // Create a new toast element.
  let toastElement = document.createElement('span');

  // Remove all previous toas telements.
  let previousToastElement = document.getElementById('toast');

  if (previousToastElement) {
    document.body.removeChild(previousToastElement);
  }

  toastElement.innerHTML = message;

  // Fade-in animation.
  toastElement.classList.add('toast-in');

  toastElement.setAttribute('id', 'toast');

  document.body.insertBefore(toastElement, document.body.firstChild);

  // Remove toast after specified time or 2500 ms.
  setTimeout(function() {
    toastElement.classList.remove('toast-in');
    toastElement.classList.add('toast-out');
  }, timeout || 2500);
}

/**
 * Fairly low-level AJAX wrapper.
 * Requires a path, all other options are optional.
 */
function ajax(options, path, success, error) {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (options.success) {
          // Call success handler
          options.success(xhr.responseText);
        }
      } else if (options.error) {
        // Call error handler
        options.error(xhr);
      }
    }
  });

  xhr.open(options.method || 'GET', options.path, options.async || true);
  xhr.send();
}

/**
 * Helper function for creating an element and setting properties.
 */
function createElem(obj) {
  let elem = document.createElement(obj.nodeType || 'div'); // Div as default type.

  // Special attributes such as className and innerHTML which are not
  // attributes, but rather DOM properties. There might be more of
  // these, but these are the ones we are using.
  const DOM_PROPERTIES = ['className', 'innerHTML'];

  // These should not be set using setAtribute but are not DOM properties.
  const BLACKLIST = DOM_PROPERTIES.concat(['nodeType', 'children', 'listeners']);

  // Add all properties which are not blacklisted directly to the DOM element.
  DOM_PROPERTIES.forEach(function(attribute) {
    if (obj[attribute]) {
      elem[attribute] = obj[attribute];
    }
  });

  // Handle the rest of the attributes using setAttribute.
  for (let key in obj) {
    if (BLACKLIST.indexOf(key) < 0) { // Only set if not in black.
      elem.setAttribute(key, obj[key]);
    }
  }

  // Add children if there are any.
  if (obj.children) {
    obj.children.forEach(function(child) {
      elem.appendChild(child);
    });
  }

  // Bind any provided event listeners. Accepts both single functions
  // and arrays of functions.
  if (obj.listeners) {
    for (let key in obj.listeners) {
      if (Array.isArray(obj.listeners[key])) {
        obj.listeners[key].forEach(function(listener) {
          elem.addEventListener(key, listener);
        });
      } else {
        elem.addEventListener(key, obj.listeners[key]);
      }
    }
  }

  // Return the configured element.
  return elem;
}

/**
 * --------------------------------------------
 * Functionality that needs to run on all pages
 * --------------------------------------------
 */

 document.addEventListener('DOMContentLoaded', function() {
  // Når skjermen er mindre enn en viss bredde gjemmes navigasjonsbaren og byttes ut med en knapp.
  // Når knappen klikkes, vil vi veksle mellom at navigasjonsbaren skal vises eller ikke.
  var navigationBar = document.getElementsByTagName('nav');
  var menuMobile = document.getElementById('menu-mobile');
  var footer = document.getElementsByTagName('footer');
  var assemblyBar = document.getElementById('assembly-controls');

  menuMobile.addEventListener('click', function() {
    // Når knappen klikkes for første gang er style.display en tom streng, til tross for at
    // den finnes i CSS. En enkel løsning er dermed å bare sjekke om vi har en tom streng.
    if (navigationBar[0].style.display === 'none' || !navigationBar[0].style.display) {
      navigationBar[0].style.display = 'flex';
      footer[0].style.position = 'fixed';
      footer[0].style.bottom = '0';
      navigationBar[0].style.animation = 'slideInTop .3s forwards';
      if (assemblyBar) {
        assemblyBar.style.display = 'none';
      }
    } else {
      navigationBar[0].style.display = 'none';
    }

  });

  /**
   * Legg til en klasse active-menu på den linken i headeren som vi for øyeblikket befinner oss på.
   */
  const headerLinks = document.querySelectorAll('nav a');

  for (let i = 0; i < headerLinks.length; i++) {
    if (headerLinks[i].pathname === location.pathname) {
      footer[0].style.position = '';
      if (assemblyBar) {
        assemblyBar.style.display = '';
      }
      headerLinks[i].parentNode.classList.add('active-menu');
      break;
    }
  }
});
