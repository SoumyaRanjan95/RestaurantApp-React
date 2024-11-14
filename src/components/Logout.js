import { useContext } from "react";
import { UserContext } from "../contexts/Context";

function Logout(){

    const {user, setUser} = useContext(UserContext)

    const handleLogout = () => {
        console.log("Logout");
        setUser({...user, user:"",isLogged: false,reservations:[]})
        
    }


    return (
        <div id="logout">
            <a  onClick={handleLogout}> <i class="material-icons">logout</i></a>
      </div>
    )

}

export default Logout