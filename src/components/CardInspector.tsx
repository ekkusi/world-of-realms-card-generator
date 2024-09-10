"use client";

import { Card } from "@prisma/client";
import CardPreview from "./CardPreview";

type CardInspectorProps = {
    card: Card,
    onChange: (changeNumber: number | undefined) => void;
}

export default function CardInspector({ card, onChange } : CardInspectorProps) {
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={() => onChange(undefined)}>
            <div
                className="absolute left-5 text-white text-4xl cursor-pointer select-none"
                onClick={(e) => {
                    e.stopPropagation();
                    onChange(-1)
                }
                }
            >
                &#8592;
            </div>

            {/* Centered Box */}
            <div
                className="shadow-lg flex h-1/2 w-auto max-w-screen-sm items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <CardPreview {...card} />
            </div>

            <div
                className="absolute right-5 text-white text-4xl cursor-pointer select-none"
                onClick={(e) => {
                    e.stopPropagation();
                    onChange(1)
                }}
            >
                &#8594;
            </div>
        </div>
    )
}