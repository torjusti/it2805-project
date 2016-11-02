const buttonValue=["Neste","Neste","Neste","Neste","OBS!","Start på nytt"];
const stegName=["Steg 1:","Steg 2:","Steg 3:","Steg 4:","Steg 5:","OBS!"]
/*Henting av html elementer*/
let monteringButton=document.getElementById("monteringBtn");
let step=document.getElementById("stepCount");
let mont=document.getElementsByClassName("monteringCont");
/*Andre variabler*/
let monteringIndex=0;
/*Funksjonen for montering tutorialen*/
function tutorial(){
  monteringButton.innerHTML=buttonValue[monteringIndex];
  step.innerHTML=stegName[monteringIndex];
  step.style.display="flex";
  for(i=0;i<mont.length;i++){
    mont[i].style.display="none";
  }
  monteringIndex++;
  if (monteringIndex>=mont.length){
    monteringIndex=0;
  }
  mont[monteringIndex].style.display="flex";
}
/*Eventlistener som fanger opp klikk på knappen*/
monteringBtn.addEventListener("click",tutorial);
