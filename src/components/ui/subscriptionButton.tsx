// src/components/SubscriptionButton.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SubscriptionButtonProps {
  plan: string;
  userId: string;
}

export default function SubscriptionButton({ plan, userId } : SubscriptionButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: plan,
          userId,
        }),
      });

      const { url } = await response.json();
      router.push(url);
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleSubscribe}
      disabled={loading}
      className="btn btn-primary"
    >
      {loading ? 'Processing...' : `Subscribe to ${plan}`}
    </button>
  );
}