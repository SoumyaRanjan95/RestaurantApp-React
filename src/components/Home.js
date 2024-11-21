import { useRef, useEffect, useState } from 'react';
import DropDown from './DropDown';
import ReserveTable from './ReserveTable';
import { useOutletContext } from 'react-router-dom';






function Home(){

    const [isOpen1, setIsOpen1] = useState(false);
    const ref1 = useRef();
    const [resturant, setResturant, rId, setRId] = useOutletContext()

    const handleClick = (e) => {
        setIsOpen1(true);
    }

    const handleReserverTable = () => {
      if(resturant == ""){
        alert("Choose a location first ...")
      }else{
        document.querySelector('.reservetable-sidepanel-background').style.visibility = "visible"
      }
    }

    useEffect(()=>{

        const closeDropDown = (e) => {
          const contgt2 = ref1.current.contains(e.target);
          if(!contgt2){
            setIsOpen1(false)
          }
        };
    
        document.body.addEventListener('click',closeDropDown);
    
        return ()=> document.body.removeEventListener('click', closeDropDown)
      },[]);

    return (
      <div className='Home'>
        <div className='search-resturants'>
          <div ref={ref1} onClick={handleClick} className='search-resturant-dropdown'>
                <div className='search-resturant-dropdown-left'>
                <p>Select Restaurants</p>
                {resturant == ""?(<h4>Select Restaurant</h4>):(<h4>{resturant}</h4>)} 
                </div>
                <div className='search-resturant-dropdown-right'>
                <i class="material-icons">keyboard_arrow_down</i>
                </div>
                {isOpen1?(<div className='search-resturant-dropdown-searchbar'><DropDown resturant={resturant} setResturant={setResturant} rId={rId}  setRId={setRId} /></div>):(<></>)}
          </div>
          <button onClick={handleReserverTable}>Reserve Table</button>
          <ReserveTable/>
        </div>
  
        <div className='services'>
          <h2>Services we Provide</h2>
             <div className='services-container'>
                <img className='services-container-img' src=''/>
                <div className='services-container-elem services-container-elem-end'>
                  <h8 className='services-container-elem-tags'>OUR RESTAURANT</h8>
                  <h2 className='services-container-elem-tags'> Dine Out With Us</h2>
                  <button className='services-container-elem-tags'> Reserve Table <i class="material-icons">arrow_forward</i>
                  </button>
  
                </div>
             </div>
  
             <div className='services-container'>
                <div className='services-container-elem services-container-elem-start'>
                  <h8 className='services-container-elem-tags'>OUR RESTAURANT</h8>
                  <h2 className='services-container-elem-tags'> Catering By Our Restaurant</h2>
                  <button className='services-container-elem-tags'> Send Enquiry <i class="material-icons">arrow_forward</i>
                  </button>
  
                </div>
                <img className='services-container-img' src=''/>
  
             </div>
  
          </div>
        </div>
    )
  }

  export default Home;