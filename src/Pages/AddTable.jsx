import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Paper,
    TextField,
    MenuItem,
    Button,
    Typography,
} from "@mui/material";
import { toast } from "react-hot-toast";

function AddTable() {
    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState([]);
    const [restaurantId, setRestaurantId] = useState("");
    const [tableNumber, setTableNumber] = useState("");
    const [capacity, setCapacity] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [loading, setLoading] = useState(false);

    // Fetch restaurants for dropdown
    const fetchRestaurants = async () => {
        const snapshot = await getDocs(collection(db, "restaurants"));
        const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setRestaurants(docs);
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!restaurantId || !tableNumber || !capacity) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "restaurant_tables"), {
                restaurant_id: restaurantId,
                table_number: Number(tableNumber),
                capacity: Number(capacity),
                is_available: isAvailable,
            });

            toast.success("Table added successfully!");
            navigate("/home");

        } catch (error) {
            console.error(error);
            toast.error("Failed to add table");
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="sm" className="py-10">
            <Paper className="p-6 shadow-lg">
                <Typography
                    variant="h5"
                    className="font-bold text-center mb-4"
                >
                    Add Table
                </Typography>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Restaurant Dropdown */}
                    <TextField
                        select
                        label="Select Restaurant *"
                        fullWidth
                        value={restaurantId}
                        onChange={(e) => setRestaurantId(e.target.value)}
                    >
                        {restaurants.map((rest) => (
                            <MenuItem key={rest.id} value={rest.id}>
                                {rest.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Table Number */}
                    <TextField
                        label="Table Number *"
                        type="number"
                        fullWidth
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        inputProps={{ min: 1 }}
                    />

                    {/* Capacity */}
                    <TextField
                        label="Seating Capacity *"
                        type="number"
                        fullWidth
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        inputProps={{ min: 1 }}
                    />

                    {/* Availability */}
                    <TextField
                        select
                        label="Availability *"
                        fullWidth
                        value={isAvailable ? "true" : "false"}
                        onChange={(e) => setIsAvailable(e.target.value === "true")}
                    >
                        <MenuItem value="true">Available</MenuItem>
                        <MenuItem value="false">Reserved</MenuItem>
                    </TextField>

                    {/* Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Table"}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default AddTable;
