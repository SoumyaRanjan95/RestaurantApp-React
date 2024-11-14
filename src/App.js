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

//import MyContext from './contexts/Context';
import {ResturantContext,UserContext} from './contexts/Context';


function NavBar({user}){

  return (
    <div className='navbar'>
      <div className='navleft'>
        <Link style={{textDecoration: 'none'}} to={`promotions`}>Whats on BBQ'N</Link>
        <Link style={{textDecoration: 'none'}} to={`promotions`}>Today's Menu</Link>
        <Link style={{textDecoration: 'none'}} to={`promotions`}>Catering</Link>

      </div>
      <div className='navright'>
        <UserLogin/>
        <Cart/>
        <Search/>
        <BreadCrumb/>
        {user["user"]!=""?(<Logout user/>):(<></>)}
      </div>
  </div>

  )
}





function App() {

  const [resturant, setResturant] = useState("")
  const [user, setUser] = useState({
    user:"",
    isLogged: false,
    reservations:[],
  });



  return (
    <>
    <UserContext.Provider value = {{user, setUser}}>
      <ResturantContext.Provider value = {{resturant, setResturant}}>
      <NavBar user={user}/>
      <Outlet context={[resturant, setResturant]}/>
      </ResturantContext.Provider>
    </UserContext.Provider>
    <Footer/>
    </>
  );
}


 


export default App;
