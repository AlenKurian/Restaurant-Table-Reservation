// src/pages/RestaurantDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";

import BookingForm from "../components/BookingForm";

function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch restaurant details
  const fetchRestaurantDetails = async () => {
    try {
      const ref = doc(db, "restaurants", id);
      const snapshot = await getDoc(ref);

      if (!snapshot.exists()) {
        navigate("/home");
        return;
      }

      setRestaurant({ id: snapshot.id, ...snapshot.data() });
    } catch (err) {
      console.error("Error loading restaurant:", err);
      navigate("/home");
    }
  };

  // Fetch tables belonging to that restaurant
  const fetchTables = async () => {
    try {
      const q = query(collection(db, "restaurant_tables"), where("restaurant_id", "==", id));
      const snapshot = await getDocs(q);

      const tableList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTables(tableList);
    } catch (err) {
      console.error("Error loading tables:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await fetchRestaurantDetails();
      await fetchTables();

      setLoading(false);
    };

    if (id) loadData();
  }, [id]);


  if (loading || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Loading restaurant details…</p>
      </div>
    );
  }

  const availableTables = tables.filter((t) => t.is_available).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BACK BUTTON */}
      <div className="w-full bg-white shadow p-4">
        <Button variant="outlined" onClick={() => navigate("/home")}>
          ← Back to Restaurants
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[300px]">
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 p-4 bg-black/50 w-full">
          <h1 className="text-white text-4xl font-bold">{restaurant.name}</h1>
          <p className="text-gray-200">{restaurant.cuisine_type}</p>
        </div>
      </div>

      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {/* LEFT CONTENT */}
          <Grid item xs={12} md={8}>

            {/* About */}
            <Card className="mb-6">
              <CardHeader>
                <Typography variant="h6">About</Typography>
              </CardHeader>
              <CardContent>
                <Typography>{restaurant.description}</Typography>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="mb-6">
              <CardHeader>
                <Typography variant="h6">Contact & Hours</Typography>
              </CardHeader>
              <CardContent>
                <p><strong>Address:</strong> {restaurant.address}</p>
                <p><strong>Phone:</strong> {restaurant.phone}</p>
                <p>
                  <strong>Hours:</strong> {restaurant.opening_time} – {restaurant.closing_time}
                </p>
              </CardContent>
            </Card>

            {/* Tables */}
            <Card>
              <CardHeader>
                <Typography variant="h6">Available Tables</Typography>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {availableTables} table(s) available
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tables.map((table) => (
                    <div
                      key={table.id}
                      className={`p-4 border rounded-lg text-center ${table.is_available ? "bg-green-50" : "bg-red-100 opacity-60"
                        }`}
                    >
                      <h3 className="font-semibold">Table {table.table_number}</h3>
                      <p>Seats: {table.capacity}</p>
                      <p className="text-sm mt-1">
                        {table.is_available ? "Available" : "Reserved"}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT SIDEBAR — Booking Form */}
          <Grid item xs={12} md={4}>
            <Card className="sticky top-24">
              <CardHeader>
                <Typography variant="h6">Make a Reservation</Typography>
              </CardHeader>
              <CardContent>
                <BookingForm restaurantId={restaurant.id} tables={tables} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default RestaurantDetails;