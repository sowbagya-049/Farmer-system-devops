import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, MapPin, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { produceService } from '../../services/produceService';
import { orderService } from '../../services/orderService';
import { useSocket } from '../../contexts/SocketContext';

const BrowseProduce = () => {
  const [produces, setProduces] = useState([]);
  const [filteredProduces, setFilteredProduces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [orderQuantities, setOrderQuantities] = useState({});
  const { socket } = useSocket();

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Herbs', 'Dairy', 'Meat', 'Other'];

  useEffect(() => {
    loadProduces();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('produceUpdated', (updatedProduce) => {
        setProduces(prev => 
          prev.map(p => p._id === updatedProduce._id ? updatedProduce : p)
        );
      });

      return () => {
        socket.off('produceUpdated');
      };
    }
  }, [socket]);

  useEffect(() => {
    filterProduces();
  }, [produces, searchTerm, selectedCategory]);

  const loadProduces = async () => {
    try {
      const data = await produceService.getAllProduce();
      setProduces(data.produces);
    } catch (error) {
      toast.error('Failed to load produces');
    } finally {
      setLoading(false);
    }
  };

  const filterProduces = () => {
    let filtered = produces.filter(produce => produce.status === 'active');

    if (searchTerm) {
      filtered = filtered.filter(produce =>
        produce.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produce.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(produce => produce.category === selectedCategory);
    }

    setFilteredProduces(filtered);
  };

  const handleQuantityChange = (produceId, quantity) => {
    setOrderQuantities(prev => ({
      ...prev,
      [produceId]: quantity
    }));
  };

  const handleOrder = async (produce) => {
    const quantity = orderQuantities[produce._id] || 1;
    
    if (quantity > produce.quantity) {
      toast.error('Quantity exceeds available stock');
      return;
    }

    try {
      await orderService.placeOrder({
        produceId: produce._id,
        quantity,
        pickupDate: produce.availableDate,
      });
      
      toast.success('Order placed successfully!');
      
      // Reset quantity
      setOrderQuantities(prev => ({
        ...prev,
        [produce._id]: 1
      }));
      
      // Reload produces to update stock
      loadProduces();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search produce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            {categories.map((category) => (
              <option key={category} value={category === 'All' ? '' : category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Produce Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProduces.map((produce) => (
          <div key={produce._id} className="card hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {produce.name}
              </h3>
              <p className="text-sm text-primary-600 font-medium">
                {produce.category}
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{produce.farmer.name}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Available: {new Date(produce.availableDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                {produce.description}
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                 ₹{produce.pricePerUnit.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  per {produce.unit}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">{produce.quantity}</span> {produce.unit} available
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max={produce.quantity}
                value={orderQuantities[produce._id] || 1}
                onChange={(e) => handleQuantityChange(produce._id, parseInt(e.target.value))}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
              />
              <button
                onClick={() => handleOrder(produce)}
                className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProduces.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No produce found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseProduce;
