import { click } from "@testing-library/user-event/dist/click"
import {ResturantContext,UserContext} from "../contexts/Context"
import { useContext, useState , useRef} from "react"
function ReserveTable(){

    let btn_id = 0;

    const handleReserverTableClose = () => {
        document.querySelector('.reservetable-sidepanel-background').style.visibility = "hidden"
    }

    function handleOpenLogin(){
        //setIsVisible("visible")
        document.querySelector(".modalBackground").style.visibility = "visible"    
      }

    const {resturant, setResturant} = useContext(ResturantContext)
    const {user, setUser} = useContext(UserContext)

    const [dateState, setdateState] = useState(0)
    const [slotState, setslotState] = useState(0)
    const [guest, setGuest] = useState(0)

    const ref = useRef();

    const [clicked, setClicked] = useState(false)

    const [reserveData, setReserveData] = useState({
        date: "",
        slot: "",
        guest:"",
    })


    let dateData = []
    let Month = ["Jan", "Feb", "Mar", "Apr","May","Jun","Jul","Aug","Sept", "Oct", "Nov", "Dec"]
    let timelist = ["12:00pm", "12:30pm", "01:00pm", "01:30pm", "02:00pm", "02:30pm", "03:00pm", "03:30pm", "06:00pm", "06:30pm", "07:00pm", "07:30pm","08:00pm","08:30pm6","09:00pm"]

    let dateobj = new Date()
    for(let i=0;i<=30;i++){
        dateobj.setDate(dateobj.getDate() + 1);
        dateData.push({id: i,month: Month[dateobj.getMonth()], day: dateobj.getDate()})
    }

    const handleGuest = () => {
        if(guest <= 0){
            setGuest(0)
        }else{
            setGuest(guest - 1)
        }

    }

    function handleDate(e, item){
        let id = e.target.id;
        console.log(id)
        document.querySelector(".reservetable-sidepanel-mid-date").childNodes.forEach(item => {
            console.log(item)
            item.style.backgroundColor = "whitesmoke"
        });
        document.getElementById(e.target.id).style.backgroundColor = "orange";
        setReserveData({...reserveData,date: item.month + " "+item.day})



    }

    function handleSlot(e,time){
        let id = e.target.id;
        document.querySelector(".reservetable-sidepanel-mid-slot").childNodes.forEach(item => {
            item.style.backgroundColor = "whitesmoke"
        });
        document.getElementById(e.target.id).style.backgroundColor = "orange";
        setReserveData({...reserveData, slot: time})
    }

    async function funcreserve(){

        try{
            const URL = "http://localhost:8001/api//"
            let response = await fetch(URL,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify()
              });
    
              let data = await response.json();
              console.log(data)
              setUser({...user,user:data["data"]["username"], isLogged: true, reservations:data["data"]["reservations"]})
              console.log(user)
        }catch{

        }
    }

    const handleReserve = async () => {

            if(user.isLogged == true){
                console.log("exists")
                setReserveData({...reserveData, guest: guest})
                console.log(reserveData)
                //funcreserve();
                handleReserverTableClose()
            }else{
                handleReserverTableClose();
                handleOpenLogin();
            }



    }

    return(
        <div className="reservetable-sidepanel-background">

            <div className="reservetable-sidepanel">
                <div className="reservetable-sidepanel-top">
                    <h4>Reservation</h4>
                    <a onClick={handleReserverTableClose} id="reservetable-sidepanel-head-clsbtn">×</a>
                </div>

                <div className="reservetable-sidepanel-mid">
                    <h4>Dining at {resturant}</h4>
                    <div className="reservetable-sidepanel-mid-dining">
                        <button><i class='material-icons'>widgets</i><p>Amenities</p></button>
                        <button><i class='material-icons'>menu_book</i><p>Menu</p></button>
                    </div>
                    <h4>Select Date</h4>
                    <div className="reservetable-sidepanel-mid-date">

                        {dateData.map((item) => {
                                btn_id = btn_id + 1;
                                return <button id={btn_id} className="btn-data" onClick={(e) => handleDate(e, item)} >{item.month} <b>{item.day}</b></button>
                        })}

                    </div>
                    <h4>Select Slot</h4>

                    <div className="reservetable-sidepanel-mid-slot">
                    {timelist.map((time) => {
                                return <button id={time} className="btn-slot" onClick={(e) => handleSlot(e,time)}>{time}</button>
                        })}
                    </div>

                    <h4>Select Guest</h4>

                    <div className="reservetable-sidepanel-mid-guest">
                        <div onClick={handleGuest}>-</div>
                        {guest > 0 ?(<div>{guest}</div>):(<div>0</div>)}
                        <div onClick={() => setGuest(guest + 1)}>+</div>

                    </div>
                    
                </div>

                <div className="reservetable-sidepanel-bottom">
                    
                    <div className="reservetable-sidepanel-bottom-reserveguest">
                        <h4>Guests : </h4>
                    </div>
                    <button onClick={handleReserve}>Reserve</button>


                </div>
                

            </div>

        </div>
    )

} 

export default ReserveTable