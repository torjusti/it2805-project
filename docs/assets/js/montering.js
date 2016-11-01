/*Text innhold*/
const contents=["Gabioner leveres til anlegget i sammenlagt stand (flatpakket) på palle. Alle vertikale fuger er ferdige fra fabrikken, som øker kvaliteten og effektiviserer monteringen. Avhengig av konfigureringen av gabionene, forbindes base- og lokkpanelene med én horisontal spiral. Tilbehøret (stagsurringer og fugepinner)","Ta en gabion fra en pall og klipp av sikringsbåndet. Løft tilbehøret og dra ut gabionen til den når full lengde. Fest bunnen med spiralene og bøy endene 90° innover. Nå løsner ikke spiralene når du rører ved og vrir på gabionen. Dette forbygger også skarpe kanter og forhindrer skader. Dette kan utføres med standard flat-tang. Vend deretter på gabionen.","For større lengder bør gabionene kobles sammen slik at de danner en struktur i rekkefølge. Forhåndsfabrikkerte fugepinner leveres for hver gabion. Ta ganske enkelt tak i de to spiralene og trykk dem inn i hverandre. Plasser fugepinnen i seksjonen og trykk den nedover. Du må påse at hodet på pinnen plasseres innover. Dette må gjøres av sikkerhetsgrunner og forhindrer vandalisme. Tilkoblingen må gjøres på begge sider.","For å unngå kraftig deformering som følge av påfylling av gabionene, er stagsurringer inkluderte i hver gabion. Avhengig av gabionens høyde plasseres disse i 1/3 + 2/3 eller 1/2 høyde. Nå kan du begynne å fylle den første delen av gabionen. Stagsurringer plasseres fire tråder fra sidene og rundt sveisingen. Ellers kan sveisingen briste, eller surringen kan bevege på seg. Gjenta dette prinsippet til gabionene er helt fylte.","Når gabionen er fylt opp, kan lokket stenges. Bruk de medfølgende spiralene og fest lokket på hver kant, inklusive mellom-veggspanelet. Endene skal vris innover av sikkerhetshensyn. Når man plasserer gabioner oppå hverandre, må de horisontale tilkoblingene utføres. Dette skjer vanligvis ved hjelp av klemmer eller surretråd.","<li>-Sett sammen de tomme gabionene på forhånd. Strekk eller trykk sammen gabionene for å oppnå ønsket lengde. De bevegelige spiralene gjør at de kan tilpasses perfekt. Kurver kan også lages ved bruk av de bevegelige delene.</li> <li>-For å maksimere produksjonen må montering, tilkobling, fylling, stagning og sluttbehandling anses som en produksjonslinje. Standardteamet består gjerne av tre montører og en kran med fører.</li> <li>-Hvis helningen er større enn 10°, må ekstra stagning brukes.</li> <li>-Hvis gabionhøyden er mer enn 1 m, bør en ekstra rekke med stagsurringer brukes.</li> <li>-For øvrig oppfordrer vi av sikkerhetshensyn til bruk av vernebriller, -hansker og -sko.</li> <li>-Produksjonen kan maksimeres ved at man bruker lange lengder på gabionene, da dette krever at det lages færre tilkoblinger og forenkler monteringen.</li>"];
const buttonValue=["Neste","Neste","Neste","Neste","OBS!","Start på nytt"];
/*Henting av html elementer*/
let textField=document.getElementById("monteringInstruksjoner");
let step=document.getElementById("stepCount");
let tutorialImg=document.getElementById("monteringImage");
let fylling=document.getElementById("fyllingDemo");
let obs=document.getElementById("obsPictures");
let monteringWrapper=document.getElementById("monteringSection");
/*Andre variabler*/
let monteringIndex=1;
/*Funksjonen for montering tutorialen*/
function tutorial(){
  textField.innerHTML=contents[monteringIndex];
  monteringBtn.innerHTML=buttonValue[monteringIndex];
  monteringIndex++;
  step.innerHTML="Steg "+monteringIndex+":";
  if (monteringIndex>=contents.length){
    monteringIndex=0;
    fylling.style.display="none";
    obs.style.display="flex";
    tutorialImg.style.display="none";
    step.innerHTML="OBS!";
  }
  else if(monteringIndex==4){
    obs.style.display="none";
    fylling.style.display="flex";
    tutorialImg.style.display="flex";
    tutorialImg.src="assets/img/montering/"+monteringIndex+".jpg";
  }
  else{
    obs.style.display="none";
    fylling.style.display="none";
    tutorialImg.style.display="flex";
    tutorialImg.src="assets/img/montering/"+monteringIndex+".jpg";
  }
}
/*Eventlistener som fanger opp klikk på knappen*/
monteringBtn.addEventListener("click",tutorial);
