"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Eye, Loader2, ShoppingCart, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";

export default function AddItemsPage() {
  const [itemDetails, setitemDetails] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: "",
    additionalImages: [""],
  });

  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    if (itemDetails.description.length > 300) {
      setisLoading(false);
      toast.warning("Description should be less than 300 characters");
      return;
    }

    try {
      const res = await axios.post("/api/items", {
        ...itemDetails,
        additionalImages: itemDetails.additionalImages.filter(
          (url) => url.trim() !== ""
        ),
      });
      toast.success(res.data.message);
      setitemDetails({
        name: "",
        type: "",
        description: "",
        coverImage: "",
        additionalImages: [""],
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    } finally {
      setisLoading(false);
    }
  };

  const handleAddImageField = () => {
    setitemDetails((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, ""],
    }));
  };

  const handleImageUrlChange = (index, value) => {
    const newImages = [...itemDetails.additionalImages];
    newImages[index] = value;
    setitemDetails({ ...itemDetails, additionalImages: newImages });
  };

  const handleRemoveImageField = (index) => {
    const newImages = [...itemDetails.additionalImages];
    newImages.splice(index, 1);
    setitemDetails({ ...itemDetails, additionalImages: newImages });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full my-10 max-w-lg border shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center flex justify-between">
            Add Items
            <Button variant="custom">
              <Link href="/view-items" className="flex gap-2 items-center">
                <Eye /> View items
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                placeholder="e.g. Wooden Chair"
                value={itemDetails.name}
                onChange={(e) =>
                  setitemDetails({ ...itemDetails, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Item Type</Label>
              <Input
                id="type"
                placeholder="e.g. Furniture"
                value={itemDetails.type}
                onChange={(e) =>
                  setitemDetails({ ...itemDetails, type: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Write a short description..."
                className="h-30 overflow-y-auto"
                value={itemDetails.description}
                onChange={(e) =>
                  setitemDetails({
                    ...itemDetails,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                placeholder="https://example.com/image.jpg"
                value={itemDetails.coverImage}
                onChange={(e) =>
                  setitemDetails({ ...itemDetails, coverImage: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Additional Image URLs</Label>
              <div className="space-y-3">
                {itemDetails.additionalImages.map((url, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder={`Image URL ${index + 1}`}
                      value={url}
                      onChange={(e) =>
                        handleImageUrlChange(index, e.target.value)
                      }
                    />
                    {itemDetails.additionalImages.length > 1 && index !== 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveImageField(index)}
                        className="text-destructive hover:bg-red-100"
                        disabled={isLoading}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddImageField}
                className="mt-2"
                disabled={isLoading}
              >
                + Add More Images
              </Button>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  UpLoading...
                </>
              ) : (
                <>
                  Add Item <ShoppingCart />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
