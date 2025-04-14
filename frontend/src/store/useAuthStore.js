import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem('authUser')) || null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
      localStorage.setItem('authUser', JSON.stringify(res.data));
    } catch (error) {
      console.error('Error in checkAuth:', error);
      set({ authUser: null });
      localStorage.removeItem('authUser');
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data });
      localStorage.setItem('authUser', JSON.stringify(res.data));
      toast.success('Account created successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      if (!res.data) {
        throw new Error('No data received from login');
      }
      set({ authUser: res.data });
      localStorage.setItem('authUser', JSON.stringify(res.data));
      toast.success('Logged in successfully');
      get().connectSocket();
    } catch (error) {
      console.error('Error in login:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      set({ authUser: null });
      localStorage.removeItem('authUser');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      localStorage.removeItem('authUser');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put('/auth/update-profile', data);
      set({ authUser: res.data });
      localStorage.setItem('authUser', JSON.stringify(res.data));
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error in update profile:', error);
      toast.error(error.response?.data?.message || 'Profile update failed');
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));