
document.onclick = e = function(){
    console.log("Dummy log in console in order to provide a dummy js file.");
};


window.onload = function() { document.body.classList.remove('is-preload'); };
window.ontouchmove = function() { return false; };
window.onorientationchange = function() { document.body.scrollTop = 0; };