"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react"; // npm install lucide-react or use a SVG

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

import {
  useGetInventoryByIdQuery,
  useUpdateInventoryMutation,
} from "@/features/inventoryApi";

export default function EditInventoryPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { data, isLoading } = useGetInventoryByIdQuery(id);
  const [updateInventory] = useUpdateInventoryMutation();

  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        quantity: data.quantity || 0,
        price: data.price || 0,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "name" ? value : Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateInventory({ id, ...form });
    router.push("/inventory");
  };

  if (isLoading) {
    return (
      <Container>
        <p className="p-6 text-[var(--text-muted)]">Loading product...</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="fade-in max-w-md mx-auto mt-10 relative card">
        
        {/* Close Button */}
        <button 
          onClick={() => router.back()}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h1 className="text-xl font-bold mb-6">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Product Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Mouse"
              className="input" // Using the class defined in your CSS
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                Quantity
              </label>
              <input
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                Price
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full btn-primary py-3">
              Update Product
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}