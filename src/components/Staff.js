import { Link, redirect } from "react-router-dom";
import { useContext, useState , useEffect} from "react";
import { UserContext } from "../contexts/Context";
import { useDispatch } from "react-redux";
//import staffauthenticateThunk from '../redux_app/features/staffauthenticate/staffauthenticateSlice'
import staffauthenticateThunk from '../redux_app/features/authenticate/autheticateSlice'

import { useSelector } from "react-redux";

function Staff(){

    const [inputValue, setInputValue] = useState({mobile:"",password:""})
    const [failedMsg, setFailedMsg] = useState("")
    const {user, setUser} = useContext(UserContext)

    const dispatch = useDispatch()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({...inputValue,[name]: value})
    }


    const handleSubmit = async (e) => {

        const URL = "http://localhost:8001/staff/"
        e.preventDefault();

            /*(async () => {
                console.log()
                const rawResponse = await fetch(URL, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(inputValue)
                });
                const content = await rawResponse.json();
              
                console.log(content);
              })();*/
        

        //dispatch(staffauthenticateThunk(inputValue));
        //dispatch({type: 'dsds/dsd'})
        //fetchData();
        setInputValue({...inputValue,mobile:"",password:""})


    }

    return(
        <div className="LoginModal">
            <div className="LoginModal-top">
                <h5>Staff Login</h5>
            </div>
            <div className="LoginModal-mid">
                <p>Mobile Number</p>
                <form onSubmit={handleSubmit} className="LoginModal-mid">
                    <input type="text" name="mobile" value={inputValue.mobile} onChange={handleChange} placeholder="Enter you Number"></input>
                    <input type="password" name="password" value={inputValue.password} onChange={handleChange} placeholder="Enter Password" required></input>
                    <input type="submit" value="Submit"/>
                </form>

            </div>

        </div>

    );
}

export default Staff;