import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';
import ScrollToTop from './components/ScrollToTop';
import { MockDataProvider } from './context/MockDataContext';

import Home from './pages/customer/Home';
import Shop from './pages/customer/Shop';
import ProductInformation from './pages/customer/ProductInformation';
import ProductDetails from './pages/customer/ProductDetails';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderSuccess from './pages/customer/OrderSuccess';

import Login from './pages/customer/Login';
import Register from './pages/customer/Register';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import Contact from './pages/customer/Contact';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

import AdminProducts from './pages/admin/AdminProducts';
import AdminInventory from './pages/admin/AdminInventory';
import AdminVariants from './pages/admin/AdminVariants';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminPayments from './pages/admin/AdminPayments';
import AdminInvoices from './pages/admin/AdminInvoices';
import AdminReviews from './pages/admin/AdminReviews';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminSettings from './pages/admin/AdminSettings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product-information" element={<ProductInformation />} />
          <Route path="product-information/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="account/*" element={<CustomerDashboard />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Login Route (No Layout) */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <MockDataProvider>
              <AdminLayout />
            </MockDataProvider>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products/*" element={<AdminProducts />} />
          <Route path="variants" element={<AdminVariants />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="invoices" element={<AdminInvoices />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
