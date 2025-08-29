import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Car, Droplets, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      icon: Car,
      title: 'Exterior Detailing',
      description: 'Complete exterior wash, wax, and protection',
      features: [
        'Hand wash with premium soap',
        'Clay bar treatment',
        'Paint decontamination',
        'Wax or sealant application',
        'Tire and wheel cleaning',
        'Chrome and trim polishing'
      ]
    },
    {
      icon: Droplets,
      title: 'Interior Detailing',
      description: 'Deep cleaning and conditioning of all interior surfaces',
      features: [
        'Complete vacuum (seats, carpets, crevices)',
        'Dashboard and console cleaning',
        'Leather conditioning',
        'Fabric protection treatment',
        'Window cleaning (interior)',
        'Air freshening treatment'
      ]
    },
    {
      icon: Zap,
      title: 'Engine Bay Cleaning',
      description: 'Professional engine compartment detailing',
      features: [
        'Safe degreasing process',
        'Pressure washing (when appropriate)',
        'Component protection',
        'Hose and belt conditioning',
        'Battery terminal cleaning',
        'Final detailing and shine'
      ]
    },
    {
      icon: Sparkles,
      title: 'Specialty Services',
      description: 'Advanced treatments for maximum protection',
      features: [
        'Paint correction and polishing',
        'Ceramic coating application',
        'Headlight restoration',
        'Upholstery deep cleaning',
        'Pet hair removal',
        'Odor elimination treatment'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Professional mobile detailing services that bring showroom-quality results to your location.
        </p>
      </div>

      {/* Service Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
                <p className="text-muted-foreground">{service.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Process */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Process</h2>
          <p className="text-muted-foreground">How we deliver exceptional results every time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: '1',
              title: 'Book Online',
              description: 'Choose your service and schedule in under a minute'
            },
            {
              step: '2',
              title: 'We Come to You',
              description: 'Our professional team arrives at your location with all equipment'
            },
            {
              step: '3',
              title: 'Expert Service',
              description: 'Thorough detailing using premium products and proven techniques'
            },
            {
              step: '4',
              title: 'Quality Check',
              description: 'Final inspection to ensure every detail meets our high standards'
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Promise */}
      <div className="bg-secondary/30 rounded-lg p-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Quality Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="font-semibold mb-2">Professional Grade</h3>
              <p className="text-sm text-muted-foreground">
                We use only professional-grade products and equipment for superior results.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⏰</div>
              <h3 className="font-semibold mb-2">On-Time Service</h3>
              <p className="text-sm text-muted-foreground">
                We respect your time and always arrive when scheduled.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-sm text-muted-foreground">
                Not happy with the results? We'll make it right at no extra cost.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for Professional Results?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Experience the difference professional mobile detailing makes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
            <Link href="/book">Book Service</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}