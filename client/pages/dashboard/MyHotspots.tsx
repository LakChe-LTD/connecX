import { useState } from 'react';
import { Wifi, Heart, ShoppingBag, UserCircle, Search, ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";





export default function MyHotSpots() {

     const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('list'); 
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

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    pricing: '',
    availability: 'Available'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-300 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-4 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <Wifi className="w-7 h-7 lg:w-9 lg:h-9 text-blue-600" />
                <span className="text-xl lg:text-3xl font-black text-gray-900">KonnectX</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Kits..."
                  className="pl-10 pr-4 py-2.5 w-64 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-bold">KYC</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-sm font-bold">Kits (0)</span>
              </button>
              <button className="text-gray-700 hover:text-gray-900">
                <span className="text-sm font-bold">Vouchers (0)</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <UserCircle className="w-5 h-5" />
                <span className="text-sm font-bold">Account</span>
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="lg:hidden text-gray-700">
              <UserCircle className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Hotspots</h1>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add New Hotspot
              </button>
            </div>

         {/* Hotspots Display - Desktop Table, Mobile Cards */}
            <div className="space-y-4">
              {/* Desktop Table View */}
              <div className="hidden md:block bg-white rounded-lg shadow-md border-2 border-gray-300 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b-2 border-gray-300">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Pricing
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Availability
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {hotspots.map((hotspot, index) => (
                      <tr key={hotspot.id} className="hover:bg-gray-50 transition-colors border-b-2 border-gray-200" style={{ borderBottom: index === hotspots.length - 1 ? 'none' : '' }}>
                        <td className="px-6 py-6">
                          <div className="text-base font-bold text-gray-900">{hotspot.name}</div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="text-sm font-semibold text-gray-700">{hotspot.location}</div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="text-sm font-medium text-gray-700 max-w-xs">{hotspot.description}</div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="text-base font-bold text-gray-900">{hotspot.pricing}</div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <span className={`px-3 py-1.5 inline-flex text-sm font-bold rounded-full ${
                            hotspot.availability === 'Available' 
                              ? 'bg-grey-400 text-black' 
                              : 'bg-grey-400 text-black'
                          }`}>
                            {hotspot.availability}
                          </span>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleEdit(hotspot.id)}
                            className="text-black hover:text-black font-bold mr-3"
                          >
                            Edit
                          </button>
                          <span className="text-gray-400 font-bold">|</span>
                          <button
                            onClick={() => handleDelete(hotspot.id)}
                            className="text-black  font-bold ml-3"
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
                  <div key={hotspot.id} className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-5">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-gray-900">{hotspot.name}</h3>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                          hotspot.availability === 'Available' 
                            ? 'bg-grey-400 text-black'
                            : 'bg-grey-400 text-black'
                        }`}>
                          {hotspot.availability}
                        </span>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Location</p>
                        <p className="text-sm font-semibold text-gray-700">{hotspot.location}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Description</p>
                        <p className="text-sm font-medium text-gray-700">{hotspot.description}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Pricing</p>
                        <p className="text-base font-bold text-gray-900">{hotspot.pricing}</p>
                      </div>
                      
                      <div className="flex space-x-3 pt-2 border-t-2 border-gray-200">
                        <button
                          onClick={() => handleEdit(hotspot.id)}
                          className="flex-1 px-4 py-2.5 bg-gray-300 text-black text-sm font-bold rounded-lg  transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(hotspot.id)}
                          className="flex-1 px-4 py-2.5bg-gray-300 text-black text-sm font-bold rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {hotspots.map((hotspot) => (
                  <div key={hotspot.id} className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-5">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-gray-900">{hotspot.name}</h3>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                          hotspot.availability === 'Available' 
                            ? 'bg-grey-600 text-black' 
                            : 'bg-grey-600 text-black' 
                        }`}>
                          {hotspot.availability}
                        </span>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Location</p>
                        <p className="text-sm font-semibold text-gray-700">{hotspot.location}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Description</p>
                        <p className="text-sm font-medium text-gray-700">{hotspot.description}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Pricing</p>
                        <p className="text-base font-bold text-gray-900">{hotspot.pricing}</p>
                      </div>
                      
                      <div className="flex space-x-3 pt-2 border-t-2 border-gray-200">
                        <button
                          onClick={() => handleEdit(hotspot.id)}
                          className="flex-1 px-4 py-2.5 bg-gray-300 text-black text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(hotspot.id)}
                          className="flex-1 px-4 py-2.5 bg-gray-300 text-black text-sm font-bold rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            
         
        
      </main>
    </div>
  );
}