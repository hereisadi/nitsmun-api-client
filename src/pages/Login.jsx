import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'; 
import { useEffect } from 'react';

const Login = () => {
const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()

       try{
        await axios.post(`${import.meta.env.VITE_REACT_APP_API}/login`, {
            email, password
        }).then((response)=>{
            if(response.status === 200 && response.data.message === "Login successful"){
                const token = response.data.token;
                Cookies.set('authToken', token);
                
                // alert("Login successful")
                navigate("/dashboard")
            }else{
                alert("Login failed")
            }
        })
       }catch(error){
        alert(error)
       }finally{
        // setEmail("")
        // setPassword("")
       }
    }


    useEffect(()=>{
        const token = Cookies.get("authToken")
        if(token){
            navigate("/dashboard")
        }
    },[navigate])

    return (
        <>
            <div>Login</div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={handleEmail} />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={handlePassword} />
            </div>

            <button onClick={handleLogin}>Submit</button>

        </>
    )
}

export default Login