export type SubmenuItem = {
    label: string;
    href: string;
};

export type NavigationRoute = {
    label: string;
    href: string;
    hasDropdown?: boolean;
    submenu?: readonly SubmenuItem[];
};
