/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com', 'cdn.discord.com', "uploadthing.com", "utfs.io", "img.clerk.com"],
  },
}

module.exports = nextConfig
