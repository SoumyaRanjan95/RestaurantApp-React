import { useEffect, useState } from "react";
import * as Data from "./Data";
import { useOutletContext } from "react-router-dom";
import generateString from "../utils/utils";

function Order(){

    const [resturant, setResturant, rId, setRId] = useOutletContext()
    const [tableNo, setTableNo] = useState('');
    const [reservationToken, setReservationToken] = useState('');

    const RestMenu = Data.Menu.filter((item)=>{
        if(item.restaurant_id === rId){
            return true
        }else{
            return false
        }
    })

    const[foodData, setFoodData] = useState(RestMenu)
    const [checkState, setCheckState] = useState(new Array(foodData.length).fill(false))
    const [checkQuantity, setCheckQuantity] = useState(new Array(foodData.length).fill(0))
    const [price, setPrice] = useState(0)


    const [itemList, setItemList] = useState([])




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


    const handleCheckChange = (position,itm) => {

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
        const fltr = itemList.filter(item => {
            if(item.item === itm.name){
                return false
            }else{
                return true
            }
        })
       setItemList(fltr)

    }

    const handleQuantityChange = (e,position,itm) => {
        const updatedQuantity = checkQuantity.map((item, index) =>{
            if(index == position){
                item = e.target.value
                return item
            } 
            return item
        })

        setCheckQuantity(updatedQuantity)
        /*setItemList([...itemList,

        ])*/

        const itemdat =  {
            order_id: null, 
            from_restaurant:rId,
            item:itm.name,
            type: itm.type,
            vegOrNonVeg:itm.vegOrNonVeg, 
            price: itm.price,
            quantity:updatedQuantity[position],
            net_price: (itm.price*updatedQuantity[position]), //Restuarnat.Menu.price
        }
        setItemList( // Replace the state
            [ // with a new array
              ...itemList, // that contains all the old items
              itemdat // and one new item at the end
            ]
          );
    }
    const handleOrderSubmit = async(e) => {
        e.preventDefault();


        const hasReservation = Data.Reservations.filter((item) =>{
            if(item.reservation_token === reservationToken){
                return true
            }
        })

        if(hasReservation.length !== 0){
            const orderId = generateString(15);
            const order = {
                order_id: orderId,
                order_datetime: new Date().toUTCString(),
                from_restaurant: rId,
                reservation_token: reservationToken,
                tableNo: tableNo,
                processed:false,
                menu_items:[]
            }
            if(itemList.length !== 0){
                const fltr = itemList.forEach((item) => {
                    if(item.order_id === null ){
                        item.order_id = orderId
                    }
                })
                setItemList(fltr)
                Data.ItemsOrdered.push(itemList)
                order['menu_items'] = itemList
                Data.orderData.push(order)


                console.log(order)
                console.log(JSON.stringify(order))

            }else{
                alert('You didnt enter items')
            }

        }else{
            alert("You Dont have reservations")
        }
        setTableNo('')
        setReservationToken('')
        setCheckState(new Array(foodData.length).fill(false))
        setCheckQuantity(new Array(foodData.length).fill(0))
        setItemList([])

    }



    function MenuElem({item,position,id, name, price, vegOrNonVeg, info, available}){
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
                         onChange={() => handleCheckChange(i,item)}
                         value={name}
                         />
                         <input  disabled={!checkState[i]?'disabled':''} type="number" id={`input-number-${i}`} name={"quantity"} min={0} onChange={(e) => handleQuantityChange(e,i, item)} value={checkQuantity[i]}/>
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
                         onChange={() => handleCheckChange(i,item)}
                         disabled
                         value={name}
                         />
                         <input  disabled={'disabled'} type="number" id={`input-number-${i}`} name={"quantity"} min={0} onChange={(e) => handleQuantityChange(e,i, item)} value={checkQuantity[i]}/>
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
                return <MenuElem item={item} position={position} id={item.id} name={item.name} price={item.price} vegOrNonVeg={item.vegOrNonVeg} info={item.info} available={item.available}/>
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
                <form onSubmit={handleOrderSubmit}>
                <input  required className='placeorder-form' name="reservation_token" type="text" value={reservationToken} onChange={(e) => setReservationToken(e.target.value)} placeholder="Enter reservation Token..."/>
                <input  required className='placeorder-form' name="table_no" type="text" value={tableNo} onChange={(e) => setTableNo(e.target.value)} placeholder="Enter table id..."/>
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
                    <button type="submit" className="btn-order">Order</button>
                </div>
            </footer>
            </form>

        </div>
        ):(<div style={{'padding-top':'200px','justify-items':"center",'text-align':'center'}}><p>Please Select a Restaurant ...</p></div>)}
        </>
    )
}
export default Order