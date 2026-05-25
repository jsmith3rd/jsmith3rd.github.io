export interface SocialLink {
    label: string
    name?: string
    href: string
    kind: 'external' | 'email'
    badge: {
        logo: string
        color: string
        labelColor?: string
        messageColor?: string
        logoColor?: string
        style?: 'flat-square' | 'flat'
    }
}

export interface VCardQR {
    src: string
    alt: string
    label: string
    hint: string
    downloadName?: string
}

export interface VCardContact {
    fullName: string
    firstName: string
    lastName: string
    title?: string
    organization?: string
    email?: string
    phone?: string
    website?: string
    note?: string
    fileName: string
    downloadLabel: string
}

export interface SiteConfig {
    title: string
    navLogo: string
    navLinks: Array<{
        label: string
        href: string
        isActive?: boolean
    }>
    navCta: {
        label: string
        href: string
    }
    hero: {
        eyebrow: string
        nameFirstLine: string
        nameEmphasis: string
        description: string
        metrics: Array<{
            value: string
            label: string
        }>
        actions: {
            primary: {
                label: string
                href: string
            }
            ghost: {
                label: string
                href: string
            }
        }
        specialties: string[]
        highlightedSpecialties: string[]
        locationPill: string
    }
    marqueeItems: string[]
    caseStudies: Array<{
        id: string
        tag: string
        tagVariant?: 'default' | 'gold' | 'muted'
        title: string
        description: string
        annotation?: string
        number: string
        featured?: boolean
        locked?: boolean
        roleNote?: string
        stats?: Array<{
            value: string
            label: string
        }>
        lockLabel?: string
    }>
    about: {
        leadParagraphs: string[]
        tools: string[]
        timeline: Array<{
            years: string
            role: string
            organization: string
            detail: string
        }>
    }
    contact: {
        eyebrow: string
        headingLineOne: string
        headingEmphasis: string
        subtitle: string
        links: Array<{
            label: string
            value: string
            href: string
            external?: boolean
        }>
    }
    footer: {
        copyright: string
        location: string
    }
    vcard: VCardQR
    vcardContact: VCardContact
}

