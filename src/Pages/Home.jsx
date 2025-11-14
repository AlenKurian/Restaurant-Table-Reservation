// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { AppBar, Toolbar, Typography, Button, Container, Grid, CircularProgress, Box } from "@mui/material";
import RestaurantCard from "../Components/RestaurantCard";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "restaurants"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <AppBar position="sticky" color="primary">
        <Toolbar className="flex justify-between">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            TableBook
          </Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate("/reservations")}>
              My Reservations
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <div
        className="h-[400px] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/60 p-6 rounded-2xl">
          <h1 className="text-4xl font-bold mb-3">
            Discover Your Perfect Dining Experience
          </h1>
          <p className="text-lg">
            Book tables at the finest restaurants in town.
          </p>
        </div>
      </div>

      {/* Restaurant List */}
      <Container className="py-10">
        <Typography
          variant="h4"
          className="font-bold mb-8 text-gray-800">
          Featured Restaurants
        </Typography>

        {loading ? (
          <div className="flex justify-center mt-10">
            <CircularProgress />
          </div>
        ) : restaurants.length === 0 ? (
          <Typography align="center" className="text-gray-500 mt-10">
            No restaurants available at the moment.
          </Typography>
        ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    id={restaurant.id}
                    name={restaurant.name}
                    description={restaurant.description}
                    cuisineType={restaurant.cuisine_type}
                    address={restaurant.address}
                    phone={restaurant.phone}
                    imageUrl={restaurant.image_url}
                    openingTime={restaurant.opening_time}
                    closingTime={restaurant.closing_time}
                  />
                ))}
              </div>


        )}
      </Container>
    </div>
  );
}

export default Home;
