import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export'
    , images: {
        unoptimized: true
        , remotePatterns: [
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
