import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/Context";
import SidePanel from "./SidePanel";
import * as Data from './Data'
import { GlobalContext } from "../store";
import { myreservations } from "../store/action/action";
import Reservations from "./Reservations"

function Cart(){
    const {authState,authDispatch} = useContext(GlobalContext)
    const {reservationDataState,reservationDataDispatch} = useContext(GlobalContext)
    function toggleShow(){
        document.querySelector(".reservations-background").style.visibility = "visible";
        const reservationsAction = myreservations(reservationDataDispatch)
        reservationsAction();
    }



    return(
        <>
        <div className="cart maticon">
            <i onClick={toggleShow} class="material-icons">event_seat</i>
        </div>
        <Reservations reservationslist = {reservationDataState.myreservations} reserveationdispatch={reservationDataDispatch}/>
        </>

    );
}

export default Cart;