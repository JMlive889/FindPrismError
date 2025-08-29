'use client';

import { useState, useEffect } from 'react';
import { PlanBuilder } from '@/components/plan-builder';
import { useToast } from '@/hooks/use-toast';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Product {
  id: string;
  name: string;
  price: number;
  isMembership: boolean;
}

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  status: string;
}

export default function BookPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, addonsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/addons')
      ]);

      const productsData = await productsRes.json();
      const addonsData = await addonsRes.json();

      setProducts(productsData);
      setAddons(addonsData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load booking options. Please refresh the page.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (data: {
    plan: string;
    addons: string[];
    zipCode: string;
    subtotal: number;
    travelFee: number;
    total: number;
  }) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId: result.sessionId
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      toast({
        title: 'Booking Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading booking options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Book Your Service</h1>
        <p className="text-xl text-muted-foreground">
          Pick a plan, add options, enter ZIP — checkout in under 1 minute.
        </p>
      </div>

      <PlanBuilder
        products={products}
        addons={addons}
        onCheckout={handleCheckout}
      />

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>🔒 Secure checkout powered by Stripe</p>
        <p>📍 Serving Conyers, GA and Metro Atlanta</p>
        <p>⚡ One booking per customer per week</p>
      </div>
    </div>
  );
}