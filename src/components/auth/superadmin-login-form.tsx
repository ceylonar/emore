'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { loginSuperAdmin } from '@/app/superadmin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { redirect } from 'next/navigation';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
    </Button>
  );
}

export default function SuperAdminLoginForm() {
  const [state, formAction] = useFormState(loginSuperAdmin, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.success) {
      toast({ title: 'Login Successful', description: 'Redirecting to dashboard...' });
      redirect('/superadmin');
    }
    if (state?.error) {
      toast({ variant: 'destructive', title: 'Login Failed', description: state.error });
    }
  }, [state, toast]);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Superadmin Login</CardTitle>
        <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" required defaultValue="admin" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required defaultValue="password" />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
