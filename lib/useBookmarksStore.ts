import { create } from 'zustand';
import { sanitizeInput } from '../utils/input';

// Define available bookmark sources
export const BOOKMARK_SOURCES = {
  AWESOME_HACKATHON: 'awesome-hackathon',
  PERSONAL: 'personal',
  // Add more sources as needed
};

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
  currentSource: string;
  addBookmark: (title: string, url: string) => void;
  deleteBookmark: (id: number) => void;
  loadBookmarks: () => Promise<void>;
  setCurrentSource: (source: string) => void;
}

// Create bookmarks store
const useBookmarksStore = create<BookmarksState>((set, get) => ({
  bookmarks: [],
  isLoading: false,
  currentSource: BOOKMARK_SOURCES.AWESOME_HACKATHON, // Default source

  addBookmark: (title: string, url: string) => set((state: BookmarksState) => {
    const sanitizedBookmark: Bookmark = {
      id: Date.now(),
      title: sanitizeInput(title),
      url: sanitizeInput(url)
    };

    const updatedBookmarks = [...state.bookmarks, sanitizedBookmark];
    sessionStorage.setItem(`bookmarks-${state.currentSource}`, JSON.stringify(updatedBookmarks));
    return { bookmarks: updatedBookmarks };
  }),

  deleteBookmark: (id: number) => set((state: BookmarksState) => {
    const updatedBookmarks = state.bookmarks.filter(bookmark => bookmark.id !== id);
    sessionStorage.setItem(`bookmarks-${state.currentSource}`, JSON.stringify(updatedBookmarks));
    return { bookmarks: updatedBookmarks };
  }),

  setCurrentSource: (source: string) => {
    set({ currentSource: source });
    // Load bookmarks for the new source
    get().loadBookmarks();
  },

  loadBookmarks: async () => {
    // Prevent multiple simultaneous loads
    if (get().isLoading) return;
    
    set({ isLoading: true });
    try {
      const currentSource = get().currentSource;
      
      // Clear any saved bookmarks to ensure we load from API
      sessionStorage.removeItem(`bookmarks-${currentSource}`);
      
      // fetch the bookmarks from the API with the current source
      const fetchBookmarks = await fetch(`/api/bookmarks?source=${currentSource}`);
      
      if (!fetchBookmarks.ok) {
        throw new Error(`Failed to fetch bookmarks: ${fetchBookmarks.status} ${fetchBookmarks.statusText}`);
      }
      
      const bookmarks = await fetchBookmarks.json();
      
      if (!Array.isArray(bookmarks)) {
        console.error('Bookmarks data is not an array:', bookmarks);
        set({ bookmarks: [] });
        return;
      }
      
      console.log(`Loaded bookmarks from ${currentSource}:`, bookmarks.length);
      
      // save the bookmarks to the session storage with source identifier
      sessionStorage.setItem(`bookmarks-${currentSource}`, JSON.stringify(bookmarks));
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
