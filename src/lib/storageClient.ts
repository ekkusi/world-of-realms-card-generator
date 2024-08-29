import { DefaultAzureCredential } from "@azure/identity";
import { ContainerClient } from "@azure/storage-blob";

const credential = new DefaultAzureCredential();
const storageAccount = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const containerName = process.env.AZURE_CONTAINER_NAME;
const containerClient = new ContainerClient(
  `https://${storageAccount}.blob.core.windows.net/${containerName}`,
  credential
);

export default containerClient;
