export const socialIcons = [
    {
        name: 'Github',
        iconKey: 'Github',
        color: 'text-cyan-400',
        bgColor: 'hover:bg-cyan-500/20 hover:border-cyan-500/50',
        url: 'https://github.com/Ruusheka',
    },
    {
        name: 'Instagram',
        iconKey: 'Instagram',
        color: 'text-fuchsia-400',
        bgColor: 'hover:bg-fuchsia-500/20 hover:border-fuchsia-500/50',
        url: 'https://www.instagram.com/_itz_ruushe_/'
    },
    {
        name: 'LinkedIn',
        iconKey: 'Linkedin',
        color: 'text-violet-400',
        bgColor: 'hover:bg-violet-500/20 hover:border-violet-500/50',
        url: 'https://www.linkedin.com/in/ruusheka/'
    }
];

export const quickLinks = [
    { name: 'Courses', href: '/courses', iconKey: 'BookOpen' },
    { name: 'About Us', href: '/about', iconKey: 'Users' },
    { name: 'Faculty', href: '/faculty', iconKey: 'FileText' },
    { name: 'Contact', href: '/contact', iconKey: 'Mail' }
];

export const supportLinks = [
    { name: 'Help Center', href: '#', iconKey: 'HelpCircle' },
    { name: 'Privacy Policy', href: '#', iconKey: 'Shield' },
    { name: 'Terms of Service', href: '#', iconKey: 'FileText' },
    { name: 'FAQs', href: '#', iconKey: 'HelpCircle' }
];

export const contactInfo = {
    addressLine1: 'Trivandrum',
    city: 'Kerala,India',
    phone: '+91 8299431275',
    phoneHours: 'Mon-Fri, 9AM-6PM',
    email: 'ruushekas@gmail.com',
    website: 'https://ruusheka.netlify.app',
    designBy: 'ruusheka'
};

export default {
    socialIcons,
    quickLinks,
    supportLinks,
    contactInfo
};