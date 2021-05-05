function checkJwtToken(){
    console.log('bitch');
    if(!localStorage.getItem("JWT")){
        window.location.href = "http://localhost:2000/login";
    }
}

function logout(){
    localStorage.removeItem("JWT");
    window.location.href = "http://localhost:2000/login";
}
