import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/Context";
import SidePanel from "./SidePanel";
import Reservations from "./Reservations";
import * as Data from './Data'

function Cart(){
    const {user, setUser} = useContext(UserContext)
    function toggleShow(){
        document.querySelector(".reservations-background").style.visibility = "visible";
        const reservationlist = Data.Reservations.filter(item =>{
            if(user.mobile === item.mobile){
                return true
            }
        })
        setUser({...user, reservations:reservationlist})
      }//shopping_cart

    return(
        <>
        <div className="cart maticon">
            <i onClick={toggleShow} class="material-icons">event_seat</i>
        </div>
        <Reservations user={user}/>
        </>

    );
}

export default Cart;