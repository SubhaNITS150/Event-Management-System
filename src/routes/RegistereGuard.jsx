import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; 
import { Loader2 } from 'lucide-react'; 

export default function RegistrationGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // 1. Get the current logged-in user
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // 2. Check if that user exists in the team_members table
          const { data: teamMember, error } = await supabase
            .from('team_members')
            .select('team_id')
            .eq('user_id', user.id)
            .maybeSingle(); // .maybeSingle() returns null if not found

          if (error) throw error;

          if (teamMember) {
            // User IS registered in a team
            setIsRegistered(true);
          } else {
            // User is logged in, but NOT in a team
            setIsRegistered(false);
          }
        } else {
          // User is not logged in, so they can't be registered
          setIsRegistered(false);
        }
      } catch (error) {
        console.error('Error checking registration status:', error);
        setIsRegistered(false); // Fail safe to the registration page
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  // This effect runs after the check is complete
  useEffect(() => {
    if (!loading) {
      if (isRegistered) {
        // If registered, redirect them away from the register page
        navigate('/alreadyregistered', { replace: true });
      }
      // If not loading and not registered, the component will just return {children}
    }
  }, [loading, isRegistered, navigate]);

  // Show a full-page loader while checking
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
      </div>
    );
  }

  // If loading is done and user is NOT registered, show the children (Register page)
  // If user IS registered, this returns null while the navigate effect redirects
  return isRegistered ? null : children;
}