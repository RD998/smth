var sidebar = document.getElementById("sidebar");
var b0 = document.getElementById("btn0");
var b1 = document.getElementById("btn1");
var t0 = document.getElementById("a0");
var t1 = document.getElementById("a1");
var t2img = document.getElementById("a2");
var t3img = document.getElementById("a3");
var content = document.getElementById("content");
var sidebarSearch = document.getElementById("SBsearch");
var suggestion_box = document.getElementById("suggestion_box");

// window.onload = function() {
//     var name = sessionStorage.getItem('username');
//     if (!name) {
//     name = prompt('Please enter your name:');
//     sessionStorage.setItem('username', name);
//     }
//     document.getElementById('username').textContent = name;
// };

hover1 = document.querySelector('.sidebar');
y=0;    
        b1.style.display="none";
        b0.style.display = "flex";
        t0.style.display = "none";
        t1.style.display = "none";
        
    hover1.addEventListener('mouseenter', function() {
        y=1;
       
        console.log(y);
    });

    hover1.addEventListener('mouseleave', function() {
        y=0;
        content.style.opacity = "100%";
        console.log(y);


});


function sb_open() {
    b0.style.display="none";
    b1.style.display="flex";
    sidebar.style.width = "13%";
    content.style.maxWidth = "80%";
    content.style.marginLeft = "15%";
    t0.style.display = "flex";
    t1.style.display = "flex";
    t2img.style.display = "none";
    t3img.style.display = "none";
    content.style.opacity = "30%";
    sidebarSearch.style.display = "flex";
    sidebarSearch.style.transition = "0.3s ease-in-out";
}

function sb_close() {
    b0.style.display = "flex";
    b1.style.display="none";
    sidebar.style.width = "5%";
    t0.style.display = "none";
    t1.style.display = "none";
    t2img.style.display = "flex";
    t3img.style.display = "flex";
    content.style.maxWidth = "87%";
    content.style.marginLeft = "8%";
    sidebarSearch.style.display = "flex";
    sidebarSearch.style.transition = "0.3s ease-in-out";
    content.style.opacity = "100%";

}
function openNav() {
    document.getElementById("navbar").style.width = "100%";
    document.getElementById("navbar").style.display = "flex";
}

function closeNav() {
    document.getElementById("navbar").style.display = "none";
}