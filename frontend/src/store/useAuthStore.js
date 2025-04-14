import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
  authUser: (() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser && storedUser !== 'undefined') {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error('Failed to parse authUser from localStorage:', e);
        localStorage.removeItem('authUser'); // Clean up invalid data
      }
    }
    return null;
  })(),
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      if (!res.data || typeof res.data !== 'object') {
        throw new Error('Invalid auth data');
      }
      console.log('checkAuth response:', res.data); // Debug log
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
      if (!res.data || typeof res.data !== 'object') {
        throw new Error('Invalid signup data');
      }
      console.log('signup response:', res.data); // Debug log
      set({ authUser: res.data });
      localStorage.setItem('authUser', JSON.stringify(res.data));
      toast.success('Account created successfully');
    } catch (error) {
      console.error('Error in signup:', error);
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      if (!res.data || typeof res.data !== 'object') {
        throw new Error('Invalid login data');
      }
      console.log('login response:', res.data); // Debug log
      set({ authUser: res.data });
      localStorage.setItem('authUser', JSON.stringify(res.data));
      toast.success('Logged in successfully');
      get().connectSocket?.(); // Safe call in case connectSocket is not defined
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
      console.error('Error in logout:', error);
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put('/auth/update-profile', data);
      if (!res.data || typeof res.data !== 'object') {
        throw new Error('Invalid profile data');
      }
      console.log('updateProfile response:', res.data); // Debug log
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