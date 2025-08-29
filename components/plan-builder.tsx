'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatMoneyShort } from '@/lib/utils';
import { travelForZip, DEFAULT_TRAVEL_CONFIG, type TravelConfig } from '@/lib/travel';

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  status: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  isMembership: boolean;
}

interface PlanBuilderProps {
  products: Product[];
  addons: Addon[];
  travelConfig?: TravelConfig;
  onCheckout: (data: {
    plan: string;
    addons: string[];
    zipCode: string;
    subtotal: number;
    travelFee: number;
    total: number;
  }) => void;
}

export function PlanBuilder({ products, addons, travelConfig = DEFAULT_TRAVEL_CONFIG, onCheckout }: PlanBuilderProps) {
  const [plan, setPlan] = useState('premium');
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
  const [zipCode, setZipCode] = useState('');

  const premiumProduct = products.find(p => !p.isMembership);
  const monthlyProduct = products.find(p => p.isMembership);

  const selectedProduct = plan === 'premium' ? premiumProduct : monthlyProduct;
  const basePrice = selectedProduct?.price || 0;

  const addonTotal = addons
    .filter(addon => selectedAddons[addon.id])
    .reduce((sum, addon) => sum + addon.price, 0);

  const travelFee = travelForZip(zipCode, travelConfig);
  const subtotal = basePrice + addonTotal;
  const total = subtotal + travelFee;

  const handleAddonChange = (addonId: string, checked: boolean) => {
    setSelectedAddons(prev => ({
      ...prev,
      [addonId]: checked
    }));
  };

  const handleCheckout = () => {
    if (!selectedProduct) return;
    
    const selectedAddonIds = Object.entries(selectedAddons)
      .filter(([_, selected]) => selected)
      .map(([id]) => id);

    onCheckout({
      plan: selectedProduct.id,
      addons: selectedAddonIds,
      zipCode,
      subtotal,
      travelFee,
      total
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Build Your Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Plan Selection */}
          <div>
            <Label className="text-base font-semibold mb-4 block">Choose Your Plan</Label>
            <RadioGroup value={plan} onValueChange={setPlan} className="space-y-4">
              {premiumProduct && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="premium" id="plan-premium" />
                  <Label htmlFor="plan-premium" className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Premium Detail</div>
                        <div className="text-sm text-muted-foreground">One-time service</div>
                      </div>
                      <div className="font-bold text-lg">{formatMoneyShort(premiumProduct.price)}</div>
                    </div>
                  </Label>
                </div>
              )}
              {monthlyProduct && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="plan-monthly" />
                  <Label htmlFor="plan-monthly" className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Monthly Maintenance Plan</div>
                        <div className="text-sm text-muted-foreground">Subscription service</div>
                      </div>
                      <div className="font-bold text-lg">{formatMoneyShort(monthlyProduct.price)}/mo</div>
                    </div>
                  </Label>
                </div>
              )}
            </RadioGroup>
          </div>

          {/* Add-ons */}
          <div>
            <Label className="text-base font-semibold mb-4 block">Add-ons (Optional)</Label>
            <div className="space-y-3">
              {addons.filter(addon => addon.status === 'ACTIVE').map((addon) => (
                <div key={addon.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`addon-${addon.id}`}
                    className="sb-addon"
                    data-price-cents={addon.price}
                    data-sku={addon.sku}
                    checked={selectedAddons[addon.id] || false}
                    onCheckedChange={(checked) => handleAddonChange(addon.id, !!checked)}
                  />
                  <Label htmlFor={`addon-${addon.id}`} className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{addon.name}</div>
                        {addon.description && (
                          <div className="text-sm text-muted-foreground">{addon.description}</div>
                        )}
                      </div>
                      <div className="font-medium">+{formatMoneyShort(addon.price)}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="sb-zip" className="text-base font-semibold mb-4 block">Service Location</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sb-address">Address</Label>
                <Input id="sb-address" placeholder="123 Main St" />
              </div>
              <div>
                <Label htmlFor="sb-city">City</Label>
                <Input id="sb-city" placeholder="Conyers" />
              </div>
              <div>
                <Label htmlFor="sb-state">State</Label>
                <Input id="sb-state" value="GA" readOnly />
              </div>
              <div>
                <Label htmlFor="sb-zip">ZIP Code</Label>
                <Input
                  id="sb-zip"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="30012"
                />
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span id="sb-subtotal" className="font-medium">{formatMoneyShort(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Travel Fee:</span>
              <span id="sb-travel" className="font-medium">
                {travelFee === 0 ? 'FREE' : formatMoneyShort(travelFee)}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span id="sb-total">{formatMoneyShort(total)}</span>
            </div>
            {zipCode && travelFee === 0 && (
              <p className="text-sm text-green-600">✓ Free service area</p>
            )}
          </div>

          {/* CTA */}
          <Button
            id="sb-start"
            className="w-full"
            size="lg"
            onClick={handleCheckout}
            disabled={!selectedProduct || !zipCode}
          >
            {plan === 'monthly' ? 'Start Subscription' : 'Book Now'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}