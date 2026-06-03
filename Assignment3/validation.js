function validatesignup(){
    console.log("validate called")
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let phno=document.getElementById("phno").value;
    let error=document.getElementById("checkforerror");
     let regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(name.trim()==""){
        error.innerHTML="Please enter your Name";
        return;
    }
    console.log(email);
    console.log(regex.test(email));
    if(!regex.test(email)){
        error.innerHTML="please enter a valid Email";
        return
    }
    if(password.length<6){
        error.innerHTML="please enter a password with atleast 6 characters";
        return;
    }
    if(phno.length!==10){
        error.innerHTML="Please enter a valid Phone Number";
        return;
    }
    error.style.color="green";
    error.innerHTML="Registration Successful"
    location.reload();

}
function validatesignin(){
    let email=document.getElementById("email").value;
     let password=document.getElementById("password").value;
     let error=document.getElementById("checkforerror2");
      let regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(!regex.test(email)){
        error.innerHTML="please enter a valid Email";
        return
    }
     if(password.length<6){
        error.innerHTML="please enter a password with atleast 6 characters";
        return;
    }
    location.reload();
}