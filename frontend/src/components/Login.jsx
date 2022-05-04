import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate=useNavigate();

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    useEffect(()=>{
        if(localStorage.getItem('noteToken')) navigate('/');
    },[navigate])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            if(!username.trim() || !password.trim()) alert("Don't leave any field empty!");
            else{
                const config={
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
                const {data,status}=await axios.post('/gettoken/',{username,password},config);
                if(status!==200) alert("Something went wrong!");
                else{
                    localStorage.setItem('noteToken',data.token)
                    alert("Login successful!");
                    navigate('/');
                }
            }
        } catch (error) {
            console.log(error)
            alert("Something went wrong!");
        }
    }
    
  return (
      <>
        <Nav/>
        <div className='container bg-dark log-lg-4 col-md-6 col-sm-12 col-12 pt-2 mt-5'>
                <h1 className='display-5 text-center text-info'>Login</h1>
            <form className="row col-lg-8 col-md-8 col-sm-10 col-10 mx-auto my-5" onSubmit={handleSubmit}>
                <input className="form-control my-2" type="text" placeholder="Username" aria-label="Username" value={username} onChange={(e)=>setUsername(e.target.value)} autoComplete={false} />
                <input className="form-control my-2" type="password" placeholder="Password" aria-label="Password" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete={false} />
                <button type="submit" className='btn btn-info  col-6 mx-auto my-4'>Login</button>
            </form>
        </div>
      </>
  )
}

export default Login