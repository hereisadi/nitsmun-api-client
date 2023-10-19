import { useState } from 'react'
import axios from 'axios'
const Signup = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleconfirmPassword = (e) => {
        setconfirmPassword(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_API}/signup`, {
                email, password, confirmPassword, name
            }).then((response) => {

                if(response.status === 200 && response.data.message === "User account created successfully"){
                    alert("User account created successfully")
                }
                
            })
        } catch (e) {
            if (e.response.data.error === "Please fill all required fields") {
                alert("Please fill all required fields")
            }
            else if (e.response.data.error === "Name should be a string") {
                alert("Name should be a string")
            } else if (e.response.data.error === "Password should not be less than 8 characters") {
                alert("Password should not be less than 8 characters")
            } else if (e.response.data.error === "Passwords do not match") {
                alert("Passwords do not match")
            } else if (e.response.data.error === "Email already exists") {
                alert("Email already exists")
            } else {
                alert(e)
            }
        } finally {
            console.log(`finally done`)
            setName("")
            setEmail("")
            setPassword("")
            setconfirmPassword("")
        }
    }


    return (
        <>
            <h1>Signup</h1>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={handleEmail} />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={handlePassword} />
            </div>

            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleconfirmPassword} />
            </div>

            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={handleName} />
            </div>

            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </>
    )
}

export default Signup
