import { Link } from "react-router-dom";
import { useState } from "react";
import SidePanel from "./SidePanel";
import Reservations from "./Reservations";

function Cart(){
    function toggleShow(){
        document.querySelector(".reservations-background").style.visibility = "visible";
    
      }

    return(
        <>
        <div className="cart">
            <i onClick={toggleShow} class="material-icons">shopping_cart</i>
        </div>
        <Reservations/>
        </>

    );
}

export default Cart;