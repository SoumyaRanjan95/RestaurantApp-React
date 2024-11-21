import { useContext, useEffect } from "react";
import { MessageContext } from "../contexts/Context";

function Message(){

    const {msg, setMsg} = useContext(MessageContext)


    useEffect(() => {
        const timeid = setTimeout(() => {
            setMsg({...msg, message:'',alertStatus:false})
            //document.getElementById('message').style.visibility = 'hidden';
        },4000);

        return () => clearTimeout(timeid)
    },[])
    console.log(msg)

    return(
        <>
        {msg.alertStatus && <div id="message">{msg.message}</div>}
        </>
    )

}

export default Message;