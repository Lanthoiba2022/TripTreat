-- Wishlists table to store user-created wishlists
CREATE TABLE wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wishlist items table to store items in a wishlist
CREATE TABLE wishlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wishlist_id UUID REFERENCES wishlists(id) ON DELETE CASCADE NOT NULL,
    item_id UUID NOT NULL,
    item_type TEXT NOT NULL, -- e.g., 'homestay', 'eatery', 'experience'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(wishlist_id, item_id, item_type) -- Prevent duplicate items in the same wishlist
);

-- Enable RLS for the new tables
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for wishlists
CREATE POLICY "Users can view their own wishlists"
ON wishlists
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wishlists"
ON wishlists
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wishlists"
ON wishlists
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlists"
ON wishlists
FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for wishlist_items
CREATE POLICY "Users can view items in their own wishlists"
ON wishlist_items
FOR SELECT
USING (exists(select 1 from wishlists where id = wishlist_id and user_id = auth.uid()));

CREATE POLICY "Users can add items to their own wishlists"
ON wishlist_items
FOR INSERT
WITH CHECK (exists(select 1 from wishlists where id = wishlist_id and user_id = auth.uid()));

CREATE POLICY "Users can remove items from their own wishlists"
ON wishlist_items
FOR DELETE
USING (exists(select 1 from wishlists where id = wishlist_id and user_id = auth.uid()));
