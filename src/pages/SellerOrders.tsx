import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Eye, 
  Truck, 
  CheckCircle, 
  X,
  ArrowLeft,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SellerSidebar from '../components/SellerSidebar';
import { formatIDR } from '../utils/currency';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  productImage: string;
  quantity: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: string;
  paymentMethod: string;
}

const SellerOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock orders data
  const orders: Order[] = [
    {
      id: 'ORD-001',
      customerName: 'Budi Santoso',
      customerEmail: 'budi@example.com',
      customerPhone: '+62 812-3456-7890',
      productName: 'Wireless Bluetooth Headphones',
      productImage: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=150',
      quantity: 1,
      amount: 1349000,
      status: 'shipped',
      date: '2024-01-15T10:30:00Z',
      address: 'Jl. Sudirman No. 123, Jakarta Pusat',
      paymentMethod: 'GoPay',
    },
    {
      id: 'ORD-002',
      customerName: 'Sari Wijaya',
      customerEmail: 'sari@example.com',
      customerPhone: '+62 813-9876-5432',
      productName: 'Stylish Women\'s Sneakers',
      productImage: 'https://images.pexels.com/photos/1460691/pexels-photo-1460691.jpeg?auto=compress&cs=tinysrgb&w=150',
      quantity: 1,
      amount: 1034000,
      status: 'confirmed',
      date: '2024-01-15T09:15:00Z',
      address: 'Jl. Thamrin No. 456, Jakarta Pusat',
      paymentMethod: 'OVO',
    },
    {
      id: 'ORD-003',
      customerName: 'Ahmad Rahman',
      customerEmail: 'ahmad@example.com',
      customerPhone: '+62 814-5678-9012',
      productName: 'Wireless Bluetooth Headphones',
      productImage: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=150',
      quantity: 2,
      amount: 2698000,
      status: 'delivered',
      date: '2024-01-14T16:45:00Z',
      address: 'Jl. Gatot Subroto No. 789, Jakarta Selatan',
      paymentMethod: 'DANA',
    },
    {
      id: 'ORD-004',
      customerName: 'Dewi Putri',
      customerEmail: 'dewi@example.com',
      customerPhone: '+62 815-3210-9876',
      productName: 'Smart Fitness Watch',
      productImage: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=150',
      quantity: 1,
      amount: 2999000,
      status: 'pending',
      date: '2024-01-14T14:20:00Z',
      address: 'Jl. Kuningan No. 321, Jakarta Selatan',
      paymentMethod: 'ShopeePay',
    },
    {
      id: 'ORD-005',
      customerName: 'David Brown',
      customerEmail: 'david@example.com',
      customerPhone: '+1 (555) 654-3210',
      productName: 'Stylish Women\'s Sneakers',
      productImage: 'https://images.pexels.com/photos/1460691/pexels-photo-1460691.jpeg?auto=compress&cs=tinysrgb&w=150',
      quantity: 1,
      amount: 129.99,
      status: 'cancelled',
      date: '2024-01-13T11:30:00Z',
      address: '654 Maple Dr, Seattle, WA 98101',
      paymentMethod: 'PayPal',
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Package className="h-4 w-4" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <X className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    // For now, just close the modal
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerSidebar />
      <div className="ml-64">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/seller/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
              <p className="text-gray-600">Manage and process customer orders</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders by customer, product, or order ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Orders ({filteredOrders.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={order.productImage}
                          alt={order.productName}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.productName}</div>
                          <div className="text-sm text-gray-500">Qty: {order.quantity}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatIDR(order.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-orange-600 hover:text-orange-900 flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Order Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-medium text-gray-900">{selectedOrder.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-medium text-gray-900">{formatDate(selectedOrder.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        <span className="ml-1">{selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}</span>
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-medium text-gray-900">{formatIDR(selectedOrder.amount)}</p>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedOrder.customerEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedOrder.customerPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedOrder.address}</span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Information</h3>
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedOrder.productImage}
                      alt={selectedOrder.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{selectedOrder.productName}</p>
                      <p className="text-sm text-gray-600">Quantity: {selectedOrder.quantity}</p>
                      <p className="text-sm text-gray-600">Payment: {selectedOrder.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Status</h3>
                    <div className="flex space-x-2">
                      {selectedOrder.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'confirmed')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Confirm Order
                        </button>
                      )}
                      {selectedOrder.status === 'confirmed' && (
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Mark as Shipped
                        </button>
                      )}
                      {selectedOrder.status === 'shipped' && (
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Mark as Delivered
                        </button>
                      )}
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default SellerOrders; 