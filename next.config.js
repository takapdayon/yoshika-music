// https://github.com/vercel/next.js/issues/44062#issuecomment-1445185361
// https://zenn.dev/duo3/articles/dbb8115309059e
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
