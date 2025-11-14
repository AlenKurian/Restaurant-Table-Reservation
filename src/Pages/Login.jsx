import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'


function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    
    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await signInWithEmailAndPassword(auth, email, password)
            alert("Login successful!")
            navigate("/home")
        } catch (err) {
            setError("Invalid email or password")
            alert(err.message)
        }
    }
    


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Welcome Back</h2>
                {
                    error && (
                        <p className="text-red-500 text-center mb-3">Error</p>
                    )
                }

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                        <input type="email" placeholder="Enter your email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input type="password" placeholder="Enter your password" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 font-medium hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
