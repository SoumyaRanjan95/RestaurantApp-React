import { useState } from "react";
import Order from "./Order";
import * as Data from "./Data";
import { connect } from "react-redux";
import  { redirect } from 'react-router-dom'

function StaffDashboard(){

    const foodData = Data.Menu
    const BillData = Data.BillData
    const orderData = Data.orderData

    const [show, setShow] = useState('menu')
    const [showBill, setShowBill] = useState(false)
    const [refVal, setRefVal] = useState()
    const [generatedBill, setGeneratedBill] = useState({
        table_no: 15,
        reference_id:'defg5tg6l',
        bill_datetime: '',
        items:[
            {item:"Bla Bla Bla",no:5},
            {item:"Bla Bla Bla",no:5},
            {item:"Bla Bla Bla",no:5},
            {item:"Bla Bla Bla",no:5},
            {item:"Bla Bla Bla",no:5},
            {item:"Bla Bla Bla",no:5},
        ],
        price: 500,
        
        
    })

    const handleShowMenu = () => {
        setShow('menu')
    }

    const handleTodaysOrder = () => {

        setShow('orders')
    }

    const handleGetBill = () => {
        setShow('bill')
    }

    const handleGenerateBill =(e) =>{
        e.preventDefault();
        
        const c = BillData.filter((item) =>{
            if(item.reference_id === refVal){
                return item
            }
            return 
        })
        let m = c[0]
        console.log(c[0], refVal)
        if(c.length !== 0 && c.length === 1){
            setShowBill(true)
            setGeneratedBill({
                table_no: m.tableNo,
                reference_id: m.reference_id,
                bill_datetime: m.bill_datetime,
                items: m.items,
                price: m.price,
            })
        }
        else{
            setShowBill(false)
        }
        

    }

    const handleLogout = async () => {
        
        const response = await fetch("http://localhost:8001/api/logout", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
          });
          const content = await response.json();
          console.log(content)

          return redirect('/staff')
    }


    function UpdateAvailableMenu({foodData}){



    
    
        const foodDataAvailableFill = foodData.map((item => item.available))
    
        const [checkState, setCheckState] = useState(foodDataAvailableFill)
        const [foodDataState, setFoodDataState] = useState(foodData)



        const [menuVal, setMenuVal] = useState('')

        const handleCheckChange = (position) => {
            const updatedCheck = checkState.map((item, index) => 
                index === position ? !item : item
            )
            const updateFoodDataState = foodDataState.map((item,index) => {
                if(index === position){
                    item.available = !item.available
                }
            })
            setCheckState(updatedCheck)
    
    
        }
    
    
    
        function MenuElem({index, name, price, vegOrNonVeg, info, available}){
            let i = index-1;
            return (
                <>
                    {available?(<>
    
                        <div className="menu-element">
                        <label for='input-elem'>{name}</label>
                        <div className="menu-element-items">
                            <span className={vegOrNonVeg}></span>
                            <span>&#x20B9;{price}</span>
                            <input
                             id={`checkbox-${index}`}
                             type="checkbox"
                             name={"item"}
                             checked={checkState[i]}
                             onChange={() => handleCheckChange(i)}
                             value={name}
                             />
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
                             id={`checkbox-${index}`}
                             type="checkbox"
                             name={"item"}
                             checked={checkState[i]}
                             onChange={() => handleCheckChange(i)}
                             value={name}
                             />
                        </div>
    
                    </div>
                        </del>
    
                    </>)}
    
                    
                </>
            )
        }
    
                



            let filtered = foodDataState.filter((item) => {
                if(item.name.toLowerCase().includes(menuVal.toLowerCase()) ){
                    return item
                }
            })
    
            let items = filtered.map((item) => {
                return <MenuElem index={item.id} name={item.name} price={item.price} vegOrNonVeg={item.vegOrNonVeg} info={item.info} available={item.available}/>
            })


        return (
            <>
            <input className="menu-items-container-forstaff-input" type="text" onChange={(e)=> setMenuVal(e.target.value)} value={menuVal} placeholder="Search Food Items"/>
             <div className="menu-items-container-forstaff">
                <div className="item-container">
                    {items.length !==0?items:<p>No Such Items</p>}
                </div>
            </div> 
            <button className="menu-items-container-forstaff-button" onClick={() => alert("Make API Calls to Update the MEnu for Specific Restaurant")}>Update</button>
            </>

        )
    }



    function LiveOrders(){

        

        const orderArrayFill = orderData.map((item => item.processed))

        const [orderState,setOrderState] = useState(orderArrayFill)
        const [orderDataState,setOrdeDataState] = useState(orderData)

        console.log(orderDataState)

        const handleOrderProcess = (position) => {

            const process = orderState.map((item, index) => {
                if(index === position){
                    orderDataState[position].processed = !item
                }
            })
            setOrderState(process)


        }

        function OrderFrame({item,position, processed}){


            function OrderTable({menu_items}){

                const items = menu_items.map((item) => {
                    return(<>
                        <tr>
                            <td>{item.item}</td>
                            <td>{item.no}</td>
                        </tr>
                    </>)
                })

                return(
                    <table className="items-table">
                        <tr>
                            <th>Items</th>
                            <th>No.s</th>
                        </tr>
                        {items}
                    </table>
                )

            }

            return(<>
                {!processed?(<>
                    <div className="order-frame">
                        <div className="order-frame-left">
                        <   p>Table No: {item.tableNo}</p>
                        <p>{item.order_datetime}</p>

                        </div>
                        <OrderTable menu_items={item.menu_items}/>
                        <div className="order-frame-right">
                            <button onClick={() => handleOrderProcess(position)}>Process</button>
                        </div>
                    </div>
                </>):(<>
                    <del>
                    <div className="order-frame">
                        <div className="order-frame-left">
                            <p>Table No: {item.tableNo}</p>
                            <p>{item.order_datetime}</p>
                        </div>
                        <OrderTable menu_items={item.menu_items}/>
                        <div className="order-frame-right">
                            <button disabled onClick={() => handleOrderProcess(position)}>Process</button>
                        </div>
                    </div>
                    </del>
                </>)}
            </>)
        }

        let orders = orderDataState.map((item, index) =>{
            let i = index
            return(<OrderFrame item={item} position={i} processed={item.processed}/>)
        })


        return(
            <div className="menu-items-container-forstaff">
                <div className="item-container">
                    {orders.length!==0?orders:(<p> No Orders Present</p>)}
                </div>
            </div> 
        )
    }


    function printDiv(divName){

        window.print();
    }
    function GenerateBill(){



        const itemslist = generatedBill.items.map((item) => {

            return (<><tr><td>{item.item}</td><td>{item.no}</td></tr></>)
        })

        return(
            <>
                <form onSubmit={handleGenerateBill}>
                    <input type='text' name="ref_no" autoFocus value={refVal} onChange={(e) => setRefVal(e.target.value)} placeholder="Enter the reservation token ..."/>
                    <input type="submit" name="bill" value='Get Bill'/>
                </form>
                {showBill?(<><div id="printDiv">
                    <div id="bill">
                        <table>
                            <tr><td>{generatedBill.bill_datetime}</td></tr>
                             <th>
                                <td>Table No:{generatedBill.table_no}</td>
                                <td>Reservation Token:{generatedBill.reference_id}</td>
                                </th>
                                <tr><td>Items</td><td>Quanity</td></tr>
                                {itemslist}  
                        </table>
                        <p>{generatedBill.price}</p>
                    </div>
                    </div><button  onClick={() => printDiv('printDiv')}>Print</button>
                    </>
                ):(<p>Enter the correct reservation token ...</p>)}
            </>
        )
    }







    function chooseDisplay(name){
        if(name == 'bill'){
            return <GenerateBill/>
        }
        if(name == 'orders'){
            return <LiveOrders/>
        }
        return <></>
    }



    return (
        <div className="dashboard">
            <div className="dashboard-left">
                <h4>Restaurant</h4>
                <button onClick={handleShowMenu}>Available Menu</button>
                <button onClick={handleTodaysOrder}>Today's Orders</button>
                <button onClick={handleGetBill}>Generate Bill</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="dashboard-right">
                <div className="dashboard-right-container">
                {show == 'menu'?(<UpdateAvailableMenu foodData={foodData}/>):(chooseDisplay(show))}
                </div>
            </div>
        </div>
    )

}

export default StaffDashboard;
