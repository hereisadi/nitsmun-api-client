import { useState } from 'react'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
const AllEventsClient = () => {
    const navigate = useNavigate()

    const id = import.meta.env.id
    const pwd = import.meta.env.pwd

    const [regEvents, setregEvents] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

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

    {/* finding the role of logged in user */ }

    useEffect(() => {
        const token = Cookies.get('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        if (token) {
            axios.get(`${import.meta.env.VITE_REACT_APP_API}/dashboard`, config)
                .then((response) => {
                    setIsAdmin(response.data.role === "admin" ? true : false)
                    // console.log(response.data.role)
                })
        }
    })


    return (
        <>
            {isAdmin ? (
                <>
                    <h1>Admin&apos;s Panel here</h1>

                    <div>
                        <Link to="/registrations/YouthParliament">Youth Parliament&apos;s registrations</Link>
                    </div>
                    <div>
                        <Link to="/registrations/annual">Annual Conference&apos;s registrations</Link>
                    </div>

                </>
            ) : (
                <>
                    <div>AllEventsClient</div>

                    {regEvents.length > 0 ? (
                        regEvents.map((event) => {
                            return (
                                <div key={event._id}>
                                    <h1>{event.name}</h1>
                                    <h1>{event.email}</h1>
                                    <h1>{event.college}</h1>
                                    <h1>{event.batch}</h1>
                                    <h1>
                                        {event.status === "pending"
                                            ? "Registered but not confirmed yet. Please wait."
                                            : event.status === "confirmed"
                                                ? "Registration accepted."
                                                : event.status === "declined"
                                                    ? "Registration declined. Please contact the team."
                                                    : "Not Registered"}
                                    </h1>
                                    <h1>{event.regsiteredat}</h1>
                                    <h1>{event.scholarid}</h1>
                                    <h1>{event.eventName}</h1>
                                    <img src={event.payment} alt="" />
                                </div>
                            )
                        })
                    ) : (<h1>No registrations</h1>)}
                </>
            )}

        </>
    )
}

export default AllEventsClient