import { useRef, useEffect, useState, useContext } from "react";
import DropDown from "./DropDown";
import {ResturantContext} from '../contexts/Context';


function Search(){

  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false)
  const {resturant, setResturant, rId, setRId} = useContext(ResturantContext)



  useEffect(()=>{

    const closeDropDown = (e) => {
      const contgt1 = ref.current.contains(e.target) 
      if(!contgt1){
        setIsOpen(false)
      }
    };

    document.body.addEventListener('click',closeDropDown);

    return ()=> document.body.removeEventListener('click', closeDropDown)
  },[]);
      //{isOpen?(<DropDown/>):(<></>)}

  
  return (
    <>
    <a onClick={() => setIsOpen(true)}>
    <div ref={ref}  className="searchbar">
      <i class="material-icons">location_on</i>
      {resturant == ""?(<i className="searchbar-restname" >Select Restaurant</i>):(<i className="searchbar-restname">{resturant.length < 10? resturant: resturant.slice(0,10)+"..."}</i>)} 
      <i class="material-icons">keyboard_arrow_down</i>
      {isOpen?(<DropDown resturant={resturant} setResturant={setResturant} rId={rId}  setRId={setRId}/>):(<></>)}
    </div>
    </a>

    </>


  )
}


 


export default Search;
