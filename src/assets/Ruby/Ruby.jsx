import React, { useState, useEffect } from "react";
import { database } from "../Dashboard/firebaseConfig"; 
import { ref, onValue } from "firebase/database";
const Ruby = ({ isOpen }) => {
    const [roomData, setRoomData] = useState([]);

    useEffect(() => {
        const dbRef = ref(database, '/hostel6');  
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            const formattedData = [];

            for (const block in data) {
                for (const room in data[block]) {
                    formattedData.push({
                        ...data[block][room],
                        block,
                        roomNumber: room
                    });
                }
            }
            setRoomData(formattedData);
        });
    }, []);

    return (
        <div className="container-dashboard flex h-screen">
            <div className={`Content flex-1 p-10 transition-all duration-300 ${isOpen ? 'ml-56' : 'ml-0'} bg-blue-20 relative`}>
                <h1 className="text-center font-bold text-lg mb-4">Ruby</h1>
                <div className="studentDB bg-transparent w-full h-80 text-gray-500 mt-10 mr-5 outline-none">
                    <table className="table-auto border-collapse w-full text-left shadow-2xl rounded-3xl overflow-hidden">
                        <thead className="bg-white text-black">
                            <tr>
                                <th className="border-b border-gray-400 px-4 py-2">Hostel</th>
                                <th className="border-b border-gray-400 px-4 py-2">Room Number</th>
                                <th className="border-b border-gray-400 px-4 py-2">Availability</th>
                                <th className="border-b border-gray-400 px-4 py-2">Room Number</th>
                                <th className="border-b border-gray-400 px-4 py-2">Student 1</th>
                                <th className="border-b border-gray-400 px-4 py-2">Student 2</th>
                                <th className="border-b border-gray-400 px-4 py-2">Student 3</th>
                                <th className="border-b border-gray-400 px-4 py-2">Student 4</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {roomData.map((room, index) => (
                                <tr key={index}>
                                    <td className="border-t border-gray-200 px-4 py-2">{room.block}</td>
                                    <td className="border-t border-gray-200 px-4 py-2">{room.roomNumber}</td>
                                    <td className="border-t border-gray-200 px-4 py-2">{room.available ? 'Available' : 'Unavailable'}</td>
                                    <td className="border-t border-gray-200 px-4 py-2">{room.seatNumber}</td>
                                    <td className="border-t border-gray-200 px-4 py-2">{room.userEmail1}</td>
                                    <td className="border-t border-gray-200 px-4 py-2">{room.userEmail2}</td>
                                    <td className="border-t border-gray-200 px-4 py-2">{room.userEmail3}</td>
                                    <td className="border-t border-gray-200 px-4 py-2">{room.userEmail4}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Ruby;
