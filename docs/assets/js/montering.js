// Hent HTML-elementer.
let assemblyIntro = document.getElementById('assembly-intro');
let progBar = document.getElementById('prog-bar');
let assemblyBtnNext = document.getElementById('assembly-btn-next');
let assemblyBtnBack = document.getElementById('assembly-btn-back');
let assemblyContent = document.getElementsByClassName('content-container');

// Lag klikkbare paginasjons-elementer.
for (let i = 0; i < assemblyContent.length; i++){
  progBar.appendChild(createElem({
    'nodeType': 'li',
    'className': 'prog-bar-element',
    'innerHTML': i + 1,
    'listeners': {
      // Gå til indexen du klikker på.
      'click': function () {
        // Husk å oppdatere index.
        montIndex = i;
        goToIndex(i);
      }
    }
  }));
}

// Store a NodeList with all progress bar elements.
let progBarElements = document.getElementsByClassName('prog-bar-element');

// Nåværende posisjon i monterings-tutorialen.
let montIndex = 0;

// Vis den første sliden til å begynne med.
goToIndex(0);

// Går til et bestemt steg i tutorialen.
function goToIndex(index) {
  // Baser teksten i neste-knappen på om vi er på den siste framen eller ikke.
  assemblyBtnNext.innerHTML = index === assemblyContent.length - 1 ? 'Start på nytt' : 'Neste';

  // Gjem alle elementer.
  for (let i = 0; i < assemblyContent.length; i++) {
    assemblyContent[i].style.display = 'none';
    progBarElements[i].classList.remove('prog-bar-element-active');
  }

  // Vis elementet på index.
  assemblyContent[index].style.display = 'flex';
  progBarElements[index].classList.add('prog-bar-element-active');
}

// Neste-knappen.
assemblyBtnNext.addEventListener('click', function(e) {
  montIndex = (montIndex + 1) % assemblyContent.length; // Finn ut ny index.
  goToIndex(montIndex);
});

// Tilbake-knappen.
assemblyBtnBack.addEventListener('click', function(e) {
  montIndex = montIndex === 0 ? assemblyContent.length - 1 : montIndex - 1; // Finn ut ny index.
  goToIndex(montIndex);
});
