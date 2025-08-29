import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, MapPin } from 'lucide-react';
import Link from 'next/link';
import { formatMoneyShort } from '@/lib/utils';

async function getProducts() {
  return await prisma.product.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { price: 'asc' }
  });
}

async function getAddons() {
  return await prisma.addon.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { price: 'asc' }
  });
}

export default async function PricingPage() {
  const [products, addons] = await Promise.all([
    getProducts(),
    getAddons()
  ]);

  const premiumProduct = products.find(p => !p.isMembership);
  const monthlyProduct = products.find(p => p.isMembership);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose one-time or monthly service. Add options as needed. No hidden fees.
        </p>
      </div>

      {/* Main Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {premiumProduct && (
          <Card className="relative">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Premium Detail</CardTitle>
              <CardDescription>One-time service</CardDescription>
              <div className="text-4xl font-bold text-primary mt-4">
                {formatMoneyShort(premiumProduct.price)}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Complete exterior wash & wax</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Full interior vacuum & clean</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Dashboard & trim conditioning</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Tire shine & wheel cleaning</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Window cleaning (inside & out)</span>
                </li>
              </ul>
              <Button className="w-full" asChild>
                <Link href="/book">Book Now</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {monthlyProduct && (
          <Card className="relative border-accent">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                Best Value
              </span>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Monthly Plan</CardTitle>
              <CardDescription>Subscription service</CardDescription>
              <div className="text-4xl font-bold text-accent mt-4">
                {formatMoneyShort(monthlyProduct.price)}
                <span className="text-base font-normal text-muted-foreground">/mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Everything in Premium Detail</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Monthly maintenance service</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Priority scheduling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Member discounts on add-ons</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Cancel anytime</span>
                </li>
              </ul>
              <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                <Link href="/book">Start Plan</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add-ons */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Add-On Services</h2>
          <p className="text-muted-foreground">Enhance your detail with these optional services</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {addons.map((addon) => (
            <Card key={addon.id}>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">{addon.name}</CardTitle>
                <div className="text-2xl font-bold text-accent">
                  +{formatMoneyShort(addon.price)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  {addon.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Travel Fees */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Service Areas & Travel Fees</h2>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>Based in Conyers, GA • Serving Metro Atlanta</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-green-600">FREE Service</CardTitle>
              <CardDescription>ZIP Codes: 30012, 30013</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
              <p className="text-sm text-muted-foreground">
                No travel fee for our local service area
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle>Standard Travel</CardTitle>
              <CardDescription>Most Metro Atlanta areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">$25</div>
              <p className="text-sm text-muted-foreground">
                Covers most surrounding areas
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle>Extended Travel</CardTitle>
              <CardDescription>Farther Metro Atlanta areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent mb-2">$40</div>
              <p className="text-sm text-muted-foreground">
                For locations requiring longer travel
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Build your custom plan and book in under a minute
        </p>
        <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
          <Link href="/book">Build Your Plan</Link>
        </Button>
      </div>
    </div>
  );
}