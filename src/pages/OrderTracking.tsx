import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, ArrowLeft } from 'lucide-react';

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
}

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [currentStatus, setCurrentStatus] = useState('processing');

  useEffect(() => {
    // Simulate fetching tracking data
    const mockTrackingEvents: TrackingEvent[] = [
      {
        id: '1',
        status: 'Order Placed',
        description: 'Your order has been successfully placed and confirmed.',
        location: 'Online',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        isCompleted: true,
      },
      {
        id: '2',
        status: 'Processing',
        description: 'Your order is being prepared for shipment.',
        location: 'Fulfillment Center - New York',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        isCompleted: true,
      },
      {
        id: '3',
        status: 'Shipped',
        description: 'Your package has been shipped and is on its way.',
        location: 'New York Distribution Center',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        isCompleted: true,
      },
      {
        id: '4',
        status: 'In Transit',
        description: 'Your package is currently in transit to the destination.',
        location: 'Philadelphia Hub',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        isCompleted: false,
      },
      {
        id: '5',
        status: 'Out for Delivery',
        description: 'Your package is out for delivery and will arrive today.',
        location: 'Local Delivery Facility',
        timestamp: '',
        isCompleted: false,
      },
      {
        id: '6',
        status: 'Delivered',
        description: 'Your package has been delivered successfully.',
        location: 'Your Address',
        timestamp: '',
        isCompleted: false,
      },
    ];

    setTrackingEvents(mockTrackingEvents);
    setCurrentStatus('in-transit');
  }, [orderId]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    }
    
    switch (status.toLowerCase()) {
      case 'in transit':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'out for delivery':
        return <Truck className="h-6 w-6 text-orange-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            to="/profile"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
            <p className="text-gray-600">Order #{orderId}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tracking Details</h2>
              
              <div className="relative">
                {trackingEvents.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-4 pb-8 last:pb-0">
                    {/* Timeline line */}
                    {index < trackingEvents.length - 1 && (
                      <div className="absolute left-3 top-8 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    
                    {/* Status icon */}
                    <div className="flex-shrink-0 relative z-10">
                      {getStatusIcon(event.status, event.isCompleted)}
                    </div>
                    
                    {/* Event details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold ${
                          event.isCompleted ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {event.status}
                        </h3>
                        {event.timestamp && (
                          <span className="text-sm text-gray-500">
                            {formatDate(event.timestamp)}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm mb-1 ${
                        event.isCompleted ? 'text-gray-700' : 'text-gray-500'
                      }`}>
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Delivery Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Information</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-semibold text-gray-900">Today, Dec 15</p>
                  <p className="text-sm text-gray-600">Between 2:00 PM - 6:00 PM</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Tracking Number</p>
                  <p className="font-semibold text-gray-900">1Z999AA1234567890</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Carrier</p>
                  <p className="font-semibold text-gray-900">UPS Ground</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
              <div className="text-gray-700">
                <p className="font-semibold">John Doe</p>
                <p>123 Main Street, Apt 4B</p>
                <p>New York, NY 10001</p>
                <div className="flex items-center space-x-1 mt-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Items in this Package</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Product"
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Wireless Bluetooth Headphones</p>
                    <p className="text-sm text-gray-600">Qty: 1</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.pexels.com/photos/1460691/pexels-photo-1460691.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Product"
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Stylish Women's Sneakers</p>
                    <p className="text-sm text-gray-600">Qty: 1</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Need Help?</h3>
              <p className="text-sm text-orange-800 mb-3">
                Have questions about your order or delivery?
              </p>
              <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;