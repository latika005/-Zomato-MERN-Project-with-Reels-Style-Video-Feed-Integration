import React from "react";

function UserRegister() {
    return (
        <div className="container">
            <h1>User Registration</h1>
            <form>
                <label htmlFor="fullname">Full Name</label>
                <input type="text" id="fullname" placeholder="Enter your full name" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default UserRegister;