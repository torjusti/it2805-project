/*Variabler*/
const buttonValue=["Neste","Neste","Neste","Neste","OBS!","Start på nytt"];
let montBtn=document.getElementById("montering-btn");
let mont=document.getElementsByClassName("montering");
let montIndex=-1;
/*Funksjonen for montering tutorialen*/
function tutorial(){
  for(i=0;i<mont.length;i++){
    mont[i].style.display="none";
  }
  montIndex++;
  if (montIndex>=mont.length){
    montIndex=0;
    mont[montIndex].style.display="flex";
  }
  mont[montIndex].style.display="flex";
  montBtn.innerHTML=buttonValue[montIndex];
}
/*EventListener som fanger opp klikk på knappen*/
montBtn.addEventListener("click",tutorial);
