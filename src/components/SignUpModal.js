import { Link } from "react-router-dom";
import { useState } from "react";

function SignUpModal({setLOS}){

    const [signUpData, setSignUpData] = useState({username:"",mobile:"", email:"",password:""})
    const [passwd2, setPasswd2] = useState("")
    
    function closeModal(){
        document.querySelector(".modalBackground").style.visibility = "hidden"
        setLOS("login");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSignUpData({...signUpData,[name]: value})
    }

    const handleSubmit = (e) => {
        const URL = "http://localhost:8001/api/users/"
        e.preventDefault();

        if(passwd2 == signUpData.password){
            (async () => {
                console.log()
                const rawResponse = await fetch(URL, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(signUpData)
                });
                const content = await rawResponse.json();
              
                console.log(content);
              })();
        }else{
            console.log("Password not same")
        }
        

        setSignUpData({username:"",mobile:"", email:"",password:""})
        setPasswd2("")
        closeModal()

    }

    return(
        <div className="LoginModal">
            <div className="LoginModal-top">
                <h5>Sign Up</h5>
                <a onClick={closeModal}><i class="material-icons">close</i></a>
            </div>
            <div className="LoginModal-mid">
                <p>Enter Details for Signing Up </p>
                <form onSubmit={handleSubmit} className="LoginModal-mid">
                    <input type="text" name="username" value={signUpData.username} onChange={handleChange} placeholder="Enter you Name" required></input>
                    <input type="text" name="mobile" value={signUpData.mobile} onChange={handleChange} placeholder="Enter you Mobile Number" required></input>
                    <input type="email" name="email" value={signUpData.email} onChange={handleChange} placeholder="Enter you Email" required></input>
                    <input type="password" name="password" value={signUpData.password} onChange={handleChange} placeholder="Enter Password" required></input>
                    <input type="password" name="passwd2" value={passwd2} onChange={(e) => setPasswd2(e.target.value)} placeholder="Re-Enter Password" required></input>
                    <input type="submit" value="Next"/>
                </form>

            </div>
            <div className="LoginModal-bottom">
                <p>Have an Account <Link onClick={()=> setLOS("login")} style={{textDecoration: 'none'}} >Log In </Link></p>
            </div>
        </div>

    );
}

export default SignUpModal;