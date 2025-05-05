
import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
             <Link to="/" className="flex items-center space-x-2 mb-4">
               <span className="text-xl font-bold gradient-text">SolanaBus</span>
             </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Your premier platform for booking bus tickets across India.
            </p>
             <div className="mt-6 flex space-x-4">
               <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                 <span className="sr-only">Twitter</span>
                 <Twitter className="h-5 w-5" />
               </a>
               <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                 <span className="sr-only">GitHub</span>
                 <Github className="h-5 w-5" />
               </a>
               <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                 <span className="sr-only">LinkedIn</span>
                 <Linkedin className="h-5 w-5" />
               </a>
             </div>
          </div>

          <div>
            <h3 className="text-sm font-medium">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Search Buses
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Offers
                </Link>
              </li>
               <li>
                <Link to="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center & FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
               <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

           <div>
             <h3 className="text-sm font-medium">Newsletter</h3>
             <p className="mt-4 text-sm text-muted-foreground">Get updates on routes and offers.</p>
             <form onSubmit={(e) => {e.preventDefault(); alert("Newsletter subscription is a demo.")}}>
               <div className="mt-2 flex max-w-md gap-2">
                 <Input type="email" placeholder="Enter your email" className="flex-1" required />
                 <Button type="submit" size="icon">
                   <ArrowRight className="h-4 w-4" />
                 </Button>
               </div>
             </form>
           </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SolanaBus. All rights reserved. Built with Solana vibes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  