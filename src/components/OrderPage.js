import Order from "./Order"
import { GlobalContext } from "../store";
import { useState,useContext } from "react";
function OrderPage(){


    console.log('OrderPage-Component-rerendered')
    

    return(
        <>
        <Order/>
        </>
    )
}

export default OrderPage;