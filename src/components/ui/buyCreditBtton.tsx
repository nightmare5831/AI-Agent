// src/components/BuyCreditButton.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


interface BuyCreditButtonProps {
  packType: string;
  userId: string;
}

export default function BuyCreditButton({ packType, userId } : BuyCreditButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBuyCredits = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stripe/buy-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packType,
          userId,
        }),
      });

      const { url } = await response.json();
      router.push(url);
    } catch (error) {
      console.error('Error buying credits:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleBuyCredits}
      disabled={loading}
      className="btn btn-secondary"
    >
      {loading ? 'Processing...' : `Buy ${packType} Credits`}
    </button>
  );
}