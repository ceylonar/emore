import { getWhatsAppNumber } from '@/lib/store';
import WhatsAppForm from '@/components/superadmin/whatsapp-form';

export default async function SuperAdminPage() {
  const currentNumber = await getWhatsAppNumber();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold font-headline mb-8">Admin Dashboard</h1>
      <div className="max-w-2xl">
        <WhatsAppForm currentNumber={currentNumber} />
      </div>
    </div>
  );
}
