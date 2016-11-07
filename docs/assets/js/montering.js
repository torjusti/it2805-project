// Hent HTML-elementer.
let assemblyIntro = document.getElementById('assembly-intro');
let progBar = document.getElementById('prog-bar');
let assemblyBtnNext = document.getElementById('assembly-btn-next');
let assemblyBtnBack = document.getElementById('assembly-btn-back');
let assemblyContent = document.getElementsByClassName('assembly-content');

for (let i = 0; i < assemblyContent.length; i++) {
  progBar.appendChild(createElem({
    'type': 'li',
    'className': 'prog-bar-element',
    'innerHTML': '■',
    'listeners': { 'click': goToIndex.bind(this, i) }
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

  for (let i = 0; i < assemblyContent.length; i++) {
    assemblyContent[i].style.display = 'none';
    progBarElements[i].classList.remove('prog-bar-element-active');
  }

  assemblyContent[index].style.display = 'flex';
  progBarElements[index].classList.add('prog-bar-element-active');
}

assemblyBtnNext.addEventListener('click', function(e) {
  montIndex = (montIndex + 1) % assemblyContent.length;
  goToIndex(montIndex);
});

assemblyBtnBack.addEventListener('click', function(e) {
  montIndex = montIndex === 0 ? assemblyContent.length - 1 : montIndex - 1;
  goToIndex(montIndex);
});
