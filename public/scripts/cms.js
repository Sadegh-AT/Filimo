const $ = document;

// side navbar toggle tabs

let tabBtns = $.querySelectorAll(".navbar__box__ul__items");
let tabContents = $.querySelectorAll(".content");
let activeBtn = null;
let activeContent = null;

for (let i = 0; i < tabBtns.length ;i++) {

  tabBtns[i].addEventListener("click", () => {

    activeBtn = $.querySelector(".active.navbar__box__ul__items");
    activeContent = $.querySelector(".active.content");
    activeBtn.classList.remove("active");
    activeContent.classList.remove("active");
    tabBtns[i].classList.add("active");
    tabContents[i].classList.add("active");

  });

}

// comments modal

// let commentsModal = $.querySelector(".comments-modal");
// let commentsModal = $.querySelector(".comments-modal");
let closeModalBtn = $.querySelector(".close-modal");
