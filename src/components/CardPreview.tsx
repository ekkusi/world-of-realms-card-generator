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
    <div className={cn("relative overflow-hidden rounded-lg max-w-[400px]", className)}>
      {card.bgImgUrl ?
        <>
          <div className="relative z-10">
            <Image src={card.bgImgUrl} width={400} height={600} alt="Background" />
          </div>
          {card.imageUrl && <div className="absolute top-0 left-0 z-0">
            <Image src={card.imageUrl} width={400} height={600} alt="Card" />
          </div>}
          {card.name && <span className="absolute z-20 top-[6.3%] left-[27%] w-[45%] text-center text-black text-xl font-amatic-sc">{card.name}</span>}
          {card.cardType && <span className="absolute z-20 top-[66%] left-[27%] w-[45%] text-center text-black text-xl font-amatic-sc">{card.cardType}</span>}
          {card.description && <p className="absolute z-20 top-[74%] left-[13%] w-[74%] text-black text-xs font-comic-neue">{card.description}</p>}
          <div className="absolute z-20 top-[4%] left-[6%] max-w-[20%] text-white">
            <Image src="/cards/damage_icon.png" width={80} height={80} alt="Damage" />
            {!Number.isNaN(card.damage) && <span className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] font-kalam text-outline text-stroke-light">{card.damage}</span>}
            <span className="text-sm absolute bottom-[16%] w-full text-center text-white font-amatic-sc text-outline text-stroke">DAMAGE</span>
          </div>
          <div className="absolute z-20 top-[4%] right-[6%] max-w-[20%] text-white">
            <Image src="/cards/health_icon.png" width={90} height={90} alt="Health" className="translate-x-[4%] -translate-y-[4%]" />
            {!Number.isNaN(card.health) && <span className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] font-kalam text-outline text-stroke-light">{card.health}</span>}
            <span className="text-sm absolute bottom-[16%] w-full text-center font-amatic-sc text-outline text-stroke">HEALTH</span>
          </div>
          <div className="absolute z-20 bottom-[29%] left-[6%] max-w-[20%] text-white">
            <Image src="/cards/influence_icon.png" width={80} height={80} alt="Influence" className="translate-x-[3%] translate-y-[1%]" />
            {!Number.isNaN(card.influence) && <span className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] font-kalam text-outline text-stroke-light">{card.influence}</span>}
            <span className="text-sm absolute bottom-[4%] w-full text-center font-amatic-sc text-outline text-stroke">INFLUENCE</span>
          </div>
          <div className="absolute z-20 bottom-[29%] right-[6%] max-w-[20%] text-white">
            <Image src={card.cardType === CardType.ENTITY ? "/cards/summon_icon.png" : "/cards/energy_icon.png"} width={80} height={80} alt="Cost" className="translate-x-[3%]" />
            {!Number.isNaN(card.cost) && <span className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] font-kalam text-outline text-stroke-light">{card.cost}</span>}
            <span className="text-sm absolute bottom-[4%] w-full text-center font-amatic-sc text-outline text-stroke">{card.cardType === CardType.ENTITY ? "SUMMON" : "COST"}</span>
          </div>
        </>
        : <div className="bg-gray-700 w-[400px] h-[600px] rounded-lg" />}
    </div>
  )
}
