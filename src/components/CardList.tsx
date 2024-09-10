"use client";
import { Card, CardType, Faction } from '@prisma/client';
import React, { useMemo, useRef, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import CardPreview from './CardPreview';
import { Input } from './ui/input';
import { MdClear } from "react-icons/md";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { getCardTypeLabel, getFactionLabel } from '@/lib/utils';
import { FormField } from './FormField';
import debounce from 'lodash.debounce';
import { Button } from './ui/button';
import CardInspector from './CardInspector';

export type CardListProps = {
  cards: Card[];
};

export default function CardList({ cards }: CardListProps) {
  const [cardTypeFilter, setCardTypeFilter] = useState<CardType>();
  const [factionFilter, setFactionFilter] = useState<Faction>();
  const [inspectorCardNumber, setInspectorCardNumber] = useState<number | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const clearFilters = () => {
    setCardTypeFilter(undefined);
    setFactionFilter(undefined);
    setSearch("");
    // We dont set value of input to search because of debounce, so we need to clear it separately
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const debouncedSearch = debounce((value: string) => {
    setSearch(value);
  }, 300);

  const changeCardInspectorNumber = (changeNumber: number | undefined) => {
    if (changeNumber === undefined) {
      setInspectorCardNumber(undefined);
    }
    else if (inspectorCardNumber) {
      const newNumber = inspectorCardNumber + changeNumber;
      if (newNumber >= 0 && newNumber < cards.length) {
        setInspectorCardNumber(newNumber);
      }
    }
  }

  const shownCards = useMemo(() => {
    return cards.filter(card => (!cardTypeFilter || card.cardType === cardTypeFilter) && (!factionFilter || card.faction === factionFilter) && (!search || card.name.toLowerCase().includes(search.toLowerCase())));
  }, [cardTypeFilter, cards, factionFilter, search]);
  return (
    <div>
      <div className="flex mb-5 gap-2">
        <FormField label="Name" labelClassName="mb-0">
          <div className="relative">
            <IoSearchOutline className="absolute top-1/2 left-2 -translate-y-1/2 text-slate-500" />
            <Input ref={inputRef} className="pl-7 min-w-[250px]" placeholder="Search by name" onChange={(e) => debouncedSearch(e.target.value)} />
          </div>
        </FormField>
        <FormField label="Card type" labelClassName="mb-0">
          <Select onValueChange={(value) => setCardTypeFilter(value as CardType)} value={cardTypeFilter || ""}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select card type" />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(CardType) as Array<keyof typeof CardType>).map((type) =>
                <SelectItem key={type} value={type}>{getCardTypeLabel(CardType[type])}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Faction" labelClassName="mb-0">
          <Select onValueChange={(value) => setFactionFilter(value as Faction)} value={factionFilter || ""}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select faction" />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(Faction) as Array<keyof typeof Faction>).map((faction) =>
                <SelectItem key={faction} value={faction}>{getFactionLabel(Faction[faction])}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </FormField>
        {(cardTypeFilter || factionFilter || search.length > 0) && <Button variant="link" onClick={clearFilters} className="self-end -ml-2 hover:no-underline hover:opacity-70"><MdClear className="mr-2" />Clear filters</Button>}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {shownCards.map((card, i) => (
          <CardPreview key={card.id} {...card} className="w-[300px]" cardNumber={i} onClick={(cardNumber) => setInspectorCardNumber(cardNumber)} />
        ))}
      </div>
      {inspectorCardNumber && (
        <CardInspector card={cards[inspectorCardNumber]} onChange={changeCardInspectorNumber}/>
      )}
    </div>
  )
}
