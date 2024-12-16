import SidePanel from "./SidePanel";
import { useState } from 'react';


function BreadCrumb(){

  //let [visibility, setvisibility] = useState("hidden")
  function toggleShow(){
    document.querySelector(".sidepanel-background").style.visibility = "visible";

  }
  

  return (
    <>
      <div className='maticon'id="breadcrumb">
        <a  onClick={() => toggleShow()}> <i className="material-icons">menu</i></a>
      </div>
      <SidePanel/>

    </>


  )
}


 


export default BreadCrumb;
