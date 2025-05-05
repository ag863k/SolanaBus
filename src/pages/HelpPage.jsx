
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search, Phone, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqData = [
  {
    id: "q1",
    question: "How do I book a bus ticket?",
    answer: "Searching for buses is easy! Enter your origin city, destination city, and date of travel on the homepage or search page. Click 'Search Buses' to see available options. Choose your preferred bus, select your seats, provide passenger details, and complete the payment.",
  },
  {
    id: "q2",
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking, subject to the operator's cancellation policy. Go to 'My Bookings', find the booking you wish to cancel, and click the 'Cancel Booking' button. Cancellation charges and refund timelines vary by operator.",
  },
  {
    id: "q3",
    question: "How do I find my boarding point?",
    answer: "Your boarding point details, including address and landmark, will be mentioned on your e-ticket which you can download from the 'My Bookings' section after confirmation. You will also receive these details via SMS/Email if provided during booking.",
  },
  {
    id: "q4",
    question: "What payment methods are accepted?",
    answer: "We currently support payments via major Credit Cards, Debit Cards, and UPI through our secure payment gateway. We plan to add more options like Net Banking and Wallets soon.",
  },
   {
    id: "q5",
    question: "Is it mandatory to carry a printout of the ticket?",
    answer: "Most operators accept the digital e-ticket (M-ticket) displayed on your mobile phone or tablet along with a valid government-issued photo ID. However, we recommend checking the specific operator's policy mentioned on your ticket.",
  },
   {
    id: "q6",
    question: "What if the bus is cancelled or delayed?",
    answer: "In case of cancellations or significant delays initiated by the bus operator, you will be notified via SMS/Email. You will generally be eligible for a full refund or rescheduling options as per the operator's policy. Please contact our support for assistance.",
  },
];

const HelpPage = () => {
  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <HelpCircle className="w-12 h-12 mx-auto text-primary mb-3" />
        <h1 className="text-3xl font-bold">Help Center & FAQ</h1>
        <p className="text-muted-foreground mt-2">Find answers to common questions or contact our support team.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-2xl mx-auto mb-10"
      >
         <div className="relative">
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           <Input placeholder="Search help topics..." className="pl-9" />
         </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="lg:col-span-2"
          >
             <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                      {faq.answer}
                      </AccordionContent>
                  </AccordionItem>
                  ))}
              </Accordion>
          </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="lg:col-span-1"
            >
             <Card className="sticky top-20">
               <CardHeader>
                 <CardTitle>Contact Support</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <p className="text-sm text-muted-foreground">
                   If you can't find an answer here, feel free to reach out to us.
                 </p>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                     <div>
                       <p className="text-sm font-medium">Phone Support</p>
                       <a href="tel:+91XXXXXXXXXX" className="text-sm text-muted-foreground hover:text-primary">+91-XXX-XXXXXXX (Demo)</a>
                     </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                     <div>
                       <p className="text-sm font-medium">Email Support</p>
                       <a href="mailto:support@solanabus.demo" className="text-sm text-muted-foreground hover:text-primary">support@solanabus.demo</a>
                     </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">Support available Mon-Sat, 9 AM - 7 PM IST.</p>
               </CardContent>
             </Card>
           </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;
  