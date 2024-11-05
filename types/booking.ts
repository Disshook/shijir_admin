import { Travel } from "./travel";
import { User } from "./user";

export interface Booking {
  _id: string;
  name: string;
  email: string;
  startDate?: string; 
  endDate?: string;   
  phone?: string;     
  content?: string;   
  kidsNumber?: number; 
  adultNumber?: number; 
  status: number;    
  people: number;     
  createdAt: string;  
}
