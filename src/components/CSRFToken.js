import axios from "axios";
import { useState, useEffect } from "react";
import React from 'react';
import Cookies from "js-cookie";

const CSRFToken = () => {

    const [csrfToken, setCSRFToken] = useState('');

    /*const getCookie = (name) => {
        let cookieValue = null;
        if(document.cookie && document.cookie !== ''){
            let cookies = document.cookie.split(';');
            for(let i=0; i < cookies.length; i++){
                let cookie = cookies[i].trim();
                if(cookie.substring(0,name.length+1)===(name+'=')){
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }

        return cookieValue;
    }*/


    useEffect(() => {
        const fetchData = async () => {
            try{
                const config = {
                    headers:{
                        'Content-Type':'application/json',
                        'Accept':'application/json',
                    },
        
                }
                await axios.get(`${process.env.REACT_APP_API_URL}/api/csrf_cookie`)
            }catch(err){

            }
        }

        fetchData();
        setCSRFToken(Cookies.get('csrftoken'))
    })
    return(
        <input type="hidden" name="csrfmiddlewaretoken" onChange= {() => setCSRFToken(Cookies.get('csrftoken'))} value={csrfToken}/>
    )

}



export default CSRFToken;
