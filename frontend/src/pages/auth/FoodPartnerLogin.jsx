import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FoodPartnerLogin() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await axios.post("http://localhost:3000/api/auth/foodpartner/login", {
         email : e.target.email.value,
         password : e.target.password.value,
    },{
        withCredentials : true,
    })

    
    console.log(response.data);

    navigate("/create-food");

    }


    return (
        <div className="container">
            <h1>Food Partner Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"name="email"  placeholder="Enter your email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" />

                <button type="submit">Login</button>
            </form>
            <p className="signup-text">
                New here? <Link to="/foodpartner/register" className="signup-link">Sign Up</Link>
            </p>
        </div>
    );
}

export default FoodPartnerLogin;