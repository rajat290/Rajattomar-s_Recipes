
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { getUserPreferences } from '@/services/preferences';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { useProfileActions } from '@/hooks/useProfileActions';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Will redirect to sign-in
  }

  // Get user preferences
  const { data: preferences, isLoading: preferencesLoading } = useQuery({
    queryKey: ['userPreferences', user.id],
    queryFn: () => getUserPreferences(user.id),
    staleTime: 5 * 60 * 1000,
  });
  
  // Use our custom hook for profile actions
  const { handleToggleSaved, handleToggleFavorite } = useProfileActions(user.id);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Profile Header */}
            <ProfileHeader user={user} logout={logout} />
            
            {/* Profile Tabs */}
            <ProfileTabs 
              preferences={preferences}
              preferencesLoading={preferencesLoading}
              handleToggleSaved={(recipeId, isSaved) => handleToggleSaved(recipeId, isSaved)}
              handleToggleFavorite={(recipeId, isFavorite) => handleToggleFavorite(recipeId, isFavorite)}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;