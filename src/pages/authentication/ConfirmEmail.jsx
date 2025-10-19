import React from "react";

const CheckEmailPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-gray-700">
          We sent a confirmation email to your inbox. Please click the link
          to activate your account before logging in.
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
