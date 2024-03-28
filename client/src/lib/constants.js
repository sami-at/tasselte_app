export const COLORS = {
    white: 'hsl(0deg, 0%, 100%)',
    black: 'hsl(100% 0% 100%)',
    gray: {
        100: 'hsl(185deg, 5%, 95%)',
        300: 'hsl(190deg, 5%, 80%)',
        500: 'hsl(196deg, 4%, 60%)',
        700: 'hsl(220deg, 5%, 40%)',
        900: 'hsl(220deg, 3%, 20%)',
    },
    primary: 'hsl(35.6deg 100% 64.31%)',
    secondary: 'hsl(240deg, 60%, 63%)',
};

export const WEIGHTS = {
    normal: 400,
    medium: 600,
    bold: 800
};

export const BREAKPOINTS = {
    tabletMin: 550,
    laptopMin: 1100,
    desktopMin: 1500
};

export const QUERIES = {
    tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
    laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
    desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`
}



export const headerData = {
    fr: {
        nav: [
            {
                name: 'home',
                href: '/',
            },
            {
                name: 'Miel',
                href: '/products',
            },
            {
                name: "huile d'olive",
                href: '/oil?category=oil',
            },
            {
                name: 'about us',
                href: '/about-us',
            },
        ]

    },
    ar: {
        nav: [
            {
                name: 'من نحن',
                href: '/about-us',
            },
            {
                name: 'زيت الزيتون',
                href: '/oil?category=oil',
            },
            {
                name: 'العسل الحر',
                href: '/products',
            },
            {
                name: ' الصفحةالرئيسية',
                href: '/',
            }
        ]
    }
}



