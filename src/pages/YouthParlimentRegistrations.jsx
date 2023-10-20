import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import { useState } from "react"

const YouthParlimentRegistrations = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const currentURL = decodeURIComponent(location.pathname);
    const eventName = currentURL.split("/registrations/")[1];


    const [usersRegistered, setUsersRegistered] = useState([])

  

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
                    if (res.data.role !== "admin" && res.data.role !== "superadmin") {
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
        const token = Cookies.get('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
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
    },[eventName])

    {/* Confirm registration */ }
    const handlePublish = async (regID) => {
        const token
            = Cookies.get('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // console.log(regID)

        try {
            await axios.put(`${import.meta.env.VITE_REACT_APP_API}/confirm/reg`, { regID }, config)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Registration confirmed")
                    }
                })
        } catch (e) {
            console.error(e)
        }
    }


    {/* Decline registration */ }

    const handleDecline = async (regID) => {
        const token
            = Cookies.get('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            await axios.put(`${import.meta.env.VITE_REACT_APP_API}/decline/reg`, { regID }, config)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Registration declined. You will be contacted very soon.")
                    }
                })
        } catch (e) {
            console.error(e)
        }
    }

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
                            <div>
                                <button onClick={(() => handlePublish(reg._id))}>Confirm registration</button>
                            </div>
                            <button onClick={(() => handleDecline(reg._id))}>Decline registration</button>
                            <hr />
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