import { getHeroBanners } from '@/lib/mock-data';
import BannersView from '@/components/admin/banners-view';

export default async function ManageBannersPage() {
  const banners = await getHeroBanners();

  return (
    <div>
        <h1 className="font-headline text-3xl font-bold mb-2">Hero Banners</h1>
        <p className="text-muted-foreground mb-8">Manage the promotional banners in your homepage's hero carousel.</p>
        <BannersView initialBanners={banners} />
    </div>
  );
}
