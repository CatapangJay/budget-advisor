'use client';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { addCategory } from '@/services/supabase/category-services';
import { SubmitButton } from '@/components/submit-button';

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.'
    }).max(30, {
        message: 'Name must be at most 30 characters.'
    }),
});

export default function CategoryForm() {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        addCategory(values).then((data) => {
            toast({
                variant: "success",
                description: "Category added successfully",
            });
            form.reset();
            setIsDialogOpen(false); // Close dialog on success
        }).catch((error) => {
            console.error('Error adding Category:', error);
        });
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default" onClick={() => setIsDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />Add New</Button>
            </DialogTrigger>
            <DialogContent className='max-w-sm'>
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                        Create a new budget category.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Enter category name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <SubmitButton type="submit" className='w-full'>Submit</SubmitButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
    //   return (
    //     <Card className="mx-auto w-full">
    //       <CardHeader>
    //         <CardTitle className="text-left text-2xl font-bold">
    //           Employee Information
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <Form {...form}>
    //           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    //               <FormField
    //                 control={form.control}
    //                 name="name"
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>Name</FormLabel>
    //                     <FormControl>
    //                       <Input placeholder="Enter your name" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                   </FormItem>
    //                 )}
    //               />
    //               <FormField
    //                 control={form.control}
    //                 name="allocated"
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>Allocated Budget</FormLabel>
    //                     <FormControl>
    //                       <Input placeholder="Enter the allocated budget" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                   </FormItem>
    //                 )}
    //               />
    //             </div>
    //             <Button type="submit">Submit</Button>
    //           </form>
    //         </Form>
    //       </CardContent>
    //     </Card>
    //   );
}
