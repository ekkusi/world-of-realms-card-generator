import storageClient from "@/lib/storageClient";

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const file = formData.get("file") as File | null;
		if (!file) {
			return Response.json({ error: "No files received." }, { status: 400 });
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const filename = file.name.replaceAll(" ", "_");
		console.log("Uploading file to Azure Blob Storage", filename);

		const upload = await storageClient.uploadBlockBlob(filename, buffer, buffer.byteLength);
		console.log("Uploaded file to Azure Blob Storage", upload);
		const uploadUrl = upload.blockBlobClient.url;

		return Response.json({
			url: uploadUrl,
		});
	} catch (error) {
		console.error(error);

		return Response.json({ error: (error as Error).message }, { status: 400 });
	}
}
