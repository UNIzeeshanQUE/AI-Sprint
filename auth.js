function signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const user = {
    name: name,
    email: email,
    role: role,
  };

  localStorage.setItem("currentUser", JSON.stringify(user));

  if (role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "index.html";
  }
}

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault(); // 1️⃣ Stop form refresh
 
  // 2️⃣ Get input values
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("psw").value;
  const repeatPassword = document.getElementById("psw-repeat").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return; // STOP execution
  }

  // 4️⃣ Other validations
  if (password !== repeatPassword) {
    alert("Passwords do not match!");
    return;
  }

  // 5️⃣ Only runs if everything is valid
  const user = {
    name: username,
    email: email,
    role: "user",
  };

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "index.html";
});
