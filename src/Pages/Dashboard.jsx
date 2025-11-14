import React from "react";

function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar */}
            <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">Restaurant Dashboard</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Logout</button>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 p-6">
                {/* Sidebar */}
                <aside className="w-64 bg-white rounded-2xl shadow-md p-4 mr-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Menu</h2>
                    <ul className="space-y-3">
                        <li className="hover:bg-blue-100 p-2 rounded-md cursor-pointer text-gray-700 font-medium">
                            Dashboard Overview
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-md cursor-pointer text-gray-700 font-medium">
                            Manage Restaurants
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-md cursor-pointer text-gray-700 font-medium">
                            Table Reservations
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-md cursor-pointer text-gray-700 font-medium">
                            Customers
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-md cursor-pointer text-gray-700 font-medium">
                            Settings
                        </li>
                    </ul>
                </aside>

                {/* Dashboard Cards */}
                <section className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Overview</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                            <h3 className="text-gray-500 text-sm mb-2">Total Reservations</h3>
                            <p className="text-3xl font-bold text-blue-600">128</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                            <h3 className="text-gray-500 text-sm mb-2">Active Restaurants</h3>
                            <p className="text-3xl font-bold text-green-600">12</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                            <h3 className="text-gray-500 text-sm mb-2">Customers Today</h3>
                            <p className="text-3xl font-bold text-yellow-500">46</p>
                        </div>
                    </div>

                    {/* Table List
                    <div className="mt-10 bg-white p-6 rounded-2xl shadow">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Recent Reservations
                        </h3>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-3 text-gray-600">Customer</th>
                                    <th className="p-3 text-gray-600">Restaurant</th>
                                    <th className="p-3 text-gray-600">Table No</th>
                                    <th className="p-3 text-gray-600">Date</th>
                                    <th className="p-3 text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="p-3 text-gray-700">gerald</td>
                                    <td className="p-3 text-gray-700">Al-reem</td>
                                    <td className="p-3 text-gray-700">T-05</td>
                                    <td className="p-3 text-gray-700">Nov 11, 2025</td>
                                    <td className="p-3">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Confirmed</span>
                                    </td>
                                </tr>

                                <tr className="border-b hover:bg-gray-50">
                                    <td className="p-3 text-gray-700">raman</td>
                                    <td className="p-3 text-gray-700">kubaba</td>
                                    <td className="p-3 text-gray-700">T-12</td>
                                    <td className="p-3 text-gray-700">Nov 12, 2025</td>
                                    <td className="p-3">
                                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">Pending</span>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50">
                                    <td className="p-3 text-gray-700">joy</td>
                                    <td className="p-3 text-gray-700">Arabian palace</td>
                                    <td className="p-3 text-gray-700">T-07</td>
                                    <td className="p-3 text-gray-700">Nov 13, 2025</td>
                                    <td className="p-3">
                                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Cancelled</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
