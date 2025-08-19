import { getWhatsAppNumber } from '@/lib/store';
import WhatsAppForm from '@/components/admin/settings/whatsapp-form';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


function WhatsAppFormSkeleton() {
  return (
    <div className="max-w-2xl">
      <Skeleton className="h-[220px] w-full" />
    </div>
  )
}

export default function SettingsPage() {

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Settings</h1>
       <Suspense fallback={<WhatsAppFormSkeleton />}>
        <WhatsAppFormLoader />
       </Suspense>
    </div>
  );
}

async function WhatsAppFormLoader() {
  const currentNumber = await getWhatsAppNumber();
  return (
    <div className="max-w-2xl">
      <WhatsAppForm currentNumber={currentNumber} />
    </div>
  );
}
