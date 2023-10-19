import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Dashboard = () => {
    const [details, setDetails] = useState([])
    const navigate = useNavigate()
   
    const token = Cookies.get('authToken');

    useEffect(() => {
        const token = Cookies.get('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

       if(token){
        axios.get(`${import.meta.env.VITE_REACT_APP_API}/dashboard`, config)
        .then((response) => {
            setDetails(response.data)
        })
       }


        if (!token) {
            navigate("/")
        }
    })

    const hadnleLogout = () => {
        if (token) {
            Cookies.remove('authToken');
           navigate("/")
        } else {
            alert("not logged in")
        }
    }

    const handleYp = () => {
        navigate("/yp")
    }

    return (
        <>
            {/* <div>Dashboard</div> */}
            {token ? <div>logged in</div> : <div>Not logged in</div>}
            <h1> {details.name}</h1>
            <h1> {details.email}</h1>
            <button onClick={hadnleLogout}>Signout</button>
            <button onClick={handleYp}>signup to yp</button>
        </>
    )
}

export default Dashboard;