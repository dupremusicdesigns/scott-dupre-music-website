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
        , href: '/music'
        , hasDropdown: true
        , submenu: [
            {
                label: 'Marching Band'
                , href: '/original-compositions'
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
