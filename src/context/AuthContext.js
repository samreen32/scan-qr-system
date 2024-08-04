import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [invoiceDetails, setInvoiceDetails] = useState({});

  return (
    <AuthContext.Provider
      value={{
        invoiceDetails,
        setInvoiceDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserLogin = () => useContext(AuthContext);

export default AuthProvider;
