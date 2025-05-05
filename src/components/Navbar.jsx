
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"; // Import Sheet components
import { Menu, X, Bell, Users, LogIn, HelpCircle, Tag, Trash2, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import NotificationPanel from "@/components/NotificationPanel"; // Import NotificationPanel

// Simple Google Icon component
const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244.8 512 112.8 512 0 398.9 0 256S112.8 0 244.8 0c61.9 0 119.3 23.4 162.3 62.8l-67.5 64.8C295.6 95.6 270.7 80 244.8 80c-66.8 0-121.2 53.8-121.2 176s54.4 176 121.2 176c72.6 0 110.8-46.4 114.2-70.2H244.8v-85.3h235.2c4.7 26.8 7.2 55.1 7.2 85.3z"></path>
  </svg>
);

// Sample initial notifications (replace with actual logic later)
const initialNotifications = [
  { id: 1, title: "Booking Confirmed!", description: "Your trip from Pune to Mumbai (SB12345) is confirmed.", timestamp: new Date(Date.now() - 3600 * 1000), read: false },
  { id: 2, title: "New Offer Available", description: "Get 20% off on weekend travel. Use code WEEKEND20.", timestamp: new Date(Date.now() - 2 * 3600 * 1000), read: false },
  { id: 3, title: "Community Update", description: "Traveler Tom replied to your post about Delhi.", timestamp: new Date(Date.now() - 5 * 3600 * 1000), read: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('solanaBusNotifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('solanaBusNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogin = () => {
    toast({
      title: "Login Feature",
      description: "Google Login feature is currently in progress.",
      duration: 3000,
    });
  };

  const handleLogout = () => {
     setIsLoggedIn(false);
     setNotifications(initialNotifications); // Reset demo notifications on logout
     toast({ title: "Logged Out", duration: 2000 });
  };

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/search", text: "Search Buses" },
    { to: "/offers", text: "Offers", icon: Tag },
    { to: "/bookings", text: "My Bookings" },
    { to: "/community", text: "Community", icon: Users },
    { to: "/help", text: "Help", icon: HelpCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold gradient-text">SolanaBus</span>
            </Link>

            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center"
                >
                   {link.icon && <link.icon className="mr-1.5 h-4 w-4" />}
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-3">
            <ThemeToggle />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                     <span className="absolute top-1 right-1 flex h-3 w-3">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-3 w-3 bg-primary text-xs text-primary-foreground items-center justify-center">
                         {unreadCount > 9 ? '9+' : unreadCount}
                       </span>
                     </span>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </SheetTrigger>
              <NotificationPanel notifications={notifications} setNotifications={setNotifications} />
            </Sheet>
            {isLoggedIn ? (
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                     <Avatar className="h-8 w-8">
                       <AvatarFallback>U</AvatarFallback>
                     </Avatar>
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent className="w-56" align="end" forceMount>
                   <DropdownMenuLabel className="font-normal">
                     <div className="flex flex-col space-y-1">
                       <p className="text-sm font-medium leading-none">User Name</p>
                       <p className="text-xs leading-none text-muted-foreground">
                         user@example.com
                       </p>
                     </div>
                   </DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuGroup>
                     <DropdownMenuItem>
                       Profile
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                       Settings
                     </DropdownMenuItem>
                   </DropdownMenuGroup>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem onClick={handleLogout}>
                     Log out
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
            ) : (
              <Button onClick={handleLogin}>
                <GoogleIcon /> Login with Google
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center md:hidden">
             <ThemeToggle />
             <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
               <SheetTrigger asChild>
                 <Button variant="ghost" size="icon" className="relative">
                   <Bell className="h-5 w-5" />
                   {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary text-xs text-primary-foreground items-center justify-center">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      </span>
                   )}
                   <span className="sr-only">Notifications</span>
                 </Button>
               </SheetTrigger>
               <NotificationPanel notifications={notifications} setNotifications={setNotifications} />
             </Sheet>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-border/40"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                   {link.icon && <link.icon className="mr-2 h-5 w-5" />}
                  {link.text}
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-border/40">
                 {isLoggedIn ? (
                    <div className="flex items-center px-3 mb-3">
                       <Avatar className="h-10 w-10">
                         <AvatarFallback>U</AvatarFallback>
                       </Avatar>
                       <div className="ml-3">
                         <div className="text-base font-medium">User Name</div>
                         <div className="text-sm text-muted-foreground">user@example.com</div>
                       </div>
                    </div>
                 ) : null}
                <div className="space-y-2 px-2">
                   {isLoggedIn ? (
                      <>
                        <Button variant="ghost" className="w-full justify-start">Profile</Button>
                        <Button variant="ghost" className="w-full justify-start">Settings</Button>
                        <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>Log Out</Button>
                      </>
                   ) : (
                     <Button className="w-full justify-center" onClick={handleLogin}>
                       <GoogleIcon /> Login with Google
                     </Button>
                   )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
  