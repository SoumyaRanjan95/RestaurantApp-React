import SignUpModal from "./SignUpModal"
import UserLoginModal from "./UserLoginModal"
import { useState,useEffect } from "react"

function SignInSignUpModalbckgrnd(){

    const [loginorsignup, setLoginOrSignup] = useState("login")
    let jsx = (<UserLoginModal setLOS={setLoginOrSignup}/>)
    if(loginorsignup == "signup"){
        jsx = (<SignUpModal setLOS={setLoginOrSignup}/>)
    }




    return (
        <div className="modalBackground">

        {loginorsignup == "login"?jsx:jsx}
        </div>

    )
}

export default SignInSignUpModalbckgrnd