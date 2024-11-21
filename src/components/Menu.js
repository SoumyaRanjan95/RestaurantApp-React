import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Menu(){




    const foodData = [
        {id: 1,type:'starters', name: 'Gobi Manchurian', vegOrNonVeg: 'veg', price:50, info: "Dry curry", available: true},
        {id: 2,type:'starters', name: 'Gobi 65', vegOrNonVeg: 'veg', price:50, info: "Dry curry", available: true},
        {id: 3,type:'starters', name: 'Paneer Manchurian', vegOrNonVeg: 'veg', price:50, info: "Dry curry", available: false},
        {id: 4,type:'starters', name: 'Kadai Paneer', vegOrNonVeg: 'veg', price:150, info: "Dry curry", available: true},
        {id: 5,type:'biryani', name: 'Chicken Biryani', vegOrNonVeg: 'nonveg', price:550, info: "Dry curry", available: false},
        {id: 6,type:'biryani', name: 'Mutton Biryani', vegOrNonVeg: 'nonveg', price:508, info: "Dry curry", available: true},
        {id: 7,type:'biryani', name: 'Paneer Biryani', vegOrNonVeg: 'veg', price:505, info: "Dry curry", available: true},
        {id: 8,type:'biryani', name: 'Prawn Biryani', vegOrNonVeg: 'nonveg', price:1050, info: "Dry curry", available: true},
        {id: 9,type:'bread', name: 'Kulcha', vegOrNonVeg: 'veg', price:950, info: "Dry curry", available: true},
        {id: 10,type:'bread', name: 'Naan', vegOrNonVeg: 'veg', price:50, info: "Dry curry", available: true},
        {id: 11,type:'bread', name: 'Rumali Roti', vegOrNonVeg: 'veg', price:50, info: "Dry curry", available: false},
        {id: 12,type:'Soup', name: 'Chicken Hot & Sour Soup', vegOrNonVeg: 'nonveg', price:150, info: "Dry curry", available: true},
        {id: 13,type:'starters', name: 'Chicken Manchow Soup', vegOrNonVeg: 'nonveg', price:850, info: "Dry curry", available: true},
        {id: 14,type:'starters', name: 'Veg Hot & Sour', vegOrNonVeg: 'veg', price:508, info: "Dry curry", available: true},
        {id: 15,type:'starters', name: 'Gobi Manchurian', vegOrNonVeg: 'veg', price:509, info: "Dry curry", available: true},
        {id: 16,type:'starters', name: 'Gobi Manchurian', vegOrNonVeg: 'veg', price:450, info: "Dry curry", available: true},
    ];

    const [checkState, setCheckState] = useState(new Array(foodData.length).fill(false))
    const [price, setPrice] = useState(0)
    const [tableNo, setTableNo] = useState('')

    useEffect(() =>{
        const totalPrice = checkState.reduce((acc, state, index) =>{
            if(state == true){
                return acc + foodData[index].price
            }
            return acc
        }, 0);

        setPrice(totalPrice)
    }, [checkState])

    console.log(checkState)

    const handleCheckChange = (position) => {
        const updatedCheck = checkState.map((item, index) => 
            index === position ? !item : item
        )
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
                         disabled
                         value={name}
                         />
                    </div>

                </div>
                    </del>

                </>)}

                
            </>
        )
    }

    function ItemContainer({type,foodData}){
        const filtered = foodData.map((item) => {
            if(item.type === type){
                return <MenuElem index={item.id} name={item.name} price={item.price} vegOrNonVeg={item.vegOrNonVeg} info={item.info} available={item.available}/>
            }
            
        })
        return (
            <>
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

    return(
        <div className="menu">
            <header className="menu-header">
                <h4> Our Restaurant Menu </h4>
                <hr/>
            </header>

                <div className="menu-body">
                        <div className="row1">
                            <div className="container">
                                <h5>Soups</h5>
                                <ItemContainer type='starters' foodData={foodData}/>
                            </div>

                            <div className="container">
                                <h5> Indian Breads</h5>
                                <ItemContainer type='bread' foodData={foodData}/>
                            </div>


                        </div>
                        <div className="row2">

                            <div className="container">
                                <h5>Biryani</h5>
                                <ItemContainer type='biryani' foodData={foodData}/>
                            </div>

                        </div>
                        <div className="row3">
                        <div className="container">
                                <h5>Soups</h5>
                            </div>

                            <div className="container">
                                <h5>Biryani</h5>
                            </div>

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
    )
}
export default Menu