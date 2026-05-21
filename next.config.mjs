/** @type {import('next').NextConfig} */
const nextConfig = {
  // The brutalist design intentionally uses '//' as a visual marker inside JSX text.
  // ESLint's react/jsx-no-comment-textnodes rule flags those — we keep them as design.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
