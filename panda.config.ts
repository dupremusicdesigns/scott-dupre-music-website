import { defineConfig } from '@pandacss/dev';
import { theme } from './src/app/theme/theme';

export default defineConfig( {
    preflight: true
    , include: [ './src/**/*.{js,jsx,ts,tsx}' ]
    , exclude: []
    , theme
    , outdir: 'styled-system'
} );
