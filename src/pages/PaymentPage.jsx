import React, { useState, useEffect } from "react";
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Wallet, 
  ChevronRight, 
  Lock, 
  ArrowLeft,
  CheckCircle,  // Using this for success
  CheckCircle2, 
  Loader2,
  Clock // Added for timer
} from "lucide-react";
import { Button } from "@/components/ui/button"; 

// --- Helper Function to Format Time ---
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

// --- New Pending Payment Page Component ---
const PendingPaymentPage = ({ timer }) => {
  return (
    <div className="w-full bg-white p-8 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
      <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">Completing Payment</h2>
      <p className="text-gray-500 mt-2">Please wait, do not refresh or close the window.</p>
      
      <div className="flex items-center gap-3 text-2xl font-bold text-gray-700 mt-8 p-4 border rounded-lg bg-gray-50">
        <Clock className="w-6 h-6" />
        <span>{formatTime(timer)}</span>
      </div>
      
      <p className="text-xs text-gray-400 mt-6">This page will be updated automatically.</p>
    </div>
  );
};

// --- New Payment Successful Page Component ---
const SuccessPage = () => {
  return (
    <div className="w-full bg-white p-8 flex flex-col items-center justify-center text-center animate-in zoom-in fade-in duration-300">
      <CheckCircle className="w-24 h-24 text-green-500" fill="white" strokeWidth={1} />
      <h2 className="text-3xl font-bold text-gray-800 mt-6">Payment Successful!</h2>
      <p className="text-gray-500 mt-2">Your payment of ₹ 2,000.00 has been received.</p>
      
      <div className="flex items-center gap-2 text-gray-400 mt-8">
        <Loader2 className="w-4 h-4 animate-spin" />
        Redirecting to your dashboard...
      </div>
    </div>
  );
};

