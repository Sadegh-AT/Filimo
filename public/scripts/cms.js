const $ = document;
const layer = $.querySelector(".layer");

const tabBtns = $.querySelectorAll(".navbar__box__ul__items");
const tabContents = $.querySelectorAll(".content");
let activeBtn = null;
let activeContent = null;

const usersBox = $.querySelector(".users-box");
const usersTableBody = $.querySelector(".users-table__body");

const editUsersModal = $.querySelector(".edit-users-modal");
const commentsModal = $.querySelector(".comments-modal");
const closeModalBtn = $.querySelectorAll(".close-modal__head__btn");
const deleteUserModal = $.querySelector(".delete-user-modal");

const deleteUserModalYesBtn = $.querySelector(".delete-user-modal__conainer__btns--yes");
const deleteUserModalNoBtn = $.querySelector(".delete-user-modal__conainer__btns--no");

let token;

const editUserModalFirstName = $.querySelector("#first-name");
const editUserModalLastName = $.querySelector("#last-name");
const editUserModalUserName = $.querySelector("#user-name");
const editUserModalEmail = $.querySelector("#email");
const editUserModalPhone = $.querySelector("#phone");
const subscriptionCheckbox = $.querySelector("#subscription-checkbox");
const editUserModalSubmitBtn = $.querySelector(".edit-users-submit-btn");


////////// Side navbar toggle tabs
for (let i = 0; i < tabBtns.length; i++) {

  tabBtns[i].addEventListener("click", () => {
    activeBtn = $.querySelector(".active.navbar__box__ul__items");
    activeContent = $.querySelector(".active.content");
    activeBtn.classList.remove("active");
    activeContent.classList.remove("active");
    tabBtns[i].classList.add("active");
    tabContents[i].classList.add("active");
  });
}

////////// GET TOKEN for API requests
const authorData = {
  phone: "09977777777",
  password: "345678",
};

async function authorLogin (authorData) {

  const res = await fetch("https://filimo-copy.iran.liara.run/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify (authorData),
  });
  const post = await res.json();
  token = await post.token
  getUsers (token)
  // getComments (token)
}
authorLogin (authorData)

