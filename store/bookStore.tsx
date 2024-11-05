import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '@/hooks/axios';
import Swal from 'sweetalert2';

interface Booking {
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

interface BookingState {
    filteredItems: Booking[];
    value: string;
    search: string;
    fetchBooking: () => Promise<void>;
    setFilteredItems: (items: Booking[]) => void;
    showMessage: (msg: string, type?: 'success' | 'error') => void;
    updateStatus: (id: string, status: number) => Promise<void>;
}

const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        customClass: { container: 'toast' },
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};

const fetchBooking = async (set: (state: Partial<BookingState>) => void) => {
    try {
        const response = await axiosInstance.get<{ data: Booking[] }>('/book');
        set({ filteredItems: response.data.data });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        showMessage('Error fetching bookings', 'error');
    }
};

const updateStatus = async (id: string, status: number, set: (state: Partial<BookingState>) => void, get: () => BookingState) => {
    try {
        const formData = new FormData();
        formData.set('status', status.toString());
        await axiosInstance.put(`/booking/${id}`, formData);

        const updatedItems = get().filteredItems.map((item: Booking) => 
            item._id === id ? { ...item, status } : item
        );
        set({ filteredItems: updatedItems });

        showMessage('Төлөв амжилттай шинэчлэгдлээ', 'success');
    } catch (error) {
        console.error('Error updating status:', error);
        showMessage('Error updating status', 'error');
    }
};

export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            filteredItems: [],
            value: 'list',
            search: '',
            fetchBooking: () => fetchBooking(set),
            setFilteredItems: (items: Booking[]) => set({ filteredItems: items }),
            showMessage: (msg: string, type?: 'success' | 'error') => showMessage(msg, type),
            updateStatus: (id: string, status: number) => updateStatus(id, status, set, get),
        }),
        { name: 'company-store' }
    )
);