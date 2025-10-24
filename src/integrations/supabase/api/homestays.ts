import { allHomestays } from '../../../pages/homestays-data';
import { Homestay } from '../../../types/homestay';

export const getHomestayById = async (id: string): Promise<Homestay | null> => {
  const homestay = allHomestays.find(h => h.id === id);
  return Promise.resolve(homestay || null);
};
