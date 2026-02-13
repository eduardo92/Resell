
import { getAllSites } from '@/lib/sites';
import AdminClient from './AdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const sites = await getAllSites();

    return <AdminClient initialSites={sites} />;
}
