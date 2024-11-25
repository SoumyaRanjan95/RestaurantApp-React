import { useContext } from "react";
import { UserContext } from "../contexts/Context";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../redux_app/features/authenticate/autheticateSlice";

function Logout(){

    const {user, setUser} = useContext(UserContext)
    const dispatch = useDispatch()

    const handleLogout = () => {
        //dispatch(logoutUserThunk({})) 
        setUser({...user,
            mobile:'', //unique
            email:'',
            fullname:'',
            is_authenticated: false,
            reservations:[],
          })

    }


    return (
        <div className='maticon' id="logout">
            <a  onClick={handleLogout}> <i class="material-icons">logout</i></a>
      </div>
    )

}

export default Logout