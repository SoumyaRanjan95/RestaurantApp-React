import logo from './logo.svg';
import {React, useContext, useEffect, useState} from "react"
import './App.css';
import {BrowserRouter,Routes, Route, Router, Outlet,Link} from "react-router-dom";
import BreadCrumb from "./components/Breadcrumb";
import Search from "./components/Search";
import UserLogin from "./components/UserLogin"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import Logout from "./components/Logout"
//import MyContext from './contexts/Context';
import {ResturantContext,UserContext, MessageContext} from './contexts/Context';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from './store';
import { restaurantlist } from './store/action/action';
import { useToast } from './hooks/useToast';
import Toast from './components/Toast';


function NavBar({state}){

  



  return (
    <div className='navbar'>
      <div className='navleft'>
      <Link className='links'  to={`/`}>Home</Link>
        <Link className='links' to={`order`}>Order</Link>

      </div>
      <div className='navright'>
        {(state.mobile==null)?(<UserLogin/>):(<Logout/>)}
        <Cart/>
        <Search/>
        <BreadCrumb/>
      </div>
  </div>

  )
}





function App() {

  const {authState,authDispatch} =useContext(GlobalContext)
  const {listRestaurantState,listRestaurantDispatch} =useContext(GlobalContext)

  const toast = useToast()

  



  const [restaurantMenu, setRestaurantMenu] = useState([])
  const globalData = useContext(GlobalContext)
  console.log(globalData)


  async function fetchData(){

    try{

      const URL = "http://localhost:8001/api/csrf/"
      const response = await fetch(URL, {
        credentials: 'include',
      });

        let data = await response.json();
      console.log(data)
    }catch(err){
      console.log(err)
    }
}
  useEffect(() => {
    fetchData();
    const getRestaurantListAction = restaurantlist(listRestaurantDispatch)
    getRestaurantListAction()
  },[])

  return (
    <>
    <NavBar state={authState}/>
    <Outlet/>
    <Footer/>
    </>
  );
}


 


export default App;
