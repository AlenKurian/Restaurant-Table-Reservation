// src/components/BookingForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { Button } from "@mui/material";
import { TextField, MenuItem } from "@mui/material";
import { toast } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";


export default function BookingForm({ restaurantId, tables }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tableId, setTableId] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  // 🔐 Check if user is logged in
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) navigate("/login");
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time || !tableId || !guestCount) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "reservations"), {
        user_id: user.uid,
        restaurant_id: restaurantId,
        table_id: tableId,
        reservation_date: date,
        reservation_time: time,
        guest_count: Number(guestCount),
        special_requests: specialRequests || null,
        status: "pending",
        created_at: new Date(),
      });

      toast.success("Reservation created successfully!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create reservation");
    } finally {
      setLoading(false);
    }
  };

  const availableTables = tables.filter((t) => t.is_available);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white shadow rounded-lg">
      {/* Date */}
      <TextField
        label="Date *"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Time */}
      <TextField
        label="Time *"
        select
        fullWidth
        value={time}
        onChange={(e) => setTime(e.target.value)}
      >
        {timeSlots.map((slot) => (
          <MenuItem key={slot} value={slot}>{slot}</MenuItem>
        ))}
      </TextField>

      {/* Guests */}
      <TextField
        label="Guests *"
        type="number"
        fullWidth
        value={guestCount}
        onChange={(e) => setGuestCount(e.target.value)}
        inputProps={{ min: 1 }}
      />

      {/* Table */}
      <TextField
        label="Select Table *"
        select
        fullWidth
        value={tableId}
        onChange={(e) => setTableId(e.target.value)}
      >
        {availableTables.length === 0 ? (
          <MenuItem disabled>No tables available</MenuItem>
        ) : (
          availableTables.map((table) => (
            <MenuItem key={table.id} value={table.id}>
              Table {table.table_number} — Capacity {table.capacity}
            </MenuItem>
          ))
        )}
      </TextField>

      {/* Special requests */}
      <TextField
        label="Special Requests (optional)"
        fullWidth
        multiline
        rows={3}
        value={specialRequests}
        onChange={(e) => setSpecialRequests(e.target.value)}
      />

      <Button type="submit" variant="contained" fullWidth disabled={loading}>
        {loading ? "Booking..." : "Confirm Reservation"}
      </Button>
    </form>
  );
}
