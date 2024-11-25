import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Data from "./Data";
import { ResturantContext } from "../contexts/Context";
import { useOutletContext } from "react-router-dom";
import React from "react";
import { redirect } from "react-router-dom";
function Menu(){

    const [resturant, setResturant, rId, setRId] = useOutletContext()


    console.log("Menu updates")
    //const {rId,setRId,resturant, setResturant} = useContext(ResturantContext)

    const RestMenu = Data.Menu.filter((item)=>{
        if(item.restaurant_id === rId){
            return true
        }else{
            return false
        }
    })

    const[foodData, setFoodData] = useState(RestMenu)

    const foodData1 = RestMenu
    console.log(foodData1)

    const obj = {
        id: null,
        type: null,
        name: null,
        vegOrNonVeg:null,
        price:null,
        info: null,
        available: null,
        restaurant_id:null,
    } 



    const [checkState, setCheckState] = useState(new Array(foodData.length).fill(false))
    const [checkQuantity, setCheckQuantity] = useState(new Array(foodData.length).fill(0))
    //const [checkMenuState, setCheckMenuState] = useState(new Array(foodData.length).fill(obj))
    const [price, setPrice] = useState(0)
    const [tableNo, setTableNo] = useState('')

    function findPostion(foodData,id){
        function getIndex(item){
            return item.id === id
        }
        return foodData.findIndex(getIndex,id)

    }

    useEffect(() =>{
        const totalPrice = checkState.reduce((acc, state, index) =>{
            if(state == true){
                return acc + (foodData[index].price * checkQuantity[index])
            }
            return acc
        }, 0);

        setPrice(totalPrice)
    }, [checkState, checkQuantity])


    const handleCheckChange = (position) => {

        const updatedCheck = checkState.map((item, index) => 
            index === position ? !item : item
        )
        const updatedQuantity = checkQuantity.map((item, index) =>{
            if(index == position){
                item = 0
                return item
            } 
            return item
        })
        setCheckState(updatedCheck)
        setCheckQuantity(updatedQuantity)

    }

    const handleQuantityChange = (e,position) => {
        const updatedQuantity = checkQuantity.map((item, index) =>{
            if(index == position){
                item = e.target.value
                return item
            } 
            return item
        })
        setCheckQuantity(updatedQuantity)


    }

    



    function MenuElem({position,id, name, price, vegOrNonVeg, info, available}){
        let i = position;
        return (
            <>
                {available?(<>

                    <div className="menu-element">
                    <label for='input-elem'>{name}</label>
                    <div className="menu-element-items">
                        <span className={vegOrNonVeg}></span>
                        <span>&#x20B9;{price}</span>
                        <input
                         id={`checkbox-${i}`}
                         type="checkbox"
                         name={"item"}
                         checked={checkState[i]}
                         onChange={() => handleCheckChange(i)}
                         value={name}
                         />
                         <input autoFocus disabled={!checkState[i]?'disabled':''} type="number" id={`input-number-${i}`} name={"quantity"} min={0} onChange={(e) => handleQuantityChange(e,i)} value={checkQuantity[i]}/>
                    </div>

                </div>
                
                </>):(<>
                    
                    <del>
                    <div className="menu-element">
                    <label for='input-elem'>{name}</label>
                    <div className="menu-element-items">
                        <span className={vegOrNonVeg}></span>
                        <span>&#x20B9;{price}</span>
                        <input
                         id={`checkbox-${i}`}
                         type="checkbox"
                         name={"item"}
                         checked={checkState[i]}
                         onChange={() => handleCheckChange(i)}
                         disabled
                         value={name}
                         />
                         <input autoFocus disabled={'disabled'} type="number" id={`input-number-${i}`} name={"quantity"} min={0} onChange={(e) => handleQuantityChange(e,i)} value={checkQuantity[i]}/>
                         </div>

                </div>
                    </del>

                </>)}

                
            </>
        )
    }

    function ItemContainer({type,foodData}){
        const filtered = foodData.map((item) => {
            let position=findPostion(foodData,item.id)
            if(item.type === type){
                return <MenuElem position={position} id={item.id} name={item.name} price={item.price} vegOrNonVeg={item.vegOrNonVeg} info={item.info} available={item.available}/>
            }
            
        })
        return (
            <>
                <h5>{type}</h5>
                {filtered}
            </>

        )
    }

    function round(num, decimalPlaces = 0) {
        num = Math.round(num + "e" + decimalPlaces);
        return Number(num + "e" + -decimalPlaces);
    }
    function netPrice(price){

        return price + (price * (10/100))
    }

    return(<>

        {resturant !== ''?(
            <div className="menu">
            <header className="menu-header">
                <h4> Our Restaurant Menu : {resturant}</h4>
                <hr/>
            </header>

                <div className="menu-body">
                            <div className="container">
                                <ItemContainer type='starters' foodData={foodData}/>
                            </div>

                            <div className="container">
                                <ItemContainer type='bread' foodData={foodData}/>
                            </div>

                            <div className="container">
                                <ItemContainer type='biryani' foodData={foodData}/>
                            </div>
                </div>
            <hr/>

            <footer className="menu-footer">
                <div className="menu-footer-right">
                    <p>Total Price         : {price}</p>
                    <p>Service charge 10%  : {(price * (10/100)).toFixed(2)} </p>
                    <p>Net total           : {netPrice(price)}</p>
                </div>
                <div className="menu-footer-left">
                    <Link to={`/order`}><button className="btn-order">Order Food</button></Link>
                </div>
            </footer>

        </div>
        ):(<div style={{'padding-top':'200px','justify-items':"center",'text-align':'center'}}><p>Please Select a Restaurant ...</p></div>)}
        </>
    )
}
export default Menu