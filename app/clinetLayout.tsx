'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store'; // Ensure the path to store is correct

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientLayout;
