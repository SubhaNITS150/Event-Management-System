// src/routes/AdminRoute.jsx
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; // Adjust path as needed
import { Loader2 } from 'lucide-react'; // For the loading spinner

export default function AdminRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // 1. Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (session) {
          setIsLoggedIn(true);
          const { user } = session;

          // 2. Get user's profile and check role
          const { data: profile, error: profileError } = await supabase
            .from('users') // Your user profiles table
            .select('role')
            .eq('user_id', user.id)
            .single();

          if (profileError) throw profileError;

          if (profile && profile.role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false); // User is logged in, but not admin
          }
        } else {
          setIsLoggedIn(false); // No session
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false); // Default to not admin on error
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, []);

  // Show a loader while checking
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
      </div>
    );
  }

  // 3. Handle redirection logic
  if (!isLoggedIn) {
    // Not logged in at all
    return <Navigate to="/login" replace />;
  }

  if (isLoggedIn && !isAdmin) {
    // Logged in, but NOT an admin
    return <Navigate to="/dashboard" replace />; // Redirect to their own dashboard
  }

  // If we're here, user is logged in AND is an admin
  return children;
}