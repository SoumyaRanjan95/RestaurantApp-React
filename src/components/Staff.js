import { Link } from "react-router-dom";
import { useContext, useState , useEffect} from "react";
import { UserContext } from "../contexts/Context";
import { useDispatch } from "react-redux";
import staffauthenticateThunk from '../redux_app/features/staffauthenticate/staffauthenticateSlice'
import { useSelector } from "react-redux";

function Staff(){

    const [inputValue, setInputValue] = useState({mobile:"",password:""})
    const [failedMsg, setFailedMsg] = useState("")
    const {user, setUser} = useContext(UserContext)

    const dispatch = useDispatch()
    const isAuthenticated=useSelector(state => state)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({...inputValue,[name]: value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        //dispatch(staffauthenticateThunk(inputValue));
        console.log(staffauthenticateThunk(inputValue))
        dispatch({type: 'dsds/dsd'})
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