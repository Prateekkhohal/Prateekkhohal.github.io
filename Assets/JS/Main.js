// HAMBURGER MENU

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))


// SCROLL TO TOP BUTTON

var rootElement = document.documentElement;
var scrollTo = document.querySelector(".scrollTop");

document.addEventListener("scroll", handleScroll);
scrollTo.addEventListener("click", scrollToTop);

function handleScroll() {
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop / scrollTotal > 0.2) {
        scrollTo.classList.add("show");
    } else {
        scrollTo.classList.remove("show");
    }
}

function scrollToTop() {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// LIGHT - DARK - THEME

const themeBtn = document.getElementById("theme-btn");
const darkTheme = "dark-theme";
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

// AUTOMATIC ADAPTS OS THEME 
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// CHANGING THEME  BY CLICKING ICON
themeBtn.addEventListener("click", () => {
    if (prefersDarkScheme.matches) {
        // THEME AND BG IS DARK -> AFTER CLICKING THE ICON IT WILL MAKE THEME & BG LIGHT
        document.body.classList.toggle(lightTheme);
        themeBtn.classList.toggle(iconTheme);
    }
    else {
        //NORMAL THEME CHANGE MODE
        document.body.classList.toggle(darkTheme);
        themeBtn.classList.toggle(iconTheme);
    }
})


// TAB - LINKS - SHOW CONTENT

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab")
}


// READ MORE & LESS BUTTON

function read() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("readBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}
