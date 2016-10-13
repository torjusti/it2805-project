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

  menuMobile.classList.toggle('mobile-bar-visisble');
});
