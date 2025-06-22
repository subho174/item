import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const loading = () => {
  return (
    <div className="p-6 md:px-10 2xl:px-20">
      <div className="flex justify-between">
        <p className="text-3xl font-semibold mb-4 ">Your items</p>
        <Button asChild>
          <Link href="/add-items">Add Items</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-8 gap-x-6 gap-y-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-0 shadow-sm">
            <Skeleton className="h-48 w-full rounded-t-md" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default loading;
