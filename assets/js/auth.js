
const cl = console.log;

const LoginForm = document.getElementById("LoginForm");

const LoginEmail = document.getElementById("LoginEmail");

const LoginPassword = document.getElementById("LoginPassword");

const SignUpForm = document.getElementById("SignUpForm");
const signUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
const signUpUser = document.getElementById("signUpUser");
const spinner = document.getElementById("spinner");

const BaseURL = "https://auth-git-main-iamrkjs-projects.vercel.app";

const LoginURL = `${BaseURL}/api/auth/login`;

const SignUPURL = `${BaseURL}/api/auth/register`;


const SnackBar = (icon, msg) => {

    Swal.fire({

        title: msg,
        icon: icon,
        timer: 1500
    })
}



const MakeAPICall = async (apiURL, method, body) => {

    body = body ? JSON.stringify(body) : null;

    spinner.classList.remove("d-none");

    let configObj = {

        method: method,
        body: body,
        headers: {

            "content-type": "application/json"
        }
    }

    try {

        let res = await fetch(apiURL, configObj);

        let data = await res.json();

        if (!res.ok) {

            let err = data.error || data.message

            throw new Error(err);
        }

        return data;
    }
    finally {

       spinner.classList.add("d-none");
    }
}

const onLogin = async (eve) =>{

    eve.preventDefault();

    let obj = {

        email : LoginEmail.value,
        password : LoginPassword.value,
    }

    try{

        let res = await MakeAPICall(LoginURL,"POST",obj); 
     
        localStorage.setItem("token",res.token);
        localStorage.setItem("userRole",res.userRole);
        localStorage.setItem("isLogin",true);

        window.location.href = "dashboard.html";

    }
    catch(err){

      SnackBar("error",err);
    }
}


const onSignUP = async (eve) =>{

    eve.preventDefault();

    let obj = {

        email : signUpEmail.value,
        password : signUpPassword.value,
        userRole : signUpUser.value,
          
    }

    try{
  
        let res = await MakeAPICall(SignUPURL,"POST",obj);

       SnackBar("success",res.message);

    }
    catch(err){

        SnackBar("error",err);
    }
}

LoginForm.addEventListener("submit",onLogin);
SignUpForm.addEventListener("submit",onSignUP);