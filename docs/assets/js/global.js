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
  let toastElement = document.createElement('span');

  let previousToastElement = document.getElementById('toast');

  if (previousToastElement) {
    document.body.removeChild(previousToastElement);
  }

  toastElement.innerHTML = message;

  toastElement.classList.add('toast-in');

  toastElement.setAttribute('id', 'toast');

  document.body.insertBefore(toastElement, document.body.firstChild);

  setTimeout(function() {
    toastElement.classList.remove('toast-in');
    toastElement.classList.add('toast-out');
  }, timeout || 5000);
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
          options.success(xhr.responseText);
        }
      } else if (options.error) {
        options.error(xhr);
      }
    }
  });

  xhr.open(options.method || 'GET', options.path, options.async || true);
  xhr.send();
}

/**
 * --------------------------------------------
 * Functionality that needs to run on all pages
 * --------------------------------------------
 */

 document.addEventListener('DOMContentLoaded', function() {
  // Når skjermen er mindre enn en viss bredde gjemmes navigasjonsbaren og byttes ut med en knapp.
  // Når knappen klikkes, vil vi veksle mellom at navigasjonsbaren skal vises eller ikke.
  var navigationBar = document.getElementById('navigation-bar');
  var menuMobile = document.getElementById('menu-mobile');

  menuMobile.addEventListener('click', function() {
    // Når knappen klikkes for første gang er style.display en tom streng, til tross for at
    // den finnes i CSS. En enkel løsning er dermed å bare sjekke om vi har en tom streng.
    if (navigationBar.style.display === 'none' || !navigationBar.style.display) {
      navigationBar.style.display = 'flex';
    } else {
      navigationBar.style.display = 'none';
    }

    // Legg til en klasse til knappen når menyen er synlig. Til hjelp i CSS:
    menuMobile.classList.toggle('mobile-bar-visisble');
  });

  /**
   * Legg til en klasse active-menu på den linken i headeren som vi for øyeblikket befinner oss på.
   */
  const headerLinks = document.querySelectorAll('#navigation-bar a');

  for (let i = 0; i < headerLinks.length; i++) {
    if (headerLinks[i].pathname === location.pathname) {
      headerLinks[i].parentNode.classList.add('active-menu');
      break;
    }
  }
});
