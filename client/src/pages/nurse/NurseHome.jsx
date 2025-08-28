import  { useEffect, useState } from "react";

const NurseHome = () => {
  const [nurses, setNurses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    qualification: "",
  });

  // Load nurses from localStorage on mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const nurseData = users.filter((user) => user.role === "nurse");
    setNurses(nurseData);
  }, []);

  const handleDelete = (id) => {
    const updatedNurses = nurses.filter((nurse) => nurse.id !== id);
    setNurses(updatedNurses);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUsers = users.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const handleAddNurse = () => {
    const newId = Date.now();
    const newNurse = { ...formData, id: newId, role: "nurse" };

    const updatedNurses = [...nurses, newNurse];
    setNurses(updatedNurses);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newNurse);
    localStorage.setItem("users", JSON.stringify(users));

    setFormData({ name: "", email: "", password: "", phone: "", qualification: "" });
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Nurse Dashboard</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          Add Nurse
        </button>
      </div>

      {/* Nurse Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Qualification</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {nurses.map((nurse, index) => (
              <tr key={nurse.id} className="text-center">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{nurse.name}</td>
                <td className="px-4 py-2">{nurse.email}</td>
                <td className="px-4 py-2">{nurse.phone}</td>
                <td className="px-4 py-2">{nurse.qualification}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(nurse.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {nurses.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No nurses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Nurse Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New Nurse</h2>
            <div className="space-y-3">
              {["name", "email", "password", "phone", "qualification"].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full border px-3 py-2 rounded"
                  value={formData[field]} 
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              ))}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNurse}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Add Nurse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NurseHome;
