import React, { useState } from 'react'
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext, UserProvider } from '../context/UserContext';
import './Login.css'



export default function Login() {

    const Credentials = [{
        email: "harshal@gmail.com",
        pass: "password2345"
    }]

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault()
        if(!email == Credentials.email){
            alert("Cred is wrongg")
        }
        // if (!email.trim()) {
        //     alert("Please enter email");
        //     return;
        // }

        // if (!email.includes("harshal@gmail.com")) {
        //     alert("Please enter a valid email");
        //     return;
        // }

        // if (!password.includes("harshal1234")) {
        //     alert("Please enter password");
        //     return;
        // }

        // if (password.length < 6) {
        //     alert("Password must be at least 6 characters");
        //     return;
        // }
        setLoading(true)


        setTimeout(() => {
            setLoading(false)
            alert("Login successful")
            localStorage.setItem("token", "my_dummy_token");
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);

            setUser({
                email,
                password
            })

            navigate("/dashboard", {
                state: {
                    email,
                    password
                }
            });


        }, 2000)
    }
    if (loading) {
        return (
            <div className="overlay">
                <div className="box">
                    <h2>Loading...</h2>
                    <p>Please wait</p>
                </div>
            </div>
        );
    }
    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form onSubmit={handlesubmit}>

                <p>
                    <label>Username or email address</label><br />
                    <input type="text" name="first_name" placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                </p>
                <p>
                    <label>Password</label>
                    <br />
                    <input type="password" name="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">
                        {loading ? "Loading..." : "Login"}
                    </button>
                </p>
            </form>

        </div>
    )
}