// --- Main Payment Component ---
export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  // 🆕 State to manage which "page" is visible
  const [pageState, setPageState] = useState("checkout"); // checkout | pending | success
  
  // 🆕 State for the 10-minute timer
  const [timer, setTimer] = useState(600); // 10 minutes in seconds

  // UPI Specific States
  const [upiId, setUpiId] = useState("");
  const [upiVerifyStatus, setUpiVerifyStatus] = useState("idle"); // idle | verifying | verified

  // 🆕 Effect to handle all timers and navigation
  useEffect(() => {
    let countdownInterval;
    let paymentSuccessTimeout;
    let redirectTimeout;

    if (pageState === "pending") {
      // 1. Start the 10-minute countdown
      countdownInterval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      // 2. Set 45-second timer for payment success
      paymentSuccessTimeout = setTimeout(() => {
        setPageState("success");
      }, 45000); // 45 seconds
    }
    
    if (pageState === "success") {
      // 3. Set 5-second timer for redirect
      redirectTimeout = setTimeout(() => {
        // Use window.location for redirection as no router is available
        window.location.href = "/dashboard";
      }, 5000); // 5 seconds
    }

    // Cleanup function to clear all timers
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(paymentSuccessTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [pageState]); // This effect re-runs when pageState changes

  // 🆕 Modified Pay Handler
  const handlePay = (e) => {
    e.preventDefault();
    // Just change the page state; the useEffect will handle the rest
    setPageState("pending");
  };

  // Verify Logic
  const handleVerifyUPI = () => {
    if(!upiId) return;
    setUpiVerifyStatus("verifying");
    
    setTimeout(() => {
      setUpiVerifyStatus("verified");
    }, 2000);
  };

  // Reset verification if user types again
  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
    if (upiVerifyStatus !== "idle") setUpiVerifyStatus("idle");
  };

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gray-200/50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* LEFT SIDE (Always visible) */}
        <div className="w-full md:w-1/3 bg-slate-800 text-white p-8 relative flex flex-col justify-between">
          <div>
            <button 
              className="flex items-center text-gray-400 hover:text-white transition mb-8 text-sm"
              // 🆕 Go back to checkout from pending page
              onClick={() => pageState === 'pending' ? setPageState('checkout') : {}}
              disabled={pageState === 'success'}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center">
                   <span className="text-slate-800 font-bold text-xl">A</span>
                </div>
                <div>
                  <h2 className="font-bold text-lg">HireEventPro</h2>
                  <p className="text-xs text-gray-400">Transaction Page</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Amount to Pay</p>
                    <h1 className="text-4xl font-bold mt-1">₹ 2,000.00</h1>
                </div>
                <div className="text-sm text-gray-400">
                    <p>Order ID: #RZP-883920</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
                <span>English</span>
                <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Secured by Razorpay
                </span>
            </div>
          </div>
        </div>

        {/* 🆕 RIGHT SIDE (Conditionally Rendered) */}
        {pageState === "checkout" && (
          <div className="w-full md:w-2/3 bg-white p-8 flex flex-col animate-in fade-in duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Select a payment method</h3>
            <div className="flex flex-col gap-4 flex-grow">
              
              {/* 1. CREDIT/DEBIT CARD */}
              <div className={`border rounded-lg overflow-hidden transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/30 shadow-sm' : 'border-gray-200'}`}>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-700">Card</span>
                  </div>
                  {paymentMethod !== 'card' && <ChevronRight className="w-5 h-5 text-gray-400" />}
                </button>
                
                {paymentMethod === 'card' && (
                  <form onSubmit={handlePay} className="p-6 border-t border-gray-100 bg-white animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="space-y-4">
                      <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Card Number</label>
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-blue-600 transition-colors bg-transparent" required />
                      </div>
                      <div className="flex gap-4">
                          <div className="flex-1">
                              <label className="text-xs font-semibold text-gray-500 uppercase">Expiry</label>
                              <input type="text" placeholder="MM / YY" className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-blue-600 transition-colors bg-transparent" required />
                          </div>
                          <div className="flex-1">
                              <label className="text-xs font-semibold text-gray-500 uppercase">CVV</label>
                              <input type="password" placeholder="123" className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-blue-600 transition-colors bg-transparent" required />
                          </div>
                      </div>
                      <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Card Holder Name</label>
                          <input type="text" placeholder="John Doe" className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-blue-600 transition-colors bg-transparent" required />
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                          <input type="checkbox" id="save-card" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <label htmlFor="save-card" className="text-sm text-gray-600">Securely save card for future payments</label>
                      </div>
                      <Button 
                          type="submit" 
                          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 h-12 text-lg font-medium shadow-lg shadow-blue-600/20"
                      >
                        Pay ₹ 2,000
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* 2. UPI OPTION */}
              <div className={`border rounded-lg overflow-hidden transition-all ${paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50/30 shadow-sm' : 'border-gray-200'}`}>
                <button 
                  onClick={() => setPaymentMethod('upi')}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 text-green-600 rounded-full">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block font-medium text-gray-700">UPI</span>
                      <span className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</span>
                    </div>
                  </div>
                  {paymentMethod !== 'upi' && <ChevronRight className="w-5 h-5 text-gray-400" />}
                </button>
                
                {paymentMethod === 'upi' && (
                  <div className="p-6 border-t border-gray-100 bg-white animate-in fade-in slide-in-from-top-2 duration-200">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Enter UPI ID</label>
                      
                      <div className="flex gap-2 mt-2 h-12">
                          <input 
                            type="text" 
                            placeholder="username@oksbi" 
                            className="flex-1 border-b-2 border-gray-200 px-2 focus:outline-none focus:border-blue-600 bg-transparent transition-colors" 
                            value={upiId}
                            onChange={handleUpiChange}
                          />
                          
                          {upiVerifyStatus !== "verified" && (
                            <Button 
                              onClick={handleVerifyUPI}
                              disabled={!upiId || upiVerifyStatus === "verifying"}
                              className="bg-blue-600 hover:bg-blue-700 min-w-[100px]"
                            >
                              {upiVerifyStatus === "verifying" ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                  Verifying
                                </>
                              ) : (
                                "Verify"
                              )}
                            </Button>
                          )}
                      </div>

                      {upiVerifyStatus === "verified" && (
                        <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-medium animate-in zoom-in fade-in duration-300 slide-in-from-left-2">
                          <CheckCircle2 className="w-5 h-5 fill-green-100" />
                          <span>Verified: Bishal Mahanta</span>
                        </div>
                      )}

                      <Button 
                          className={`w-full mt-6 h-12 text-lg font-medium shadow-lg transition-all ${
                            upiVerifyStatus === "verified" 
                              ? "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20" 
                              : "bg-gray-300 cursor-not-allowed text-gray-500"
                          }`}
                          onClick={handlePay}
                          disabled={upiVerifyStatus !== "verified"}
                      >
                        Pay ₹ 2,000
                      </Button>
                  </div>
                )}
              </div>

              {/* 3. NETBANKING (Static) */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                 <button 
                  onClick={() => setPaymentMethod('netbanking')}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 text-gray-600 rounded-full">
                      <Building className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-700">Netbanking</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                {paymentMethod === 'netbanking' && (
                    <div className="p-4 text-center text-gray-500 text-sm bg-gray-50">
                        Select Bank (Mock functionality)
                        <Button className="w-full mt-2 bg-blue-600" onClick={handlePay}>Pay ₹ 2,000</Button>
                    </div>
                )}
              </div>

              {/* 4. WALLET (Static) */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                 <button 
                  onClick={() => setPaymentMethod('wallet')}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-full">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-700">Wallet</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

            </div>
          </div>
        )}
        
        {/* 🆕 Show Pending Page */}
        {pageState === "pending" && <PendingPaymentPage timer={timer} />}

        {/* 🆕 Show Success Page */}
        {pageState === "success" && <SuccessPage />}


      </div>
    </div>
  );
}