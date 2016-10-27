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
