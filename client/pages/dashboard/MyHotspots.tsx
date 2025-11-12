import { useState } from 'react';
import { Wifi, Heart, ShoppingBag, UserCircle, Search, ChevronLeft } from 'lucide-react';

export default function MyHotSpots() {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'add'
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
    if (formData.name && formData.location && formData.description && formData.pricing) {
      const newHotspot = {
        id: hotspots.length + 1,
        ...formData
      };
      setHotspots([...hotspots, newHotspot]);
      setFormData({
        name: '',
        location: '',
        description: '',
        pricing: '',
        availability: 'Available'
      });
      setCurrentView('list');
    }
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
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">Back</span>
              </button>
              <div className="flex items-center space-x-2">
                <Wifi className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">KonnectX</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Kits..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">KYC</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-sm font-medium">Kits (0)</span>
              </button>
              <button className="text-gray-700 hover:text-gray-900">
                <span className="text-sm font-medium">Vouchers (0)</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <UserCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Account</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'list' ? (
          <>
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Hotspots</h1>
              <button
                onClick={() => setCurrentView('add')}
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add New Hotspot
              </button>
            </div>

            {/* Hotspots Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Pricing
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Availability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hotspots.map((hotspot) => (
                    <tr key={hotspot.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{hotspot.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{hotspot.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs">{hotspot.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{hotspot.pricing}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          hotspot.availability === 'Available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {hotspot.availability}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleEdit(hotspot.id)}
                          className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                        >
                          Edit
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleDelete(hotspot.id)}
                          className="text-red-600 hover:text-red-800 font-medium ml-3"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            {/* Add Hotspot Form */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Add New Hotspot</h1>
              <button
                onClick={() => setCurrentView('list')}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to List
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Hotspot Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter hotspot name"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location address"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your hotspot"
                  />
                </div>

                <div>
                  <label htmlFor="pricing" className="block text-sm font-medium text-gray-700 mb-2">
                    Pricing
                  </label>
                  <input
                    type="text"
                    id="pricing"
                    name="pricing"
                    value={formData.pricing}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., ₦5/hour or Free"
                  />
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Hotspot
                  </button>
                  <button
                    onClick={() => setCurrentView('list')}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}