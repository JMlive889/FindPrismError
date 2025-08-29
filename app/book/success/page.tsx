@@ .. @@
 'use client';

 import { useEffect, useState } from 'react';
 import { useSearchParams } from 'next/navigation';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
-import { CheckCircle, Calendar, Clock } from 'lucide-react';
+import { CheckCircle, Mail, Phone } from 'lucide-react';
 import Link from 'next/link';

 export default function BookingSuccessPage() {
   const searchParams = useSearchParams();
-  const [booking, setBooking] = useState<any>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     const sessionId = searchParams.get('session_id');
     if (sessionId) {
-      // In a real app, you'd verify the session with Stripe and get booking details
-      // For now, we'll show a generic success message
       setLoading(false);
     }
   }, [searchParams]);

   if (loading) {
     return (
       <div className="container mx-auto px-4 py-12">
         <div className="text-center">
-          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
+          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
           <p className="mt-4">Confirming your booking...</p>
         </div>
       </div>
     );
   }

   return (
     <div className="container mx-auto px-4 py-12">
       <div className="max-w-2xl mx-auto text-center">
         <div className="mb-8">
-          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
-          <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
+          <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
+          <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
           <p className="text-xl text-gray-600">
-            Thank you for choosing Cryptic Mobile Detailing
+            Thank you for choosing Cryptic Mobile Detailing.
           </p>
         </div>

         <Card>
           <CardHeader>
             <CardTitle>What Happens Next?</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="flex items-center space-x-3">
-              <CheckCircle className="h-5 w-5 text-green-600" />
-              <span>Confirmation email sent to your inbox</span>
+              <Mail className="h-5 w-5 text-accent" />
+              <span>Confirmation email sent to your inbox</span>
             </div>
             <div className="flex items-center space-x-3">
-              <Calendar className="h-5 w-5 text-blue-600" />
-              <span>Event added to your calendar</span>
+              <Phone className="h-5 w-5 text-accent" />
+              <span>We'll call within 24 hours to schedule your service</span>
             </div>
             <div className="flex items-center space-x-3">
-              <Clock className="h-5 w-5 text-orange-600" />
-              <span>We'll contact you 24 hours before your appointment</span>
+              <CheckCircle className="h-5 w-5 text-green-600" />
+              <span>Service typically scheduled within 2-3 business days</span>
             </div>
           </CardContent>
         </Card>

         <div className="mt-8 space-y-4">
           <p className="text-gray-600">
-            Questions about your booking? Contact us at{' '}
+            Questions about your service? Contact us at{' '}
             <a 
-              href={`tel:${process.env.NEXT_PUBLIC_OWNER_PHONE}`}
-              className="text-blue-600 hover:underline"
+              href="tel:706-717-9406"
+              className="text-accent hover:underline font-semibold"
             >
-              {process.env.NEXT_PUBLIC_OWNER_PHONE}
+              706-717-9406
             </a>
+            {' '}or{' '}
+            <a 
+              href="mailto:crypticmobiledetailing@gmail.com"
+              className="text-accent hover:underline font-semibold"
+            >
+              crypticmobiledetailing@gmail.com
+            </a>
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button asChild>
               <Link href="/">Return Home</Link>
             </Button>
             <Button variant="outline" asChild>
-              <Link href="/products">View Other Services</Link>
+              <Link href="/pricing">View Pricing</Link>
             </Button>
           </div>
         </div>
       </div>
     </div>
   );
 }