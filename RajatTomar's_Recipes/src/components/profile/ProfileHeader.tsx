
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@/services/auth';

interface ProfileHeaderProps {
  user: User;
  logout: () => void;
}

const ProfileHeader = ({ user, logout }: ProfileHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-food-beige">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-food-green flex items-center justify-center text-white text-3xl font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h1 className="font-heading text-2xl font-semibold">
            {user.name}
          </h1>
          <p className="text-food-medium-gray mb-4">
            {user.email}
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <Link to="/preferences">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings size={16} />
                <span>Preferences</span>
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;