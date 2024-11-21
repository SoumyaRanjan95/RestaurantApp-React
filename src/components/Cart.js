import { Link } from "react-router-dom";
import { useState } from "react";
import SidePanel from "./SidePanel";
import Reservations from "./Reservations";

function Cart(){
    function toggleShow(){
        document.querySelector(".reservations-background").style.visibility = "visible";
    
      }//shopping_cart

    return(
        <>
        <div className="cart maticon">
            <i onClick={toggleShow} class="material-icons">event_seat</i>
        </div>
        <Reservations/>
        </>

    );
}

export default Cart;