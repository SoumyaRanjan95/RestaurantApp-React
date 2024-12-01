import {useContext, useEffect, useState} from 'react';
import * as Data from './Data'
function DropDown({resturant, setResturant, rId,setRId}){

    const [filterText, setFilterText] = useState("") 
    const [lists, setLists] = useState(Data.Restaurants)
    
    /*const lists= [
        {city:  "Banglore", restaurant: ["IndiraNagar","Lido Mall","IndiraNagar","IndiraNagar","IndiraNagar"]},
        {city:  "Mumbai", restaurant: ["IndiraNagar", "Ido","IndiraNagar","IndiraNagar","IndiraNagar"]},
        {city:  "Delhi", restaurant: ["IndiraNagar", "IndiraNagar","IndiraNagar","IndiraNagar","IndiraNagar"]},
        {city:  "Kolkata", restaurant: ["IndiraNagar", "IndiraNagar","IndiraNagar","IndiraNagar","IndiraNagar"]},
        {city:  "Pune", restaurant: ["IndiraNagar", "IndiraNagar","IndiraNagar","IndiraNagar","IndiraNagar"]},
        {city:  "GuruGram", restaurant: ["IndiraNagar", "IndiraNagar","IndiraNagar","IndiraNagar","IndiraNagar"]},
    
    ]*/
    /*useEffect(() => {
        const URL = "http://localhost:8001/api/locations/"
        fetch(URL).then(res => res.json()).then(data => {                 
             setLists(data);
     
     
         });
    },[]);*/







    

    function SearchBar({filterText, onFilterTextChange}){   
        
        const handleChange = (e) =>{
            setFilterText(e.target.value)
        }


        return(
            <input className="dropdown-search"
                   type="text"
                   placeholder="Search..."
                   autoFocus="autoFocus"
                   value={filterText}
                   onChange={handleChange}/>


        )
    }

    function DropDownList({lists,filterText,resturant,setResturant}){


        const handleSetRestaurant = (item) => {
            setResturant(item.name)
            setRId(item.id)
        }

        let filtered = lists.filter((item) => {
            if(item.name.toLowerCase().includes(filterText.toLowerCase()) || item.city.toLowerCase().includes(filterText.toLowerCase())){
                return item
            }
        })

        let items = filtered.map((item) => {
            return <a onClick={()=> handleSetRestaurant(item)}><p className='resturants'>{item.name}</p></a>
        })

        /*function CityResturantHolder({items}){

        }*/ //use javascript reduce to see if things work


        return(
            <div className="dropdown-restaurant-list" id="restaurants-list">
                {items.length?items:<p>No results found</p>}
            </div>
        )
    }



    return(
        <>
        <div className="dropdown ">
            <SearchBar
                filterText={filterText}
                onFilterTextChange={setFilterText}
            />
            <DropDownList
                lists={lists}
                filterText={filterText}
                resturant = {resturant}
                setResturant={setResturant}
            />
        </div>
        </>
    )
}
export default DropDown