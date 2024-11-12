"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addTransaction } from "@/services/supabase/transaction-services";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { Transaction, TransactionType } from "@/models/transaction-models";
import { categories } from "@/constants/data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/submit-button";
import { DatePicker } from "@/components/date-picker";
import { TimePicker } from "@/components/time-picker";
import { DatetimePicker } from "@/components/datetime-picker";

const formSchema = z.object({
  description: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must be at most 50 characters.",
    }),
  amount: z.number({
    required_error: "Please input transaction amount.",
  }),
  type: z.nativeEnum(TransactionType, {
    required_error: "Please select transaction type.",
  }),
  category: z.string().min(1, { message: "Please select a valid category." }),
  subcategory: z
    .string()
    .min(1, { message: "Please select a valid subcategory." }),
  transaction_date: z.date({
    required_error: "Please input transaction date.",
  }),
});

export default function TransactionForm() {
  const { formState } = useForm();

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      // @ts-ignore . need to initialize to string to show placeholder
      amount: "",
      type: TransactionType.EXPENSE,
      category: "",
      subcategory: "",
      transaction_date: new Date()
    },
  });

  const filteredSubcategories =
    categories.find((cat) => cat.category === selectedCategory)
      ?.subcategories || [];

  function onSubmit(values: z.infer<typeof formSchema>) {
    const category = categories.find((cat) => cat.category === values.category);
    const subcategory = category?.subcategories.find(
      (sub) => sub.name === values.subcategory
    );

    if (!category || !subcategory) {
      console.error("Invalid category or subcategory selection.");
      return;
    }

    const transactionData: Omit<Transaction, "id" | "created_at"> = {
      ...values,
    };

    addTransaction(transactionData)
      .then((data) => {
        toast({
          variant: "success",
          description: "Transaction added successfully",
        });
        form.reset();
        setIsDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
      });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-lg p-4" variant="default" onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>Create a new transaction.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter transaction amount"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? parseFloat(e.target.value) : ""
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={TransactionType.EXPENSE}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select transaction type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={TransactionType.INCOME}>
                            Income
                          </SelectItem>
                          <SelectItem value={TransactionType.EXPENSE}>
                            Expense
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Amount</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCategory(value);
                          form.setValue("subcategory", ""); // Reset subcategory on category change
                        }}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.category}
                              value={category.category}
                            >
                              <div className="flex items-center">
                                <category.icon className="mr-2 h-4 w-4" />
                                {category.category}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        disabled={!selectedCategory} // Disable until category is selected
                      >
                        <SelectTrigger id="subcategory">
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredSubcategories.map((subcategory) => (
                            <SelectItem
                              key={subcategory.name}
                              value={subcategory.name}
                            >
                              <div className="flex items-center">
                                <subcategory.icon className="mr-2 h-4 w-4" />
                                {subcategory.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transaction_date"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Transaction Date</FormLabel>
                    <FormControl>
                      <DatetimePicker
                        {...field}
                        format={[
                          ["months", "days", "years"],
                          ["hours", "minutes", "am/pm"],
                        ]}
                      />
                    </FormControl>
                    {/* <FormDescription>Add Transaction Date and Time (default is Today).</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

             
            </div>
            <SubmitButton
              className="w-full !mt-4"
              type="submit"
              disabled={!formState.isValid}
            >
              Submit
            </SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
