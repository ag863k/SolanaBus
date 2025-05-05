
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import BookingPage from "@/pages/BookingPage";
import MyBookingsPage from "@/pages/MyBookingsPage";
import CommunityPage from "@/pages/CommunityPage";
import OffersPage from "@/pages/OffersPage";
import HelpPage from "@/pages/HelpPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage"; // Import Privacy Policy Page
import { ThemeProvider } from "@/contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/booking/:busId" element={<BookingPage />} />
              <Route path="/bookings" element={<MyBookingsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} /> {/* Add Privacy Route */}
              {/* Add route for /terms later if needed */}
              <Route path="*" element={<HomePage />} /> {/* Redirect unknown paths to home */}
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
  