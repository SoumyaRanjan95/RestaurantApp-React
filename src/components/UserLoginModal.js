import { Link } from "react-router-dom";
import { useContext, useState , useEffect} from "react";
import { UserContext } from "../contexts/Context";
import { useDispatch } from "react-redux";
import {authenticateUserThunk} from '../redux_app/features/authenticate/autheticateSlice'
import { useSelector } from "react-redux";
import CSRFToken from "./CSRFToken";
import * as Data from './Data'
import { GlobalContext } from "../store";
import Cookies from "js-cookie";
import { login } from "../store/action/action";
import {useToast} from '../hooks/useToast'

function UserLoginModal({setLOS}){

    const [inputValue, setInputValue] = useState({mobile:"",password:""})
    const [failedMsg, setFailedMsg] = useState("")
    const {authState,authDispatch} =useContext(GlobalContext)

    const toast = useToast()

    //const dispatch = useDispatch()

    /*useEffect(() => {
        //fetchData();
    }, []);*/
    
    function closeModal(){
        document.querySelector(".modalBackground").style.visibility = "hidden"
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputValue({...inputValue,[name]: value})
    }

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginAction = login(authDispatch, toast)
        await loginAction(inputValue)

        setInputValue({...inputValue,mobile:"",password:""})
        closeModal();


    }

    return(
        <div className="LoginModal">
            <div className="LoginModal-top">
                <h5>Login</h5>
                <a onClick={closeModal}><i class="material-icons">close</i></a>
            </div>
            <div className="LoginModal-mid">
                <p>Mobile Number</p>
                <form onSubmit={handleSubmit} className="LoginModal-mid">
                    <input type="text" name="mobile" value={inputValue.mobile} onChange={handleChange} placeholder="Enter you Number"></input>
                    <input type="password" name="password" value={inputValue.password} onChange={handleChange} placeholder="Enter Password" required></input>
                    <input type="submit" value="Submit"/>
                </form>

            </div>
            <div className="LoginModal-bottom">
                <p>Don't have an Account <Link className="links" onClick={() => setLOS("signup")} style={{textDecoration: 'none'}} >Sign Up</Link></p>
            </div>
        </div>

    );
}

export default UserLoginModal;