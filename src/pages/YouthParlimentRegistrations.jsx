import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import { useState } from "react"

const YouthParlimentRegistrations = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const currentURL = decodeURIComponent(location.pathname);
    const eventName = currentURL.split("/registartions/")[1];
    // console.log(eventName)

    const [usersRegistered, setUsersRegistered] = useState([])

    const token = Cookies.get('authToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const token
            = Cookies.get('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        if (!token) {
            navigate("/")
        }

        try {
            axios.get(`${import.meta.env.VITE_REACT_APP_API}/dashboard`, config)
                .then((res) => {
                    if (res.data.role !== "admin") {
                        navigate("/")
                    }
                })
        } catch (error) {
            console.error(error)
        }
        finally {
            console.log(`finally`)
        }

    }, [navigate])


    useEffect(() => {
        try {
            axios.get(`${import.meta.env.VITE_REACT_APP_API}/admin/getregistered/${eventName}`, config)
                .then((res) => {
                    setUsersRegistered(res.data.allSuchEvents)
                    
                })
        } catch (e) {
            console.error
        } finally {
            ("done")
        }
    })
    return (
        <>
            <div>YouthParlimentRegistrations</div>
            {usersRegistered.length > 0 ? (
                usersRegistered.map((reg) => {
                    return (
                        <div key={reg._id}>
                            <h1>{reg.name}</h1>
                            <h1>{reg.email}</h1>
                            <h1>{reg.scholarid}</h1>
                            <h1>{reg.regsiteredat}</h1>
                            <h1>{reg.status}</h1>
                        </div>
                    )
                })
            ) : (
                <p>no registrations till now</p>
            )}
        </>
    )
}

export default YouthParlimentRegistrations