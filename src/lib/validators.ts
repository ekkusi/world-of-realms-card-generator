import { CardType, Prisma } from "@prisma/client";


export const validateCreateCardInput = (input: any): Prisma.CardCreateInput => {
  if (!input.name) throw new Error("Param name is missing");
  if (!input.description) throw new Error("Param description is missing");
  if (!input.imageUrl) throw new Error("Param imageUrl is missing");
  if (!input.cardType) throw new Error("Param cardType is missing");
  if (!input.cost) throw new Error("Param cost is missing");

  if (input.cardType === CardType.ENTITY) {
    if (!input.faction) throw new Error("Param faction is missing");
    if (!input.damage) throw new Error("Param damage is missing");
    if (!input.health) throw new Error("Param health is missing");
    if (!input.influence) throw new Error("Param influence is missing");
  }

  return input as Prisma.CardCreateInput;
}
