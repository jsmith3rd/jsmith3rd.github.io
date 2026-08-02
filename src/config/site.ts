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
        specialtyGroups: Array<{
            label: string
            items: string[]
        }>
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
        scope?: string
        stack?: string
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
            "I lead product for a publishing organization operating in 1,100+ languages — most recently an AI-assisted authoring tool that cut error rates 80%, and a cross-platform desktop app built from scratch. My background spans product, engineering, and UX, including 11+ years hands-on in software architecture, so the technical conversations aren't new to me.",
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
        specialtyGroups: [
            {
                label: 'Leadership',
                items: [
                    'People leadership',
                    'Enterprise PM',
                    'Roadmap prioritization',
                    'Change management & training',
                    'Agile / Scrum',
                ],
            },
            {
                label: 'Technical',
                items: [
                    'AI-enabled workflows',
                    'Software architecture',
                    'Workflow modernization',
                    'UX direction',
                    'Cross-platform desktop',
                ],
            },
            {
                label: 'Domain',
                items: [
                    'Global product delivery',
                    'Customer discovery',
                    'Publishing software',
                    'Localization & i18n',
                ],
            },
        ],
        highlightedSpecialties: [
            'People leadership',
            'Enterprise PM',
            'AI-enabled workflows',
            'Software architecture',
            'Global product delivery',
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
            scope:
                'The two structural gaps behind the errors: an incomplete abstraction that still exposed raw XML concepts at certain edge cases, and no validation step before submission - both closed in the same release that added AI proofreading.',
            number: '01',
            featured: true,
            roleNote: 'Role: product strategy, delivery ownership, AI integration direction',
            stats: [
                { value: '80%', label: 'Error rate reduction' },
                { value: '100+', label: 'Authors relying on it' },
            ],
        },
        {
            id: 'validation-training',
            tag: 'Leadership - Process',
            title: 'Cross-Functional\nValidation & Training',
            description:
                "Every issue in a new workflow got debated the same way: was it bad training, or bad software? I proposed a user-acceptance process that put every affected team - engineering, documentation, and the end users themselves - in the same room to diagnose root cause on the spot, then pitched the business case to leadership and got unanimous approval. It shipped a stronger authoring workflow within 2 months of a 9-month initiative, and became the direct setup for the Word add-in's AI proofreading work.",
            scope:
                "Scoped for about 9 months. The effects reached well beyond the tools it was built to validate - all the way to translation, work outside any single initiative's scope.",
            number: '02',
            roleNote: 'Role: process design, business case ownership, cross-team facilitation',
            stats: [
                { value: '2 mo', label: 'To delivery (9-mo initiative)' },
                { value: '80%', label: "Fed Word add-in's error-rate cut" },
            ],
        },
        {
            id: 'ai-integration',
            tag: 'AI - Strategy',
            title: 'Multi-Vendor AI\nIntegration',
            description:
                "Microsoft Copilot on one side, Amazon's AI infrastructure - OpenAI, Claude - on the other. I drive the integration work across both through an internal abstraction layer, so the org can swap or add vendors without tearing out what's built on top of them - it's the plumbing behind the Word add-in's proofreading.",
            scope:
                "The abstraction layer itself is built and maintained by a partner team - my role is translating stakeholder and end-user feedback on top of it into vendor-agnostic feature requests, not managing the layer directly.",
            number: '03',
            roleNote: 'Role: vendor integration strategy, technical direction',
            stats: [
                { value: 'Hundreds–Thousands', label: 'Users impacted' },
                { value: 'Multi-vendor', label: 'Abstraction strategy' },
            ],
        },
        {
            id: 'plugin-architecture',
            tag: 'Architecture - Platform',
            title: 'Modular Plugin\nArchitecture',
            description:
                "Our branch network kept adding new data types - file, metrics, language-metadata, feedback - and each one meant either bolting onto a growing monolith or starting over. I designed a modular, hot-swappable plugin architecture instead, built on one decision: abstract the API layer from the data storage layer, so what the API promised and where the data actually lived could change independently. That's what let one service split data across three global regions without the API ever changing, and years later let the org migrate off on-premise servers to AWS without anyone consuming it noticing.",
            scope:
                "I'd already taken on two separate applications before this build - one for workflow and file-versioning, one for managing language data for localization - and what each needed shaped two of these service modules, file storage and language-metadata. I also led the REST service design and back-end implementation myself, coordinating integration with front ends built in JavaScript, TypeScript, and AngularJS, and built internal SDKs adopted by 5+ teams and 30+ developers who never had to hand-roll their own integration. Years later I led migrating both applications off their own siloed legacy repositories onto this architecture: the workflow app at 20+ TB of scale, the language-data app into a single global source of truth other teams now rely on for localization and translation.",
            stack: 'C# - Entity Framework - MS SQL Server',
            number: '04',
            roleNote: 'Role: architecture design, REST API & backend implementation, SDK strategy',
            stats: [
                { value: '99.9%', label: 'Uptime, zero major outages' },
                { value: '15 yrs', label: 'Core components still in production' },
            ],
        },
        {
            id: 'desktop-editor',
            tag: 'Desktop - UX',
            title: 'Cross-Platform\nWord Processor',
            description:
                "I owned the product definition for a word processor built from scratch - Vue, TypeScript, Electron - for macOS and Windows, wrapped around a file format proprietary to the org. The point was that it had to feel familiar to authors coming from tools they already knew - part of the foundation for localizing content into 1,100+ languages.",
            scope:
                'No prior product to reference, and no existing precedent for editing support on this file format - the team had to define both the product and the technical approach at the same time.',
            stack: 'Vue - Electron - TypeScript',
            number: '05',
            roleNote: 'Role: product definition, cross-platform UX direction',
            stats: [
                { value: '15+', label: 'Cross-functional contributors' },
                { value: 'Multi-country', label: 'Distributed team' },
            ],
        },
        {
            id: 'documentation-platform',
            tag: 'Platform - AI',
            title: 'Documentation Platform\n& AI Enablement',
            description:
                "150+ team members and 300+ outside developers needed one place to find who owned what and how things worked, instead of guessing or asking around. It's not an off-the-shelf VuePress site - I built it out with custom plugins for team schedules, ownership mapping, and skills visibility, plus a self-service onboarding pipeline so other teams and disciplines could stand up and publish their own docs without routing through me. It ended up laying the groundwork the org later used for its own agentic AI fine-tuning.",
            stack: 'VuePress - Vite - TypeScript',
            number: '06',
            roleNote: 'Role: platform build, plugin architecture, self-service enablement',
            stats: [
                { value: 'Custom-built', label: 'Plugin ecosystem' },
                { value: 'Self-service', label: 'Team onboarding' },
            ],
        },
        {
            id: 'ios-platform',
            tag: 'Mobile - iOS',
            title: 'iOS Mobile\nPublishing Platform',
            description:
                "I managed and helped build an iOS app - Objective-C, UIKit, Core Data - that opened multilingual publication access to 9M+ core active users worldwide, shipping a week ahead of an eight-month deadline. I pushed hard for an MVP-first approach on that launch instead of trying to ship everything at once - it worked well enough to influence how our department approached new products going forward.",
            scope:
                'Part of a broader multi-platform initiative - iOS, Android, and Windows launching together - with two unknowns still open at the start: which publications would make the initial list, and how to design a reading experience in a space the team had never built for before. Every platform version, including this one, shipped on schedule or early.',
            stack: 'Objective-C - UIKit - Core Data',
            number: '07',
            roleNote: 'Role: product management, hands-on engineering, launch strategy',
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
            scope:
                'Before the change, stakeholder feedback could sit unresolved for six months or more, with decisions already locked in long before anyone validated them. After, most items were resolved within a single cycle - a few weeks from raised to shipped.',
            number: '08',
            roleNote: 'Role: process leadership, team training, delivery cadence',
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
                    'End-to-end product strategy across enterprise publishing software. Second-line leadership across 3-6 teams, 6+ concurrent initiatives, 90%+ quarterly delivery, driven by ~40 user interviews a quarter and a monthly advisory group. Continues to shape and validate software architecture direction, a through line from an earlier hands-on architect role on the same team.',
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
                    'Led a modular, hot-swappable plugin architecture for a foundational enterprise service platform and REST infrastructure still used org-wide, shaped in part by two applications I owned - one for workflow and file-versioning, one for language data - 99.9% uptime with zero major service-caused outages.',
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
            'Senior product leadership in enterprise software, AI-enabled workflows, developer tooling, or publishing and content platforms.',
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
        location: 'Tuxedo Park, NY',
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
