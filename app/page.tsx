import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MapPin, Clock, DollarSign, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Factory-new finish,<br />at your door.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Book in under a minute — one-time or monthly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/book">Book Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showroom-level clean at your door. Transparent prices. On-time, professional techs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>On-site Convenience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We come to your home, office, or anywhere in Metro Atlanta. 
                  No waiting in lines or dropping off your car.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Professional Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional-grade equipment and techniques deliver 
                  showroom-quality results every time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Fair, Transparent Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No hidden fees or surprises. See exactly what you pay 
                  before booking, including travel charges.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose one-time or monthly — add options as needed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="relative">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium Detail</CardTitle>
                <CardDescription>One-time service</CardDescription>
                <div className="text-4xl font-bold text-primary mt-2">$100</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Complete wash & detail</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Interior & exterior</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Professional products</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/book">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-accent">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Monthly Plan</CardTitle>
                <CardDescription>Subscription service</CardDescription>
                <div className="text-4xl font-bold text-accent mt-2">
                  $120<span className="text-base font-normal text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Monthly maintenance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Priority scheduling</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Cancel anytime</span>
                  </li>
                </ul>
                <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                  <Link href="/book">Start Plan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Add-ons: Interior Deep Clean (+$30) • Exterior Sealant (+$20) • Engine Bay (+$40) • Upholstery Shampoo (+$35)
            </p>
            <Button variant="outline" asChild>
              <Link href="/pricing">Build Your Plan</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Social Proof */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "Amazing service! They came right to my office and my car looked brand new. 
                  Will definitely use them again."
                </p>
                <p className="font-semibold text-sm">— Sarah M., Conyers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "Professional, on-time, and fair pricing. The monthly plan is perfect 
                  for keeping my car spotless."
                </p>
                <p className="font-semibold text-sm">— Mike R., Covington</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "Best detailing service in Metro Atlanta. They pay attention to every detail 
                  and the results speak for themselves."
                </p>
                <p className="font-semibold text-sm">— Jennifer L., Lithonia</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for a Factory-New Finish?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Pick a plan, add options, enter ZIP — checkout in under 1 minute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <Link href="/book">Book Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:706-717-9406">Call 706-717-9406</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}