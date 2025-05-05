
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button'; // Import buttonVariants
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp, Share2, Search, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils"; // Import cn
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Initial placeholder posts
const initialPosts = [
  { id: 1, user: 'Traveler Tom', avatarFallback: 'TT', time: '2h ago', content: 'Just booked my trip from Pune to Mumbai using SolanaBus! The process was super smooth. Anyone else traveling this route next week?', likes: 15, comments: 3 },
  { id: 2, user: 'Solana Sally', avatarFallback: 'SS', time: '5h ago', content: 'PSA: Prasanna Purple has added WiFi on their night buses! Finally. #TravelUpdate #SolanaBus #PuneMumbai', likes: 42, comments: 8 },
  { id: 3, user: 'Budget Ben', avatarFallback: 'BB', time: '1d ago', content: 'Looking for travel buddies for a trip from Delhi to Jaipur around the 25th. Planning to use Zingbus. DM me!', likes: 8, comments: 1 },
];

const CommunityPage = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState(() => {
      // Try loading posts from localStorage, fallback to initialPosts
      const savedPosts = localStorage.getItem('solanaBusCommunityPosts');
      return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });
  const [newPostContent, setNewPostContent] = useState('');

  // Save posts to localStorage whenever they change
  useEffect(() => {
      localStorage.setItem('solanaBusCommunityPosts', JSON.stringify(posts));
  }, [posts]);

  const handlePostSubmit = (e) => {
      e.preventDefault();
      if (!newPostContent.trim()) {
          toast({ title: "Cannot post empty message", variant: "destructive" });
          return;
      }
      // Placeholder: In a real app, get user details from auth
      const newPost = {
          id: Date.now(), // Simple unique ID for demo
          user: 'You', // Placeholder for current user
          avatarFallback: 'U',
          time: 'Just now',
          content: newPostContent.trim(),
          likes: 0,
          comments: 0,
          isOwnPost: true // Flag to identify user's own post for deletion
      };

      // Add to the beginning of the list
      setPosts(prevPosts => [newPost, ...prevPosts]);
      setNewPostContent(''); // Clear the textarea
      toast({ title: "Post Submitted!", description: "Your post is now live." });
  }

  const handleDeletePost = (postId) => {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      toast({ title: "Post Deleted", variant: "default" });
  }

  const handleInteraction = (type) => {
     // Placeholder for like/comment/share action
     toast({ title: `${type} clicked!`, description: "This interaction is just a demo.", duration: 1500 });
  }

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold">SolanaBus Community</h1>
        <p className="text-muted-foreground mt-2">Connect with fellow travelers, share tips, and get updates.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="md:col-span-2 space-y-6">
          {/* Create Post */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create a Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostSubmit}>
                  <div className="flex space-x-3">
                    <Avatar>
                      <AvatarFallback>U</AvatarFallback> {/* Placeholder */}
                    </Avatar>
                    <textarea
                      name="postContent"
                      placeholder="Share your travel plans or tips..."
                      className="flex-1 min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button type="submit">Post</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Posts Feed */}
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
            >
              <Card>
                <CardHeader className="pb-3 relative"> {/* Added relative for positioning delete button */}
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{post.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{post.user}</p>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                  </div>
                  {/* Delete Button - Shown only for posts marked as 'isOwnPost' */}
                   {post.isOwnPost && (
                     <AlertDialog>
                       <AlertDialogTrigger asChild>
                         <Button
                           variant="ghost"
                           size="icon"
                           className="absolute top-2 right-2 text-muted-foreground hover:text-destructive h-7 w-7"
                         >
                           <Trash2 className="w-4 h-4" />
                         </Button>
                       </AlertDialogTrigger>
                       <AlertDialogContent>
                         <AlertDialogHeader>
                           <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                           <AlertDialogDescription>
                             This action cannot be undone. This will permanently delete your post.
                           </AlertDialogDescription>
                         </AlertDialogHeader>
                         <AlertDialogFooter>
                           <AlertDialogCancel>Cancel</AlertDialogCancel>
                           <AlertDialogAction onClick={() => handleDeletePost(post.id)} className={cn(buttonVariants({ variant: "destructive" }))}>
                             Delete
                           </AlertDialogAction>
                         </AlertDialogFooter>
                       </AlertDialogContent>
                     </AlertDialog>
                   )}
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="mb-4 whitespace-pre-wrap break-words">
                    {post.content.split(/(#\w+)/g).map((part, i) =>
                      part.startsWith('#') ? (
                        <a key={i} href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline">{part}</a>
                      ) : (
                        part
                      )
                    )}
                  </p>
                  <div className="flex justify-between items-center text-muted-foreground border-t pt-3">
                    <div className="flex space-x-2 sm:space-x-4">
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-xs sm:text-sm" onClick={() => handleInteraction('Like')}>
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-xs sm:text-sm" onClick={() => handleInteraction('Comment')}>
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-xs sm:text-sm" onClick={() => handleInteraction('Share')}>
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
           {posts.length === 0 && (
             <div className="text-center py-10 text-muted-foreground">
               No posts yet. Be the first to share!
             </div>
           )}
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
             <Card className="sticky top-20">
               <CardHeader>
                 <CardTitle className="text-lg">Search Community</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   <Input placeholder="Search posts..." className="pl-9" />
                 </div>
               </CardContent>
             </Card>
           </motion.div>
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
             <Card className="sticky top-60">
               <CardHeader>
                 <CardTitle className="text-lg">Trending Topics</CardTitle>
               </CardHeader>
               <CardContent className="space-y-2 text-sm">
                 {["#SummerTravel", "#SolanaBusDeals", "#RoadTripIdeas", "#AskTheCommunity", "#PuneMumbai", "#DelhiJaipur"].map(topic => (
                    <p key={topic}><a href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline">{topic}</a></p>
                 ))}
               </CardContent>
             </Card>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
  