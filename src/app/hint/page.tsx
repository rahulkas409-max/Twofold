import type { Metadata } from "next";
import { HintView } from "@/components/SharedViews";

export const metadata: Metadata = { title: "A little gift hint 👀", description: "Someone made a wishlist of gifts they'd love." };

export default function Page() {
  return <HintView />;
}
