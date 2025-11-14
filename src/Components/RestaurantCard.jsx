import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

function RestaurantCard({
  id,
  name,
  description,
  cuisineType,
  address,
  phone,
  imageUrl,
  openingTime,
  closingTime,
}) {
  return (
    <Card
      className="shadow-md hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-200"
    >
      {/* Image */}
      <Box className="relative ">
        <CardMedia
          component="img"
          height="160 px"
          image={imageUrl || "https://via.placeholder.com/400x200"}
          alt={name}
          className="object-cover"
        />
        <Chip
          label={cuisineType}
          color="primary"
          size="small"
          className="absolute top-2 right-2 bg-white text-primary border"
        />
      </Box>

      {/* Content */}
      <CardContent>
        {/* Name */}
        <Typography variant="h6" className="font-bold text-gray-900 mb-1">
          {name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          className="text-gray-600 mb-3 line-clamp-2"
        >
          {description}
        </Typography>

        <div className="text-sm space-y-1 text-gray-500">
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Hours:</strong> {openingTime} - {closingTime}</p>
        </div>
      </CardContent>

      {/* Footer */}
      <CardActions className="px-4 pb-4">
        <Link to={`/restaurant/${id}`} className="w-full">
          <Button
            variant="contained"
            fullWidth
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            View Details & Book
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default RestaurantCard;
