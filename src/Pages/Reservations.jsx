import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    deleteDoc
} from "firebase/firestore";

import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Button,
} from "@mui/material";

import {
    AiOutlineCalendar,
    AiOutlineClockCircle
} from "react-icons/ai";

import {
    FaUserFriends,
    FaMapMarkerAlt,
    FaTrash,
    FaArrowLeft
} from "react-icons/fa";

import { toast } from "react-hot-toast";

function Reservations() {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReservations = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                navigate("/login");
                return;
            }

            const q = query(
                collection(db, "reservations"),
                where("user_id", "==", user.uid)
            );

            const snapshot = await getDocs(q);
            const data = [];

            for (const resDoc of snapshot.docs) {
                const reservation = { id: resDoc.id, ...resDoc.data() };

                const restaurantRef = doc(db, "restaurants", reservation.restaurant_id);
                const restaurantSnap = await getDoc(restaurantRef);
                if (restaurantSnap.exists()) reservation.restaurant = restaurantSnap.data();

                const tableRef = doc(db, "restaurant_tables", reservation.table_id);
                const tableSnap = await getDoc(tableRef);
                if (tableSnap.exists()) reservation.table = tableSnap.data();

                data.push(reservation);
            }

            setReservations(data);
        } catch (err) {
            console.error(err);
            toast.error("Error loading reservations");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelReservation = async (id) => {
        try {
            await deleteDoc(doc(db, "reservations", id));
            toast.success("Reservation cancelled");
            fetchReservations();
        } catch (err) {
            console.error(err);
            toast.error("Failed to cancel");
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                <p>Loading reservations…</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="w-full bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Reservations</h1>
                <Button variant="outlined" onClick={() => navigate("/home")}>
                    <FaArrowLeft className="mr-2" /> Back to Home
                </Button>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-10">
                {reservations.length === 0 ? (
                    <Card className="text-center py-10">
                        <CardContent>
                            <AiOutlineCalendar className="text-gray-400 mx-auto mb-4" size={60} />
                            <Typography variant="h6">No Reservations Yet</Typography>
                            <p className="text-gray-600 mt-2">
                                Browse restaurants and make your first reservation
                            </p>
                            <Button
                                className="mt-4"
                                variant="contained"
                                onClick={() => navigate("/home")}
                            >
                                Browse Restaurants
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reservations.map((reservation) => (
                            <Card key={reservation.id} className="shadow hover:shadow-lg transition">
                                <CardHeader>
                                    <Typography variant="h6">
                                        {reservation.restaurant?.name || "Unknown Restaurant"}
                                    </Typography>
                                    <p className="text-gray-500 text-sm">
                                        {reservation.restaurant?.cuisine_type}
                                    </p>
                                </CardHeader>

                                <CardContent className="space-y-3">

                                    <div className="flex items-center gap-2 text-sm">
                                        <AiOutlineCalendar size={18} className="text-blue-600" />
                                        <span>{reservation.reservation_date}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <AiOutlineClockCircle size={18} className="text-blue-600" />
                                        <span>{reservation.reservation_time}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <FaUserFriends size={18} className="text-blue-600" />
                                        <span>{reservation.guest_count} guests</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <FaMapMarkerAlt size={18} className="text-blue-600" />
                                        <span>{reservation.restaurant?.address}</span>
                                    </div>

                                    <div className="text-sm">
                                        <strong>Table:</strong> {reservation.table?.table_number}
                                    </div>

                                    {reservation.special_requests && (
                                        <div className="text-sm mt-2 border-t pt-2">
                                            <strong>Special Requests:</strong>
                                            <p className="text-gray-600">{reservation.special_requests}</p>
                                        </div>
                                    )}

                                    <Button
                                        variant="contained"
                                        color="error"
                                        fullWidth
                                        onClick={() => handleCancelReservation(reservation.id)}
                                        startIcon={<FaTrash />}
                                    >
                                        Cancel Reservation
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Reservations;
