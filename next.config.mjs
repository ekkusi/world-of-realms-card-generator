/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["ekkusiteststorage.blob.core.windows.net"],
  }
};

export default nextConfig;
