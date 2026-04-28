import almondSticks from "@/assets/products/almond-sticks.jpeg";
import blueberryYogurt from "@/assets/products/blueberry-yogurt.jpeg";
import burntButterStyle from "@/assets/products/burnt-butter-style-jaggery.jpeg";
import burntButterJaggery from "@/assets/products/burnt-butter-jaggery.jpeg";
import mumbaiSpice from "@/assets/products/mumbai-spice-brew.jpeg";
import nutellaStuffed from "@/assets/products/nutella-stuffed-chocochip.jpeg";
import nutellaChocochip from "@/assets/products/nutella-chocochip.jpeg";
import oatsNutsNibbles from "@/assets/products/oats-nuts-nibbles.jpeg";
import pistachioLime from "@/assets/products/pistachio-lime-loaf.jpeg";
import pistachioSticks from "@/assets/products/pistachio-sticks.jpeg";
import ragiNibbles from "@/assets/products/ragi-nibbles.jpeg";
import roseSaffron from "@/assets/products/rose-saffron-loaf.jpeg";

export type Product = {
  id: string;
  name: string;
  tagline: string; // filmy hook
  description: string;
  category: string;
  price: number;
  badge?: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "nutella-stuffed",
    name: "Nutella Stuffed Chocochip",
    tagline: "Ek bite, aur dil garden garden.",
    description:
      "Molten Nutella hides inside a jaggery-kissed chocochip cookie. Crisp edges, gooey heart — the kind of bite that makes you close your eyes mid-conversation.",
    category: "Cookies",
    price: 350,
    badge: "Bestseller",
    image: nutellaStuffed,
  },
  {
    id: "nutella-chocochip",
    name: "Nutella Chocochip Cookies",
    tagline: "Picture abhi baaki hai, mere dost.",
    description:
      "Classic chocochip with a Nutella swirl baked through. Pair with chai, milk, or your favourite weekend binge — guaranteed encore.",
    category: "Cookies",
    price: 320,
    image: nutellaChocochip,
  },
  {
    id: "burnt-butter-jaggery",
    name: "Burnt Butter Jaggery Cookies",
    tagline: "Pyaar dosti hai… aur yeh cookie uska saboot.",
    description:
      "Slow-browned butter meets organic jaggery for a deep caramel soul. Crackly tops, soft centres, and a finish that lingers like a good monsoon evening.",
    category: "Cookies",
    price: 300,
    badge: "Bestseller",
    image: burntButterJaggery,
  },
  {
    id: "burnt-butter-style",
    name: "Burnt Butter Style Jaggery",
    tagline: "Chai ke saath, kuch toh baat hai.",
    description:
      "A bigger, bolder cousin of our jaggery classic. Buttery, toasty, and dunk-ready — built for long conversations and longer chai sessions.",
    category: "Cookies",
    price: 320,
    image: burntButterStyle,
  },
  {
    id: "mumbai-spice",
    name: "Mumbai Spice Brew Cookie",
    tagline: "Mumbai meri jaan — ab cookie mein.",
    description:
      "Cutting-chai inspired: cardamom, ginger, fennel and a kick of instant coffee, all wrapped in jaggery. Local-train energy in every bite.",
    category: "Cookies",
    price: 360,
    badge: "Limited",
    image: mumbaiSpice,
  },
  {
    id: "blueberry-yogurt",
    name: "Blueberry Yogurt Cookies",
    tagline: "Kuch kuch hota hai… har bite mein.",
    description:
      "Tangy yogurt softness studded with juicy blueberries. Light, fruity, and just the right kind of indulgence for a sunny afternoon.",
    category: "Cookies",
    price: 340,
    badge: "Fresh Today",
    image: blueberryYogurt,
  },
  {
    id: "pistachio-sticks",
    name: "Pistachio Sticks",
    tagline: "Dilwale Pistachios Le Jayenge.",
    description:
      "Crisp whole-wheat shortbread fingers crowned with hand-crushed Iranian pistachios. Buttery, nutty, and dangerously snackable.",
    category: "Bites",
    price: 380,
    image: pistachioSticks,
  },
  {
    id: "almond-sticks",
    name: "Almond Sticks",
    tagline: "Yeh dosti, hum nahin todenge.",
    description:
      "Slow-baked almond batons with a delicate jaggery crunch. The kind of biscuit that pairs equally well with coffee, conversation, or solitude.",
    category: "Bites",
    price: 360,
    image: almondSticks,
  },
  {
    id: "oats-nuts-nibbles",
    name: "Oats & Nuts Nibbles",
    tagline: "Bade bade snacks mein, aise chote chote bites hote rehte hain.",
    description:
      "Wholesome oats, toasted nuts, and a whisper of jaggery rolled into bite-sized nibbles. Guilt-free fuel for every mid-day plot twist.",
    category: "Bites",
    price: 330,
    image: oatsNutsNibbles,
  },
  {
    id: "ragi-nibbles",
    name: "Ragi Cocoa Nibbles",
    tagline: "Don ko pakadna mushkil hi nahin… in nibbles ko bhi.",
    description:
      "Earthy ragi meets dark cocoa in a tender, jaggery-sweetened cookie. Rich, rustic, and quietly addictive — your healthier chocolate fix.",
    category: "Bites",
    price: 320,
    badge: "Wholesome",
    image: ragiNibbles,
  },
  {
    id: "pistachio-lime-loaf",
    name: "Pistachio & Lime Loaf Cake",
    tagline: "Mogambo khush hua.",
    description:
      "A zesty lime-glazed loaf folded with toasted pistachios. Bright, buttery, and unforgettable — the showstopper of your tea table.",
    category: "Loaves",
    price: 450,
    badge: "Signature",
    image: pistachioLime,
  },
  {
    id: "rose-saffron-loaf",
    name: "Rose & Saffron Celebration Loaf",
    tagline: "Kabhi Khushi Kabhie… Cake.",
    description:
      "Kashmiri saffron and edible rose petals baked into a soft, festive loaf. Made for birthdays, anniversaries, and ordinary days that deserve more.",
    category: "Loaves",
    price: 520,
    badge: "Celebration",
    image: roseSaffron,
  },
];
