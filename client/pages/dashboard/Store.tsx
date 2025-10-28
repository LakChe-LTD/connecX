import React, { useState } from 'react';
import { ChevronLeft, ShoppingCart, User, Heart, Grid, List, ChevronDown, ChevronUp, Search, Menu } from 'lucide-react';

const HotspotStorePage = () => {
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');

  const products = [
    {
      id: 1,
      name: 'Premium Indoor Hotspot Kit',
      description: 'High-performance indoor hotspot with advanced features',
      price: 499.99,
      rating: 4.5,
      reviews: 128,
      stock: 'In Stock',
      image: '/api/placeholder/200/200'
    },
    {
      id: 2,
      name: 'Professional Outdoor Hotspot Kit',
      description: 'Weather-resistant outdoor hotspot for maximum coverage',
      price: 899.99,
      rating: 4.8,
      reviews: 256,
      stock: 'In Stock',
      image: '/api/placeholder/200/200'
    },
    {
      id: 3,
      name: 'Basic Starter Hotspot Kit',
      description: 'Affordable starter kit with essential features',
      price: 299.99,
      rating: 4.2,
      reviews: 89,
      stock: 'In Stock',
      image: '/api/placeholder/200/200'
    }
  ];

  const handleSubscribe = () => {
    if (email) {
      alert('Subscribed successfully!');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
              </div>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
         <nav className="mt-4 flex space-x-6 text-sm">
            <a href="#" className="text-gray-700 hover:text-blue-600">Indoor Kits</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Outdoor Kits</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Accessories</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Network Solutions</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Support</a>
          </nav>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Sort By</h3>
                <div className="space-y-2">
                  {['Popularity', 'Newest', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="sort" className="text-blue-600" />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Kit Type */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Kit Type</h3>
                <div className="space-y-2">
                  {['Indoor', 'Outdoor', 'Custom'].map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="text-blue-600 rounded" />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Brand</h3>
                <div className="space-y-2">
                  {['Helium', 'Heltec', 'Nebra', 'Bobcat'].map((brand) => (
                    <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="text-blue-600 rounded" />
                      <span className="text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing 1-12 of 48 products
              </div>
              <div className="flex items-center space-x-4">
                <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>12 per page</option>
                  <option>24 per page</option>
                  <option>48 per page</option>
                </select>
                <div className="flex space-x-1 border border-gray-300 rounded">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center p-6">
                    <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-800">${product.price}</span>
                      <span className="text-xs text-green-600 font-medium">{product.stock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                Previous
              </button>
              {[1, 2, 3, '...', 8].map((page, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-2 border rounded text-sm ${
                    page === currentPage
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                Next
              </button>
            </div>

            {/* Newsletter */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">Stay updated with our latest products and special offers</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSubscribe}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4">About Us</h4>
              <p className="text-sm">Leading provider of hotspot mining solutions for cryptocurrency enthusiasts and professionals.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Shop</a></li>
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect With Us</h4>
              <div className="flex space-x-4 text-sm">
                <a href="#" className="hover:text-white">Facebook</a>
                <a href="#" className="hover:text-white">Twitter</a>
                <a href="#" className="hover:text-white">Instagram</a>
                <a href="#" className="hover:text-white">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 Hotspot Kit Store. All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HotspotStorePage;