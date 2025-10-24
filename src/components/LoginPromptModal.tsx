import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { User, LogIn, UserPlus } from 'lucide-react';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueAsGuest?: () => void;
  showGuestOption?: boolean;
}

const LoginPromptModal = ({
  isOpen,
  onClose,
  onContinueAsGuest,
  showGuestOption = false,
}: LoginPromptModalProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Store the current location to redirect back after login
    navigate('/auth', { state: { from: window.location.pathname, tab: 'login' } });
  };

  const handleSignup = () => {
    navigate('/auth', { state: { from: window.location.pathname, tab: 'signup' } });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>Authentication Required</span>
          </DialogTitle>
          <DialogDescription>
            Please sign in or create an account to continue with your booking.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <Button
            className="flex items-center gap-2 bg-primary"
            onClick={handleLogin}
            size="lg"
          >
            <LogIn className="h-4 w-4" />
            Sign In to Your Account
          </Button>

          <Button
            className="flex items-center gap-2"
            variant="outline"
            onClick={handleSignup}
            size="lg"
          >
            <UserPlus className="h-4 w-4" />
            Create New Account
          </Button>
        </div>

        {showGuestOption && onContinueAsGuest && (
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-center">
            <Button variant="link" onClick={onContinueAsGuest}>
              Continue as Guest
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginPromptModal;
