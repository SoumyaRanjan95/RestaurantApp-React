import { click } from "@testing-library/user-event/dist/click"
import {ResturantContext,UserContext} from "../contexts/Context"
import { useContext, useState , useRef, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { reserveUserThunk } from "../redux_app/features//authenticate/autheticateSlice";
function ReserveTable(){

    const [isDisabled,setDisabled] = useState()

    let btn_id = 0;

    const handleReserverTableClose = () => {
        document.querySelector('.reservetable-sidepanel-background').style.visibility = "hidden"
    }

    function handleOpenLogin(){
        //setIsVisible("visible")
        document.querySelector(".modalBackground").style.visibility = "visible"    
      }

    const {resturant, setResturant, rId, setRId} = useContext(ResturantContext)
    //const {user, setUser} = useContext(UserContext)

    const user = useSelector(state => state.authenticate)

    const [dateState, setdateState] = useState('')
    const [slotState, setslotState] = useState('')
    const [guest, setGuest] = useState(0)

    const ref = useRef();

    const [clicked, setClicked] = useState(false)

    const dispatch = useDispatch()

    const [reserveData, setReserveData] = useState({
        mobile:'',
        date: "",
        slot:'',
        location_id: "",
        guests:0,
        token:''
    })

    // program to generate random strings


    let dateData = []
    let Month = ["Jan", "Feb", "Mar", "Apr","May","Jun","Jul","Aug","Sept", "Oct", "Nov", "Dec"]
    let timelist = ["12:00pm", "12:30pm", "01:00pm", "01:30pm", "02:00pm", "02:30pm", "03:00pm", "03:30pm", "06:00pm", "06:30pm", "07:00pm", "07:30pm","08:00pm","08:30pm","09:00pm"]

    let dateobj = new Date()
    for(let i=0;i<=30;i++){
        dateobj.setDate(dateobj.getDate() + 1);
        dateData.push({id: i,month: Month[dateobj.getMonth()], day: dateobj.getDate(), iso: dateobj.toISOString().split('T')[0]})
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
        document.querySelector(".reservetable-sidepanel-mid-date").childNodes.forEach(item => {
            item.style.backgroundColor = "whitesmoke";
            item.style.color = 'black';
        });
        document.getElementById(e.target.id).style.backgroundColor = "rgb(244, 197, 166)";
        document.getElementById(e.target.id).style.color = "white";
        setdateState(item.iso)
        setReserveData({...reserveData,date: item.iso})



    }

    function handleSlot(e,time){
        let id = e.target.id;
        document.querySelector(".reservetable-sidepanel-mid-slot").childNodes.forEach(item => {
            item.style.backgroundColor = "whitesmoke"
            item.style.color = 'black';

        });
        document.getElementById(e.target.id).style.backgroundColor = "rgb(244, 197, 166)";
        document.getElementById(e.target.id).style.color = "white";


        setReserveData({...reserveData, slot: time})
    }

    async function funcreserve(){

        try{
            const URL = "http://localhost:8001/api/reservations/"
            let response = await fetch(URL,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify()
              });
    
              let data = await response.json();
              //setUser({...user,user:data["data"]["username"], isLogged: true, reservations:data["data"]["reservations"]})
        }catch{

        }
    }

    const handleReserve = async (user) => {

        function authStatus(user){
            return user.isAuthenticated
        }


        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        function generateString(length) {
            let result = ' ';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        
            return result;
        }
            console.log("User status",authStatus(user))
            if(authStatus(user) == true){
                setReserveData({...reserveData, guests: guest, mobile: user['mobile'], location_id: rId, token: generateString(15)})
                console.log(reserveData)
                //funcreserve();
                dispatch(reserveUserThunk(reserveData))
                handleReserverTableClose()
            }else{
                handleReserverTableClose();
                handleOpenLogin();
            }



    }


    /*if(dateState !== '' && slotState !=='' && guest !== 0){
        document.querySelector('.reserve-btn').disabled = false
    }*/




    return(
        <div className="reservetable-sidepanel-background">

            <div className="reservetable-sidepanel">
                <div className="reservetable-sidepanel-top">
                    <h4>Reservation</h4>
                    <i onClick={handleReserverTableClose} id="reservetable-sidepanel-head-clsbtn">×</i>
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
                                return <button id={btn_id} onClick={(e) => handleDate(e, item)} >{item.month} <b>{item.day}</b></button>
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
                        <div className="inc-dec" onClick={handleGuest}>-</div>
                        {guest > 0 ?(<div>{guest}</div>):(<div>0</div>)}
                        <div className="inc-dec" onClick={() => setGuest(guest + 1)}>+</div>

                    </div>
                    
                </div>

                <div className="reservetable-sidepanel-bottom">
                    
                    <div className="reservetable-sidepanel-bottom-reserveguest">
                        <h4>Guests : {guest} </h4>
                    </div>
                    <button className="reserve-btn" onClick={()=> handleReserve(user)}>Reserve</button>


                </div>
                

            </div>

        </div>
    )

} 

export default ReserveTable