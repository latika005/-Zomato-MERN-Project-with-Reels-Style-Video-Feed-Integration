import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function FoodPartnerRegister() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const contactName = e.target.contactName.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;

        const response = await axios.post("http://localhost:3000/api/auth/foodpartner/register", {
            name,
            email,
            password,
            contactName,
            phone,
            address
        },{
            withCredentials: true,
        });

        console.log(response.data);

        navigate("/create-food");

    };

    return (
        <div className="container">
            <h1>Food Partner Registration</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" />

                <label htmlFor="contactName">Contact Name</label>
                <input type="text" id="contactName" name="contactName" placeholder="Enter the contact person's name" />

                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" />

                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" placeholder="Enter your address" />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default FoodPartnerRegister;