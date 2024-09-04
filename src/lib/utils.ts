import { CardType, Faction } from "@prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFactionBgUrl(faction: Faction) {
  switch (faction) {
    case Faction.NEUTRAL:
      return "/cards/neutral_bg.png";
    case Faction.TIME:
      return "/cards/time_bg.png";
    case Faction.NATURE:
      return "/cards/nature_bg.png";
    default:
      throw Error("Invalid faction");
  }
}

export function getFactionCostIconUrl(faction: Faction) {
  switch (faction) {
    case Faction.NEUTRAL:
      return "/cards/time_cost_icon.png";
    case Faction.TIME:
      return "/cards/time_cost_icon.png";
    case Faction.NATURE:
      return "/cards/nature_cost_icon.png";
    default:
      throw Error("Invalid faction");
  }
}

export function getFactionLabel(faction: Faction) {
  switch (faction) {
    case Faction.NEUTRAL:
      return "Neutral";
    case Faction.TIME:
      return "Time";
    case Faction.NATURE:
      return "Nature";
    default:
      throw Error("Invalid faction");
  }
}

export function getCardTypeLabel(cardType: CardType) {
  switch (cardType) {
    case CardType.ENTITY:
      return "Entity";
    case CardType.SPELL:
      return "Spell";
    default:
      throw Error("Invalid card type");
  }
}
