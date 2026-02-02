import React from "react";

function FoodPartnerRegister() {
    return (
        <div className="container">
            <h1>Food Partner Registration</h1>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default FoodPartnerRegister;