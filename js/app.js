/**
 * to test code performance
 * const startingTime = performance.now();
 * my code
 * const endingTime = performance.now();
 * console.log('This code took ' + (endingTime - startingTime) + ' milliseconds.');
 */

/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

// for ESLint
/* eslint-env browser */
/**
 * Define Global Variables
 *
 */
//Array for all sections in the landing page

const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// function to add class active to the first link as default
const defaultActive = () => {
  const links = document.getElementsByClassName("menu__link");
  if (links.length > 0) {
    links[0].classList.add("active__class__link");
  }
};

//function to detect which viewport we are in now using getBoundingClientRect()
const isInViewPort = (e) => {
  var rect = e.getBoundingClientRect();
  const currentScroll = window.scrollY;
  const viewportFromBottom = currentScroll + window.innerHeight;
  const topDistance = rect.top + currentScroll;
  const distanceFromBottom = topDistance + e.clientHeight - 200; //200px added to solve a problem when scrolling to fit section to view

  return (
    (distanceFromBottom >= currentScroll &&
      distanceFromBottom <= viewportFromBottom) ||
    (topDistance <= viewportFromBottom && topDistance >= currentScroll)
  );
};

// function to remove active class from link
const removeActiveClassFromLink = () => {
  const activeClassLink = document.querySelector(".active__class__link");
  if (activeClassLink) {
    activeClassLink.classList.remove("active__class__link");
  }
};

// function to remove active class from section
const removeActiveClassFromSection = () => {
  const activeClassSection = document.querySelector(".active__class__section");
  if (activeClassSection) {
    activeClassSection.classList.remove("active__class__section");
  }
};

//function to detect the current link that's now been viewed it's content
const searchMenuLink = function (link) {
  const menuLinks = document.querySelectorAll(".menu__link");
  let choosenLink;

  for (var i = 0; i < menuLinks.length; i++) {
    if (menuLinks[i].textContent == link) {
      choosenLink = menuLinks[i];
      break;
    }
  }
  return choosenLink;
};

//function for link back to top 'additional feature'
const b2top = document.getElementById("back2top");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 200) {
    b2top.style.display = "block";
  } else {
    b2top.style.display = "none";
  }
});
// function to smooth scrolling
const smoothScrollToTop = () => {
  const scrollHeight = document.body.scrollTop;
  if (scrollHeight) {
    window.requestAnimationFrame(smoothScrollToTop);
    window.scrollTo(0, scrollHeight - scrollHeight / 10); //10 is a number to divide by if we increes it time to scroll will increase
  }
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const navbarList = document.getElementById("navbar__list");
const buildNav = () => {
  sections.forEach((section) => {
    const newListItem = document.createElement("li");
    const newLink = document.createElement("a");
    const linkContent = section.querySelector("h2").textContent;

    newLink.classList.add("menu__link");
    newLink.textContent = linkContent;
    newListItem.appendChild(newLink);
    navbarList.appendChild(newListItem);
  });
};

//when on mobile devices use collapse menu
navbarList.style.left = "-100%"; // set value of menu style to hide it
const swichMenu = () => {
  if (navbarList.style.left == "-100%") {
    navbarList.style.left = 0;
  } else {
    navbarList.style.left = "-100%";
  }
};

// Add class 'active' to section when near top of viewport
const addActiveClass = () => {
  for (let section of sections) {
    if (isInViewPort(section)) {
      removeActiveClassFromSection();
      section.classList.add("active__class__section");

      removeActiveClassFromLink();
      const currentLink = searchMenuLink(section.getAttribute("data-nav"));
      currentLink.classList.add("active__class__link");
      break;
    }
  }
};
// Scroll to anchor ID using scrollTO event
const scrollToAnchor = () => {
  const menu_Links = document.querySelectorAll(".menu__link");
  menu_Links.forEach((menu_Link, i) => {
    menu_Link.addEventListener("click", scroll);

    function scroll() {
      removeActiveClassFromLink();
      menu_Link.classList.add("active");
      // Scroll to section on link click
      sections[i].scrollIntoView({ behavior: "smooth" });
      removeActiveClassFromSection();
      sections[i].classList.add("active_section");
      sections[i].childNodes[1].firstElementChild.classList.add("active__section");
      sections[i].childNodes[1].lastElementChild.style.maxHeight = sections[i].childNodes[1].lastElementChild.scrollHeight + "px";
      swichMenu(); // for small devices if menu item clicked hide menu
    }
  });
};
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu and add active class to the first menu link
setTimeout(buildNav, 0);
setTimeout(defaultActive, 0);

// Scroll to section on link click
setTimeout(scrollToAnchor, 0);

// Set sections as active
window.addEventListener("scroll", addActiveClass);

//smooth scroll to top
b2top.addEventListener("click", smoothScrollToTop);

//when refresh go to top automaticlly
window.addEventListener("load", smoothScrollToTop);

//event to collapse menu
const myMenu = document.getElementById("collapse__menu");
myMenu.addEventListener("click", swichMenu);

/**
 * additional functions
 */
//when not scroll hide navbar
const pageHeader = document.getElementsByClassName('page__header');

let prevScroll = window.pageYOffset;
window.onscroll = () => {
let currentScroll = window.pageYOffset;
  if (prevScroll > currentScroll) {
    pageHeader[0].style.top = "0";
  } else {
    pageHeader[0].style.top = "-100px";
  }
  prevScroll = currentScroll;
}

//collapsible sections 
const coll = document.getElementsByClassName('collapsible__section');

for(let i = 0 ; i<coll.length ; i++ ){
  coll[i].addEventListener('click',() => {
    coll[i].classList.toggle("active__section");
    let content = coll[i].nextElementSibling;
    if(content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  })
}