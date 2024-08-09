import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [invoiceDetails, setInvoiceDetails] = useState({});

  const invoiceData = {
    logo: 'https://via.placeholder.com/100',
    companyName: 'Your Company Name',
    address: '123 Business Rd, Business City, BC 12345',
    invoiceNumber: 'INV-1001',
    date: '2024-08-04',
  };

  const [items, setItems] = useState([
    { itemNumber: 1, name: 'Laptop', description: '15 inch, 256GB SSD', quantity: 2, pricePerItem: 1200, totalPrice: 2400 },
    { itemNumber: 2, name: 'Smartphone', description: '64GB, Black', quantity: 5, pricePerItem: 800, totalPrice: 4000 },
    { itemNumber: 3, name: 'Tablet', description: '10 inch, 128GB', quantity: 3, pricePerItem: 500, totalPrice: 1500 },
  ]);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === 'quantity' || field === 'pricePerItem') {
      newItems[index].totalPrice = newItems[index].quantity * newItems[index].pricePerItem;
    }

    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { itemNumber: items.length + 1, name: '', description: '', quantity: 0, pricePerItem: 0, totalPrice: 0 },
    ]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddItem();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        invoiceDetails,
        setInvoiceDetails,
        invoiceData,
        items,
        handleKeyPress,
        handleRemoveItem,
        handleChange
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserLogin = () => useContext(AuthContext);

export default AuthProvider;
