// import React from 'react'
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react"
import { useLocation } from "react-router-dom";

const AllRegisteredEvent = () => {
    const location = useLocation()
    const currentURL = decodeURIComponent(location.pathname);
    const eventName = currentURL.split("/event/")[1];
    // console.log(eventName)

    const [confirmed, setConfirmed] = useState([])

    useEffect(() => {
        const token = Cookies.get('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };


        try {
            axios.get(`${import.meta.env.VITE_REACT_APP_API}/admin/getpendingreg/${eventName}`, config)
                .then((res) => {
                    setConfirmed(res.data.allSuchEventsWithPendingStatus)
                })
        } catch (err) {
            console.error(err)
        }
    }, [eventName])


    return (
        <>
            <div>AllRegisteredEvent</div>
            {confirmed.length > 0 ? (
                confirmed.map((reg) => {
                    return (
                        <div key={reg._id}>
                            <ul>
                                <li>{reg.name}</li>
                                <li>{reg.email}</li>
                                <li>{reg.eventName}</li>
                                <li>{reg.status}</li>
                                <li>{reg.scholarid}</li>
                                <hr />
                                <br />
                            </ul>
                        </div>
                    )
                })
            ) : (<h1>Nothing present</h1>)}
        </>
    )
}

export default AllRegisteredEvent