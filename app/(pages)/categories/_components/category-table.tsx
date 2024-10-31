"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

import { Edit, Trash } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Category } from "@/models/category-models";
import { getCategories } from "@/services/supabase/category-services";

export function CategoriesTable() {
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      loadCategories();
      setIsLoaded(true);
    }
  }, [isLoaded]);
  
  useEffect(() => {
    const channel = supabase
      .channel("realtime categories")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "categories",
        },
        (payload) => {
          console.log({ payload });
          setCategories([payload.new as Category, ...categories]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, categories, setCategories]);

  async function loadCategories() {
    setIsLoading(true);
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center p-6">
          <LoadingSpinner size={40} />
        </div>
      ) : (
        categories.length === 0 ? (
          <div className="flex items-center justify-center p-6">
            <p>No recent Categories yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
                {/* Add other column headers as needed */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((Budget) => (
                <TableRow key={Budget.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{Budget.name}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="sm" className="outline-red-400">
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
    </>
  );
}