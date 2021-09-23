let dropdownMenu = document.getElementById("dropdown-menu");
let dropdownbtn = document.getElementById("paintbrush");

dropdownbtn.addEventListener("mouseover",function(){
    dropdownMenu.style.display = "block";
})
window.onclick = function(){
    dropdownMenu.style.display = "none";
}
// dropdownbtn.addEventListener("mouseout",function(){
//     setTimeout(function(){
// dropdownMenu.style.display = "none";
// }, 1000); 
// })




