import React, { useState } from 'react';
import { invoices } from '../../data/invoices';
import { Eye, Printer, X, FileText } from 'lucide-react';

const AdminInvoices = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Invoices</h1>
          <p className="text-xs text-slate-500">Manage and print GST-compliant customer invoices.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4">Invoice Number</th>
                <th className="px-6 py-4">Order Number</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Payment Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {invoices.map(invoice => (
                <tr key={invoice.invoiceNumber} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono font-bold text-amber-800">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{invoice.orderNumber}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(invoice.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{invoice.customer}</td>
                  <td className="px-6 py-4 font-black text-slate-900">₹{invoice.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      invoice.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {invoice.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-500">
                      <button 
                        type="button"
                        onClick={() => setSelectedInvoice(invoice)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-bold flex items-center gap-1"
                        title="View Invoice"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal Preview */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center font-black">JT</div>
                <div>
                  <h2 className="font-black text-xl text-slate-900">TAX INVOICE</h2>
                  <span className="text-xs text-slate-500">Jumbo Trades Edible Oils Pvt Ltd</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Invoice</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 text-slate-400 hover:text-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 block font-semibold">Invoice No:</span>
                <span className="font-mono font-black text-amber-800 text-sm">{selectedInvoice.invoiceNumber}</span>
                <span className="text-slate-500 block font-semibold mt-2">Order Reference:</span>
                <span className="font-bold text-slate-900">{selectedInvoice.orderNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-semibold">Customer Details:</span>
                <span className="font-bold text-slate-900 block">{selectedInvoice.customer}</span>
                <span className="text-slate-500 block font-semibold mt-2">Invoice Date:</span>
                <span className="font-bold text-slate-800">{new Date(selectedInvoice.date).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Invoice Line Items Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Unit Price</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedInvoice.items ? selectedInvoice.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold text-slate-800">{it.product} ({it.variant})</td>
                      <td className="p-3 text-slate-600">{it.quantity}</td>
                      <td className="p-3 text-slate-600">₹{it.price}</td>
                      <td className="p-3 text-right font-bold text-slate-900">₹{it.price * it.quantity}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Premium Coconut Oil (1 L)</td>
                      <td className="p-3 text-slate-600">2</td>
                      <td className="p-3 text-slate-600">₹250</td>
                      <td className="p-3 text-right font-bold text-slate-900">₹500</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Invoice Total Summary */}
            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <div className="w-64 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between"><span>Subtotal:</span><span className="font-bold">₹{selectedInvoice.subtotal || selectedInvoice.total - 50}</span></div>
                <div className="flex justify-between"><span>Shipping:</span><span className="font-bold">₹{selectedInvoice.shipping || 50}</span></div>
                <div className="flex justify-between"><span>GST (5% placeholder):</span><span className="font-bold">₹{selectedInvoice.tax || 25}</span></div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total:</span>
                  <span className="text-amber-800">₹{selectedInvoice.total}</span>
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
