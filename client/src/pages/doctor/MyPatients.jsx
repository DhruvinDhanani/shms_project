import { useState } from 'react';

const dummyPatients = [
  {
    id: 1,
    name: 'Bhavin Shah',
    age: 45,
    gender: 'Male',
    status: 'Under Treatment',
    appointmentDate: '2025-07-20',
  },
  {
    id: 2,
    name: 'Rohit Verma',
    age: 32,
    gender: 'Female',
    status: 'Discharged',
    appointmentDate: '2025-07-24',
  },
  {
    id: 3,
    name: 'Sonal Jain',
    age: 32,
    gender: 'Male',
    status: 'Admitted',
    appointmentDate: '2025-07-27',
  },
];

const MyPatients = () => {
  const [patients, setPatients] = useState(dummyPatients);
  const [selectedDate, setSelectedDate] = useState('');
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: 'Male',
    status: 'Under Treatment',
    appointmentDate: '',
  });

  const handleStatusChange = (id, newStatus) => {
    const updated = patients.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setPatients(updated);
  };

  const handleAddPatient = () => {
    if (
      !newPatient.name ||
      !newPatient.age ||
      !newPatient.gender ||
      !newPatient.status ||
      !newPatient.appointmentDate
    ) {
      alert('Please fill all fields');
      return;
    }

    const id = Date.now(); // simple unique id
    const newEntry = { ...newPatient, id };
    setPatients([...patients, newEntry]);

    // Reset form
    setNewPatient({
      name: '',
      age: '',
      gender: 'Male',
      status: 'Under Treatment',
      appointmentDate: '',
    });
  };

  const filteredPatients = selectedDate
    ? patients.filter((p) => p.appointmentDate === selectedDate)
    : patients;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">My Patients</h2>

      {/* Add Patient Form */}
      <div className="mb-6 bg-gray-100 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">➕ Add New Patient</h3>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Name"
            className="border px-2 py-1 rounded"
            value={newPatient.name}
            onChange={(e) =>
              setNewPatient({ ...newPatient, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Age"
            className="border px-2 py-1 rounded"
            value={newPatient.age}
            onChange={(e) =>
              setNewPatient({ ...newPatient, age: e.target.value })
            }
          />
          <select
            className="border px-2 py-1 rounded"
            value={newPatient.gender}
            onChange={(e) =>
              setNewPatient({ ...newPatient, gender: e.target.value })
            }
          >
            <option>Male</option>
            <option>Female</option>
          </select>
          <select
            className="border px-2 py-1 rounded"
            value={newPatient.status}
            onChange={(e) =>
              setNewPatient({ ...newPatient, status: e.target.value })
            }
          >
            <option>Under Treatment</option>
            <option>Discharged</option>
            <option>Critical</option>
          </select>
          <input
            type="date"
            className="border px-2 py-1 rounded"
            value={newPatient.appointmentDate}
            onChange={(e) =>
              setNewPatient({ ...newPatient, appointmentDate: e.target.value })
            }
          />
          <button
            onClick={handleAddPatient}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Patient
          </button>
        </div>
      </div>

      {/* Filter Date Input */}
      <div className="mb-4">
        <label className="mr-2 font-md dark:text-white">📅 Filter by Date:</label>
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {selectedDate && (
          <button
            onClick={() => setSelectedDate('')}
            className="ml-2 text-sm text-red-500"
          >
            Clear
          </button>
        )}
      </div>

      {/* Patient Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Age</th>
              <th className="py-2 px-4">Gender</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Appointment</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="text-center border-t">
                <td className="py-2 px-4">{patient.name}</td>
                <td className="py-2 px-4">{patient.age}</td>
                <td className="py-2 px-4">{patient.gender}</td>
                <td className="py-2 px-4">{patient.status}</td>
                <td className="py-2 px-4">{patient.appointmentDate}</td>
                <td className="py-2 px-4">
                  <select
                    value={patient.status}
                    onChange={(e) =>
                      handleStatusChange(patient.id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option>Under Treatment</option>
                    <option>Discharged</option>
                    <option>Critical</option>
                  </select>
                </td>
              </tr>
            ))}
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPatients;


