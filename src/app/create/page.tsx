"use client";
import CardEditor from "@/components/CardEditor";
import { IoChevronBackOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  return (
    <main className="px-12 pt-2">
      <Link href="/" className="absolute top-3 left-4 flex items-center text-sm opacity-70 hover:opacity-100"><IoChevronBackOutline className="text-xl" /> HOME</Link>
      <h1 className="text-center mb-8 text-lg font-extralight">CREATE NEW CARD</h1>
      <CardEditor onCreated={() => router.push("/")} />
    </main>
  );
}
