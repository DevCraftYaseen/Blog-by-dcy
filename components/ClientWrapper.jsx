// app/components/ClientWrapper.jsx
'use client';
import { Suspense } from "react"; // ✅ import Suspense
import Navbar from './Navbar';

export default function ClientWrapper({ children }) {
  return (
    <>
      <Suspense fallback={<div>Loading Navbar...</div>}>
          <Navbar />
        </Suspense>
      {children}
    </>
  );
}
