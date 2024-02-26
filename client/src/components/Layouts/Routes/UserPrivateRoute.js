import React,{useEffect, useState} from 'react'
import { useAuth } from '../../../context/auth'
import axios from 'axios';
import { Outlet } from 'react-router-dom';


const UserPrivateRoute = () => {
const [auth, setAuth] = useAuth();
const [success, setSuccess] = useState(false);
useEffect(() => {
 const checkuserSignIn =async()=>{
    const res = await axios.get("/api/v1/auth/user-auth-check")
    console.log("response = ", res)
    setSuccess(res.data.success)
 }
    if(auth?.token) checkuserSignIn()
}, [auth?.token])

  return (
    <>
    {success?<Outlet/> :console.log("error!!!")}
    </>
  )
}

export default UserPrivateRoute