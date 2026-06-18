$(document).ready(function(){
    $('.navbar-toggler').click(function(){
        $('#menuIcon').toggleClass('bi-list bi-x');
    })
})

   function handleSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    if (email === "") {
        alert("Please enter your email");
        return;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email");
        return;
    }

    if (message === "") {
        alert("Please enter a message");
        return;
    }

    alert("Form submitted successfully!");
      document.getElementById("contactForm").reset();
}
