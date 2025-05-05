
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <ShieldCheck className="w-12 h-12 mx-auto text-primary mb-3" />
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2">Last Updated: {new Date().toLocaleDateString('en-CA')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="prose dark:prose-invert max-w-3xl mx-auto bg-card p-6 rounded-lg shadow"
      >
        <p>Welcome to SolanaBus! This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [Your Website URL] and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

        <h2>1. Information We Collect</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
        <ul>
          <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.</li>
          <li><strong>Booking Information:</strong> Details related to your bus bookings, including origin, destination, travel dates, passenger names, seat preferences, and payment information (processed securely by our payment partners).</li>
          <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
        </ul>

        <h2>2. Use of Your Information</h2>
        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Process your bookings and payments.</li>
          <li>Email you regarding your account or order.</li>
          <li>Notify you of updates to the Site and offers.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          <li>Respond to customer service requests.</li>
        </ul>

        <h2>3. Disclosure of Your Information</h2>
        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
        <ul>
          <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
          <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance. (Note: This demo uses localStorage and does not integrate real third-party services for data storage or full payment processing yet).</li>
          <li><strong>Bus Operators:</strong> We share necessary booking details (passenger name, contact info, seat numbers) with the respective bus operators to facilitate your travel.</li>
        </ul>

        <h2>4. Security of Your Information</h2>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
        <p>(Note: In this demo version, sensitive data like full payment details are not stored. Bookings are stored in browser localStorage, which is not suitable for production environments.)</p>

        <h2>5. Policy for Children</h2>
        <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>

        <h2>6. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>

        <h2>7. Contact Us</h2>
        <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
        <p>Email: <a href="mailto:privacy@solanabus.demo">privacy@solanabus.demo</a> (Placeholder)</p>

      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;
  