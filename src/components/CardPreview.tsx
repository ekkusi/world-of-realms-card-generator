import React from 'react'
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardType } from '@prisma/client';

export type CardPreviewProps = TailWindProps & Partial<Card> & {
  bgImgUrl?: string;
}

export default function CardPreview(props: CardPreviewProps) {
  const { className, ...card } = props;
  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {card.bgImgUrl ?
        <>
          <div className="relative z-10">
            <Image src={card.bgImgUrl} width={400} height={600} alt="Background" />
          </div>
          {card.imageUrl && <div className="absolute top-0 left-0 z-0">
            <Image src={card.imageUrl} width={400} height={600} alt="Card" />
          </div>}
          {card.name && <span className="absolute z-20 top-[7%] left-[27%] w-[45%] text-center text-black text-xl">{card.name.toUpperCase()}</span>}
          {card.cardType && <span className="absolute z-20 top-[66.5%] left-[27%] w-[45%] text-center text-black text-xl">{card.cardType.toUpperCase()}</span>}
          {card.description && <p className="absolute z-20 top-[74%] left-[13%] w-[74%] text-black text-sm">{card.description}</p>}
          <div className="absolute z-20 top-[4%] left-[6%] max-w-[20%] text-white">
            <Image src="/cards/damage_icon.png" width={80} height={80} alt="Damage" />
            {!Number.isNaN(card.damage) && <span className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{card.damage}</span>}
            <span className="text-md absolute bottom-[14%] w-full text-center text-white">DAMAGE</span>
          </div>
          <div className="absolute z-20 top-[4%] right-[6%] max-w-[20%] text-white">
            <Image src="/cards/health_icon.png" width={80} height={80} alt="Health" />
            {!Number.isNaN(card.health) && <span className="text-3xl absolute top-1/2 left-1/2 -translate-x-[65%] -translate-y-1/2">{card.health}</span>}
            <span className="text-md absolute bottom-[14%] w-full text-center">HEALTH</span>
          </div>
          <div className="absolute z-20 bottom-[30%] left-[6%] max-w-[20%] text-white">
            <Image src="/cards/influence_icon.png" width={80} height={80} alt="Influence" />
            {!Number.isNaN(card.influence) && <span className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{card.influence}</span>}
            <span className="text-xs absolute bottom-[10%] w-full text-center">INFLUENCE</span>
          </div>
          <div className="absolute z-20 bottom-[30%] right-[6%] max-w-[20%] text-white">
            <Image src={card.cardType === CardType.ENTITY ? "/cards/summon_icon.png" : "/cards/energy_icon.png"} width={80} height={80} alt="Cost" />
            {!Number.isNaN(card.cost) && <span className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{card.cost}</span>}
            <span className="text-sm absolute bottom-[10%] w-full text-center">{card.cardType === CardType.ENTITY ? "SUMMON" : "COST"}</span>
          </div>
        </>
        : <div className="bg-gray-700 w-[400px] h-[600px] rounded-lg" />}
    </div>
  )
}
