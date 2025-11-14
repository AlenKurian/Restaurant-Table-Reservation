// src/pages/AddRestaurant.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        cuisine_type: "",
        address: "",
        phone: "",
        image_url: "",
        opening_time: "",
        closing_time: "",
    });

    const [loading, setLoading] = useState(false);

    // Handle form changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Submit to Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await addDoc(collection(db, "restaurants"), formData);

            alert("Restaurant added successfully!");
            navigate("/home");
        } catch (error) {
            console.error(error);
            alert("Error adding restaurant. Please try again.");
        }

        setLoading(false);
    };

    return (
        <Container className="py-10">
            <Paper className="p-8 shadow-lg max-w-xl mx-auto bg-white rounded-xl">
                <Typography variant="h4" className="font-bold mb-6 text-center">
                    Add New Restaurant
                </Typography>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <TextField
                        label="Restaurant Name"
                        name="name"
                        fullWidth
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Cuisine Type"
                        name="cuisine_type"
                        fullWidth
                        required
                        value={formData.cuisine_type}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Description"
                        name="description"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Address"
                        name="address"
                        fullWidth
                        required
                        value={formData.address}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Phone"
                        name="phone"
                        fullWidth
                        required
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Image URL"
                        name="image_url"
                        fullWidth
                        value={formData.image_url}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            label="Opening Time"
                            name="opening_time"
                            fullWidth
                            placeholder="10:00 AM"
                            value={formData.opening_time}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Closing Time"
                            name="closing_time"
                            fullWidth
                            placeholder="11:00 PM"
                            value={formData.closing_time}
                            onChange={handleChange}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        className="!mt-4"
                    >
                        {loading ? "Adding..." : "Add Restaurant"}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default AddRestaurant;
