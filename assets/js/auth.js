const AUTH_URL = `https://my-auth-project-a38da-default-rtdb.firebaseio.com/`
const LOGIN_URL = `${AUTH_URL}api/auth/login`;

const SIGN_UP_URL = `${AUTH_URL}api/auth/register`;


//********SingUp functionality******* */

const signUpForm = document.getElementById('signUpForm');
const signUpemail = document.getElementById('signUpemail');
const signUppassword = document.getElementById('signUppassword');
const signUpuserRole = document.getElementById('signUpuserRole');

async function onSignUp (ele) {
    eve.preventDefault();
    try{
        //get Obj
        let obj = {
            email : signUpemail.value,
            password : signUppassword.value,
            userRole : signUpuserRole.value
        }
        let res = await fetch(SIGN_UP_URL,{
            method : "POST",
            body : JSON.stringify(obj),
            headers : {
                "content-type" : "application/json" 
            }
        })
        let data = await res.json();
        if(!res.ok){
            throw new Error(data.message || res.statusText || 'Something went wrong' )
        }
        Swal.fire({
            title : 'Account created Successfully!!',
            icon : 'success'
        })
       signUpForm.reset();



    }catch(err){
        cl(err)
        Swal.fire({
            title : err.message,
            icon : "error",
            timer : 1500
        })
    }
}

signUpForm.addEventListener("submit", onSignUp)

//********Login functionality******* */

const loginForm = document.getElementById('loginForm');
const loginemail = document.getElementById('loginemail');
const loginpassword = document.getElementById('loginpassword');
const loginuserRole = document.getElementById('loginuserRole');

const onlogin = async (eve) => {
     eve.preventDefault();
    try{
        //get Obj
        let obj = {
            email : loginemail.value,
            password : loginpassword.value
        } 
        let res = await fetch(LOGIN_URL, {
            method : "POST",
            body :  JSON.stringify(obj),
            headers : {
                "content-type" : "application/json" 
            }
        })

         let data = await res.json();
        if(!res.ok){
            throw new Error(data.message || data.error || res.statusText || 'Something went wrong' )
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.userRole);

         Swal.fire({
            title : data.message,
            icon : "error",
            timer : 1500
        })

}catch(err){
   cl(err)
    Swal.fire({
            title : err.message,
            icon : "error",
            timer : 1500
        })
}

}
loginForm.addEventListener("submit", onlogin);

