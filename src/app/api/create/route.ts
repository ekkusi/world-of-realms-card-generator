import { validateCreateCardInput } from "@/lib/validators";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
	const prisma = new PrismaClient();

	const body = await req.json();
	try {
		const validatedInput = validateCreateCardInput(body);
		const card = await prisma.card.create({
			data: {
				...validatedInput,
			}
		});
		return Response.json(card);
	} catch (error) {
		console.error(error);

		return Response.json({ error: (error as Error).message }, { status: 400 });
	}
}
