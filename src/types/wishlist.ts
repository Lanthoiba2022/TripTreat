export interface Wishlist {
    id: string;
    user_id: string;
    name: string;
    created_at: string;
  }
  
  export interface WishlistItem {
    id: string;
    wishlist_id: string;
    item_id: string;
    item_type: string;
    created_at: string;
  }
  