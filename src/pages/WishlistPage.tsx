import React, { useState, useEffect } from 'react';
import { getWishlists, getWishlistItems } from '../../integrations/supabase/api/wishlists';
import { Wishlist, WishlistItem } from '../../types/wishlist';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { getHomestayById } from '../../integrations/supabase/api/homestays';
import { Homestay } from '../../types/homestay';
import { Link } from 'react-router-dom';

const WishlistPage: React.FC = () => {
  const { user } = useAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [wishlistItems, setWishlistItems] = useState<{ [key: string]: (WishlistItem & { itemDetails?: Homestay })[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlists = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const userWishlists = await getWishlists();
        setWishlists(userWishlists);

        const allItemsPromises = userWishlists.map(async (wishlist) => {
          const items = await getWishlistItems(wishlist.id);
          const itemsWithDetails = await Promise.all(
            items.map(async (item) => {
              if (item.item_type === 'homestay') {
                const itemDetails = await getHomestayById(item.item_id);
                return { ...item, itemDetails };
              }
              return item;
            })
          );
          return { wishlistId: wishlist.id, items: itemsWithDetails };
        });

        const allItems = await Promise.all(allItemsPromises);
        const newWishlistItems = allItems.reduce((acc, { wishlistId, items }) => {
          acc[wishlistId] = items;
          return acc;
        }, {} as { [key: string]: (WishlistItem & { itemDetails?: Homestay })[] });
        
        setWishlistItems(newWishlistItems);
      } catch (error) {
        console.error('Error fetching wishlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlists();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Wishlists</h1>
      {wishlists.length === 0 ? (
        <p>You don't have any wishlists yet.</p>
      ) : (
        <div className="space-y-8">
          {wishlists.map((wishlist) => (
            <div key={wishlist.id}>
              <h2 className="text-2xl font-bold mb-4">{wishlist.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistItems[wishlist.id]?.map((item) => (
                  item.itemDetails ? (
                    <Card key={item.id}>
                      <img src={item.itemDetails.images[0]} alt={item.itemDetails.name} className="rounded-t-lg object-cover h-48 w-full" />
                      <CardHeader>
                        <CardTitle>{item.itemDetails.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{item.itemDetails.location}</p>
                        <p className="font-bold">₹{item.itemDetails.price}/night</p>
                        <Button asChild className="mt-4 w-full">
                          <Link to={`/homestays/${item.itemDetails.id}`}>View Details</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : null
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
