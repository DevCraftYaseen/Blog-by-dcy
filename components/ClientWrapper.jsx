// app/components/ClientWrapper.jsx
'use client';

import Navbar from './Navbar';

export default function ClientWrapper({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
