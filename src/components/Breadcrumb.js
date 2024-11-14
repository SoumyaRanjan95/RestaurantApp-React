import SidePanel from "./SidePanel";
import { useState } from 'react';


function BreadCrumb(){

  //let [visibility, setvisibility] = useState("hidden")
  function toggleShow(){
    document.querySelector(".sidepanel-background").style.visibility = "visible";

  }
  

  return (
    <>
      <SidePanel/>
      <div id="breadcrumb">
        <a  onClick={toggleShow}> <i class="material-icons">menu</i></a>
      </div>

    </>


  )
}


 


export default BreadCrumb;
