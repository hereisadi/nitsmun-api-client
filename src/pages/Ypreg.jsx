import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FileBase64 from "react-file-base64";

const Ypreg = () => {
    const navigate = useNavigate()
    // const [email, setEmail] = useState("")
    // const [name, setName] = useState("")
    const [college, setCollege] = useState("")
    const [batch, setBatch] = useState("")
    const [payment, setPayment] = useState("")
    const [scholarid, setScholarid] = useState("")

    {/* give Event name */}
    const eventName = "AnnualConference 2024"
    console.log(eventName)

    const token = Cookies.get('authToken')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    {/* Fetching the name and email of logged in user for signin up the event */ }
    useEffect(() => {
        if (!token) {
            navigate("/")
        } else {
            console.log("token is present, good to go")
        }
    },[navigate, token])


    const handleImgChange = (base64) => {
        setPayment(base64)
    }


    {/* submit button handler */}
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_API}/reg/yp`, {  college, batch, scholarid, payment, eventName }, config).then((res) => {
                if (res.status === 200 && res.data.message === "Event registration completed") {
                    alert("Event registration completed")
                } else {
                    alert("something went wrong")
                }
            })
        } catch (e) {
            if (e.response.data.error === "Please fill all required fields") {
                alert("Please fill all required fields")
            } else if(e.response.data.error==="Signup with this email already exists"){
                alert("Signup with this email already exists")
            }
            else {
                console.error(e)
            }

        } finally {
            console.log("done")
        }
    }


    return (
        <>
            <div>Ypreg</div>
          

            <label htmlFor="Scholar ID">Scholar ID</label>
            <input type="text" id='Scholar ID' value={scholarid} onChange={(e) => {
                setScholarid(e.target.value)
            }} />

            <label htmlFor="batch"  >Batch</label>
            <input type="text" id='batch' value={batch} onChange={((e) => {
                setBatch(e.target.value)
            })} />


            <label htmlFor="college">College</label>
            <input type="text" id='college' value={college} onChange={((e) => {
                setCollege(e.target.value)
            })} />

            <FileBase64
                multiple={false}
                onDone={({ base64, file }) => {
                    if (
                        (file.type === "image/png" ||
                            file.type === "image/jpeg" ||
                            file.type === "image/jpg" ||
                            file.type === "image/webp" ||
                            file.type === "image/avif") &&
                        file.size <= 300 * 1024
                    ) {
                        handleImgChange(base64);
                    } else {
                        alert("Invalid file type or image is greater than 300KB")
                        setPayment("");
                    }
                }}
            />

            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default Ypreg