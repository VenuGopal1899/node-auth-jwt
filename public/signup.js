const form = document.getElementById("signup-form")

form.addEventListener('submit', signupUser);

async function signupUser(e){
    e.preventDefault();
    const firstName = document.getElementById("firstName");
    const middleName = document.getElementById("middleName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const ign = document.getElementById("ign");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    if(password.value !== confirmPassword.value){
        document.getElementById("err-message").innerHTML = "PASSWORDS DO NOT MATCH!"
        return;
    }

    document.getElementById("err-message").innerHTML = "";

    const result = await fetch('/api/signup', {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName, middleName, lastName, email, ign, password
        })
    }).then(res => res.json());
}