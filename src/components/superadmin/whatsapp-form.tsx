'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleUpdateWhatsAppNumber } from '@/app/superadmin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Updating...' : 'Update Number'}
    </Button>
  );
}

export default function WhatsAppForm({ currentNumber }: { currentNumber: string }) {
  const [state, formAction] = useFormState(handleUpdateWhatsAppNumber, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      if(state.errors && Object.keys(state.errors).length > 0) {
        toast({ variant: 'destructive', title: 'Error', description: state.message });
      } else {
        toast({ title: 'Success', description: state.message });
      }
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">WhatsApp Order Settings</CardTitle>
        <CardDescription>Update the phone number used for receiving WhatsApp orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsAppNumber">WhatsApp Phone Number</Label>
            <Input
              id="whatsAppNumber"
              name="whatsAppNumber"
              placeholder="+1234567890"
              defaultValue={currentNumber}
              required
            />
            {state?.errors?.whatsAppNumber && (
                <p className="text-sm font-medium text-destructive">{state.errors.whatsAppNumber.join(', ')}</p>
            )}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
