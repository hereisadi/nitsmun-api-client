import {useState} from 'react'
import axios from 'axios'
const Signup = () => {

    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [cPassword,setCPassword] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleCPassword = (e) => {
        setCPassword(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
await axios.post()
        }catch(e){
console.error(e)
        }finally{

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
                <label htmlFor="Cpassword">Confirm Password</label>
                <input type="password" id="Cpassword" value={cPassword} onChange={handleCPassword} />
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
