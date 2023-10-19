import { useState } from 'react'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const AllEventsClient = () => {
    const navigate = useNavigate()

    const id = import.meta.env.id
    const pwd = import.meta.env.pwd

    const [regEvents, setregEvents] = useState([])

    useEffect(() => {
        const token = Cookies.get('authToken')

        const cred = {
            id, pwd
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        if (!token) {
            navigate("/")
        } else {
            try {
                axios.post(`${import.meta.env.VITE_REACT_APP_API}/client/allevents`, cred, config).then((res) => {
                    setregEvents(res.data.ypEvents)
                })
            } catch (e) {
                console.error(e)
            } finally {
                console.log("done")
            }
        }
    }, [navigate, id, pwd])


    return (
        <>
            <div>AllEventsClient</div>
            {regEvents.map((event) => {
                return (
                    <div key={event._id}>
                        <h1>{event.name}</h1>
                        <h1>{event.email}</h1>
                        <h1>{event.college}</h1>
                        <h1>{event.batch}</h1>
                        <h1>{event.scholarid}</h1>
                        <img src={event.payment} alt="" />
                    </div>
                )
            })}
        </>
    )
}

export default AllEventsClient