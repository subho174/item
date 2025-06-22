export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Item from "@/src/model/item.model";
import connectDB from "@/src/db/connectDB";
import ClientWrapper from "../../components/ClientWrapper";
import { Plus } from "lucide-react";

export default async function ViewItemsPage() {
  let items;

  try {
    await connectDB();
    items = await Item.find({}).sort({ createdAt: -1 }).select("-createdAt -updatedAt -__v -_id").lean();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch items");
  }

  return (
    <div className="p-6 md:px-10 2xl:px-20">
      <div className="flex justify-between">
        <p className="text-3xl font-semibold mb-4 ">Your items</p>
        <Button asChild>
          <Link href="/add-items">
            <Plus /> Add Items
          </Link>
        </Button>
      </div>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-16 h-16 mb-4 text-muted-foreground"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5h1.5m1.5 0H9m0 0H7.5m1.5 0v-2.25a3.375 3.375 0 013.375-3.375h1.5A1.125 1.125 0 0015 9.75V7.5a3.375 3.375 0 00-3.375-3.375H8.25"
            />
          </svg>
          <p className="text-lg font-medium mb-1">Nothing to see here yet!</p>
          <p className="text-sm text-muted-foreground">
            No items are available. Add some from your dashboard to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-8 gap-x-6 gap-y-8">
          {items.map((item, i) => (
            <ClientWrapper
              key={i}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
