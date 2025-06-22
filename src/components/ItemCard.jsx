"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ItemModal from "@/src/components/ItemModal";

const ItemCard = ({ item }) => {
  const [selected, setSelected] = useState(null);

  return (
    <Dialog key={item._id}>
      <DialogTrigger asChild>
        <Card
          onClick={() => setSelected(item)}
          className="cursor-pointer overflow-hidden py-0 transition-all duration-500 hover:shadow-lg hover:-translate-y-2 border-1 hover:border-primary"
        >
          <CardContent className="p-0">
            <div className="relative mb-2">
              <img
                src={item.coverImage}
                onError={(e) =>
                  (e.target.src = "https://placehold.co/400x300?text=No+Image")
                }
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-md"
              />
            </div>
            <div className="space-y-1">
              <div className="px-4 py-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-blue-600 font-medium">{item.type}</p>
              </div>
              {item.description && (
                <div className="p-4 bg-gray-100">
                  <p className="text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-6">
        {selected && <ItemModal item={selected} />}
      </DialogContent>
    </Dialog>
  );
};

export default ItemCard;
