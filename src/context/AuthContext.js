import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [items, setItems] = useState([
    { itemNumber: 1, name: '', description: '', quantity: 0, pricePerItem: 0, totalPrice: 0 },
    { itemNumber: 2, name: '', description: '', quantity: 0, pricePerItem: 0, totalPrice: 0 },
    { itemNumber: 3, name: '', description: '', quantity: 0, pricePerItem: 0, totalPrice: 0 },
  ]);
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [userDetails, setUserDetails] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

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

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <AuthContext.Provider
      value={{
        items,
        userDetails,
        selectedDate,
        handleDateChange,
        handleChange,
        setUserDetails,
        invoiceDetails,
        handleKeyPress,
        setInvoiceDetails,
        handleRemoveItem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserLogin = () => useContext(AuthContext);

export default AuthProvider;