"use client"; // because it's a front end page (means client side) // all the log will be on browser
import Link from "next/link";
import React from "react";
import { useRouter, useEffect } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false); // signup button will be disabled is any of the field(username, pass) is empty
    const [loading, setLoading] = React.useState(false);

    const onSignUp = async () => { // we are using async because onSignUp will be talking to database

        try {
            setLoading(true);
            const response = await axios.post("api/users/signup", user); // sending the user data to backend
            console.log("Signup success " + response.data);
            toast.success("Successfully Signed Up");
            router.push("/login"); // push the user to login page
        } catch (error) {
            console.log("Signup Failed " + error.message)
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]); // means useEffect is dependent on user

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr/>
            <label htmlFor="username">username</label>
            {/* htmlFor will highlight the input with id = username */}
            <input
            className="p-1 border border-gray-300 rounded-lg mb-4 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username : e.target.value})}
            placeholder="username"
            />

            <label htmlFor="email">email</label>
            {/* htmlFor will highlight the input with id = email */}
            <input
            className="p-1 border border-gray-300 rounded-lg mb-4 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email : e.target.value})}
            placeholder="email"
            />

            <label htmlFor="password">password</label>
            {/* htmlFor will highlight the input with id = password */}
            <input
            className="p-1 border border-gray-300 rounded-lg mb-4 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password : e.target.value})}
            placeholder="password"
            />

            <button 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            onClick={onSignUp}
            
            >{buttonDisabled ? "No Signup" : "Signup Here"}</button>
            <Link href="/login">Visit Login Page</Link>

        </div>
    )
}