
import React from "react";
import { motion } from "framer-motion";
import BusSearchForm from "@/components/BusSearchForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ShieldCheck, Tag, Users, ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-solana-purple/20 via-background to-solana-teal/10 overflow-hidden">
         <motion.div
           className="absolute top-10 left-10 w-64 h-64 rounded-full bg-solana-purple/10 blur-3xl opacity-50"
           animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
         />
         <motion.div
           className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-solana-teal/10 blur-3xl opacity-50"
           animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
           transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", delay: 1 }}
         />
        <div className="container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Book Your Bus Tickets <span className="gradient-text">Easily</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          >
            Find the best routes, compare prices, and book your journey with SolanaBus. Fast, secure, and convenient.
          </motion.p>
          <BusSearchForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Book With SolanaBus?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MapPin, title: "Extensive Routes", desc: "Covering thousands of destinations across the country." },
              { icon: ShieldCheck, title: "Secure Payments", desc: "Multiple payment options including crypto, all secured." },
              { icon: Tag, title: "Best Prices", desc: "Find competitive fares and exclusive discounts." },
              { icon: Users, title: "Trusted Operators", desc: "Partnering with reliable and reputed bus operators." },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
       <section className="py-16 md:py-24 bg-muted/20">
         <div className="container">
           <h2 className="text-3xl font-bold text-center mb-12">Simple Booking Process</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
               <div className="mb-4 text-5xl font-bold text-primary/50">1</div>
               <h3 className="text-xl font-semibold mb-2">Search</h3>
               <p className="text-muted-foreground">Enter your origin, destination, and travel date.</p>
             </motion.div>
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
               <div className="mb-4 text-5xl font-bold text-primary/50">2</div>
               <h3 className="text-xl font-semibold mb-2">Select</h3>
               <p className="text-muted-foreground">Choose your preferred bus and select your seats.</p>
             </motion.div>
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
               <div className="mb-4 text-5xl font-bold text-primary/50">3</div>
               <h3 className="text-xl font-semibold mb-2">Pay</h3>
               <p className="text-muted-foreground">Complete your booking using secure payment methods.</p>
             </motion.div>
           </div>
         </div>
       </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container text-center">
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
             <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Journey?</h2>
             <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
               Don't wait! Find the perfect bus ride for your travel plans today.
             </p>
             <Button size="lg" className="bg-solana-gradient hover:opacity-90 text-lg px-8 py-3 h-auto">
               Search Buses Now <ArrowRight className="ml-2 h-5 w-5" />
             </Button>
           </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
  