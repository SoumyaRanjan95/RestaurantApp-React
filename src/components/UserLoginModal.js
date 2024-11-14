import { Link } from "react-router-dom";
import { useContext, useState , useEffect} from "react";
import { UserContext } from "../contexts/Context";

function UserLoginModal({setLOS}){

    const [inputValue, setInputValue] = useState({mobile:"",password:""})
    const [failedMsg, setFailedMsg] = useState("")
    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        fetchData();
    }, []);
    
    function closeModal(){
        document.querySelector(".modalBackground").style.visibility = "hidden"
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputValue({...inputValue,[name]: value})
    }

    async function fetchData(){

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
              setUser({...user,user:data["data"]["username"], isLogged: true, reservations:data["data"]["reservations"]})
              console.log(user)
              closeModal();

          }catch{
            setInputValue({...inputValue,mobile:"",password:""})
            setUser({...user,user:"", isLogged: false, reservations:[]})


          }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchData();
        setInputValue({...inputValue,mobile:"",password:""})

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
                    <input type="submit" value="Next"/>
                </form>

            </div>
            <div className="LoginModal-bottom">
                <p>Don't have an Account <Link onClick={() => setLOS("signup")} style={{textDecoration: 'none'}} >Sign Up</Link></p>
            </div>
        </div>

    );
}

export default UserLoginModal;