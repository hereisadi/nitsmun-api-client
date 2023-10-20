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
    const [role, setRole] = useState("")

    const [allAccounts, setAllAccounts] = useState([])

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
                    setRole(response.data.role)
                })
        }
    }, [])

    useEffect(() => {
        const token = Cookies.get('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        if (token) {
            axios.get(`${import.meta.env.VITE_REACT_APP_API}/superadmin/getallaccounts`, config)
                .then((response) => {
                    setAllAccounts(response.data.allAccounts)
                })
        }
    }, [])


    const handleElevateRole = async (accountID) => {
        const token = Cookies.get('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // console.log(accountID)
        try {
            await axios.put(`${import.meta.env.VITE_REACT_APP_API}/elevate/admin`, { accountID }, config)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Role elevated to admin")
                    }
                })
        } catch (e) {
            console.error(e)
        }
    }

    const handleDemoteRole = async (accountID) => {
        const token = Cookies.get('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // console.log(accountID)
        try {
            await axios.put(`${import.meta.env.VITE_REACT_APP_API}/demote/client`, { accountID }, config)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Role demoted to client")
                    }
                })
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <>
            {/* Super Admin stuffs */}
            {role === "superadmin" && (
                <>
                    <p>Super Admins dashboard</p>
                    <br />
                    {allAccounts.length > 0 ? (
                        allAccounts.map((account) => {
                            return (
                                <div key={account._id}>
                                    <ul>
                                        <li>{account.name}</li>
                                        <li>{account.email}</li>
                                        <li>{account.role}</li>
                                        <li>{account._id}</li>
                                        <div>
                                            <button disabled={account.role === "admin" || account.role === "superadmin"}
                                                onClick={() => handleElevateRole(account._id)}
                                            >Elevate role to admin</button>
                                        </div>
                                        <button disabled={account.role === "client" || account.role === "superadmin"} onClick={() => handleDemoteRole(account._id)}>Demote role to client</button>
                                    </ul>
                                    <hr />
                                </div>
                            )
                        })
                    ) : (<p>No account exists</p>)}

                    <br />
                    <div>
                        <Link to="/registrations/YouthParliament">Youth Parliament&apos;s registrations</Link>
                    </div>
                    <div>
                        <Link to="/registrations/annual">Annual Conference&apos;s registrations</Link>
                    </div>
                </>
            )}


            {/* Admin stuffs */}

            {role === "admin" && (
                <>
                    <h1>Admin&apos;s Panel here</h1>

                    <div>
                        <Link to="/registrations/YouthParliament">Youth Parliament&apos;s registrations</Link>
                    </div>
                    <div>
                        <Link to="/registrations/annual">Annual Conference&apos;s registrations</Link>
                    </div>
                </>
            )}

            {role === "client" && (
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
                                    {event.cofirmedRegistrationAt === "" && (
                                        <h1>Confirmed registration at: {event.cofirmedRegistrationAt}</h1>
                                    )}
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