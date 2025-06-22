"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";

export default function ItemModal({ item }) {
  const [isLoading, setIsLoading] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = item.coverImage
    ? [item.coverImage, ...(item.additionalImages || [])]
    : item.additionalImages || [];

  const sendEnquiry = async (item) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/enquire", item);
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{item.name}</h2>
      <p className="text-muted-foreground">{item.description}</p>

      {images.length > 0 && (
        <div className="embla overflow-hidden rounded-md" ref={emblaRef}>
          <div className="embla__container flex">
            {images.map((img, idx) => (
              <div className="embla__slide min-w-full" key={idx}>
                <img
                  src={img}
                  alt={`Image ${idx + 1}`}
                  className="w-full h-72 object-cover rounded-md"
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/400x300?text=No+Image")
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`w-3 h-3 rounded-full ${
                selectedIndex === idx ? "bg-primary" : "bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      )}

      <div className="border-t pt-4 space-y-2 flex justify-end ">
        <Button onClick={() => sendEnquiry(item)} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Sending...
            </>
          ) : (
            "Send Enquiry"
          )}
        </Button>
      </div>
    </div>
  );
}
