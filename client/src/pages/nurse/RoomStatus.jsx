import { useEffect, useState } from "react";

const RoomStatus = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("rooms")) || [];
    setRooms(storedRooms);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Room Status</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Room No</th>
              <th className="text-left px-4 py-2">Type</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Assigned Patient</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-b">
                <td className="px-4 py-2">{room.number}</td>
                <td className="px-4 py-2">{room.type}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    room.status === "Available" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {room.status}
                </td>
                <td className="px-4 py-2">{room.patient || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomStatus;
