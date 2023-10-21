import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const EditProfile = () => {
    const navigate = useNavigate()
    const [newName, setNewName] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [confirmNewPwd, setConfirmNewPwd] = useState("")

    const token = Cookies.get("authToken")

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [navigate, token])


    const handleEdit = async (e) => {
        e.preventDefault()

        try {
            await axios.put(`${import.meta.env.VITE_REACT_APP_API}/all/edit/profile`, { newName, newPwd, confirmNewPwd }, config).then((res) => {
                if (res.status === 200) {
                    alert("Profile updated")
                }
            })
        } catch (e) {
            console.error(e)
        } finally {
            console.log("done")
        }
    }



    return (
        <>
            <div>EditProfile</div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={newName} onChange={(e) => {
                setNewName(e.target.value)
            }} />


            <label htmlFor="pwd">Password</label>
            <input type="text" id="pwd" value={newPwd} onChange={(e) => {
                setNewPwd(e.target.value)
            }} />

            <label htmlFor="cpwd">Confirm Password</label>
            <input type="text" id="cpwd" value={confirmNewPwd} onChange={(e) => {
                setConfirmNewPwd(e.target.value)
            }} />

            <button onClick={handleEdit}>Submit</button>
        </>
    )
}

export default EditProfile