const buttonValue=["Neste","Neste","Neste","Neste","OBS!","Start på nytt"];
const stegName=["Steg 1:","Steg 2:","Steg 3:","Steg 4:","Steg 5:","OBS!"]
/*Henting av html elementer*/
let monteringButton=document.getElementById("monteringBtn");
let textField=document.getElementById("monteringInstruksjoner");
let step=document.getElementById("stepCount");
let mont1=document.getElementById("montering1");
let mont2=document.getElementById("montering2");
let mont3=document.getElementById("montering3");
let mont4=document.getElementById("montering4");
let mont5=document.getElementById("montering5");
let mont6=document.getElementById("montering6");
/*Andre variabler*/
let monteringIndex=-1;
/*Funksjonen for montering tutorialen*/
function tutorial(){
  monteringIndex++;
  if(monteringIndex==0){
    monteringButton.innerHTML=buttonValue[monteringIndex]
    step.innerHTML=stegName[monteringIndex]
    step.style.display="flex";
    mont1.style.display="flex";
    mont2.style.display="none";
    mont3.style.display="none";
    mont4.style.display="none";
    mont5.style.display="none";
    mont6.style.display="none";
  }
  else if(monteringIndex==1){
    monteringButton.innerHTML=buttonValue[monteringIndex]
    step.innerHTML=stegName[monteringIndex]
    mont1.style.display="none";
    mont2.style.display="flex";
    mont3.style.display="none";
    mont4.style.display="none";
    mont5.style.display="none";
    mont6.style.display="none";
  }
  else if(monteringIndex==2){
    monteringButton.innerHTML=buttonValue[monteringIndex]
    step.innerHTML=stegName[monteringIndex]
    mont1.style.display="none";
    mont2.style.display="none";
    mont3.style.display="flex";
    mont4.style.display="none";
    mont5.style.display="none";
    mont6.style.display="none";
  }
  else if(monteringIndex==3){
    monteringButton.innerHTML=buttonValue[monteringIndex]
    step.innerHTML=stegName[monteringIndex]
    mont1.style.display="none";
    mont2.style.display="none";
    mont3.style.display="none";
    mont4.style.display="flex";
    mont5.style.display="none";
    mont6.style.display="none";
  }
  else if(monteringIndex==4){
    monteringButton.innerHTML=buttonValue[monteringIndex]
    step.innerHTML=stegName[monteringIndex]
    mont1.style.display="none";
    mont2.style.display="none";
    mont3.style.display="none";
    mont4.style.display="none";
    mont5.style.display="flex";
    mont6.style.display="none";
  }
  else if(monteringIndex==5){
    monteringButton.innerHTML=buttonValue[monteringIndex]
    step.innerHTML=stegName[monteringIndex]
    mont1.style.display="none";
    mont2.style.display="none";
    mont3.style.display="none";
    mont4.style.display="none";
    mont5.style.display="none";
    mont6.style.display="flex";
    monteringIndex=-1;
  }
}
/*Eventlistener som fanger opp klikk på knappen*/
monteringBtn.addEventListener("click",tutorial);
