import type { NavigationRoute } from '../types/routes';
export const navigationRoutes: readonly NavigationRoute[] = [
    {
        label: 'Home'
        , href: '/'
    }
    , {
        label: 'About'
        , href: '/about'
    }
    , {
        label: 'Music'
        , href: '/marching-band'
        , hasDropdown: true
        , submenu: [
            {
                label: 'Marching Band'
                , href: '/marching-band'
            }
            , {
                label: 'Build Your Own Show'
                , href: '/build-your-own-show'
            }
        ]
    }
    , {
        label: 'Services'
        , href: '/services'
    }
] as const;
