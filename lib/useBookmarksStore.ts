import { create } from 'zustand';
import { sanitizeInput } from '../utils/input';

interface Bookmark {
  id: number;
  title: string;
  url: string;
  widgets?: Array<{
    title: string;
    items: {
      links: Array<{
        title: string;
        url: string;
        icon?: string;
        description?: string;
      }>;
    };
  }>;
}

interface BookmarksState {
  bookmarks: Bookmark[];
  isLoading: boolean;
  addBookmark: (title: string, url: string) => void;
  deleteBookmark: (id: number) => void;
  loadBookmarks: () => Promise<void>;
}

// Create bookmarks store
const useBookmarksStore = create<BookmarksState>((set, get) => ({
  bookmarks: [],
  isLoading: false,

  addBookmark: (title: string, url: string) => set((state: BookmarksState) => {
    const sanitizedBookmark: Bookmark = {
      id: Date.now(),
      title: sanitizeInput(title),
      url: sanitizeInput(url)
    };

    const updatedBookmarks = [...state.bookmarks, sanitizedBookmark];
    sessionStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    return { bookmarks: updatedBookmarks };
  }),

  deleteBookmark: (id: number) => set((state: BookmarksState) => {
    const updatedBookmarks = state.bookmarks.filter(bookmark => bookmark.id !== id);
    sessionStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    return { bookmarks: updatedBookmarks };
  }),

  loadBookmarks: async () => {
    // Prevent multiple simultaneous loads
    if (get().isLoading) return;
    
    set({ isLoading: true });
    try {
      // Clear any saved bookmarks to ensure we load from API
      sessionStorage.removeItem('bookmarks');
      
      // fetch the bookmarks from the API
      const fetchBookmarks = await fetch("/api/bookmarks");
      
      if (!fetchBookmarks.ok) {
        throw new Error(`Failed to fetch bookmarks: ${fetchBookmarks.status} ${fetchBookmarks.statusText}`);
      }
      
      const bookmarks = await fetchBookmarks.json();
      
      if (!Array.isArray(bookmarks)) {
        console.error('Bookmarks data is not an array:', bookmarks);
        set({ bookmarks: [] });
        return;
      }
      
      console.log('Loaded bookmarks:', bookmarks.length);
      
      // save the bookmarks to the session storage  
      sessionStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      set({ bookmarks: bookmarks });
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      // If there's an error, initialize with empty array
      set({ bookmarks: [] });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useBookmarksStore;
