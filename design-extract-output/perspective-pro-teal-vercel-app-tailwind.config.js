/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(232, 100%, 97%)',
            '100': 'hsl(232, 100%, 94%)',
            '200': 'hsl(232, 100%, 86%)',
            '300': 'hsl(232, 100%, 76%)',
            '400': 'hsl(232, 100%, 64%)',
            '500': 'hsl(232, 100%, 50%)',
            '600': 'hsl(232, 100%, 40%)',
            '700': 'hsl(232, 100%, 32%)',
            '800': 'hsl(232, 100%, 24%)',
            '900': 'hsl(232, 100%, 16%)',
            '950': 'hsl(232, 100%, 10%)',
            DEFAULT: '#0022ff'
        },
        'neutral-50': '#ffffff',
        'neutral-100': '#000000',
        background: '#ffffff',
        foreground: '#000000'
    },
    fontFamily: {
        body: [
            'Zalando Sans SemiExpanded',
            'sans-serif'
        ]
    },
    fontSize: {
        '11': [
            '11px',
            {
                lineHeight: '16.5px'
            }
        ],
        '12': [
            '12px',
            {
                lineHeight: '18px'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: '24px'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: '36px',
                letterSpacing: '-0.6px'
            }
        ]
    },
    spacing: {
        '1': '2px',
        '16': '32px',
        '20': '40px',
        '28': '56px'
    },
    borderRadius: {
        lg: '16px',
        xl: '24px',
        full: '32px'
    },
    boxShadow: {
        sm: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455677 0.0000200868 / 0.8) 0px 0px 0px 2px, rgba(255, 255, 255, 0.3) 0px 0px 20px 0px',
        xs: 'rgba(255, 255, 255, 0.3) 0px 1px 1px 0px inset, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.6) 0px 32px 64px -16px'
    },
    screens: {
        md: '768px',
        lg: '1024px'
    },
    transitionDuration: {
        '150': '0.15s',
        '200': '0.2s',
        '300': '0.3s',
        '400': '0.4s',
        '500': '0.5s',
        '700': '0.7s',
        '1000': '1s',
        '3000': '3s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0, 0, 0.2, 1)'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '1200px'
    }
},
  },
};
