import { supabase } from '..';
import { Wishlist, WishlistItem } from '../../../types/wishlist';

// Function to get all wishlists for the current user
export const getWishlists = async (): Promise<Wishlist[]> => {
  const { data, error } = await supabase
    .from('wishlists')
    .select('*');

  if (error) throw new Error(error.message);
  return data || [];
};

// Function to create a new wishlist
export const createWishlist = async (name: string): Promise<Wishlist> => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error(userError?.message || 'User not found');
  
    const { data, error } = await supabase
      .from('wishlists')
      .insert({ name, user_id: user.id })
      .select()
      .single();
  
    if (error) throw new Error(error.message);
    return data;
  };

// Function to add an item to a wishlist
export const addItemToWishlist = async (wishlistId: string, itemId: string, itemType: string): Promise<WishlistItem> => {
  const { data, error } = await supabase
    .from('wishlist_items')
    .insert({ wishlist_id: wishlistId, item_id: itemId, item_type: itemType })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

// Function to remove an item from a wishlist
export const removeItemFromWishlist = async (wishlistId: string, itemId: string, itemType: string): Promise<void> => {
  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('wishlist_id', wishlistId)
    .eq('item_id', itemId)
    .eq('item_type', itemType);

  if (error) throw new Error(error.message);
};

// Function to get all items in a wishlist
export const getWishlistItems = async (wishlistId: string): Promise<WishlistItem[]> => {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('wishlist_id', wishlistId);
  
    if (error) throw new Error(error.message);
    return data || [];
  };
