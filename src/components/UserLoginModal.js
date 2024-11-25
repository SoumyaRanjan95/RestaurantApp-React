import { Link } from "react-router-dom";
import { useContext, useState , useEffect} from "react";
import { UserContext } from "../contexts/Context";
import { useDispatch } from "react-redux";
import {authenticateUserThunk} from '../redux_app/features/authenticate/autheticateSlice'
import { useSelector } from "react-redux";
import CSRFToken from "./CSRFToken";
import * as Data from './Data'

function UserLoginModal({setLOS}){

    const [inputValue, setInputValue] = useState({mobile:"",password:""})
    const [failedMsg, setFailedMsg] = useState("")
    const {user, setUser} = useContext(UserContext)

    const dispatch = useDispatch()

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

    /*async function fetchData(){

          try{

            const URL = "http://localhost:8001/api/auth/"
            let response = await fetch(URL,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputValue)
              });
    
              let data = await response.json();
              console.log(data)
              //setUser({...user,user:data["data"]["username"], isLogged: true, reservations:data["data"]["reservations"]})
              console.log(user)
              closeModal();

          }catch{
            setInputValue({...inputValue,mobile:"",password:""})
            setUser({...user,user:"", isLogged: false, reservations:[]})


          }
    }*/


    const handleSubmit = async (e) => {
        e.preventDefault();

        let userlogin = Data.RestaurantUser.filter((item) => {
            if(item.mobile == inputValue.mobile && item.password === inputValue.password){
                return true
            }else{
                return false
            }
        });

        if(userlogin.length === 0){
            alert('Login failed')
        }else{

            setUser({...user,
                mobile:userlogin[0].mobile,
                email:userlogin[0].email,
                fullname:userlogin[0].fullname,
                is_authenticated: !userlogin[0].is_authenticated,
            })   
        }


        console.log(user)


        /*dispatch(authenticateUserThunk(inputValue))
        .then(res => console.log(res.payload.data))*/
        //fetchData();
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
                    {failedMsg==""?(<></>):(<p style={{'color':'red'}}>{failedMsg}</p>)}
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