import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Package, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { orderService } from '../../services/orderService';
import { useSocket } from '../../contexts/SocketContext';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('orderUpdated', (updatedOrder) => {
        setOrders((prev) =>
          prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
        );
        toast.success(`Order ${updatedOrder.status}!`);
      });

      return () => {
        socket.off('orderUpdated');
      };
    }
  }, [socket]);

  const loadOrders = async () => {
    try {
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await orderService.cancelOrder(orderId);
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        toast.success('Order cancelled successfully');
      } catch (error) {
        toast.error('Failed to cancel order');
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'ready':
        return <Package className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
        <p className="mt-2 text-gray-600">Track and manage your produce orders.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {getStatusIcon(order.status)}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {order.produce.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Farmer:</span>
                        <span className="ml-1 font-medium">{order.farmer.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Quantity:</span>
                        <span className="ml-1">
                          {order.quantity} {order.produce.unit}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Total:</span>
                        <span className="ml-1 font-medium">
                          ₹{order.totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Pickup Date:</span>
                        <span className="ml-1">
                          {new Date(order.pickupDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {(order.status === 'confirmed' ||
                      order.status === 'ready') && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Farmer Contact
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>{order.farmer.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            <span>{order.farmer.email}</span>
                          </div>
                          <p className="mt-2">
                            <strong>Address:</strong> {order.farmer.address}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {getStatusBadge(order.status)}
                  {order.status === 'pending' && (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
