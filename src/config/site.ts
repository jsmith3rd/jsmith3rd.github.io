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
    }
    highlights: {
        eyebrow: string
        items: Array<{
            value: string
            label: string
        }>
    }
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
        eyebrow: 'Senior Technical Product Leader',
        nameFirstLine: 'John J.',
        nameEmphasis: 'Smith III',
        description:
            "14+ years leading product for a publishing organization operating in 1,100+ languages — most recently an AI-assisted authoring tool that cut error rates 80% and a cross-platform desktop app built from scratch. 28+ years total across product, engineering, and UX — including 11+ years hands-on in software architecture — so the technical conversations aren't new to me.",
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
            'People leadership',
            'AI-enabled workflows',
            'Enterprise PM',
            'Software architecture',
            'Global product delivery',
            'Roadmap prioritization',
            'Customer discovery',
            'UX direction',
            'Agile / Scrum',
            'Cross-platform desktop',
            'Publishing software',
        ],
        highlightedSpecialties: [
            'AI-enabled workflows',
            'Enterprise PM',
            'People leadership',
            'Software architecture',
        ],
    },
    highlights: {
        eyebrow: 'Scope & scale',
        items: [
            { value: '9M+', label: 'Core active users reached' },
            { value: '1,100+', label: 'Languages published in' },
            { value: '3-6', label: 'Teams led through leads' },
            { value: '6+', label: 'Concurrent initiatives driven' },
        ],
    },
    caseStudies: [
        {
            id: 'word-addin',
            tag: 'AI - Publishing',
            title: 'Microsoft Word\nAdd-in for Authors',
            description:
                "Authors kept hitting the same structural errors, and fixing them meant learning custom markup most would never touch again. I led the add-in that hides that behind plain Content Controls and pushed to get AI proofreading built in - error rates dropped 80%, over half of what's left fixable in one click, as part of an overhaul that cut publication turnaround from months down to as little as three days.",
            number: '01',
            featured: true,
            roleNote: 'Role: product strategy, delivery ownership, AI integration direction',
            stats: [
                { value: '80%', label: 'Error rate reduction' },
                { value: '100+', label: 'Authors relying on it' },
            ],
        },
        {
            id: 'ai-integration',
            tag: 'AI - Strategy',
            title: 'Multi-Vendor AI\nIntegration',
            description:
                "Microsoft Copilot on one side, Amazon's AI infrastructure - OpenAI, Claude - on the other. I drive the integration work across both through an internal abstraction layer, so the org can swap or add vendors without tearing out what's built on top of them - it's the plumbing behind the Word add-in's proofreading.",
            number: '02',
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
                "I owned the product definition for a word processor built from scratch - Vue, TypeScript, Electron - for macOS and Windows, wrapped around a file format proprietary to the org. The point was that it had to feel familiar to authors coming from tools they already knew - part of the foundation for localizing content into 1,100+ languages.",
            annotation: 'Vue - Electron - TypeScript',
            number: '03',
        },
        {
            id: 'documentation-platform',
            tag: 'Platform - AI',
            title: 'Documentation Platform\n& AI Enablement',
            description:
                "150+ team members and 300+ outside developers needed one place to find who owned what and how things worked, instead of guessing or asking around. I own the org's documentation hub - VuePress, Vite, TypeScript - and it ended up laying the groundwork the org later used for its own agentic AI fine-tuning.",
            annotation: 'VuePress - Vite - TypeScript',
            number: '04',
        },
        {
            id: 'ios-platform',
            tag: 'Mobile - iOS',
            title: 'iOS Mobile\nPublishing Platform',
            description:
                "I managed and helped build an iOS app - Objective-C, UIKit, Core Data - that opened multilingual publication access to 9M+ core active users worldwide, shipping a week ahead of an eight-month deadline. I pushed hard for an MVP-first approach on that launch instead of trying to ship everything at once - it worked well enough to become how the org approached new products going forward.",
            annotation: 'Objective-C - UIKit - Core Data',
            number: '05',
            stats: [
                { value: '9M+', label: 'Core active users' },
                { value: '1 wk early', label: 'Ahead of deadline' },
            ],
        },
        {
            id: 'agile-transformation',
            tag: 'Leadership',
            title: 'Agile Transformation\n& Delivery Acceleration',
            description:
                'When I moved into product management here, releases went out every three or four months and the open stakeholder feedback queue had grown into the hundreds. I championed Agile practices, trained the team on them, and got us releasing monthly, then bi-weekly - a 4-6x improvement - while working that backlog down to under 50 open items.',
            number: '06',
            stats: [
                { value: '4-6x', label: 'Faster release cadence' },
                { value: '<50', label: 'Open items (from 100s)' },
            ],
        },
    ],
    about: {
        leadParagraphs: [
            'Senior Technical Product Leader with a rare combination: 14 years of product leadership paired with a hands-on engineering, software architecture, and UX background going back to 1997 — including 11+ years hands-on as a software architect.',
            'Currently leading enterprise software that powers the editorial and publishing workflow behind content delivered in 1,100+ languages.',
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
                    'End-to-end product strategy across enterprise publishing software. Second-line leadership across 3-6 teams, 6+ concurrent initiatives, 90%+ quarterly delivery, driven by ~40 user interviews a quarter and a monthly advisory group. Continues to shape and validate software architecture direction, a throughline from an earlier hands-on architect role on the same team.',
            },
            {
                years: '2011-\n2018',
                role: 'Product Manager',
                organization: 'Watchtower',
                detail:
                    'Introduced Agile practices. Drove 4-6x release cadence improvement. Led iOS mobile publishing platform and desktop modernization. Scaled cross-region data sync 20x, from 1TB to 20TB, over two years.',
            },
            {
                years: '2010-\n2011',
                role: 'Full-Stack Developer & UX Designer',
                organization: 'Watchtower',
                detail:
                    'Co-led a modular, hot-swappable plugin architecture for a foundational enterprise service platform and REST infrastructure still used org-wide - 99.9% uptime with zero major service-caused outages.',
            },
            {
                years: '2001-\n2009',
                role: 'Senior Systems Engineer & UX Designer',
                organization: 'MSC.Software - Santa Ana, CA',
                detail:
                    "Proposed and built a full-stack Sharp Zaurus cluster-monitoring platform, unassigned - turned MSC into a formal Sharp technology partner. Also sole designer of Webmin's Linux Journal Editors' Choice-winning UI.",
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
            'Senior product leadership in enterprise software, AI-enabled workflows, developer tooling, or publishing and content platforms. Remote.',
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
        location: 'Tuxedo Park, NY - Remote',
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
        title: 'Senior Technical Product Leader',
        organization: 'Watchtower',
        email: 'hello@jsmith3rd.dev',
        website: 'https://jsmith3rd.dev',
        note: 'Connect for senior technical product leadership, workflow modernization, and AI-enabled product strategy conversations.',
        fileName: 'john-smith-iii.vcf',
        downloadLabel: 'Download vCard (.vcf)',
    },
}
