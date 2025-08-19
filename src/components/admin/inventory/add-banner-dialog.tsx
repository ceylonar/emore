'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { addHeroBanner } from '@/app/admin/inventory/actions';

const heroBannerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  dataAiHint: z.string().optional(),
});


type BannerFormValues = z.infer<typeof heroBannerSchema>;

interface AddBannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddBannerDialog({ open, onOpenChange }: AddBannerDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(heroBannerSchema),
    defaultValues: {
      title: '',
      imageUrl: '',
      dataAiHint: '',
    },
  });

  const onSubmit = async (values: BannerFormValues) => {
    setIsSubmitting(true);
    const result = await addHeroBanner(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({ title: 'Success', description: 'Hero banner added successfully.' });
      form.reset();
      onOpenChange(false);
    } else {
      const errorMessage = typeof result.error === 'string' ? result.error : 'Failed to add hero banner. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Hero Banner</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new banner to the home page carousel.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Summer Collection" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/1200x600.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataAiHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Hint (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. fashion model" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Banner'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
