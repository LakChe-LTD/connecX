import { useState } from 'react';
import { Wifi, Heart, ShoppingBag, UserCircle, Search, ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Helmet } from "react-helmet-async";

export default function MyHotSpots() {
  const navigate = useNavigate();
  const { theme } = useApp();
  
  const [hotspots, setHotspots] = useState([
    {
      id: 1,
      name: 'Cozy Corner Cafe',
      location: '123 Main Street, Anytown',
      description: 'A cozy spot with great coffee and fast internet',
      pricing: '₦5/hour',
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Tech Hub Workspace',
      location: '456 Innovation Drive, Anytown',
      description: 'A modern workspace for tech professionals',
      pricing: '₦20/day',
      availability: 'Available'
    },
    {
      id: 3,
      name: 'Community Library',
      location: '789 Book Lane, Anytown',
      description: 'A quiet place to study and connect',
      pricing: 'Free',
      availability: 'Unavailable'
    }
  ]);

  const handleSubmit = () => {
    navigate("/dashboard/Vouchers");   
  };

  const handleEdit = (id) => {
    console.log('Edit hotspot:', id);
  };

  const handleDelete = (id) => {
    setHotspots(hotspots.filter(h => h.id !== id));
  };

  return (

     <>
      <Helmet>
        <title>My Hotspots | KonnectX</title>
        <meta
          name="description"
          content="View and manage all your KonnectX hotspots. Monitor activity, status, and performance of your decentralized network devices."
        />
        <meta
          name="keywords"
          content="KonnectX, my hotspots, hotspot management, decentralized network, KXT token"
        />
        <meta property="og:title" content="My Hotspots - KonnectX" />
        <meta
          property="og:description"
          content="View and manage all your KonnectX hotspots. Monitor activity, status, and performance of your decentralized network devices."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.png" />
        <link rel="icon" href="/images/favicon.png" />
      </Helmet>

    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-purple-50 to-blue-50'
    }`}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-4xl font-extrabold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            My Hotspots
          </h1>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-black dark:bg-blue-600  text-white dark:text-black text-base font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Add New Hotspot
          </button>
        </div>

        {/* Hotspots Display - Desktop Table, Mobile Cards */}
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className={`hidden md:block rounded-lg shadow-lg border-2 overflow-hidden ${
            theme === 'dark'
              ? 'bg-[#333436] border-gray-700'
              : 'bg-white border-gray-300'
          }`}>
            <table className="w-full">
              <thead className={`border-b-2 ${
                theme === 'dark'
                  ? 'bg-[#2a2a2c] border-gray-700'
                  : 'bg-gray-100 border-gray-300'
              }`}>
                <tr>
                  <th className={`px-6 py-5 text-left text-sm font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Name
                  </th>
                  <th className={`px-6 py-5 text-left text-sm font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Location
                  </th>
                  <th className={`px-6 py-5 text-left text-sm font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Description
                  </th>
                  <th className={`px-6 py-5 text-left text-sm font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Pricing
                  </th>
                  <th className={`px-6 py-5 text-left text-sm font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Availability
                  </th>
                  <th className={`px-6 py-5 text-left text-sm font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={theme === 'dark' ? 'bg-[#333436]' : 'bg-white'}>
                {hotspots.map((hotspot, index) => (
                  <tr 
                    key={hotspot.id} 
                    className={`transition-colors border-b-2 ${
                      theme === 'dark'
                        ? 'hover:bg-[#3a3a3c] border-gray-700'
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                    style={{ borderBottom: index === hotspots.length - 1 ? 'none' : '' }}
                  >
                    <td className="px-6 py-6">
                      <div className={`text-base font-extrabold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {hotspot.name}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className={`text-sm font-bold ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {hotspot.location}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className={`text-sm font-semibold max-w-xs ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {hotspot.description}
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className={`text-base font-extrabold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {hotspot.pricing}
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <span className={`px-3 py-2 inline-flex text-sm font-extrabold rounded-full ${
                        hotspot.availability === 'Available' 
                          ? theme === 'dark'
                            ? 'bg-green-900 text-green-200'
                            : 'bg-green-100 text-green-800'
                          : theme === 'dark'
                            ? 'bg-red-900 text-red-200'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {hotspot.availability}
                      </span>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleEdit(hotspot.id)}
                        className={`font-extrabold mr-3 transition-colors ${
                          theme === 'dark'
                            ? 'text-blue-400 hover:text-blue-300'
                            : 'text-blue-600 hover:text-blue-800'
                        }`}
                      >
                        Edit
                      </button>
                      <span className={`font-bold ${
                        theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        |
                      </span>
                      <button
                        onClick={() => handleDelete(hotspot.id)}
                        className={`font-extrabold ml-3 transition-colors ${
                          theme === 'dark'
                            ? 'text-red-400 hover:text-red-300'
                            : 'text-red-600 hover:text-red-800'
                        }`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {hotspots.map((hotspot) => (
              <div 
                key={hotspot.id} 
                className={`rounded-lg shadow-lg border-2 p-6 ${
                  theme === 'dark'
                    ? 'bg-[#333436] border-gray-700'
                    : 'bg-white border-gray-300'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className={`text-xl font-extrabold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {hotspot.name}
                    </h3>
                    <span className={`px-3 py-1.5 text-xs font-extrabold rounded-full whitespace-nowrap ${
                      hotspot.availability === 'Available' 
                        ? theme === 'dark'
                          ? 'bg-green-900 text-green-200'
                          : 'bg-green-100 text-green-800'
                        : theme === 'dark'
                          ? 'bg-red-900 text-red-200'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {hotspot.availability}
                    </span>
                  </div>
                  
                  <div>
                    <p className={`text-xs font-extrabold uppercase mb-1.5 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Location
                    </p>
                    <p className={`text-sm font-bold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {hotspot.location}
                    </p>
                  </div>
                  
                  <div>
                    <p className={`text-xs font-extrabold uppercase mb-1.5 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Description
                    </p>
                    <p className={`text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {hotspot.description}
                    </p>
                  </div>
                  
                  <div>
                    <p className={`text-xs font-extrabold uppercase mb-1.5 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Pricing
                    </p>
                    <p className={`text-base font-extrabold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {hotspot.pricing}
                    </p>
                  </div>
                  
                  <div className={`flex space-x-3 pt-3 border-t-2 ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <button
                      onClick={() => handleEdit(hotspot.id)}
                      className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-extrabold rounded-lg transition-all duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(hotspot.id)}
                      className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-extrabold rounded-lg transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
    </>
  );
}