export const siteConfig: SiteConfig = {
    title: 'John J. Smith III',
    navLogo: 'jsmith3rd.dev',
    navLinks: [
        { label: 'Work', href: '#work', isActive: true },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ],
    navCta: {
        label: 'Get in touch',
        href: 'mailto:hello@jsmith3rd.dev',
    },
    hero: {
        eyebrow: 'Senior Technical Product Manager',
        nameFirstLine: 'John J.',
        nameEmphasis: 'Smith III',
        description:
            '14+ years leading enterprise and publishing software at global scale, including tools that power content delivery in 1,000+ languages. From user research and roadmap through delivery. Deep technical fluency. Relentlessly outcome-focused.',
        metrics: [
            { value: '14+', label: 'Years in PM' },
            { value: '28+', label: 'Total in tech' },
            { value: '90%+', label: 'Quarterly delivery' },
        ],
        actions: {
            primary: {
                label: 'View case studies',
                href: '#work',
            },
            ghost: {
                label: 'About me',
                href: '#about',
            },
        },
        specialties: [
            'AI-enabled workflows',
            'Enterprise PM',
            'Multi-language software support',
            'Agile / Scrum',
            'UX direction',
            'Cross-platform desktop',
            'Customer discovery',
            'Roadmap prioritization',
            'Publishing software',
            'Technical fluency',
        ],
        highlightedSpecialties: ['AI-enabled workflows', 'Enterprise PM', 'Multi-language software support'],
        locationPill: 'Tuxedo Park, NY - Remote & flexible',
    },
    marqueeItems: [
        'Product Strategy',
        'Multi-Vendor AI Integration',
        'Cross-Platform Desktop',
        'Agile Transformation',
        'UX Design Leadership',
        'Customer Discovery',
        'Enterprise Publishing',
        'Distributed Teams',
    ],
    caseStudies: [
        {
            id: 'ai-integration',
            tag: 'AI - Strategy',
            title: 'Multi-Vendor AI\nIntegration',
            description:
                'Drove agentic AI into production workflows for hundreds to thousands of users across a global publishing platform - consumed through an internal abstraction layer, vendor-agnostic by design.',
            number: '01',
            featured: true,
            roleNote: 'Role: integration strategy, feature direction, stakeholder-to-vendor translation',
            stats: [
                { value: 'Hundreds–Thousands', label: 'Users impacted' },
                { value: 'Multi-vendor', label: 'Abstraction strategy' },
            ],
        },
        {
            id: 'desktop-editor',
            tag: 'Desktop - UX',
            title: 'Cross-Platform\nWord Processor',
            description:
                'Built the foundation for translation/localization into 1,000+ languages and global publishing workflows. New Vue / TypeScript / Electron desktop app for macOS and Windows. Proprietary file format, end-user familiarity first.',
            annotation: 'Vue - Electron - TypeScript',
            number: '02',
            stats: [{ value: '2 OS', label: 'macOS + Windows' }],
        },
        {
            id: 'word-addin',
            tag: 'AI - Publishing',
            title: 'Microsoft Word\nAdd-in for Authors',
            description:
                'Enabled translation/localization into 1,000+ languages and global publishing workflows. Abstracts complex XML authoring behind intuitive Content Controls. AI-powered proofreading and structural error detection for non-technical publication authors.',
            annotation: 'Error reduction - Workflow acceleration',
            number: '03',
        },
        {
            id: 'documentation-platform',
            tag: 'Platform - AI',
            title: 'Documentation Platform\n& AI Enablement',
            description:
                'Org-wide documentation hub (VuePress / Vite) consolidating schedules, ownership, and skills visibility - foundation for AI fine-tuning across the organization.',
            annotation: 'VuePress - Vite - TypeScript',
            number: '04',
        },
        {
            id: 'agile-transformation',
            tag: 'Leadership',
            tagVariant: 'muted',
            title: 'Agile Transformation\n& Delivery Acceleration',
            description:
                '4-6x release cadence improvement - from quarterly to bi-weekly. Championed and trained teams across the organization.',
            number: '05',
            locked: true,
            lockLabel: 'Coming soon',
        },
        {
            id: 'ios-platform',
            tag: 'Mobile - iOS',
            tagVariant: 'muted',
            title: 'iOS Mobile\nPublishing Platform',
            description:
                'Multilingual publication access for 8M+ users worldwide. PM and UX direction across a multi-platform iOS/Android/Windows initiative.',
            number: '06',
            locked: true,
            lockLabel: 'Coming soon',
        },
    ],
    about: {
        leadParagraphs: [
            'Senior Technical Product Manager with a rare combination: 14 years of product leadership paired with a hands-on engineering and UX background going back to 1997.',
            'Currently leading enterprise software that powers the editorial and publishing workflow behind content delivered in 1,000+ languages.',
            'What drives me is staying close to both the people using the software and the people building it. I want to lead products end-to-end, bring out the best in a team, and create something everyone involved is genuinely proud of. That means caring about craft, staying curious, and being the kind of leader people actually want to work with.',
        ],
        tools: [
            'Vue / TypeScript',
            'Electron',
            'Azure DevOps',
            'Figma',
            'C# / .NET',
            'REST APIs',
            'Agile / Scrum',
            'VuePress / Vite',
        ],
        timeline: [
            {
                years: '2019-\nPresent',
                role: 'Senior Technical Product Manager',
                organization: 'Watchtower - Global publishing organization',
                detail:
                    'End-to-end product strategy across enterprise publishing software. Team of up to 14, 6+ concurrent initiatives, 90%+ quarterly delivery.',
            },
            {
                years: '2011-\n2018',
                role: 'Product Manager',
                organization: 'Watchtower',
                detail:
                    'Introduced Agile practices. Drove 4-6x release cadence improvement. Led iOS mobile publishing platform and desktop modernization.',
            },
            {
                years: '2010-\n2011',
                role: 'Full-Stack Developer & UX Designer',
                organization: 'Watchtower',
                detail:
                    'Built foundational enterprise service platform and REST infrastructure still used org-wide.',
            },
            {
                years: '2001-\n2009',
                role: 'Senior Systems Engineer & UX Designer',
                organization: 'MSC.Software - Santa Ana, CA',
                detail:
                    "Linux Journal Editors' Choice Award 2003 - sole designer of Webmin UI. Strategic partnerships with Webmin and Sharp.",
            },
            {
                years: '1997-\n2001',
                role: 'UX Designer & Full-Stack Developer',
                organization: 'ADS Technologies - Cerritos, CA',
                detail:
                    'Sole designer and primary developer across consumer desktop and multimedia products - from UI through packaging, manuals, and trade shows.',
            },
        ],
    },
    contact: {
        eyebrow: "Let's work together",
        headingLineOne: 'Open to the',
        headingEmphasis: 'right role.',
        subtitle:
            'Senior product leadership in enterprise software, AI-enabled workflows, developer tooling, or publishing and content platforms. Remote and location-flexible.',
        links: [
            {
                label: 'Email',
                value: 'hello@jsmith3rd.dev',
                href: 'mailto:hello@jsmith3rd.dev',
            },
            {
                label: 'LinkedIn',
                value: 'linkedin.com/in/jsmith3rd',
                href: 'https://www.linkedin.com/in/jsmith3rd',
                external: true,
            },
            {
                label: 'GitHub',
                value: 'jsmith3rd',
                href: 'https://github.com/jsmith3rd',
                external: true,
            },
        ],
    },
    footer: {
        copyright: '© 2026 John J. Smith III',
        location: 'Tuxedo Park, NY - Remote & location-flexible',
    },
    vcard: {
        src: '/vcard.png',
        alt: "QR code containing John Smith III's vCard contact details",
        label: 'Tap to enlarge, then scan to save my contact',
        hint: 'Open the larger code first, then point your camera at it',
    },
    vcardContact: {
        fullName: 'John Smith III',
        firstName: 'John',
        lastName: 'Smith III',
        title: 'Senior Technical Product Manager',
        organization: 'Watchtower',
        email: 'hello@jsmith3rd.dev',
        website: 'https://jsmith3rd.dev',
        note: 'Connect for senior technical product leadership, workflow modernization, and AI-enabled product strategy conversations.',
        fileName: 'john-smith-iii.vcf',
        downloadLabel: 'Download vCard (.vcf)',
    },
}
