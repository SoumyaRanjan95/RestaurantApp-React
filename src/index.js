import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Outlet, RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from './components/Home';
import ReserveTable from './components/ReserveTable';
import SignUpModal from './components/SignUpModal';
import Reservations from './components/Reservations';
import Menu from './components/Menu';
import Staff from './components/Staff';
import StaffDashboard from './components/StaffDashboard';

import { Provider } from 'react-redux';
import store from './redux_app/store';
import Order from './components/Order';


const root = ReactDOM.createRoot(document.getElementById('root'));


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "menu",
        element:<Menu/>
      },
      {
        path: "order",
        element:<Order/>
      }

    ],
  },
  {
    path: '/staff',
    element: <Outlet/>, // setting an outlet elements adds the children elemnt to the parent 
    children:[     
      {
        index: true,
        element:<Staff/>,
      },
      {
        path: "dashboard",
        element: <StaffDashboard/>,
      },


    ],
  }, 
])


root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

);


/*
root.render(
  <React.StrictMode>
    <Reservations/>
  </React.StrictMode>
);
*/


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
