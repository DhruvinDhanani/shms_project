import React, { useEffect, useState } from 'react'

const PatientHome = () => {

  const [patient, setPatient] = useState(null);

  useEffect(() => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed.role === 'patient') 
          setPatient(parsed);
      }
  },[]);

  if (!patient) {
    return <div className='text-lg font-medium text-red-600 mt-20'>You are not logged in a patient.</div>
  }


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl w-[90%] max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Patient Dashboard</h1>

        <div className="space-y-4 text-lg">
          <div>
            <span className="font-semibold text-gray-500">👤 Name: </span>
            <span className="font-medium text-gray-800">{patient.name}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-500">📧 Email: </span>
            <span className="font-medium text-gray-800">{patient.email}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-500">📱 Phone: </span>
            <span className="font-medium text-gray-800">{patient.phone}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-500">💉 Disease: </span>
            <span className="font-medium text-red-700">{patient.disease}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-500">📊 Status: </span>
            <span className="font-medium text-green-700">{patient.status}</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              window.location.href = "/";
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition duration-300 shadow-md"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default PatientHome
