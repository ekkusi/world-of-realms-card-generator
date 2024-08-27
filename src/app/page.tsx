import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import CardPreview, { CardPreviewProps } from "@/components/CardPreview";
import { getFactionBgUrl } from "@/lib/utils";

export const dynamic = "force-dynamic"

const prisma = new PrismaClient();

export default async function Home() {
  const cards = await prisma.card.findMany();
  const mappedCards: CardPreviewProps[] = cards.map((card) => ({
    ...card,
    bgImgUrl: card.cardType === "SPELL" ? "/cards/spell_layout.png" : getFactionBgUrl(card.faction!), // Should be a safe cast after card type check
  }))
  return (
    <main className="px-12 pt-2">
      <h1 className="text-lg text-center mb-6">Master of Realms</h1>
      <div className="flex justify-between max-w-[1200px] mx-auto mb-12">

        <h2>Cards</h2>
        <Link className={buttonVariants({ size: "lg" })} href="/create">Create new card</Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {mappedCards.map((card) => (
          <CardPreview key={card.id} {...card} />
        ))}
      </div>
    </main>
  );
}
