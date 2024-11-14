import { UserContext } from "../contexts/Context";
import { useContext } from "react";


function Reservations(){
    const {user, setUser} = useContext(UserContext)


    function toggleClose(){
        document.querySelector(".reservations-background").style.visibility = "hidden";
    }

    const reservelist = user["reservations"].map(item => {
        return (<div className="reservation-list-item">
        <p>Name : {item.name_id}</p>
        <p>Date: {item.date}</p>
        <p>Guests: {item.guests}</p>
        <p>Location: {item.location_id}</p>
        </div>)
    })
//{user == ""?(<></>):(<p>{user["data"]["reservations"]}</p>)}
    return(
        <div className="reservations-background">
            <div className="reservations">
                <div className="sidepanel-head">
                    <h1>Welcome : {user["user"]}</h1>
                    <a id="sidepanel-head-clsbtn" onClick={toggleClose}>×</a>
                </div>
                <div className="sidepanel-body">
                    {user == ""?<></>:(reservelist)}
                </div>  
            </div>
        </div>

    )

}

export default Reservations;