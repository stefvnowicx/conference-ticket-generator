const formBody = document.querySelector(".form-body");
const ticketBody = document.querySelector(".ticket-body");

const fileInput = document.querySelector("#file");

const nameInput = document.querySelector("#name");
const mailInput = document.querySelector("#mail");
const usernameInput = document.querySelector("#username");

const submitBtn = document.querySelector("#submit");

// for ticket photo and form photo
let src, name, email, username;
let validation = true; // Flaga walidacji
let ticketName, ticketEmail, ticketUsername, ticketImg;

// get photo from user input
const getPhoto = (e) => {
   const file = e.target.files[0];

   if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
         const img = document.getElementById("uploadIcon");
         src = e.target.result;
         img.src = src;
      };

      reader.readAsDataURL(file);
   }
};

fileInput.addEventListener("change", getPhoto);

// Funkcja do sprawdzania walidacji
const checkInputs = () => {
   validation = true; // Resetowanie flagi przed rozpoczęciem walidacji
   validateName();
   validateMail();
   validateUsername();

   if (validation) {
      // Jeśli wszystkie walidacje przeszły pomyślnie
      setItems();
      changePage(); // Zmień stronę
   }
};

// Funkcja walidacji imienia
const validateName = () => {
   name = nameInput.value;
   const errorText = nameInput.nextElementSibling;

   errorText.textContent = "";

   if (!name) {
      errorText.textContent = "Name is required";
      validation = false; // Ustawienie flagi na false, jeśli błąd
      return;
   }

   const nameRegex = /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
   if (!nameRegex.test(name)) {
      errorText.textContent = "Name can only contain letters";
      validation = false; // Ustawienie flagi na false, jeśli błąd
      return;
   }

   if (name.length < 2 || name.length > 30) {
      errorText.textContent = "Name must be between 2 and 30 characters long";
      validation = false; // Ustawienie flagi na false, jeśli błąd
      return;
   }
};

// Funkcja walidacji maila
const validateMail = () => {
   email = mailInput.value;
   const errorText = mailInput.nextElementSibling;

   errorText.textContent = "";

   if (!email) {
      errorText.textContent = "Email is required";
      validation = false; // Ustawienie flagi na false, jeśli błąd
      return;
   }

   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (!emailRegex.test(email)) {
      errorText.textContent = "Please enter a valid email address";
      validation = false; // Ustawienie flagi na false, jeśli błąd
      return;
   }
};

// Funkcja walidacji nazwy użytkownika
const validateUsername = () => {
   username = usernameInput.value;
   const errorText = usernameInput.nextElementSibling;

   errorText.textContent = "";

   if (!username.startsWith("@")) {
      errorText.textContent = "Username must start with '@'";
      validation = false; // Ustawienie flagi na false, jeśli błąd
      return;
   }

   const usernameRegex = /^@[A-Za-z0-9.-]+$/;
   if (!usernameRegex.test(username)) {
      errorText.textContent = "Username can only contain letters, numbers, dots, and hyphens after '@'";
      validation = false; // Ustawienie flagi na false, jeśli błąd
      return;
   }

   if (username.length < 3 || username.length > 39) {
      errorText.textContent = "Username must be between 3 and 39 characters long";
      validation = false; // Ustawienie flagi na false, jeśli błąd
      return;
   }
};

// Funkcja do zmiany strony
const changePage = () => {
   setItems();
   formBody.classList.add("hidden");
   ticketBody.classList.remove("hidden");
   ticketBody.classList.add("flex");
};

const setItems = (params) => {
   ticketName = document.querySelectorAll(".ticket-name");
   ticketEmail = document.querySelector(".ticket-email");
   ticketUsername = document.querySelector(".ticket-username");
   ticketImg = document.querySelector(".ticket-img");

   ticketName.forEach((nameEl) => {
      nameEl.textContent = name;
   });
   ticketEmail.textContent = email;
   ticketUsername.textContent = username;
   ticketImg.src = src;
};

submitBtn.addEventListener("click", (e) => {
   e.preventDefault();
   checkInputs();
});


