import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import CardList from "@/components/CardList";

export const dynamic = "force-dynamic"

const prisma = new PrismaClient();

export default async function Home() {
  const cards = await prisma.card.findMany();
  return (
    <main className="px-12 pt-2">
      <h1 className="text-lg text-center mb-6">Master of Realms</h1>
      <div className="flex justify-between max-w-[1200px] mx-auto mb-12">

        <h2>Cards</h2>
        <Link className={buttonVariants({ size: "lg" })} href="/create">Create new card</Link>
      </div>
      <CardList cards={cards} />
    </main>
  );
}
