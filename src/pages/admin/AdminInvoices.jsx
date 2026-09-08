import React, { useState } from 'react';
import { useMockData } from '../../context/MockDataContext';
import { Eye, Printer, X, FileText, Search, AlertCircle } from 'lucide-react';

const AdminInvoices = () => {
  const { orders, customers } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Generate invoices from orders that are Paid/Processing/Shipped/Delivered
  const invoices = orders
    .filter(o => o.status !== 'Cancelled')
    .map(order => {
      const customer = customers.find(c => c.id === order.customerId);
      const subtotal = order.products?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
      const shipping = 50; // Mock fixed shipping
      const tax = Math.round(subtotal * 0.05); // Mock 5% GST
      
      return {
        invoiceNumber: `INV-${order.id.replace('ORD-', '')}`,
        orderNumber: order.id,
        date: order.date,
        customerName: order.shippingAddress?.name || customer?.name || 'Unknown',
        customerDetails: {
          email: customer?.email,
          phone: customer?.phone,
          address: order.shippingAddress
        },
        items: order.products || [],
        subtotal,
        shipping,
        tax,
        total: order.amount,
        paymentStatus: order.paymentStatus
      };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">Invoices</h1>
          <p className="text-xs text-slate-500 mt-1">Manage and print GST-compliant customer invoices</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Invoice, Order, or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3 md:px-6">Invoice No.</th>
                <th className="px-4 py-3 md:px-6">Order ID</th>
                <th className="px-4 py-3 md:px-6">Date</th>
                <th className="px-4 py-3 md:px-6">Customer</th>
                <th className="px-4 py-3 md:px-6 text-right">Amount</th>
                <th className="px-4 py-3 md:px-6">Status</th>
                <th className="px-4 py-3 md:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredInvoices.map(invoice => (
                <tr key={invoice.invoiceNumber} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 md:px-6 font-mono font-bold text-amber-800">{invoice.invoiceNumber}</td>
                  <td className="px-4 py-3.5 md:px-6 font-mono text-slate-500 text-xs">{invoice.orderNumber}</td>
                  <td className="px-4 py-3.5 md:px-6 text-slate-500">{new Date(invoice.date).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-3.5 md:px-6 font-bold text-slate-900">{invoice.customerName}</td>
                  <td className="px-4 py-3.5 md:px-6 font-black text-slate-800 text-right">₹{invoice.total?.toLocaleString()}</td>
                  <td className="px-4 py-3.5 md:px-6">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                      invoice.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 
                      invoice.paymentStatus === 'Failed' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                      'bg-amber-100 text-amber-800 border-amber-200'
                    }`}>
                      {invoice.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 md:px-6 text-right">
                    <button 
                      type="button"
                      onClick={() => setSelectedInvoice(invoice)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold flex items-center justify-center gap-1.5 ml-auto text-[11px] transition-colors"
                      title="View Invoice"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <AlertCircle className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="text-sm font-bold text-slate-700">No invoices found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal Preview */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header - Non Printable */}
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-slate-100 bg-slate-50/50 shrink-0 print:hidden">
              <div>
                <h2 className="text-lg font-black text-slate-900">Invoice Preview</h2>
                <p className="text-xs text-slate-500 font-mono mt-1">{selectedInvoice.invoiceNumber}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Invoice Body */}
            <div className="p-8 overflow-y-auto print:p-0 print:overflow-visible">
              <div className="max-w-2xl mx-auto bg-white print:shadow-none space-y-8 text-slate-800">
                
                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center font-black text-xl tracking-tighter">JT</div>
                    <div>
                      <h2 className="font-black text-2xl text-slate-900 uppercase tracking-tight">Tax Invoice</h2>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jumbo Trades Edible Oils Pvt Ltd</p>
                      <p className="text-[10px] text-slate-500 mt-1">123 Industrial Area, Phase 1</p>
                      <p className="text-[10px] text-slate-500">Coimbatore, TN 641001</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">GSTIN: 33AABCJ1234K1Z5</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Invoice Info</p>
                    <p className="font-mono font-black text-slate-900">{selectedInvoice.invoiceNumber}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Date: <span className="font-bold text-slate-900">{new Date(selectedInvoice.date).toLocaleDateString('en-GB')}</span></p>
                    <p className="text-[10px] text-slate-500">Order Ref: <span className="font-bold font-mono text-slate-900">{selectedInvoice.orderNumber}</span></p>
                  </div>
                </div>

                {/* Bill To */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</p>
                  <p className="font-black text-slate-900">{selectedInvoice.customerName}</p>
                  {selectedInvoice.customerDetails.address && (
                    <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                      <p>{selectedInvoice.customerDetails.address.address}</p>
                      <p>{selectedInvoice.customerDetails.address.city}, {selectedInvoice.customerDetails.address.state} {selectedInvoice.customerDetails.address.pincode}</p>
                    </div>
                  )}
                  {selectedInvoice.customerDetails.phone && <p className="text-xs text-slate-600 mt-1 font-mono">Ph: {selectedInvoice.customerDetails.phone}</p>}
                </div>

                {/* Items */}
                <div className="border-t border-slate-200 pt-6">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200">
                      <tr>
                        <th className="py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Item Description</th>
                        <th className="py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Qty</th>
                        <th className="py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Price</th>
                        <th className="py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedInvoice.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-3 font-bold text-slate-900">
                            {item.name}
                            <span className="block text-xs font-normal text-slate-500">{item.size}</span>
                          </td>
                          <td className="py-3 text-center font-medium">{item.quantity}</td>
                          <td className="py-3 text-right text-slate-600">₹{item.price?.toLocaleString()}</td>
                          <td className="py-3 text-right font-black text-slate-900">₹{(item.price * item.quantity)?.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end pt-4 border-t-2 border-slate-900">
                  <div className="w-64 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-bold">₹{selectedInvoice.subtotal?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span className="font-bold">₹{selectedInvoice.shipping}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 pb-2 border-b border-slate-200">
                      <span>GST (5%)</span>
                      <span className="font-bold">₹{selectedInvoice.tax?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                      <span className="font-black text-slate-900 uppercase">Total Due</span>
                      <span className="font-black text-xl text-slate-900">₹{selectedInvoice.total?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Notes */}
                <div className="pt-8 text-[10px] text-slate-400 text-center uppercase tracking-wider">
                  <p>This is a computer generated invoice and does not require a physical signature.</p>
                  <p className="mt-1 font-bold text-slate-300">Thank you for your business!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInvoices;
