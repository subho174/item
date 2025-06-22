import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-8 bg-muted text-center">
        <h1 className="text-3xl font-bold">Welcome to the Item Portal</h1>
        <p className="text-gray-500">Select an action to get started</p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/add-items">Add Item</Link>
          </Button>
          <Button variant="custom" asChild>
            <Link href="/view-items">View Item</Link>
          </Button>
        </div>
    </div>
  );
}
