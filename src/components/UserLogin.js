
import { useState } from "react"
import UserLoginModal from "./UserLoginModal"
import SignUpModal from "./SignUpModal"
import SignInSignUpModalbckgrnd from "./SignInSignUpModalbckgrnd"
export function openModal(){
  //setIsVisible("visible")
  document.querySelector(".modalBackground").style.visibility = "visible"    
}
function UserLogin(){




    return (
      <>
      <div  className="userLogin maticon">
        <a onClick={openModal}><i className="material-icons">person</i></a>
      </div>
      <SignInSignUpModalbckgrnd/>
      </>

    )
}

//      {loginorsignup == "login"?(<UserLoginModal setLOS = {setLoginOrSignup} setiV = {setIsVisible}/>):(<SignUpModal setLOS = {setLoginOrSignup} setiV = {setIsVisible}/>)}


export default UserLogin
// React component re-renders whent its state or the props change