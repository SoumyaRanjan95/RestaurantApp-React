import { useSelector } from "react-redux";
import { UserContext } from "../contexts/Context";
import { useContext } from "react";
import * as Data from './Data'

function Reservations({user}){
    
    
    function toggleClose(){
        document.querySelector(".reservations-background").style.visibility = "hidden";
    }

    const handleCloseKeyDown = (e) => {
        if(e.key == "Escape"){
            document.querySelector(".reservations-background").style.visibility = "hidden";
        }

    }

    const handleReservationClose = () => {
        document.querySelector(".reservations-background").style.visibility = "hidden";
    }

    const handleDeleteReservations = () => {
        alert("Will handle delete reservations using API calls...")
    }


    function reservelist(user){

        function ReservationTemplate({item}){

            return(
                <div className="reservation-list-item">
                            <div className="reservation-list-item1">
                
                                <div className="reservation-list-item-body">
                                    <div className="reservation-list-item-body-items"><i class="material-icons">calendar_month</i><p>{item.date}</p></div>
                                    <div className="reservation-list-item-body-items"><i class="material-icons">diversity_3</i><p>{item['guests']}</p></div>
                                </div>
                                <div className="reservation-list-item-footer">
                                    <div className="reservation-list-item-footer-items"><i class="material-icons">location_on</i><p>{item.reservation_at}</p><p> Token: {item.reservation_token}</p></div>
                                </div>
                
                            </div>
                            <div className="reservation-list-item2">
                                <i onClick={handleDeleteReservations} class="material-icons">delete</i>
                            </div>
                </div>
            )
            
        }

        return user['reservations'].map((item) => {
            return <ReservationTemplate item={item}/>
        })

    }
    

//{user == ""?(<></>):(<p>{user["data"]["reservations"]}</p>)}

    return(
        <div tabIndex="0" autoFocus onKeyDown={handleCloseKeyDown} className="reservations-background">
                {!user['is_authenticated']?(<><div className="reservations"><i style={{"cursor":'pointer'}} onClick={handleReservationClose} class='material-icons'>close</i><div className="no-reservations"><p>No reservations ...</p></div></div></>): 

                (<>
                <div className="reservations">
                    <div className="reservations-head">
                        <h1>Welcome</h1>
                        <a id="sidepanel-head-clsbtn" onClick={toggleClose}>×</a>
                    </div>
                    <hr/>
                    <h4>Your Reservations ...</h4>
                    {reservelist(user)}
                </div>

                </>)
                }

        </div>

    )

}

export default Reservations;

