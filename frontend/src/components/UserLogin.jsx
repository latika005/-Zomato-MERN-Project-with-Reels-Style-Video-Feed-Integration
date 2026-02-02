import React from "react";
import { Link } from "react-router-dom";

function UserLogin() {
    return (
        <div className="container">
            <h1>User Login</h1>
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" />

                <button type="submit">Login</button>
            </form>
            <p className="signup-text">
                New here? <Link to="/user/register" className="signup-link">Sign Up</Link>
            </p>
        </div>
    );
}

export default UserLogin;