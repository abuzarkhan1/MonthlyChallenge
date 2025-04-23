import React, { useState, useEffect } from "react";

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState({
    id: null,
    name: "",
    description: "",
    month: "",
    participants: 0
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const months = [
    "All",
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    fetchChallenges();
  }, []);

  useEffect(() => {
    if (selectedMonth === "All") {
      setFilteredChallenges(challenges);
    } else {
      const filtered = challenges.filter(challenge => challenge.month === selectedMonth);
      setFilteredChallenges(filtered);
    }
  }, [selectedMonth, challenges]);

  const fetchChallenges = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/challenges", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch challenges");
      }
      
      const data = await response.json();
      setChallenges(data);
      setFilteredChallenges(data);
    } catch (err) {
      console.error("Error fetching challenges:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleEditClick = (challenge) => {
    setCurrentChallenge(challenge);
    setIsEditing(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentChallenge({
      ...currentChallenge,
      [name]: value
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/challenges/${currentChallenge.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentChallenge)
      });

      if (!response.ok) {
        throw new Error("Failed to update challenge");
      }

      const updatedChallenges = challenges.map(challenge => 
        challenge.id === currentChallenge.id ? currentChallenge : challenge
      );
      
      setChallenges(updatedChallenges);
      setIsEditing(false);
      setUpdateSuccess(true);
      
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error("Error updating challenge:", err);
      setError(err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:8080/challenges/${deleteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete challenge");
      }

      const updatedChallenges = challenges.filter(challenge => challenge.id !== deleteId);
      setChallenges(updatedChallenges);
      setShowDeleteModal(false);
      setDeleteSuccess(true);
      
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error("Error deleting challenge:", err);
      setError(err.message);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {updateSuccess && (
            <div className="bg-green-900/20 border border-green-800 text-green-400 p-4 rounded-md mb-4 text-center">
              Challenge updated successfully!
            </div>
          )}
          
          {deleteSuccess && (
            <div className="bg-green-900/20 border border-green-800 text-green-400 p-4 rounded-md mb-4 text-center">
              Challenge deleted successfully!
            </div>
          )}
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-400 mb-4 md:mb-0">Monthly Challenges</h1>
            
            <div className="flex items-center">
              <label htmlFor="monthFilter" className="text-gray-300 mr-2">
                Filter by Month:
              </label>
              <select
                id="monthFilter"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="bg-gray-800 border border-gray-700 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-800 text-red-400 p-4 rounded-md text-center">
              {error}
            </div>
          ) : filteredChallenges.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400 text-lg">No challenges found for the selected month.</p>
              <button 
                onClick={() => setSelectedMonth("All")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
              >
                View All Challenges
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => (
                <div 
                  key={challenge.id} 
                  className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-900/20 transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold text-white">{challenge.name}</h2>
                      <span className="bg-blue-900/30 text-blue-400 text-sm py-1 px-3 rounded-full">
                        {challenge.month}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-6 line-clamp-3">{challenge.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditClick(challenge)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-md text-sm transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(challenge.id)}
                          className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-md text-sm transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {challenge.participants || 0} participants
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <a 
              href="/create"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md font-medium transition-colors duration-200"
            >
              Create New Challenge
            </a>
          </div>
        </div>
      </main>
      
      {isEditing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl text-white font-bold mb-6">Edit Challenge</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Challenge Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentChallenge.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={currentChallenge.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="month" className="block text-gray-300 mb-2">
                  Month
                </label>
                <select
                  id="month"
                  name="month"
                  value={currentChallenge.month}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {months.slice(1).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Update Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl text-white font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this challenge? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengesList;