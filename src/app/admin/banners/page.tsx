import { getHeroBanners } from '@/lib/mock-data';
import AddBannerForm from '@/components/admin/banners/add-banner-form';
import BannerList from '@/components/admin/banners/banner-list';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function ManageBannersPage() {
  const banners = await getHeroBanners();

  return (
    <div>
        <h1 className="font-headline text-3xl font-bold mb-2">Hero Banners</h1>
        <p className="text-muted-foreground mb-8">Manage the promotional banners in your homepage's hero carousel.</p>
        <div className="grid gap-10">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Banner</CardTitle>
                    <CardDescription>Add a new promotional banner to your homepage carousel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddBannerForm />
                </CardContent>
            </Card>
            <BannerList banners={banners} />
        </div>
    </div>
  );
}
