import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star } from 'lucide-react';
import { prisma } from '@/lib/prisma';

async function getMembershipProducts() {
  return await prisma.product.findMany({
    where: { 
      isMembership: true,
      status: 'ACTIVE'
    },
    orderBy: { price: 'asc' }
  });
}

export default async function MembershipsPage() {
  const memberships = await getMembershipProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Membership Plans</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join our membership program for unlimited detailing services and exclusive benefits.
        </p>
      </div>

      {/* Membership Benefits */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose Membership?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle>Unlimited Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get your vehicle detailed as often as you want with no additional charges.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Priority Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Members get priority access to booking slots and can schedule faster.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Badge className="h-12 w-12 mx-auto mb-4 flex items-center justify-center">
                VIP
              </Badge>
              <CardTitle>Exclusive Perks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access to member-only services, discounts, and special offers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Membership Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {memberships.map((membership) => {
          const features = membership.features ? JSON.parse(membership.features) : [];
          
          return (
            <Card key={membership.id} className="relative">
              <Badge className="absolute top-4 right-4 bg-blue-600">
                Most Popular
              </Badge>
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{membership.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {membership.description}
                </CardDescription>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  ${(membership.price / 100).toFixed(2)}
                  <span className="text-base font-normal text-gray-500">/month</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full" asChild>
                  <Link href={`/memberships/subscribe?plan=${membership.id}`}>
                    Start Membership
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I cancel my membership anytime?</h3>
            <p className="text-gray-600">
              Yes, you can cancel your membership at any time. Your membership will remain active 
              until the end of your current billing period.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Is there a limit to how often I can use the service?</h3>
            <p className="text-gray-600">
              No limits! As a member, you can book as many detailing sessions as you'd like, 
              subject to availability.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">What if I'm not satisfied with the service?</h3>
            <p className="text-gray-600">
              We guarantee your satisfaction. If you're not happy with any service, 
              we'll make it right at no additional cost.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Ready to Join?</h2>
        <p className="text-gray-600 mb-6">
          Start your membership today and experience the convenience of unlimited detailing.
        </p>
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}