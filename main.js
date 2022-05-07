const home = document.querySelector(".topIntro #home a");

function showManual(){
    home.style.color = "gray";
}

home.addEventListener("mouseover", showManual);
home.addEventListener("mouseout", ()=>
{
    home.style.color = "white";
})