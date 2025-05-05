
import React from 'react';
import { SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import the actual ScrollArea component
import { Trash2, CheckCheck, MailOpen, Mail } from 'lucide-react';
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';

// Removed the duplicate local declaration of ScrollArea

const NotificationPanel = ({ notifications, setNotifications }) => {

  const toggleReadStatus = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.read));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SheetContent className="flex flex-col p-0">
      <SheetHeader className="p-4 border-b">
        <SheetTitle>Notifications ({unreadCount} unread)</SheetTitle>
      </SheetHeader>
      <ScrollArea className="flex-1 overflow-y-auto p-4"> {/* Use the imported ScrollArea */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <MailOpen className="w-16 h-16 mb-4" />
            <p>No notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={cn(
                  "relative group p-3 rounded-md border transition-colors",
                  notification.read ? "bg-background border-border" : "bg-primary/10 border-primary/30"
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 flex-shrink-0"
                    onClick={() => toggleReadStatus(notification.id)}
                    title={notification.read ? "Mark as Unread" : "Mark as Read"}
                  >
                    {notification.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4 text-primary" />}
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-1 right-1 h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete Notification"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      {notifications.length > 0 && (
        <SheetFooter className="p-4 border-t flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" onClick={markAllRead} className="flex-1">
            <CheckCheck className="w-4 h-4 mr-1" /> Mark All Read
          </Button>
          <Button variant="destructive" size="sm" onClick={deleteAllRead} className="flex-1">
            <Trash2 className="w-4 h-4 mr-1" /> Delete Read
          </Button>
        </SheetFooter>
      )}
    </SheetContent>
  );
};

export default NotificationPanel;
  