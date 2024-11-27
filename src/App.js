import logo from './logo.svg';
import {React, useState} from "react"
import './App.css';
import {BrowserRouter,Routes, Route, Router, Outlet,Link} from "react-router-dom";
import BreadCrumb from "./components/Breadcrumb";
import Search from "./components/Search";
import UserLogin from "./components/UserLogin"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import Logout from "./components/Logout"
import Message from './components/Message';
//import MyContext from './contexts/Context';
import {ResturantContext,UserContext, MessageContext} from './contexts/Context';
import { useDispatch, useSelector } from 'react-redux';


function NavBar({user}){



  return (
    <div className='navbar'>
      <div className='navleft'>
      <Link className='links'  to={`/`}>Home</Link>
        <Link className='links' to={`order`}>Order</Link>

      </div>
      <div className='navright'>
        {(user.is_authenticated==false)?(<UserLogin/>):(<Logout/>)}
        <Cart/>
        <Search/>
        <BreadCrumb/>
      </div>
  </div>

  )
}





function App() {

  const [resturant, setResturant] = useState('')
  const [rId, setRId] = useState()
  const [msg,setMsg] = useState({
    message: '',
    alertStatus: false,
  })

  const [user, setUser] = useState({
    mobile:'', //unique
    email:'',
    fullname:'',
    is_authenticated: false,
    reservations:[],
  });

  const [restaurantMenu, setRestaurantMenu] = useState([])


  


  return (
    <>
    <UserContext.Provider value = {{user, setUser}}>
      <MessageContext.Provider value={{msg,setMsg}}>
      <Message/>
      <ResturantContext.Provider value = {{resturant, setResturant,rId, setRId,restaurantMenu, setRestaurantMenu}}>
      <NavBar user={user}/>
      <Outlet context={[resturant, setResturant, rId, setRId]}/>
      </ResturantContext.Provider>
      </MessageContext.Provider>

    </UserContext.Provider>
    <Footer/>
    </>
  );
}


 


export default App;
