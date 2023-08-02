"use client"; // because it's a front end page (means client side)
import Link from "next/link";
import React from "react";
import { useRouter, useEffect } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => { // we are using async because onSignUp will be talking to database
        try {
            setButtonDisabled(true);
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login Success " + response.data);
            toast.success("Login Success");
            router.push("/profile/" + user.email); // send the user to the profile page
            
        } catch (error) {
            console.log("Login Failed " + error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {

        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1 className="py-5">{loading ? "Processing" : "Login"}</h1>
            <hr/>
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
            onClick={onLogin}
            
            >Login Here</button>
            <Link href="/signup">Visit Signup Page</Link>

        </div>
    )
}