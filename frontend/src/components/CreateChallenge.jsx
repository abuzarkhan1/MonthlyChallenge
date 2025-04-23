import React, { useState } from "react";

const CreateChallenge = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [month, setMonth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !description || !month) {
      setMessage({ text: "Please fill all required fields", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch("http://localhost:8080/challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          month,
        }),
      });

      if (response.ok) {
        setName("");
        setDescription("");
        setMonth("");
        setMessage({ text: "Challenge created successfully!", type: "success" });
      } else {
        const error = await response.json();
        setMessage({ text: error.message || "Failed to create challenge", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "An error occurred. Please try again.", type: "error" });
      console.error("Error submitting challenge:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-400 mb-6">Create Month Challenge</h1>
          
          {message.text && (
            <div 
              className={`mb-4 p-4 rounded-md ${
                message.type === "error" 
                  ? "bg-red-900/20 text-red-400 border border-red-800" 
                  : "bg-green-900/20 text-green-400 border border-green-800"
              }`}
            >
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
            <div className="mb-6">
              <label htmlFor="name" className="block text-blue-400 font-medium mb-2">
                Challenge Name *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter challenge name"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="month" className="block text-blue-400 font-medium mb-2">
                Month *
              </label>
              <select
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-blue-400 font-medium mb-2">
                Description *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-40"
                placeholder="Describe your challenge"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Create Challenge"}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Create a new monthly challenge to share with the community.
              <br />
              Be specific about your goals and expectations.
            </p>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default CreateChallenge;