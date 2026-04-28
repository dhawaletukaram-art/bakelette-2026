import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products, type Product } from "@/data/products";
import { QuickViewDialog } from "@/components/QuickViewDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Wheat, Droplets, Leaf, MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-bakery.jpg";
import logo from "@/assets/bakelette-logo.png";
import giftHamper from "@/assets/gift-hamper.jpg";
import { Instagram, Phone, Mail, MapPin, Heart, Sparkles, Gift, Cookie, Cake, Package } from "lucide-react";
import { trackCta } from "@/lib/track";
import { useTilt } from "@/hooks/use-tilt";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { WhatsAppFab } from "@/components/WhatsAppFab";

const REELS = [
  "https://www.instagram.com/reel/DXTQnJOE4pT/",
  "https://www.instagram.com/reel/DXlTUiniLsq/",
  "https://www.instagram.com/reel/DXdjWFHioAS/",
  "https://www.instagram.com/reel/DXYZhN6jVNJ/",
  "https://www.instagram.com/reel/DXBQen2jMTU/",
  "https://www.instagram.com/reel/DW6FI4Tk0g9/",
];

const PHONE_PRIMARY = "919920144632";
const PHONE_SECONDARY = "919892361998";
const WA_URL = `https://wa.me/${PHONE_PRIMARY}?text=Hi%20Bakelette!%20I%27d%20like%20to%20place%20an%20order.`;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Bakelette — Wholesome Bakes, Crafted with Love" },
      {
        name: "description",
        content:
          "Artisan cookies, loaves and bites baked with whole wheat, organic jaggery and wood-pressed oil. Order fresh on WhatsApp.",
      },
    ],
  }),
});

