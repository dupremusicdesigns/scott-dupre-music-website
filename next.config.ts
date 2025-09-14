import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https'
                , hostname: '*.strapiapp.com'
                , port: ''
                , pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
