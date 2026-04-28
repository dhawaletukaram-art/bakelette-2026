import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";

type Props = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function QuickViewDialog({ product, open, onOpenChange }: Props) {
  if (!product) return null;
  const waMsg = encodeURIComponent(`Hi Bakelette! I'd like to order: ${product.name} (₹${product.price})`);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {product.badge && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0 shadow-lg">
                {product.badge}
              </Badge>
            )}
          </div>
          <div className="p-7 md:p-9 flex flex-col">
            <p className="text-xs uppercase tracking-[0.25em] text-primary/80 font-semibold">
              {product.category}
            </p>
            <DialogTitle className="mt-2 font-serif text-3xl md:text-4xl leading-tight text-foreground">
              {product.name}
            </DialogTitle>
            <p className="mt-3 italic text-primary text-lg font-serif">
              "{product.tagline}"
            </p>
            <DialogDescription className="mt-4 text-base leading-relaxed text-muted-foreground">
              {product.description}
            </DialogDescription>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
              <span className="text-sm text-muted-foreground">/ box</span>
            </div>

            <div className="mt-auto pt-7 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a
                  href={`https://wa.me/919920144632?text=${waMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    import("@/lib/track").then(({ trackCta }) =>
                      trackCta("whatsapp_quickview", { product: product.name, price: product.price })
                    );
                  }}
                >
                  Order on WhatsApp
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-primary/30 text-foreground hover:bg-primary/5"
                onClick={() => onOpenChange(false)}
              >
                Keep Browsing
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
