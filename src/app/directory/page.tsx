import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Directory — itsclaw',
};

export default function DirectoryPage() {
  redirect('/apps');
}
