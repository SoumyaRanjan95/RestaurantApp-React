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
import GlobalProvider from './store/index';
import { Provider } from 'react-redux';
import store from './redux_app/store';
import Order from './components/Order';
import Toast from './components/Toast';
import { useToast } from './contexts/ToastContext';
import { ToastContextProvider } from './contexts/ToastContext';
import ToastCheck from './components/ToastCheck';

const root = ReactDOM.createRoot(document.getElementById('root'));




const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "order/",
        element:<Order/>
      }

    ],
  },
  {
    path: '/staff/',
    element: <Outlet/>, // setting an outlet elements adds the children elemnt to the parent 
    children:[     
      {
        index: true,
        element:<Staff/>,
      },
      {
        path: "dashboard/",
        element: <StaffDashboard/>,
      },

    ],
  }, 
  {
    path:'/toasts/',
    element: <ToastCheck/>
  }
])


root.render(
  <Provider store={store}>
    <GlobalProvider>
      <ToastContextProvider>
    <RouterProvider router={router} />
    </ToastContextProvider>
    </GlobalProvider>
  </Provider>

);


/*
root.render(
  <React.StrictMode>
    <Toast type='success' message='This was a successful operation ...'/>
  </React.StrictMode>
);
*/


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
