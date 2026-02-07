import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function UserRegister() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    const response = await axios.post("http://localhost:3000/api/auth/user/register", {
        fullName: e.target.fullname.value,
        email: e.target.email.value,
        password: e.target.password.value
    },{
        withCredentials: true,
    });

    console.log(response.data);

    navigate("/");

    }

    return (
        <div className="container">
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullname">Full Name</label>
                <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" />

                <button type="submit">Register</button>
                <p>
                    Already registered? <Link to="/user/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default UserRegister;