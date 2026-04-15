import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function AdminPage() {
  const session = await getServerSession();
  if (session) redirect('/admin/dashboard');
  else redirect('/admin/login');
}
