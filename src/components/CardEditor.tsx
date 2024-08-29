"use client";
import React, { useState } from 'react'
import CardPreview from './CardPreview'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { getCardTypeLabel, getFactionBgUrl, getFactionLabel } from '@/lib/utils';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { FormField } from './FormField';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { CardType, Faction } from '@prisma/client';

export type CardEditorProps = {
  onCreated?: () => void;
};

export default function CardEditor({ onCreated }: CardEditorProps) {
  const [cardType, setCardType] = useState<CardType>();
  const [faction, setFaction] = useState<Faction>();
  const [bgImgUrl, setBgImgUrl] = useState<string>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [damage, setDamage] = useState<number>();
  const [health, setHealth] = useState<number>();
  const [influence, setInfluence] = useState<number>();
  const [cost, setCost] = useState<number>();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string>();

  const isValid = !!cardType && !!name && !!description && !!cost && !!image && (cardType === CardType.ENTITY ? !!damage && !!health && !!influence : true);

  const onCardTypeChange = (value: string) => {
    setCardType(value as CardType);
    setBgImgUrl(value === "spell" ? "/cards/spell_layout.png" : undefined);
  }

  const onFactionChange = (value: string) => {
    setFaction(value as Faction);
    setBgImgUrl(getFactionBgUrl(value as Faction));
  }

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
        setImage(file);
      }
      reader.readAsDataURL(file);
    }
  }

  const create = async () => {
    setError(undefined);
    const card = {
      imageUrl,
      cardType,
      faction,
      name,
      description,
      damage,
      health,
      influence,
      cost
    };
    console.log(card);
    setCreating(true);
    const formData = new FormData();
    formData.append("file", image!); // Safe cast since we check for image in isValid
    const uploadResult = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });
    const uploadJson = await uploadResult.json();
    if (!uploadResult.ok || !uploadJson.url) {
      setCreating(false);
      setError(uploadJson.error || "Unknown error occurred in image upload");
      return;
    }
    const result = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify({ ...card, imageUrl: uploadJson.url })
    });
    const json = await result.json();
    setCreating(false);
    console.log(json);
    if (!result.ok) {
      setError(json.error || "Unknown error occurred");
    } else {
      onCreated?.();
    }

  };


  return (
    <div className="w-full grid grid-cols-2 pb-5">
      <div className="flex flex-col border-r border-r-gray-600 pr-3 gap-3">
        <div>
          <span className="block mb-2">Card type</span>
          <Select onValueChange={onCardTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select card type" />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(CardType) as Array<keyof typeof CardType>).map((type) =>
                <SelectItem key={type} value={type}>{getCardTypeLabel(CardType[type])}</SelectItem>
              )}
            </SelectContent>
          </Select>


        </div>
        {cardType && (
          <>
            {cardType === CardType.ENTITY && (
              <div>
                <span className="block mb-2">Faction</span>
                <Select onValueChange={onFactionChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select faction" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(Faction) as Array<keyof typeof Faction>).map((faction) =>
                      <SelectItem key={faction} value={faction}>{getFactionLabel(Faction[faction])}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            <FormField label="Image">
              <Input type="file" accept="image/*" onChange={onImageUpload} />
            </FormField>
            <FormField label="Name">
              <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            </FormField>
            <FormField label="Description">
              <Textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} className="font-comic-neue" />
            </FormField>
            {cardType === CardType.ENTITY && (
              <>
                <FormField label="Damage">
                  <Input type="number" placeholder="0" onChange={(e) => setDamage(parseInt(e.target.value))} />
                </FormField>
                <FormField label="Health">
                  <Input type="number" placeholder="0" onChange={(e) => setHealth(parseInt(e.target.value))} />
                </FormField>
                <FormField label="Influence">
                  <Input type="number" placeholder="0" onChange={(e) => setInfluence(parseInt(e.target.value))} />
                </FormField>
              </>
            )}
            <FormField label="Cost" className="mb-4">
              <Input type="number" placeholder="0" onChange={(e) => setCost(parseInt(e.target.value))} />
            </FormField>
            <Button onClick={create} disabled={creating || !isValid}>
              {creating && <Loader2 className="mr-2 animate-spin" />}
              {creating ? "Creating..." : "Create"}
            </Button>
            {error && <span className="text-red-500">{error}</span>}
          </>
        )}
      </div>
      <div className="flex justify-center items-start pt-20">
        <CardPreview cardType={cardType} bgImgUrl={bgImgUrl} imageUrl={imageUrl} name={name} description={description} damage={damage} health={health} influence={influence} cost={cost} />
      </div>
    </div>
  )
}