function Index() {
  const [active, setActive] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const hamperTilt = useTilt<HTMLDivElement>(10);
  const openQuick = (p: Product) => {
    setActive(p);
    setOpen(true);
  };

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <a href="#" className="flex items-center" aria-label="Bakelette home">
            <img
              src={logo}
              alt="Bakelette"
              className="h-8 sm:h-9 md:h-10 w-auto select-none"
            />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/90">
            <a href="#products" className="hover:text-white">Bakes</a>
            <a href="#story" className="hover:text-white">Our Story</a>
            <a href="#order" className="hover:text-white">Order</a>
          </nav>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
          >
            <a href="#products" onClick={() => trackCta("order_now_nav")}>Order Now</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center">
        <img
          src={heroImg}
          alt="Bakelette artisanal bakery spread"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
        <div className="relative mx-auto max-w-7xl px-6 py-32 w-full">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200/90">
              Artisan Bakery · Est. 2024
            </p>
            <h1 className="mt-5 font-serif text-5xl md:text-7xl leading-[1.05] text-white">
              Wholesome Bakes,{" "}
              <span className="italic text-amber-300">Crafted with Love.</span>
            </h1>
            <p className="mt-6 text-lg text-white/85 max-w-xl">
              Cookies, loaves and bites — made fresh with whole wheat atta, organic jaggery,
              and wood-pressed oil. No refined sugar. No shortcuts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-7"
              >
                <a href="#products">Shop Fresh Bakes</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-7 bg-white/10 backdrop-blur border-white/40 text-white hover:bg-white/20 hover:text-white"
              >
                <a href="#order">Order a Hamper</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-24 bg-navy text-navy-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              Our Promise
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-navy-foreground">
              Ingredients That Tell a Story
            </h2>
            <p className="mt-4 text-navy-foreground/75">
              Every Bakelette bake starts with honest, traceable ingredients — sourced from small
              farms and stone mills.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Wheat,
                title: "Whole Wheat Atta",
                body: "Stone-ground from heritage grains — never refined, always nourishing.",
              },
              {
                icon: Droplets,
                title: "Wood-Pressed Oil",
                body: "Cold-pressed from traditional ghani, full of natural flavour and goodness.",
              },
              {
                icon: Leaf,
                title: "Organic Jaggery",
                body: "Unrefined cane jaggery from small-batch farms — caramel depth, zero refined sugar.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl bg-white/5 backdrop-blur p-7 border border-white/10 hover:bg-white/10 transition"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/20 text-primary grid place-items-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-navy-foreground">{title}</h3>
                <p className="mt-2 text-navy-foreground/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORIES */}
      <section className="relative py-24 bg-grain">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              Browse by
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Categories</h2>
            <p className="mt-3 text-muted-foreground">
              From crunchy bites to celebration hampers — pick your craving.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
            {(() => {
              const byCat = (cat: string) => products.filter((p) => p.category === cat);
              const cards = [
                {
                  icon: Cookie,
                  title: "Cookies",
                  note: "Crunchy, chewy & stuffed — jaggery sweetened",
                  tint: "from-amber-200/50 to-orange-300/30",
                  items: byCat("Cookies"),
                  href: "#products",
                },
                {
                  icon: Sparkles,
                  title: "Bites",
                  note: "Snack-sized sticks & nibbles for every craving",
                  tint: "from-rose-200/50 to-pink-300/30",
                  items: byCat("Bites"),
                  href: "#products",
                },
                {
                  icon: Cake,
                  title: "Loaves",
                  note: "Celebration cakes: pistachio-lime & rose-saffron",
                  tint: "from-emerald-200/50 to-teal-300/30",
                  items: byCat("Loaves"),
                  href: "#products",
                },
                {
                  icon: Gift,
                  title: "Gift Hampers",
                  note: "Custom curated boxes — perfect for festivals",
                  tint: "from-fuchsia-200/50 to-violet-300/30",
                  items: products.slice(0, 3),
                  href: WA_URL,
                  external: true,
                  customLabel: "Custom",
                },
              ];
              return cards.map(({ icon: Icon, title, note, tint, items, href, external, customLabel }) => (
                <a
                  key={title}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={`card-3d group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br ${tint} bg-card p-6 block`}
                >
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-background/85 backdrop-blur grid place-items-center text-primary shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-background/80 backdrop-blur text-foreground/70 border border-border/40">
                      {customLabel ?? `${items.length} ${items.length === 1 ? "option" : "options"}`}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-foreground">{title}</h3>
                  <p className="mt-1.5 text-sm text-foreground/70 line-clamp-2">{note}</p>

                  <div className="mt-5 flex -space-x-3">
                    {items.slice(0, 4).map((p) => (
                      <img
                        key={p.id}
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-11 w-11 rounded-full object-cover border-2 border-background shadow-sm"
                      />
                    ))}
                    {items.length > 4 && (
                      <span className="h-11 w-11 rounded-full grid place-items-center bg-background/90 border-2 border-background text-[11px] font-semibold text-foreground/70">
                        +{items.length - 4}
                      </span>
                    )}
                  </div>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    {external ? "Build your hamper" : "Explore"}{" "}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                Our Collection
              </p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">Signature Bakes</h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                Each bake is handcrafted with whole wheat, jaggery, and wood-pressed oil.
                Tap any product for the full filmy story.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="text-xs px-3 py-1 rounded-full border border-primary/20 text-primary bg-primary/5"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {products.map((p) => (
              <article
                key={p.id}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {p.badge && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0 shadow">
                      {p.badge}
                    </Badge>
                  )}
                  <button
                    onClick={() => openQuick(p)}
                    className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-foreground/90 backdrop-blur text-background py-3 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    Quick View
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {p.category}
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-foreground">{p.name}</h3>
                  <p className="mt-1 text-sm italic text-primary line-clamp-1">
                    "{p.tagline}"
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-semibold text-lg">₹{p.price}</span>
                    <button
                      onClick={() => openQuick(p)}
                      className="text-sm text-primary font-medium hover:underline"
                    >
                      View details →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER STRIP */}
      <section id="order" className="py-20 bg-navy text-navy-foreground">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl">
            Baked Fresh. Delivered with Love.
          </h2>
          <p className="mt-4 text-navy-foreground/80 max-w-2xl mx-auto">
            We bake to order — message us on WhatsApp, confirm with a 25% advance, and
            your box is in the oven within hours.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
          >
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackCta("whatsapp_order_strip")}
              className="inline-flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Order on WhatsApp
            </a>
          </Button>
        </div>
      </section>

      {/* PREMIUM GIFTING */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative perspective-1000">
            <div
              ref={hamperTilt}
              className="rounded-3xl overflow-hidden shadow-2xl border border-border/40 transition-transform duration-300 will-change-transform"
            >
              <img
                src={giftHamper}
                alt="Bakelette premium gift hamper with assorted cookies, brownies and loaves"
                loading="lazy"
                width={1280}
                height={960}
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 glass rounded-2xl px-5 py-3 shadow-xl animate-float">
              <p className="text-xs uppercase tracking-widest text-foreground/60">Starting at</p>
              <p className="font-serif text-2xl text-foreground">₹999</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Premium Gifting</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
              Baked with Love,<br/><span className="italic text-gradient-warm">Wrapped with Care</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-lg">
              Our signature gift hampers are perfect for festivals, celebrations, and corporate gifting.
              Each hamper is thoughtfully curated with our bestsellers and seasonal specials, packaged in
              premium eco-friendly boxes with handwritten notes.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Custom assortment — pick your favourites",
                "Premium eco-packaging with ribbons",
                "Personalised handwritten note included",
                "Corporate bulk orders welcome",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-foreground/80">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 rounded-full px-7 bg-primary text-primary-foreground hover:bg-primary/90">
              <a
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackCta("customise_hamper")}
              >
                Customise Hamper
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-secondary/40 bg-grain">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">How It Works</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Order in 4 Simple Steps</h2>
            <p className="mt-3 text-muted-foreground">
              We bake everything fresh to order. A 25% advance confirms your slot — the rest on delivery.
            </p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
            {[
              { n: "1", t: "Message Us", d: "Drop a WhatsApp message with your order" },
              { n: "2", t: "25% Advance", d: "Confirm with a small advance payment" },
              { n: "3", t: "We Bake Fresh", d: "Your order is baked to order, never stale" },
              { n: "4", t: "Delivered to You", d: "Same-city delivery within 24-48 hours" },
            ].map((s) => (
              <div key={s.n} className="card-3d relative rounded-3xl bg-card border border-border/50 p-7 shadow-sm">
                <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center font-serif text-xl shadow-md">
                  {s.n}
                </div>
                <h3 className="mt-5 font-serif text-2xl">{s.t}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-foreground/70">
            💡 Note: 25% advance is required to confirm all orders.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Love Letters</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">What Our Bake-Lovers Say</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
            {[
              { q: "The Nutella cookies are absolutely divine! My kids can't get enough. Love that it's made with jaggery — guilt-free indulgence!", n: "Priya M.", p: "Nutella Stuffed Chocochip" },
              { q: "Ordered the gift hamper for Diwali. The packaging was gorgeous and every item tasted homemade in the best way. Will order again!", n: "Arjun S.", p: "Gift Hamper" },
              { q: "The Pistachio Lime Loaf is unlike anything I've tasted. So fresh, so flavourful. Bakelette has set a new standard for me.", n: "Meera K.", p: "Pistachio Lime Loaf" },
              { q: "Finally a bakery that uses real ingredients. The banana walnut loaf had actual walnuts! Refreshingly honest baking.", n: "Rohit D.", p: "Banana Walnut Loaf" },
            ].map((r) => (
              <figure key={r.n} className="card-3d rounded-3xl border border-border/50 bg-card p-6 shadow-sm flex flex-col">
                <Heart className="h-5 w-5 text-primary fill-primary/30" />
                <blockquote className="mt-4 text-foreground/80 text-sm leading-relaxed flex-1">"{r.q}"</blockquote>
                <figcaption className="mt-5 pt-4 border-t border-border/50">
                  <p className="font-serif text-lg">{r.n}</p>
                  <p className="text-xs text-primary mt-0.5">{r.p}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM — Follow the Crumbs */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <a
              href="https://www.instagram.com/bakelette.official/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold"
            >
              <Instagram className="h-5 w-5" />
              @bakelette.official
            </a>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Follow the Crumbs</h2>
            <p className="mt-3 text-muted-foreground">
              Behind-the-oven moments, fresh drops and weekly bakes — straight from our kitchen.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 items-start justify-items-center">
            {REELS.map((url) => (
              <InstagramEmbed key={url} url={url} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="rounded-full">
              <a href="https://www.instagram.com/bakelette.official/" target="_blank" rel="noreferrer" onClick={() => trackCta("instagram_follow", { from: "section" })} className="inline-flex items-center gap-2">
                <Instagram className="h-4 w-4" /> Follow on Instagram
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-12">
          <div>
            <div className="inline-flex items-center justify-center rounded-2xl bg-white/95 px-4 py-3 shadow-lg shadow-black/20">
              <img src={logo} alt="Bakelette" className="h-10 w-auto" />
            </div>
            <p className="mt-4 text-navy-foreground/70 text-sm leading-relaxed max-w-sm">
              Wholesome, handcrafted bakes made with love using whole wheat, jaggery, and wood-pressed oil.
              Because what you eat should nourish your soul.
            </p>
            <a
              href="https://www.instagram.com/bakelette.official/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-navy-foreground/80 hover:text-primary transition"
            >
              <Instagram className="h-4 w-4" /> @bakelette.official
            </a>
          </div>
          <div>
            <p className="font-serif text-xl text-navy-foreground">Quick Links</p>
            <ul className="mt-5 space-y-2 text-sm text-navy-foreground/70">
              <li><a href="#products" className="hover:text-primary transition">Our Bakes</a></li>
              <li><a href="#products" className="hover:text-primary transition">Categories</a></li>
              <li><a href={WA_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition">Gift Hampers</a></li>
              <li><a href="#order" className="hover:text-primary transition">Reviews</a></li>
            </ul>
          </div>
          <div>
            <p className="font-serif text-xl text-navy-foreground">Get in Touch</p>
            <ul className="mt-5 space-y-3 text-sm text-navy-foreground/70">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                Available for delivery across major cities
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:hello@bakelette.in" className="hover:text-primary transition">hello@bakelette.in</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href={`tel:+${PHONE_PRIMARY}`} className="hover:text-primary transition">+91 99201 44632</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href={`tel:+${PHONE_SECONDARY}`} className="hover:text-primary transition">+91 98923 61998</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy-foreground/60">
            <p>© {new Date().getFullYear()} Bakelette. All rights reserved. Baked with Bakelette.</p>
            <p>Designed by Digital Coyotes</p>
          </div>
        </div>
      </footer>

      <QuickViewDialog product={active} open={open} onOpenChange={setOpen} />
      <WhatsAppFab />
    </div>
  );
}
