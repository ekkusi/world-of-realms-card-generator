import React from 'react'
import Image from 'next/image';
import { cn, getFactionBgUrl, getFactionCostIconUrl } from '@/lib/utils';
import { Card, CardType } from '@prisma/client';

export type CardPreviewProps = TailWindProps & Partial<Card> & {}

export default function CardPreview(props: CardPreviewProps) {
  const { className, ...card } = props;

  return (
    <div className={cn("overflow-hidden rounded-lg w-[400px] leading-none container-type-inline", className)}>
      {card.faction ?
        <>
          <div className="relative z-10">
            <Image src={getFactionBgUrl(card.faction)} width={400} height={600} alt="Background" />
          </div>
          {card.imageUrl && <div className="absolute top-0 left-0 z-0">
            <Image src={card.imageUrl} width={400} height={600} alt="Card" />
          </div>}
          {card.name && <span className="absolute z-20 top-[7%] left-[27%] w-[45%] text-center text-black text-[6cqw] font-amatic-sc">{card.name}</span>}
          {card.cardType && <span className="absolute z-20 top-[66.8%] left-[27%] w-[45%] text-center text-black text-[6cqw] font-amatic-sc">{card.cardType}</span>}
          {card.description && <p className="absolute z-20 top-[74%] left-[13%] w-[74%] text-black text-[3.5cqw] leading-[1.1] font-comic-neue">{card.description}</p>}
          {card.cardType === CardType.ENTITY && (
            <>
              <div className="absolute z-20 top-[4%] left-[6%] max-w-[20%] text-white">
                <Image src="/cards/damage_icon.png" width={80} height={80} alt="Damage" />
                {!Number.isNaN(card.damage) && <span className="text-[9cqw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] font-kalam text-outline text-stroke-light">{card.damage}</span>}
                <span className="absolute text-[4cqw] bottom-[20%] w-full text-center text-white font-amatic-sc text-outline text-stroke">DAMAGE</span>
              </div>
              <div className="absolute z-20 top-[4%] right-[6%] max-w-[20%] text-white">
                <Image src="/cards/health_icon.png" width={90} height={90} alt="Health" className="translate-x-[4%] -translate-y-[4%]" />
                {!Number.isNaN(card.health) && <span className="text-[9cqw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] font-kalam text-outline text-stroke-light">{card.health}</span>}
                <span className="absolute text-[4cqw] bottom-[20%] w-full text-center font-amatic-sc text-outline text-stroke">HEALTH</span>
              </div>
              <div className="absolute z-20 bottom-[29%] left-[6%] max-w-[20%] text-white">
                <Image src="/cards/influence_icon.png" width={80} height={80} alt="Influence" className="translate-x-[3%] translate-y-[1%]" />
                {!Number.isNaN(card.influence) && <span className="text-[9cqw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] font-kalam text-outline text-stroke-light">{card.influence}</span>}
                <span className="absolute text-[4cqw] bottom-[8%] w-full text-center font-amatic-sc text-outline text-stroke">INFLUENCE</span>
              </div>
            </>
          )}
          {card.cardType && <div className="absolute z-20 bottom-[29%] right-[6%] max-w-[20%] text-white">
            <Image src={card.cardType === CardType.ENTITY ? getFactionCostIconUrl(card.faction) : "/cards/energy_icon.png"} width={80} height={80} alt="Cost" className="translate-x-[3%] translate-y-[2%]" />
            {!Number.isNaN(card.cost) && <span className="text-[9cqw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] font-kalam text-outline text-stroke-light">{card.cost}</span>}
            <span className="absolute text-[4cqw] bottom-[8%] w-full text-center font-amatic-sc text-outline text-stroke">{card.cardType === CardType.ENTITY ? "SUMMON" : "COST"}</span>
          </div>}
        </>
        : <div className="bg-gray-700 w-[400px] h-[600px] rounded-lg" />}
    </div>
  )
}
