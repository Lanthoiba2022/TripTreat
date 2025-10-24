import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useAuth } from '../contexts/AuthContext';
import { getWishlists, createWishlist, addItemToWishlist } from '../integrations/supabase/api/wishlists';
import { Wishlist } from '../types/wishlist';
import { toast } from 'sonner';

interface AddToWishlistButtonProps {
  itemId: string;
  itemType: string;
}

const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({ itemId, itemType }) => {
  const { user } = useAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [open, setOpen] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState('');

  useEffect(() => {
    if (user && open) {
      getWishlists().then(setWishlists);
    }
  }, [user, open]);

  const handleAddToWishlist = async (wishlistId: string) => {
    try {
      await addItemToWishlist(wishlistId, itemId, itemType);
      toast.success('Item added to wishlist!');
      setOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleCreateWishlist = async () => {
    if (!newWishlistName.trim()) {
      toast.error('Wishlist name cannot be empty');
      return;
    }
    try {
      const newWishlist = await createWishlist(newWishlistName);
      setWishlists([...wishlists, newWishlist]);
      setNewWishlistName('');
      toast.success('Wishlist created!');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add to Wishlist</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Wishlist</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Select a Wishlist</h3>
            <ul className="space-y-2 mt-2">
              {wishlists.map((wishlist) => (
                <li key={wishlist.id}>
                  <Button variant="ghost" onClick={() => handleAddToWishlist(wishlist.id)}>
                    {wishlist.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Create a New Wishlist</h3>
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={newWishlistName}
                onChange={(e) => setNewWishlistName(e.target.value)}
                placeholder="New wishlist name"
                className="border p-2 rounded-md w-full"
              />
              <Button onClick={handleCreateWishlist}>Create</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToWishlistButton;
