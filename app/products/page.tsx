import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

async function getProducts() {
  return await prisma.product.findMany({
    where: { isMembership: false },
    orderBy: { price: 'asc' }
  });
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Detailing Services</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional mobile detailing packages designed to keep your vehicle looking its best.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const features = product.features ? JSON.parse(product.features) : [];
          const isComingSoon = product.status === 'COMING_SOON';
          
          return (
            <Card key={product.id} className={`relative ${isComingSoon ? 'opacity-75' : ''}`}>
              {isComingSoon && (
                <Badge className="absolute top-4 right-4 bg-orange-500">
                  Coming Soon
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {product.description}
                </CardDescription>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  ${(product.price / 100).toFixed(2)}
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
                
                <Button 
                  asChild 
                  className="w-full"
                  disabled={isComingSoon}
                >
                  {isComingSoon ? (
                    <span>Coming Soon</span>
                  ) : (
                    <Link href={`/booking?service=${product.id}`}>
                      Book This Service
                    </Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Questions About Our Services?</h2>
        <p className="text-gray-600 mb-6">
          Our team is here to help you choose the right detailing package for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href={`tel:${process.env.NEXT_PUBLIC_OWNER_PHONE}`}>
              Call {process.env.NEXT_PUBLIC_OWNER_PHONE}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}