////////// GET all users
async function getUsers (token) {

    const res = await fetch("https://filimo-copy.iran.liara.run/user", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const post = await res.json()
    usersTableGerator (post);
}

////////// Add users to table
function usersTableGerator (users) {
  usersTableBody.innerHTML = ""

  users.forEach( user => {
    usersTableBody.insertAdjacentHTML(
      "afterbegin",
      `
    <tr scope="row" data-id="${user._id}">
      <td class="delete-user-btn" onclick="deleteUser(event)">
        <svg  width="18px" height="18px" viewBox="-10.5 0 141 141" fill="#F89401">
          <g clip-path="url(#clip0)">
          <path d="M11.5444 32.2823C9.35715 31.9305 7.54822 31.7222 5.77811 31.3361C2.60909 30.6453 0.988478 29.1086 0.949674 26.938C0.909576 24.6587 2.59479 22.7092 5.87569 22.292C10.5613 21.6963 15.3053 21.5295 20.0298 21.2921C22.5844 21.1628 25.1505 21.2695 28.108 21.2695C27.6792 19.2916 27.3722 17.7509 27.0087 16.2245C26.2429 13.1665 26.65 9.93253 28.1496 7.15974C30.1545 3.31135 33.2097 0.966791 37.5694 0.821263C45.5316 0.555646 53.4969 0.406041 61.4656 0.372408C66.7407 0.347184 72.0174 0.592906 77.2929 0.718385C78.0463 0.736495 78.8024 0.733267 79.5532 0.788891C84.9341 1.18602 88.3773 3.94844 89.6146 9.22106C90.1746 11.6084 90.2464 14.1134 90.4974 16.5699C90.6267 17.8376 90.6642 19.1143 90.7561 20.58C91.624 20.7109 92.499 20.7908 93.3766 20.8193C99.1889 20.655 104.999 20.4131 110.812 20.2863C112.309 20.2218 113.808 20.3725 115.263 20.734C116.431 21.0072 117.48 21.649 118.255 22.5645C119.03 23.48 119.49 24.6206 119.566 25.8177C119.767 27.0519 119.583 28.318 119.038 29.4433C118.493 30.5687 117.614 31.4986 116.521 32.1065C115.619 32.6562 114.629 33.0624 113.507 33.6199C113.507 36.7542 113.4 39.8628 113.525 42.9615C114.262 61.3478 115.277 79.7315 114.594 98.1391C114.347 104.796 113.896 111.473 112.986 118.065C112.481 121.727 111.005 125.296 109.663 128.789C109.028 130.464 108.025 131.975 106.727 133.211C105.431 134.447 103.872 135.375 102.168 135.928C99.0207 137.007 95.789 137.824 92.5068 138.369C89.515 138.752 86.5044 138.965 83.4893 139.006C71.7672 139.589 60.0488 140.279 48.3201 140.659C43.3757 140.869 38.4223 140.655 33.5143 140.02C20.8881 138.243 14.0254 131.285 12.027 118.648C11.4349 115.148 11.1056 111.607 11.042 108.058C10.9084 87.7206 10.86 67.383 10.8971 47.0453C10.9036 42.2177 11.309 37.3887 11.5444 32.2823ZM21.2127 33.0682C21.7948 43.107 22.226 92.2559 23.3888 107.055C23.7316 111.419 24.7367 115.741 25.5968 120.052C26.4544 124.348 29.3576 126.846 33.5194 127.519C38.1759 128.271 42.9121 128.996 47.6074 128.961C59.3399 128.874 71.0738 128.47 82.7966 127.939C87.285 127.736 91.7507 126.893 96.212 126.238C97.0249 126.136 97.7855 125.78 98.3837 125.22C98.9826 124.66 99.3887 123.925 99.5452 123.121C100.163 120.625 100.962 118.14 101.257 115.602C102.95 101.021 102.602 86.3863 102.154 71.7566C101.802 60.2522 101.392 48.7496 101.003 37.2464C100.967 36.2116 100.896 35.1728 100.848 34.268C73.4015 33.8676 48.8905 33.4724 21.2146 33.0682H21.2127ZM38.4805 21.0379C52.0096 21.5275 65.2704 21.5062 78.6168 20.8833V11.9383C65.1229 11.4855 51.879 10.9991 38.4805 12.3115V21.0379Z" fill="#F89401"/><path d="M82.2128 77.7577C82.0718 70.8105 81.7413 63.7697 81.4212 56.9597L81.4147 56.8303C81.2996 54.3613 81.1871 51.8924 81.0758 49.4233C81.0267 48.5606 80.8643 47.7079 80.594 46.8872C80.0009 45.0115 78.6628 44.0226 76.9309 44.1862C75.8819 44.2729 74.0749 44.8129 73.7534 47.4479C73.7017 47.922 73.6758 48.3986 73.6758 48.8754C73.5724 57.4389 72.7905 85.75 72.7827 86.0385C72.6365 92.8447 72.4852 99.8798 72.3817 106.859C72.328 108.781 72.5014 110.703 72.8991 112.583C73.0912 113.579 73.6286 114.476 74.4164 115.115C75.2047 115.754 76.1929 116.094 77.207 116.076C77.326 116.076 77.4463 116.072 77.5673 116.063C78.5691 116.035 79.5282 115.652 80.2739 114.982C81.0189 114.312 81.502 113.4 81.6365 112.406C81.9916 110.339 82.1863 108.247 82.2186 106.15L82.2535 101.336C82.3105 93.6124 82.3725 85.6265 82.2128 77.7577Z" fill="#F89401"/><path d="M47.601 44.6397H47.5978C46.9525 44.6372 46.3163 44.7915 45.7438 45.0896C45.1714 45.3876 44.6799 45.8204 44.3118 46.3504C43.6882 47.4661 43.3364 48.7129 43.2848 49.9899C43.1749 51.7201 43.0595 53.4495 42.9418 55.2211C42.5376 61.3145 42.1187 67.6158 41.9389 73.8347C41.6802 82.6789 41.5929 91.666 41.5056 100.358C41.4794 103.018 41.4512 105.678 41.421 108.338C41.4195 109.427 41.5717 110.511 41.8736 111.557C42.5791 114.058 44.2769 115.611 46.3038 115.611H46.3685C48.4918 115.575 50.1886 113.898 50.6898 111.339C50.9369 109.985 51.0414 108.609 51.0012 107.234C50.8886 100.171 50.7506 93.1097 50.62 86.4012L50.5016 80.3356L50.6371 73.1316C50.7845 65.3281 50.9234 57.9518 51.0353 50.539C51.1016 49.296 50.9176 48.0524 50.494 46.882C50.2342 46.2985 49.8341 45.7884 49.3294 45.3972C48.8246 45.0059 48.2308 44.7458 47.601 44.6397Z" fill="#F89401"/>
          </g>
          <defs>
          <clipPath>
          <rect width="119" height="141" transform="translate(0.777344)"/>
          </clipPath>
          </defs>
        </svg>
      </td>
      <td class="edit-user-btn" onclick="editUser(event)">
        <svg fill="#F89401" width="20px" height="20px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny" ><path d="M21.561 5.318l-2.879-2.879c-.293-.293-.677-.439-1.061-.439-.385 0-.768.146-1.061.439l-3.56 3.561h-9c-.552 0-1 .447-1 1v13c0 .553.448 1 1 1h13c.552 0 1-.447 1-1v-9l3.561-3.561c.293-.293.439-.677.439-1.061s-.146-.767-.439-1.06zm-10.061 9.354l-2.172-2.172 6.293-6.293 2.172 2.172-6.293 6.293zm-2.561-1.339l1.756 1.728-1.695-.061-.061-1.667zm7.061 5.667h-11v-11h6l-3.18 3.18c-.293.293-.478.812-.629 1.289-.16.5-.191 1.056-.191 1.47v3.061h3.061c.414 0 1.108-.1 1.571-.29.464-.19.896-.347 1.188-.64l3.18-3.07v6zm2.5-11.328l-2.172-2.172 1.293-1.293 2.171 2.172-1.292 1.293z"/></svg>
      </td>
      <td>${user.registerDate}</td>
      <td>${user.isSubscription}</td>
      <td>${user.phone}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.fullName}</td>
    </tr>
    `
    );
  });
}

////////// Add layer
function addLayer () {
  layer.classList.add("active");
}

////////// Remove layer
function removeLayer () {
  layer.classList.remove("active");
}

////////// Remove layer by click on layer
layer.addEventListener("click", () => {
  removeLayer()
  const openedModal = $.querySelector(".open-modal")
  openedModal.classList.remove("open-modal");
})

////////// Edit user BTN
function editUser (event) {
  const userID = event.target.parentElement.dataset.id
  getSpecificUsers (userID)
  addLayer()
  editUsersModal.classList.add("open-modal")

  //add click event on submit btn
  editUserModalSubmitBtn.addEventListener("click", function(){

    const newData = {
      first_name:  editUserModalFirstName.value,
      last_name: editUserModalLastName.value,
      username: editUserModalUserName.value,
      phone: editUserModalPhone.value,
      email: editUserModalEmail.value,
      isSubscription: subscriptionCheckbox.checked,
    }

    console.log(typeof(newData.isSubscription))

    async function submitChanges () {
      const res = await fetch(`https://filimo-copy.iran.liara.run/user/edit/${userID}` ,
      {
        method: "PUT",
        headers:{
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify (newData)
      })
      const post = await res.json();
      getUsers (token)
    }
    submitChanges ()
    removeLayer ()
    editUsersModal.classList.remove("open-modal")
  })
}


//////// GET specific user
async function getSpecificUsers (userID) {

  const res = await fetch(`https://filimo-copy.iran.liara.run/user/find/${userID}`,
  {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
  const post = await res.json()
  addInfoToEditModal(post)
}

//////// Here, the information taken from the backend is displayed inside the fields
function addInfoToEditModal (userInfo) {
  editUserModalFirstName.value = userInfo.first_name
  editUserModalLastName.value = userInfo.last_name
  editUserModalUserName.value = userInfo.username
  editUserModalEmail.value = userInfo.email
  editUserModalPhone.value = userInfo.phone

}
////////// Close modal BTN
closeModalBtn.forEach( btn => {
  btn.addEventListener("click", () => {
    removeLayer()
    editUsersModal.classList.remove("open-modal")
  })
})

////////// Delete user
function deleteUser (event) {
  addLayer()
  deleteUserModal.classList.add("open-modal")
  let userID = event.target.parentElement.dataset.id

  deleteUserModalYesBtn.addEventListener("click", function () {

    // User delete request
      deleteUserRequest(token, userID)
      getUsers (token) 
      deleteUserModal.classList.remove("open-modal")
      removeLayer ()
  })

  deleteUserModalNoBtn.addEventListener("click", function () {
    deleteUserModal.classList.remove("open-modal")
    removeLayer ()
  })
}

async function deleteUserRequest (token, userID) {
  const res = await fetch(`https://filimo-copy.iran.liara.run/user/delete/${userID}`, 
  {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
  const post = await res.json()
} 

////////// Get all comments
// async function getComments (token) {

//   const res = await fetch("https://filimo-copy.iran.liara.run/comment",
//   {
//     method: "GET",
//     headers: {
//       Authorization: token,
//     },
//   });
//   const post = await res.json()
//   console.log (post);
// }
