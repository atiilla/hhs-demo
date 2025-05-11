import { Metadata } from 'next';
import BookmarksClient from './BookmarksClient';

export const metadata: Metadata = {
  title: 'Bookmarks | Happy Hacking Space',
  description: 'Useful resources and links for hackers and tech enthusiasts',
};

export default function BookmarksPage() {
  return <BookmarksClient />;
}
