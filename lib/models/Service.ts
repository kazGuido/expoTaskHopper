export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  location_id: string;
  category: string;
  price: number;
  duration: number;
  created_at?: Date;
  updated_at?: Date;
}