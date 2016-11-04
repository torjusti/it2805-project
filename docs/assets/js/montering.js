/*Variabler*/
let montIndex=-1;
/*HTML elementer hentes*/
let assemblyIntro=document.getElementById("assembly-intro");
let progBar=document.getElementById("prog-bar");
let progBarElement=document.getElementsByClassName("prog-bar-element");
let assemblyBtnNext=document.getElementById("assembly-btn-next");
let assemblyBtnBack=document.getElementById("assembly-btn-back");
let assemblyContent=document.getElementsByClassName("assembly-content");
/*EventListener som fanger opp klikk på "neste" knappen*/
assemblyBtnNext.addEventListener("click",function(e){
  assemblyBtnNext.innerHTML="Neste";
  progBar.style.display="flex";
  assemblyBtnBack.style.display="flex";
  assemblyIntro.style.display="none";
  for(i=0;i<assemblyContent.length;i++){
    assemblyContent[i].style.display="none";
    progBarElement[i].style.color="#999";
  }
  montIndex++;
  if (montIndex>=assemblyContent.length){
    montIndex=0;
  }
  else if(montIndex>=assemblyContent.length-1){
    assemblyBtnNext.innerHTML="Start på nytt";
  }
  assemblyContent[montIndex].style.display="flex";
  progBarElement[montIndex].style.color="#00A651";
})
/*EventListener som fanger opp klikk på "tilbake" knappen*/
assemblyBtnBack.addEventListener("click",function(e){
  for(i=0;i<assemblyContent.length;i++){
    assemblyContent[i].style.display="none";
    progBarElement[i].style.color="#999";
  }
  montIndex--;
  if (montIndex<=-1){
    montIndex=assemblyContent.length-1;
  }
  assemblyContent[montIndex].style.display="flex";
  progBarElement[montIndex].style.color="#00A651";
});
