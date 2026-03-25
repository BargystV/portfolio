#!/usr/bin/env python3
"""Generate resume_ru.pdf and resume_en.pdf for Boris Varshaver."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register fonts with Cyrillic support
pdfmetrics.registerFont(TTFont('Arial', '/System/Library/Fonts/Supplemental/Arial.ttf'))
pdfmetrics.registerFont(TTFont('Arial-Bold', '/System/Library/Fonts/Supplemental/Arial Bold.ttf'))
pdfmetrics.registerFont(TTFont('Arial-Italic', '/System/Library/Fonts/Supplemental/Arial Italic.ttf'))

W, H = A4  # 595.27 x 841.89 points
MARGIN_LEFT = 40
MARGIN_RIGHT = 40
MARGIN_TOP = 35
MARGIN_BOTTOM = 30
USABLE_W = W - MARGIN_LEFT - MARGIN_RIGHT

# Colors
BLACK = HexColor('#1a1a1a')
DARK_GRAY = HexColor('#333333')
MED_GRAY = HexColor('#555555')
LIGHT_GRAY = HexColor('#888888')
ACCENT = HexColor('#2563eb')  # Blue accent
LINE_COLOR = HexColor('#d1d5db')
TAG_BG = HexColor('#f0f4f8')
TAG_BORDER = HexColor('#cbd5e1')


def wrap_text(c_obj, text, font, size, max_width):
    """Split text into lines that fit within max_width."""
    c_obj.setFont(font, size)
    words = text.split(' ')
    lines = []
    current = ''
    for w in words:
        test = (current + ' ' + w).strip()
        if pdfmetrics.stringWidth(test, font, size) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = w
    if current:
        lines.append(current)
    return lines


class ResumeBuilder:
    def __init__(self, filename, lang):
        self.c = canvas.Canvas(filename, pagesize=A4)
        self.lang = lang
        self.y = H - MARGIN_TOP
        self.page = 1

    def check_space(self, needed):
        if self.y - needed < MARGIN_BOTTOM:
            self.c.showPage()
            self.page += 1
            self.y = H - MARGIN_TOP

    def draw_header(self, name, role, contacts):
        # Name
        self.c.setFont('Arial-Bold', 22)
        self.c.setFillColor(BLACK)
        self.c.drawString(MARGIN_LEFT, self.y, name)
        self.y -= 22

        # Role
        self.c.setFont('Arial', 12)
        self.c.setFillColor(ACCENT)
        self.c.drawString(MARGIN_LEFT, self.y, role)
        self.y -= 18

        # Contact line
        self.c.setFont('Arial', 8.5)
        self.c.setFillColor(MED_GRAY)
        contact_str = '  |  '.join(contacts)
        self.c.drawString(MARGIN_LEFT, self.y, contact_str)
        self.y -= 14

        # Separator line
        self.c.setStrokeColor(ACCENT)
        self.c.setLineWidth(1.5)
        self.c.line(MARGIN_LEFT, self.y, W - MARGIN_RIGHT, self.y)
        self.y -= 12

    def draw_section_title(self, title):
        self.check_space(22)
        self.c.setFont('Arial-Bold', 12)
        self.c.setFillColor(ACCENT)
        self.c.drawString(MARGIN_LEFT, self.y, title.upper())
        self.y -= 3
        self.c.setStrokeColor(LINE_COLOR)
        self.c.setLineWidth(0.5)
        self.c.line(MARGIN_LEFT, self.y, W - MARGIN_RIGHT, self.y)
        self.y -= 10

    def draw_about(self, text):
        lines = wrap_text(self.c, text, 'Arial', 9, USABLE_W)
        for line in lines:
            self.check_space(12)
            self.c.setFont('Arial', 9)
            self.c.setFillColor(DARK_GRAY)
            self.c.drawString(MARGIN_LEFT, self.y, line)
            self.y -= 12
        self.y -= 4

    def draw_experience_header(self, company, role_text, type_text, period):
        self.check_space(28)
        # Company + role on left, period on right
        self.c.setFont('Arial-Bold', 10)
        self.c.setFillColor(BLACK)
        left_text = company
        self.c.drawString(MARGIN_LEFT, self.y, left_text)

        self.c.setFont('Arial', 9)
        self.c.setFillColor(LIGHT_GRAY)
        self.c.drawRightString(W - MARGIN_RIGHT, self.y, period)
        self.y -= 13

        # Role + type
        self.c.setFont('Arial-Italic', 9)
        self.c.setFillColor(MED_GRAY)
        self.c.drawString(MARGIN_LEFT, self.y, f'{role_text}  ·  {type_text}')
        self.y -= 10

    def draw_project(self, name, desc_lines, stack, period):
        # Project name + period
        self.check_space(16)
        self.c.setFont('Arial-Bold', 9)
        self.c.setFillColor(DARK_GRAY)
        self.c.drawString(MARGIN_LEFT + 8, self.y, name)

        if period:
            self.c.setFont('Arial', 7.5)
            self.c.setFillColor(LIGHT_GRAY)
            self.c.drawRightString(W - MARGIN_RIGHT, self.y, period)
        self.y -= 11

        # Description lines (first line is summary, bullets follow)
        indent = MARGIN_LEFT + 8
        bullet_indent = MARGIN_LEFT + 16
        for line in desc_lines:
            is_bullet = line.startswith('• ')
            actual_indent = bullet_indent if is_bullet else indent
            max_w = W - MARGIN_RIGHT - actual_indent
            font = 'Arial'
            size = 8
            wrapped = wrap_text(self.c, line, font, size, max_w)
            for wl in wrapped:
                self.check_space(11)
                self.c.setFont(font, size)
                self.c.setFillColor(MED_GRAY if is_bullet else DARK_GRAY)
                self.c.drawString(actual_indent, self.y, wl)
                self.y -= 10

        # Stack tags
        if stack:
            self.check_space(14)
            self.c.setFont('Arial', 7)
            self.c.setFillColor(MED_GRAY)
            stack_str = ', '.join(stack)
            self.c.drawString(indent, self.y, stack_str)
            self.y -= 10

        self.y -= 3

    def draw_education(self, entries):
        for entry in entries:
            self.check_space(24)
            self.c.setFont('Arial-Bold', 9)
            self.c.setFillColor(BLACK)
            self.c.drawString(MARGIN_LEFT, self.y, entry['degree'])

            self.c.setFont('Arial', 9)
            self.c.setFillColor(LIGHT_GRAY)
            self.c.drawRightString(W - MARGIN_RIGHT, self.y, entry['year'])
            self.y -= 12

            self.c.setFont('Arial', 8.5)
            self.c.setFillColor(MED_GRAY)
            self.c.drawString(MARGIN_LEFT, self.y, entry['school'])
            self.y -= 10

            if entry.get('field'):
                self.c.setFont('Arial-Italic', 8)
                self.c.setFillColor(MED_GRAY)
                self.c.drawString(MARGIN_LEFT, self.y, entry['field'])
                self.y -= 10

            self.y -= 4

    def draw_skills(self, skill_groups):
        for group in skill_groups:
            self.check_space(16)
            self.c.setFont('Arial-Bold', 8.5)
            self.c.setFillColor(DARK_GRAY)
            label = group['label'] + ':'
            label_w = pdfmetrics.stringWidth(label, 'Arial-Bold', 8.5)
            self.c.drawString(MARGIN_LEFT, self.y, label)

            self.c.setFont('Arial', 8.5)
            self.c.setFillColor(MED_GRAY)
            items_str = ', '.join(group['items'])
            max_w = W - MARGIN_RIGHT - MARGIN_LEFT - label_w - 6
            lines = wrap_text(self.c, items_str, 'Arial', 8.5, max_w)
            for i, line in enumerate(lines):
                if i == 0:
                    self.c.drawString(MARGIN_LEFT + label_w + 6, self.y, line)
                else:
                    self.check_space(12)
                    self.c.drawString(MARGIN_LEFT + label_w + 6, self.y, line)
                self.y -= 12

    def draw_languages(self, langs):
        self.check_space(14)
        self.c.setFont('Arial', 9)
        self.c.setFillColor(DARK_GRAY)
        self.c.drawString(MARGIN_LEFT, self.y, '  |  '.join(langs))
        self.y -= 14

    def draw_personal_projects(self, projects):
        for proj in projects:
            self.draw_project(proj['name'], proj['desc_lines'], proj['stack'], proj['period'])

    def save(self):
        self.c.save()


def build_en():
    b = ResumeBuilder('public/resume_en.pdf', 'en')

    b.draw_header(
        'Boris Varshaver',
        'Senior Android Developer',
        ['bargystvelp@gmail.com', '@bargystvelp', 'github.com/BargystV',
         'linkedin.com/in/boris-varshaver-392111288/', 'Pyatigorsk, Russia']
    )

    # About
    b.draw_section_title('About')
    b.draw_about('Senior Android Developer with over 9 years of commercial experience \u2014 from POS terminal payment systems and enterprise MRM solutions to consumer apps and games.')

    # Experience
    b.draw_section_title('Work Experience')

    # Nadeks
    b.draw_experience_header('Nadeks', 'Android Developer', 'Remote', 'Mar 2025 \u2013 Present')
    b.draw_project(
        'ARIASOFT.POS / ARIASOFT.T2P',
        [
            'Corporate payment application for 9+ hardware platforms with unified business logic and a public SDK for third-party integrators.',
            '\u2022 Designed Multihal architecture, eliminating separate builds per terminal \u2014 single APK for the entire device fleet',
            '\u2022 Integrated server-side JSON offline flow and implemented client-side state handling for logic management without network',
            '\u2022 Introduced JavaPoet-based code generation system to standardise security auditing at compile time',
            '\u2022 Extended JNI layer when adding new Java classes, implemented tasks in C++',
            '\u2022 Integrated biometric transaction authorisation',
            '\u2022 Implemented support for several POS protocols',
            '\u2022 Refactored command processing subsystem and logical core',
            '\u2022 Configured ProGuard obfuscation to protect payment protocols from reverse engineering',
        ],
        ['Kotlin', 'Java', 'C/C++', 'Android', 'Room', 'Retrofit', 'Sentry'],
        'Feb 2020 \u2013 Present (started at Mahuru)'
    )

    # Mahuru
    b.draw_experience_header('Mahuru', 'Android Developer', 'Moscow / Remote', 'Aug 2019 \u2013 Mar 2025')

    b.draw_project(
        'Insurance Backend',
        [
            'Corporate backend for a large insurance group \u2014 microservice system on Kotlin/Spring; contributed to domain service development.',
            '\u2022 Fixed a race condition in the service layer: parallelized independent data processing, eliminating thread blocking',
            '\u2022 Implemented a full vertical slice: Controller \u2192 Service \u2192 Repository with JPA/PostgreSQL',
        ],
        ['Kotlin', 'Spring Boot', 'Spring WebFlux', 'Kafka', 'PostgreSQL', 'JPA'],
        'Jun 2024 \u2013 Sep 2024'
    )

    b.draw_project(
        'HALK-Pay',
        [
            'Digital wallet Android app for a large bank with NFC payments via HCE.',
            '\u2022 Designed and implemented NFC HCE service \u2014 the core business feature: implemented the interaction protocol with payment terminals',
            '\u2022 Introduced independent native security modules (NDK/C): implemented a modular system for detecting compromised environments \u2014 shipped as independent Android libraries',
            '\u2022 Implemented multi-layer security: channel protection, secure data storage, protected payment data handling at UI level, user data encryption',
            '\u2022 Configured obfuscation and code protection for production builds \u2014 which enabled the app to be published on Google Play',
            '\u2022 Refactored MVVM architecture: extracted shared logic into base ViewModels and fragments, added card data validation',
        ],
        ['Kotlin', 'C/C++', 'Android', 'Hilt', 'Retrofit', 'RxJava', 'DexProtector'],
        'May 2021 \u2013 Dec 2023'
    )

    b.draw_project(
        'Enterprise MRM',
        [
            'Enterprise MRM application for one of the largest retailers in Russia; client-side development from scratch within a mobile team.',
            '\u2022 Designed and built 15+ screens: task/meeting/assembly management, custom calendar (year/month/week), file constructor with spreadsheet editor, search across tasks/attachments/people',
            '\u2022 Integrated enterprise MDM to secure the communication channel and enforce access control in an enterprise environment',
            '\u2022 Implemented offline-first architecture with local cache (Room) and synchronization via Retrofit/OkHttp',
        ],
        ['Kotlin', 'Android', 'Coroutines', 'Retrofit', 'Room', 'Koin', 'Moxy'],
        'Aug 2019 \u2013 Jun 2021'
    )

    b.draw_project(
        'GameCash',
        [
            'Crypto gaming platform with lobby system and BTC/ETH wagering \u2014 built the Android app from scratch to production.',
            '\u2022 Designed and implemented full client: game lobbies with configurable parameters, crypto wallet management (deposit/withdrawal), authentication with 2FA',
            '\u2022 Built the network layer on OkHttp and local storage on SQLite: game state sync, transaction history',
            '\u2022 Independently shipped the product to production \u2014 from first commit to release',
        ],
        ['Java', 'Android', 'OkHttp', 'SQLite'],
        'Aug 2019 \u2013 Mar 2020'
    )

    # Freelance
    b.draw_experience_header('Freelance', 'Android Developer', 'Remote', 'Nov 2017 \u2013 Jan 2019')
    b.draw_project(
        'MaybeCoffee',
        [
            'Two Android applications for a dating service with a \u201cmeet for coffee\u201d concept \u2014 user app and coffee shop staff app.',
            '\u2022 Implemented end-to-end user flow: profiles, partner search on map, geo-based mini-chats',
            '\u2022 Developed in-chat order and payment module, including history and status tracking',
            '\u2022 Implemented coffee shop staff app: order queue, status management, loyalty programme',
            '\u2022 Brought both apps to production-ready state',
        ],
        ['Java', 'Android', 'Firebase', 'Google Maps', 'Retrofit', 'SQLite'],
        'Nov 2017 \u2013 Jan 2019'
    )

    # Education
    b.draw_section_title('Education')
    b.draw_education([
        {
            'degree': "Bachelor's degree \u2014 Computer Science and Engineering",
            'year': '2020',
            'school': 'Volga State University of Telecommunications and Informatics, Samara',
            'field': '',
        },
        {
            'degree': 'Professional development course \u2014 Java',
            'year': '2017',
            'school': 'JavaRush',
            'field': '',
        },
    ])

    # Skills
    b.draw_section_title('Skills')
    b.draw_skills([
        {'label': 'Languages', 'items': ['Kotlin', 'Java', 'C/C++', 'Python', 'TypeScript']},
        {'label': 'Android', 'items': ['Jetpack Compose', 'Navigation Compose', 'DataBinding', 'HCE', 'Room', 'Hilt', 'Koin', 'Moxy', 'Coroutines', 'RxJava', 'EventBus', 'Glide', 'Coil', 'Facebook Shimmer', 'ZXing', 'VisionLabs', 'LibGDX']},
        {'label': 'Networking', 'items': ['Retrofit', 'OkHttp', 'Gson']},
        {'label': 'Security', 'items': ['Bouncy Castle', 'BER-TLV', 'ProGuard', 'DexProtector', 'JavaPoet']},
        {'label': 'Backend', 'items': ['Spring Boot', 'Spring WebFlux', 'Kafka', 'PostgreSQL', 'SQLite', 'JPA', 'Liquibase', 'Testcontainers']},
        {'label': 'Frontend', 'items': ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion']},
        {'label': 'Architecture', 'items': ['MVVM', 'MVP', 'Command Pattern', 'State machine', 'Microservices', 'API Gateway', 'ECS', 'Data-Oriented Design']},
        {'label': 'Infrastructure', 'items': ['Gradle', 'Firebase', 'Google Maps', 'Sentry']},
        {'label': 'AI & Automation', 'items': ['n8n', 'Claude Code']},
    ])

    # Languages
    b.draw_section_title('Languages')
    b.draw_languages(['Russian \u2014 Native', 'English \u2014 B1', 'Spanish \u2014 A2'])

    # Personal Projects
    b.draw_section_title('Personal Projects')
    b.draw_personal_projects([
        {
            'name': 'Boris Portfolio',
            'desc_lines': [
                'Personal portfolio website: single-page SPA with bilingual interface (EN/RU).',
                '\u2022 Built a custom i18n system on React Context without external libraries',
                '\u2022 Developed animated particle background with scroll and mouse reactivity (Canvas API) + scroll-triggered section animations (Framer Motion)',
                '\u2022 Configured deployment on Vercel with SEO meta tags, Open Graph and built-in analytics',
            ],
            'stack': ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
            'period': 'Mar 2026 \u2013 Present',
        },
        {
            'name': 'AI Personal Agent',
            'desc_lines': [
                'Private AI assistant for everyday life \u2014 manages calendar, purchases, and recipes in Notion via natural language.',
                '\u2022 Built multi-step n8n workflows: intent classification \u2192 tool routing \u2192 Notion API calls',
                '\u2022 Integrated LLM as the orchestration layer: the agent parses free-form messages, extracts structured data, and dispatches CRUD operations across multiple Notion databases',
            ],
            'stack': ['Python', 'n8n'],
            'period': 'Apr 2025 \u2013 Present',
        },
        {
            'name': 'Simulation of Life',
            'desc_lines': [
                'Desktop evolutionary simulation \u2014 full cycle from architecture to multiplatform build.',
                '\u2022 Designed Data-Oriented ECS from scratch: flat primitive arrays instead of objects, stateless engines, O(1) entity creation/destruction without allocations in hot path',
                '\u2022 Developed genomic system with inheritance and mutation (~3% per byte), modeling natural selection through competition for light',
            ],
            'stack': ['Kotlin', 'LibGDX'],
            'period': 'Sep 2025 \u2013 Present',
        },
        {
            'name': 'Amazonica',
            'desc_lines': [
                'Android e-commerce app: catalog, cart, auth \u2014 built from scratch as a Jetpack Compose learning platform.',
                '\u2022 Designed single-module Clean Architecture with data / di / ui layers and a shared BaseViewModel with centralised error handling',
                '\u2022 Implemented nested navigation across three NavGraphs (Main / Auth / Catalog) and the Container/Stateless pattern for Compose Preview support',
                '\u2022 Introduced RepositoryResult<T> wrapper to isolate UI from data sources (Retrofit + Room + SharedPreferences)',
            ],
            'stack': ['Kotlin', 'Android', 'Jetpack Compose', 'Navigation Compose', 'Coroutines', 'Retrofit', 'Room', 'Koin', 'Coil'],
            'period': 'Dec 2024 \u2013 Jan 2025',
        },
        {
            'name': 'Poet Helper',
            'desc_lines': [
                'Android app for selecting rhymes and synonyms \u2014 diploma project, published on Google Play.',
                '\u2022 Designed a rhyme and synonym matching algorithm from scratch: parsed multiple open dictionaries, populated a local SQLite database, and built search logic on top of it',
                '\u2022 Independently learned Android development: UI architecture, Activity/Fragment lifecycle, multithreading, and data persistence',
            ],
            'stack': ['Java', 'Android', 'SQLite'],
            'period': 'May \u2013 Nov 2017',
        },
    ])

    b.save()
    print('resume_en.pdf generated')


def build_ru():
    b = ResumeBuilder('public/resume_ru.pdf', 'ru')

    b.draw_header(
        '\u0412\u0430\u0440\u0448\u0430\u0432\u0435\u0440 \u0411\u043e\u0440\u0438\u0441 \u0420\u043e\u043c\u0430\u043d\u043e\u0432\u0438\u0447',
        'Senior Android Developer',
        ['bargystvelp@gmail.com', '@bargystvelp', 'github.com/BargystV',
         'linkedin.com/in/boris-varshaver-392111288/', '\u041f\u044f\u0442\u0438\u0433\u043e\u0440\u0441\u043a, \u0420\u043e\u0441\u0441\u0438\u044f']
    )

    # About
    b.draw_section_title('\u041e\u0411\u041e \u041c\u041d\u0415')
    b.draw_about('Senior Android Developer \u0441 \u0431\u043e\u043b\u0435\u0435 \u0447\u0435\u043c 8 \u0433\u043e\u0434\u0430\u043c\u0438 \u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u043e\u0433\u043e \u043e\u043f\u044b\u0442\u0430 \u2014 \u043e\u0442 \u043f\u043b\u0430\u0442\u0451\u0436\u043d\u044b\u0445 \u0441\u0438\u0441\u0442\u0435\u043c \u0434\u043b\u044f POS-\u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u043e\u0432 \u0438 \u043a\u043e\u0440\u043f\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u044b\u0445 MRM-\u0440\u0435\u0448\u0435\u043d\u0438\u0439 \u0434\u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0445 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0439 \u0438 \u0438\u0433\u0440.')

    # Experience
    b.draw_section_title('\u041e\u041f\u042b\u0422 \u0420\u0410\u0411\u041e\u0422\u042b')

    # Nadeks
    b.draw_experience_header('Nadeks', 'Android Developer', '\u0423\u0434\u0430\u043b\u0451\u043d\u043d\u043e', '\u041c\u0430\u0440\u0442 2025 \u2013 \u043d.\u0432.')
    b.draw_project(
        'ARIASOFT.POS / ARIASOFT.T2P',
        [
            '\u041a\u043e\u0440\u043f\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u043e\u0435 \u043f\u043b\u0430\u0442\u0451\u0436\u043d\u043e\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0434\u043b\u044f 9+ \u0430\u043f\u043f\u0430\u0440\u0430\u0442\u043d\u044b\u0445 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c \u0441 \u0435\u0434\u0438\u043d\u043e\u0439 \u0431\u0438\u0437\u043d\u0435\u0441-\u043b\u043e\u0433\u0438\u043a\u043e\u0439 \u0438 \u043f\u0443\u0431\u043b\u0438\u0447\u043d\u044b\u043c SDK \u0434\u043b\u044f \u0441\u0442\u043e\u0440\u043e\u043d\u043d\u0438\u0445 \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0442\u043e\u0440\u043e\u0432.',
            '\u2022 \u0421\u043f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043b Multihal-\u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0443, \u0443\u0441\u0442\u0440\u0430\u043d\u0438\u0432 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e\u0441\u0442\u044c \u043e\u0442\u0434\u0435\u043b\u044c\u043d\u044b\u0445 \u0441\u0431\u043e\u0440\u043e\u043a \u043f\u043e\u0434 \u043a\u0430\u0436\u0434\u044b\u0439 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b \u2014 \u0435\u0434\u0438\u043d\u044b\u0439 APK \u0434\u043b\u044f \u0432\u0441\u0435\u0433\u043e \u043f\u0430\u0440\u043a\u0430 \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432',
            '\u2022 \u0418\u043d\u0442\u0435\u0433\u0440\u0438\u0440\u043e\u0432\u0430\u043b \u0441\u0435\u0440\u0432\u0435\u0440\u043d\u044b\u0439 offline-\u0444\u043b\u043e\u0443 \u043d\u0430 \u0431\u0430\u0437\u0435 JSON \u0438 \u0440\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u043a\u043b\u0438\u0435\u043d\u0442\u0441\u043a\u0443\u044e \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0439 \u0434\u043b\u044f \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u043b\u043e\u0433\u0438\u043a\u043e\u0439 \u0431\u0435\u0437 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f \u043a \u0441\u0435\u0442\u0438',
            '\u2022 \u0412\u0432\u0451\u043b \u0441\u0438\u0441\u0442\u0435\u043c\u0443 \u043a\u043e\u0434\u043e\u0433\u0435\u043d\u0435\u0440\u0430\u0446\u0438\u0438 \u043d\u0430 \u0431\u0430\u0437\u0435 JavaPoet \u0434\u043b\u044f \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u0438\u0437\u0430\u0446\u0438\u0438 security-\u0430\u0443\u0434\u0438\u0442\u0430 \u043d\u0430 \u0443\u0440\u043e\u0432\u043d\u0435 \u043a\u043e\u043c\u043f\u0438\u043b\u044f\u0446\u0438\u0438',
            '\u2022 \u0420\u0430\u0441\u0448\u0438\u0440\u044f\u043b JNI-\u0441\u043b\u043e\u0439 \u043f\u0440\u0438 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0438 \u043d\u043e\u0432\u044b\u0445 Java-\u043a\u043b\u0430\u0441\u0441\u043e\u0432, \u0440\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u044b\u0432\u0430\u043b \u0437\u0430\u0434\u0430\u0447\u0438 \u043d\u0430 C++',
            '\u2022 \u0418\u043d\u0442\u0435\u0433\u0440\u0438\u0440\u043e\u0432\u0430\u043b \u0431\u0438\u043e\u043c\u0435\u0442\u0440\u0438\u0447\u0435\u0441\u043a\u0443\u044e \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044e \u0442\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0439',
            '\u2022 \u0420\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0443 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u0445 \u043a\u0430\u0441\u0441\u043e\u0432\u044b\u0445 \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u043e\u0432',
            '\u2022 \u041f\u0440\u043e\u0432\u0451\u043b \u0440\u0435\u0444\u0430\u043a\u0442\u043e\u0440\u0438\u043d\u0433 \u043f\u043e\u0434\u0441\u0438\u0441\u0442\u0435\u043c\u044b \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0438\u043d\u0433\u0430 \u043a\u043e\u043c\u0430\u043d\u0434 \u0438 \u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u043e\u0433\u043e \u044f\u0434\u0440\u0430',
            '\u2022 \u041d\u0430\u0441\u0442\u0440\u043e\u0438\u043b ProGuard-\u043e\u0431\u0444\u0443\u0441\u043a\u0430\u0446\u0438\u044e \u0434\u043b\u044f \u0437\u0430\u0449\u0438\u0442\u044b \u043f\u043b\u0430\u0442\u0451\u0436\u043d\u044b\u0445 \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u043e\u0432 \u043e\u0442 \u0440\u0435\u0432\u0435\u0440\u0441-\u0438\u043d\u0436\u0438\u043d\u0438\u0440\u0438\u043d\u0433\u0430',
        ],
        ['Kotlin', 'Java', 'C/C++', 'Android', 'Room', 'Retrofit', 'Sentry'],
        '\u0424\u0435\u0432\u0440 2020 \u2013 \u043d.\u0432. (\u043d\u0430\u0447\u0438\u043d\u0430\u043b \u0432 Mahuru)'
    )

    # Mahuru
    b.draw_experience_header('Mahuru', 'Android Developer', '\u041c\u043e\u0441\u043a\u0432\u0430 / \u0423\u0434\u0430\u043b\u0451\u043d\u043d\u043e', '\u0410\u0432\u0433 2019 \u2013 \u041c\u0430\u0440\u0442 2025')

    b.draw_project(
        'Insurance Backend',
        [
            '\u041a\u043e\u0440\u043f\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u044b\u0439 backend \u043a\u0440\u0443\u043f\u043d\u043e\u0439 \u0441\u0442\u0440\u0430\u0445\u043e\u0432\u043e\u0439 \u0433\u0440\u0443\u043f\u043f\u044b \u2014 \u043c\u0438\u043a\u0440\u043e\u0441\u0435\u0440\u0432\u0438\u0441\u043d\u0430\u044f \u0441\u0438\u0441\u0442\u0435\u043c\u0430 \u043d\u0430 Kotlin/Spring; \u0443\u0447\u0430\u0441\u0442\u0438\u0435 \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435 domain-\u0441\u0435\u0440\u0432\u0438\u0441\u043e\u0432.',
            '\u2022 \u0423\u0441\u0442\u0440\u0430\u043d\u0438\u043b race condition \u0432 \u0441\u0435\u0440\u0432\u0438\u0441\u043d\u043e\u043c \u0441\u043b\u043e\u0435: \u0440\u0430\u0441\u043f\u0430\u0440\u0430\u043b\u043b\u0435\u043b\u0438\u043b \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043d\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043c\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445, \u0443\u0441\u0442\u0440\u0430\u043d\u0438\u0432 \u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u043a\u0438 \u043c\u0435\u0436\u0434\u0443 \u043f\u043e\u0442\u043e\u043a\u0430\u043c\u0438',
            '\u2022 \u0420\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043b \u043f\u043e\u043b\u043d\u044b\u0439 \u0432\u0435\u0440\u0442\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0441\u0440\u0435\u0437: Controller \u2192 Service \u2192 Repository \u0441 JPA/PostgreSQL',
        ],
        ['Kotlin', 'Spring Boot', 'Spring WebFlux', 'Kafka', 'PostgreSQL', 'JPA'],
        '\u0418\u044e\u043d\u044c 2024 \u2013 \u0421\u0435\u043d\u0442 2024'
    )

    b.draw_project(
        'HALK-Pay',
        [
            'Android-\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0446\u0438\u0444\u0440\u043e\u0432\u043e\u0433\u043e \u043a\u043e\u0448\u0435\u043b\u044c\u043a\u0430 \u0434\u043b\u044f \u043a\u0440\u0443\u043f\u043d\u043e\u0433\u043e \u0431\u0430\u043d\u043a\u0430 \u0441 NFC-\u043f\u043b\u0430\u0442\u0435\u0436\u0430\u043c\u0438 \u0447\u0435\u0440\u0435\u0437 HCE.',
            '\u2022 \u0421\u043f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043b \u0438 \u0440\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b NFC HCE-\u0441\u0435\u0440\u0432\u0438\u0441 \u2014 \u043a\u043b\u044e\u0447\u0435\u0432\u0443\u044e \u0431\u0438\u0437\u043d\u0435\u0441-\u0444\u0443\u043d\u043a\u0446\u0438\u044e \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f: \u0440\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0432\u0437\u0430\u0438\u043c\u043e\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u0441 \u043f\u043b\u0430\u0442\u0451\u0436\u043d\u044b\u043c \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u043e\u043c',
            '\u2022 \u0412\u043d\u0435\u0434\u0440\u0438\u043b \u043d\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043c\u044b\u0435 \u043d\u0430\u0442\u0438\u0432\u043d\u044b\u0435 security-\u043c\u043e\u0434\u0443\u043b\u0438 (NDK/C): \u0440\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u043c\u043e\u0434\u0443\u043b\u044c\u043d\u0443\u044e \u0441\u0438\u0441\u0442\u0435\u043c\u0443 \u043e\u0431\u043d\u0430\u0440\u0443\u0436\u0435\u043d\u0438\u044f \u0441\u043a\u043e\u043c\u043f\u0440\u043e\u043c\u0435\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0433\u043e \u043e\u043a\u0440\u0443\u0436\u0435\u043d\u0438\u044f \u2014 \u0432\u044b\u043d\u0435\u0441\u0435\u043d\u0430 \u0432 \u043d\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043c\u044b\u0435 Android-\u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0438',
            '\u2022 \u0420\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u043c\u043d\u043e\u0433\u043e\u0443\u0440\u043e\u0432\u043d\u0435\u0432\u044b\u0439 security-\u0441\u043b\u043e\u0439: \u0437\u0430\u0449\u0438\u0442\u0430 \u043a\u0430\u043d\u0430\u043b\u0430 \u0441\u0432\u044f\u0437\u0438, \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0435 \u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435 \u0434\u0430\u043d\u043d\u044b\u0445, \u0437\u0430\u0449\u0438\u0449\u0451\u043d\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430 \u0441 \u043f\u043b\u0430\u0442\u0451\u0436\u043d\u044b\u043c\u0438 \u0434\u0430\u043d\u043d\u044b\u043c\u0438 \u043d\u0430 \u0443\u0440\u043e\u0432\u043d\u0435 UI, \u0448\u0438\u0444\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0445 \u0434\u0430\u043d\u043d\u044b\u0445',
            '\u2022 \u041d\u0430\u0441\u0442\u0440\u043e\u0438\u043b \u043e\u0431\u0444\u0443\u0441\u043a\u0430\u0446\u0438\u044e \u0438 \u0437\u0430\u0449\u0438\u0442\u0443 \u043a\u043e\u0434\u0430 \u0434\u043b\u044f \u043f\u0440\u043e\u0434\u0430\u043a\u0448\u043d-\u0441\u0431\u043e\u0440\u043a\u0438 \u2014 \u0447\u0442\u043e \u0432\u044b\u0432\u0435\u043b\u043e \u043f\u0440\u043e\u0435\u043a\u0442 \u0432 Google Play',
            '\u2022 \u0420\u0435\u0444\u0430\u043a\u0442\u043e\u0440\u0438\u043b \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0443 MVVM: \u0432\u044b\u043d\u0435\u0441 \u043e\u0431\u0449\u0443\u044e \u043b\u043e\u0433\u0438\u043a\u0443 \u0432 \u0431\u0430\u0437\u043e\u0432\u044b\u0435 ViewModel \u0438 \u0444\u0440\u0430\u0433\u043c\u0435\u043d\u0442\u044b, \u0434\u043e\u0431\u0430\u0432\u0438\u043b \u0432\u0430\u043b\u0438\u0434\u0430\u0446\u0438\u044e \u043a\u0430\u0440\u0442\u043e\u0447\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445',
        ],
        ['Kotlin', 'C/C++', 'Android', 'Hilt', 'Retrofit', 'RxJava', 'DexProtector'],
        '\u041c\u0430\u0439 2021 \u2013 \u0414\u0435\u043a 2023'
    )

    b.draw_project(
        'Enterprise MRM',
        [
            '\u041a\u043e\u0440\u043f\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u043e\u0435 MRM-\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0434\u043b\u044f \u043e\u0434\u043d\u043e\u0433\u043e \u0438\u0437 \u043a\u0440\u0443\u043f\u043d\u0435\u0439\u0448\u0438\u0445 \u0440\u0438\u0442\u0435\u0439\u043b\u0435\u0440\u043e\u0432 \u0420\u043e\u0441\u0441\u0438\u0438; \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0430 client-side \u0441 \u043d\u0443\u043b\u044f \u0432 \u0441\u043e\u0441\u0442\u0430\u0432\u0435 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0439 \u043a\u043e\u043c\u0430\u043d\u0434\u044b.',
            '\u2022 \u0421\u043f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043b \u0438 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043b 15+ \u044d\u043a\u0440\u0430\u043d\u043e\u0432: \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043f\u043e\u0440\u0443\u0447\u0435\u043d\u0438\u044f\u043c\u0438/\u0432\u0441\u0442\u0440\u0435\u0447\u0430\u043c\u0438/\u0441\u043e\u0431\u0440\u0430\u043d\u0438\u044f\u043c\u0438, \u043a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0439 \u043a\u0430\u043b\u0435\u043d\u0434\u0430\u0440\u044c (\u0433\u043e\u0434/\u043c\u0435\u0441\u044f\u0446/\u043d\u0435\u0434\u0435\u043b\u044f), \u0444\u0430\u0439\u043b-\u043a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440 \u0441 \u0442\u0430\u0431\u043b\u0438\u0447\u043d\u044b\u043c \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440\u043e\u043c, \u043f\u043e\u0438\u0441\u043a \u043f\u043e \u0434\u0435\u043b\u0430\u043c/\u0432\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u043c/\u043b\u044e\u0434\u044f\u043c',
            '\u2022 \u0412\u043d\u0435\u0434\u0440\u0438\u043b \u043a\u043e\u0440\u043f\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u0443\u044e MDM-\u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044e \u0434\u043b\u044f \u0437\u0430\u0449\u0438\u0442\u044b \u043a\u0430\u043d\u0430\u043b\u0430 \u0441\u0432\u044f\u0437\u0438 \u0438 \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u044f \u0434\u043e\u0441\u0442\u0443\u043f\u0430 \u0432 \u0440\u0430\u043c\u043a\u0430\u0445 enterprise-\u043e\u043a\u0440\u0443\u0436\u0435\u043d\u0438\u044f',
            '\u2022 \u0420\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b offline-first \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0443 \u0441 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u044b\u043c \u043a\u044d\u0448\u0435\u043c (Room) \u0438 \u0441\u0438\u043d\u0445\u0440\u043e\u043d\u0438\u0437\u0430\u0446\u0438\u0435\u0439 \u0447\u0435\u0440\u0435\u0437 Retrofit/OkHttp',
        ],
        ['Kotlin', 'Android', 'Coroutines', 'Retrofit', 'Room', 'Koin', 'Moxy'],
        '\u0410\u0432\u0433 2019 \u2013 \u0418\u044e\u043d\u044c 2021'
    )

    b.draw_project(
        'GameCash',
        [
            '\u041a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u043d\u0430\u044f \u0438\u0433\u0440\u043e\u0432\u0430\u044f \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430 \u0441 \u043b\u043e\u0431\u0431\u0438-\u0441\u0438\u0441\u0442\u0435\u043c\u043e\u0439 \u0438 \u0441\u0442\u0430\u0432\u043a\u0430\u043c\u0438 \u0432 BTC/ETH \u2014 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043b Android-\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0441 \u043d\u0443\u043b\u044f \u0434\u043e production.',
            '\u2022 \u0421\u043f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043b \u0438 \u0440\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u043f\u043e\u043b\u043d\u044b\u0439 \u043a\u043b\u0438\u0435\u043d\u0442: \u0438\u0433\u0440\u043e\u0432\u044b\u0435 \u043b\u043e\u0431\u0431\u0438 \u0441 \u043d\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u043c\u044b\u043c\u0438 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u0430\u043c\u0438, \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043a\u0440\u0438\u043f\u0442\u043e\u043a\u043e\u0448\u0435\u043b\u044c\u043a\u043e\u043c (\u0434\u0435\u043f\u043e\u0437\u0438\u0442/\u0432\u044b\u0432\u043e\u0434), \u0430\u0443\u0442\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044f \u0441 2FA',
            '\u2022 \u0420\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u0441\u0435\u0442\u0435\u0432\u043e\u0439 \u0441\u043b\u043e\u0439 \u043d\u0430 OkHttp \u0438 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e\u0435 \u0445\u0440\u0430\u043d\u0438\u043b\u0438\u0449\u0435 \u043d\u0430 SQLite: \u0441\u0438\u043d\u0445\u0440\u043e\u043d\u0438\u0437\u0430\u0446\u0438\u044f \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044f \u0438\u0433\u0440, \u0438\u0441\u0442\u043e\u0440\u0438\u044f \u0442\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0439',
            '\u2022 \u0421\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u043e \u0432\u044b\u0432\u0435\u043b \u043f\u0440\u043e\u0434\u0443\u043a\u0442 \u0432 production \u2014 \u043e\u0442 \u043f\u0435\u0440\u0432\u043e\u0433\u043e \u043a\u043e\u043c\u043c\u0438\u0442\u0430 \u0434\u043e \u0440\u0435\u043b\u0438\u0437\u0430',
        ],
        ['Java', 'Android', 'OkHttp', 'SQLite'],
        '\u0410\u0432\u0433 2019 \u2013 \u041c\u0430\u0440\u0442 2020'
    )

    # Freelance
    b.draw_experience_header('Freelance', 'Android Developer', '\u0423\u0434\u0430\u043b\u0451\u043d\u043d\u043e', '\u041d\u043e\u044f\u0431 2017 \u2013 \u042f\u043d\u0432 2019')
    b.draw_project(
        'MaybeCoffee',
        [
            '\u0414\u0432\u0430 Android-\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u0434\u043b\u044f \u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u0437\u043d\u0430\u043a\u043e\u043c\u0441\u0442\u0432 \u0441 \u043a\u043e\u043d\u0446\u0435\u043f\u0446\u0438\u0435\u0439 \u00ab\u043f\u043e\u0437\u043d\u0430\u043a\u043e\u043c\u044c\u0441\u044f \u0438 \u0432\u044b\u043f\u0435\u0439 \u043a\u043e\u0444\u0435\u00bb \u2014 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u043e\u0435 \u0438 \u0434\u043b\u044f \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u0430 \u043a\u043e\u0444\u0435\u0435\u043d.',
            '\u2022 \u0420\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b end-to-end \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0439 \u0444\u043b\u043e\u0443: \u043f\u0440\u043e\u0444\u0438\u043b\u0438, \u043f\u043e\u0438\u0441\u043a \u043f\u0430\u0440\u0442\u043d\u0451\u0440\u043e\u0432 \u043d\u0430 \u043a\u0430\u0440\u0442\u0435, \u043c\u0438\u043d\u0438-\u0447\u0430\u0442\u044b \u043f\u043e \u0433\u0435\u043e\u043b\u043e\u043a\u0430\u0446\u0438\u0438',
            '\u2022 \u0420\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043b \u043c\u043e\u0434\u0443\u043b\u044c \u0437\u0430\u043a\u0430\u0437\u0430 \u0438 \u043e\u043f\u043b\u0430\u0442\u044b \u0432\u043d\u0443\u0442\u0440\u0438 \u0447\u0430\u0442\u0430, \u0432\u043a\u043b\u044e\u0447\u0430\u044f \u0438\u0441\u0442\u043e\u0440\u0438\u044e \u0438 \u043e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u043d\u0438\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u043e\u0432',
            '\u2022 \u0420\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0434\u043b\u044f \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u0430 \u043a\u043e\u0444\u0435\u0435\u043d: \u043e\u0447\u0435\u0440\u0435\u0434\u044c \u0437\u0430\u043a\u0430\u0437\u043e\u0432, \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u0430\u043c\u0438, \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430 \u043b\u043e\u044f\u043b\u044c\u043d\u043e\u0441\u0442\u0438',
            '\u2022 \u0414\u043e\u0432\u0451\u043b \u043e\u0431\u0430 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u0434\u043e production-ready \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044f',
        ],
        ['Java', 'Android', 'Firebase', 'Google Maps', 'Retrofit', 'SQLite'],
        '\u041d\u043e\u044f\u0431 2017 \u2013 \u042f\u043d\u0432 2019'
    )

    # Education
    b.draw_section_title('\u041e\u0411\u0420\u0410\u0417\u041e\u0412\u0410\u041d\u0418\u0415')
    b.draw_education([
        {
            'degree': '\u0411\u0430\u043a\u0430\u043b\u0430\u0432\u0440 \u2014 \u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0442\u0438\u043a\u0430 \u0438 \u0432\u044b\u0447\u0438\u0441\u043b\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0442\u0435\u0445\u043d\u0438\u043a\u0430',
            'year': '2020',
            'school': '\u041f\u043e\u0432\u043e\u043b\u0436\u0441\u043a\u0438\u0439 \u0433\u043e\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439 \u0443\u043d\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442 \u0442\u0435\u043b\u0435\u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0439 \u0438 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0442\u0438\u043a\u0438, \u0421\u0430\u043c\u0430\u0440\u0430',
            'field': '',
        },
        {
            'degree': '\u041f\u043e\u0432\u044b\u0448\u0435\u043d\u0438\u0435 \u043a\u0432\u0430\u043b\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u0438 \u2014 Java',
            'year': '2017',
            'school': 'JavaRush',
            'field': '',
        },
    ])

    # Skills
    b.draw_section_title('\u041d\u0410\u0412\u042b\u041a\u0418')
    b.draw_skills([
        {'label': '\u042f\u0437\u044b\u043a\u0438', 'items': ['Kotlin', 'Java', 'C/C++', 'Python', 'TypeScript']},
        {'label': 'Android', 'items': ['Jetpack Compose', 'Navigation Compose', 'DataBinding', 'HCE', 'Room', 'Hilt', 'Koin', 'Moxy', 'Coroutines', 'RxJava', 'EventBus', 'Glide', 'Coil', 'Facebook Shimmer', 'ZXing', 'VisionLabs', 'LibGDX']},
        {'label': '\u0421\u0435\u0442\u044c', 'items': ['Retrofit', 'OkHttp', 'Gson']},
        {'label': '\u0411\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c', 'items': ['Bouncy Castle', 'BER-TLV', 'ProGuard', 'DexProtector', 'JavaPoet']},
        {'label': 'Backend', 'items': ['Spring Boot', 'Spring WebFlux', 'Kafka', 'PostgreSQL', 'SQLite', 'JPA', 'Liquibase', 'Testcontainers']},
        {'label': '\u0424\u0440\u043e\u043d\u0442\u0435\u043d\u0434', 'items': ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion']},
        {'label': '\u0410\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430', 'items': ['MVVM', 'MVP', 'Command Pattern', 'State machine', 'Microservices', 'API Gateway', 'ECS', 'Data-Oriented Design']},
        {'label': '\u0418\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430', 'items': ['Gradle', 'Firebase', 'Google Maps', 'Sentry']},
        {'label': 'AI', 'items': ['n8n', 'Claude Code']},
    ])

    # Languages
    b.draw_section_title('\u042f\u0417\u042b\u041a\u0418')
    b.draw_languages(['\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u2014 \u0420\u043e\u0434\u043d\u043e\u0439', '\u0410\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0438\u0439 \u2014 B1', '\u0418\u0441\u043f\u0430\u043d\u0441\u043a\u0438\u0439 \u2014 A2'])

    # Personal Projects
    b.draw_section_title('\u041b\u0418\u0427\u041d\u042b\u0415 \u041f\u0420\u041e\u0415\u041a\u0422\u042b')
    b.draw_personal_projects([
        {
            'name': 'Boris Portfolio',
            'desc_lines': [
                '\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u0441\u0430\u0439\u0442-\u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e: \u043e\u0434\u043d\u043e\u0441\u0442\u0440\u0430\u043d\u0438\u0447\u043d\u043e\u0435 SPA \u0441 \u0434\u0432\u0443\u044f\u0437\u044b\u0447\u043d\u044b\u043c \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u043e\u043c (EN/RU).',
                '\u2022 \u0420\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b i18n-\u0441\u0438\u0441\u0442\u0435\u043c\u0443 \u043d\u0430 React Context \u0431\u0435\u0437 \u0432\u043d\u0435\u0448\u043d\u0438\u0445 \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a',
                '\u2022 \u0420\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043b \u0430\u043d\u0438\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0447\u0430\u0441\u0442\u0438\u0446\u0435\u0432\u044b\u0439 \u0444\u043e\u043d \u0441 \u0440\u0435\u0430\u043a\u0446\u0438\u0435\u0439 \u043d\u0430 \u0441\u043a\u0440\u043e\u043b\u043b \u0438 \u043c\u044b\u0448\u044c (Canvas API) + scroll-triggered \u0430\u043d\u0438\u043c\u0430\u0446\u0438\u0438 \u0441\u0435\u043a\u0446\u0438\u0439 (Framer Motion)',
                '\u2022 \u041d\u0430\u0441\u0442\u0440\u043e\u0438\u043b \u0434\u0435\u043f\u043b\u043e\u0439 \u043d\u0430 Vercel \u0441 SEO-\u043c\u0435\u0442\u0430\u0442\u0435\u0433\u0430\u043c\u0438, Open Graph \u0438 \u0432\u0441\u0442\u0440\u043e\u0435\u043d\u043d\u043e\u0439 \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u043e\u0439',
            ],
            'stack': ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
            'period': '\u041c\u0430\u0440\u0442 2026 \u2013 \u043d.\u0432.',
        },
        {
            'name': 'AI Personal Agent',
            'desc_lines': [
                '\u041f\u0440\u0438\u0432\u0430\u0442\u043d\u044b\u0439 AI-\u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043d\u0442 \u0434\u043b\u044f \u043f\u043e\u0432\u0441\u0435\u0434\u043d\u0435\u0432\u043d\u043e\u0439 \u0436\u0438\u0437\u043d\u0438 \u2014 \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u0442 \u043a\u0430\u043b\u0435\u043d\u0434\u0430\u0440\u0451\u043c, \u043f\u043e\u043a\u0443\u043f\u043a\u0430\u043c\u0438 \u0438 \u0440\u0435\u0446\u0435\u043f\u0442\u0430\u043c\u0438 \u0432 Notion \u0447\u0435\u0440\u0435\u0437 \u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439 \u044f\u0437\u044b\u043a.',
                '\u2022 \u041f\u043e\u0441\u0442\u0440\u043e\u0438\u043b \u043c\u043d\u043e\u0433\u043e\u0448\u0430\u0433\u043e\u0432\u044b\u0435 n8n-\u0432\u043e\u0440\u043a\u0444\u043b\u043e\u0443: \u043a\u043b\u0430\u0441\u0441\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044f \u0438\u043d\u0442\u0435\u043d\u0442\u0430 \u2192 \u043c\u0430\u0440\u0448\u0440\u0443\u0442\u0438\u0437\u0430\u0446\u0438\u044f \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u043e\u0432 \u2192 \u0432\u044b\u0437\u043e\u0432\u044b Notion API',
                '\u2022 \u0418\u043d\u0442\u0435\u0433\u0440\u0438\u0440\u043e\u0432\u0430\u043b LLM \u043a\u0430\u043a \u0441\u043b\u043e\u0439 \u043e\u0440\u043a\u0435\u0441\u0442\u0440\u0430\u0446\u0438\u0438: \u0430\u0433\u0435\u043d\u0442 \u0440\u0430\u0437\u0431\u0438\u0440\u0430\u0435\u0442 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u043b\u044c\u043d\u044b\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f, \u0438\u0437\u0432\u043b\u0435\u043a\u0430\u0435\u0442 \u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0438 \u0434\u0438\u0441\u043f\u0430\u0442\u0447\u0438\u0442 CRUD-\u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438 \u043f\u043e \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u043c \u0431\u0430\u0437\u0430\u043c Notion',
            ],
            'stack': ['Python', 'n8n'],
            'period': '\u0410\u043f\u0440 2025 \u2013 \u043d.\u0432.',
        },
        {
            'name': 'Simulation of Life',
            'desc_lines': [
                '\u0414\u0435\u0441\u043a\u0442\u043e\u043f\u043d\u0430\u044f \u044d\u0432\u043e\u043b\u044e\u0446\u0438\u043e\u043d\u043d\u0430\u044f \u0441\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u044f \u2014 \u043f\u043e\u043b\u043d\u044b\u0439 \u0446\u0438\u043a\u043b \u043e\u0442 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u044b \u0434\u043e \u043c\u0443\u043b\u044c\u0442\u0438\u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0435\u043d\u043d\u043e\u0439 \u0441\u0431\u043e\u0440\u043a\u0438.',
                '\u2022 \u0421\u043f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043b Data-Oriented ECS \u0441 \u043d\u0443\u043b\u044f: \u043f\u043b\u043e\u0441\u043a\u0438\u0435 \u043f\u0440\u0438\u043c\u0438\u0442\u0438\u0432\u043d\u044b\u0435 \u043c\u0430\u0441\u0441\u0438\u0432\u044b \u0432\u043c\u0435\u0441\u0442\u043e \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432, stateless-\u0434\u0432\u0438\u0436\u043a\u0438, O(1) \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0435/\u0443\u043d\u0438\u0447\u0442\u043e\u0436\u0435\u043d\u0438\u0435 \u0441\u0443\u0449\u043d\u043e\u0441\u0442\u0435\u0439 \u0431\u0435\u0437 \u0430\u043b\u043b\u043e\u043a\u0430\u0446\u0438\u0439 \u0432 hot path',
                '\u2022 \u0420\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043b \u0433\u0435\u043d\u043e\u043c\u043d\u0443\u044e \u0441\u0438\u0441\u0442\u0435\u043c\u0443 \u0441 \u043d\u0430\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u0435\u043c \u0438 \u043c\u0443\u0442\u0430\u0446\u0438\u0435\u0439 (~3% \u043d\u0430 \u0431\u0430\u0439\u0442), \u043c\u043e\u0434\u0435\u043b\u0438\u0440\u0443\u044e\u0449\u0443\u044e \u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439 \u043e\u0442\u0431\u043e\u0440 \u0447\u0435\u0440\u0435\u0437 \u043a\u043e\u043d\u043a\u0443\u0440\u0435\u043d\u0446\u0438\u044e \u0437\u0430 \u0441\u0432\u0435\u0442',
            ],
            'stack': ['Kotlin', 'LibGDX'],
            'period': '\u0421\u0435\u043d\u0442 2025 \u2013 \u043d.\u0432.',
        },
        {
            'name': 'Amazonica',
            'desc_lines': [
                'Android-\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442-\u043c\u0430\u0433\u0430\u0437\u0438\u043d\u0430: \u043a\u0430\u0442\u0430\u043b\u043e\u0433, \u043a\u043e\u0440\u0437\u0438\u043d\u0430, \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f \u2014 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u043e \u0441 \u043d\u0443\u043b\u044f \u043a\u0430\u043a \u043f\u043b\u043e\u0449\u0430\u0434\u043a\u0430 \u0434\u043b\u044f \u043e\u0441\u0432\u043e\u0435\u043d\u0438\u044f Jetpack Compose.',
                '\u2022 \u0421\u043f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043b \u043e\u0434\u043d\u043e\u043c\u043e\u0434\u0443\u043b\u044c\u043d\u0443\u044e Clean Architecture \u0441 \u0440\u0430\u0437\u0431\u0438\u0432\u043a\u043e\u0439 \u043d\u0430 \u0441\u043b\u043e\u0438 data / di / ui \u0438 \u043e\u0431\u0449\u0438\u043c BaseViewModel \u0441 \u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043d\u043d\u043e\u0439 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u043e\u0439 \u043e\u0448\u0438\u0431\u043e\u043a',
                '\u2022 \u0420\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u0432\u043b\u043e\u0436\u0435\u043d\u043d\u0443\u044e \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044e \u0438\u0437 \u0442\u0440\u0451\u0445 NavGraph (Main / Auth / Catalog) \u0438 \u043f\u0430\u0442\u0442\u0435\u0440\u043d Container/Stateless \u0434\u043b\u044f \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0438 Compose Preview',
                '\u2022 \u0412\u043d\u0435\u0434\u0440\u0438\u043b \u043e\u0431\u0451\u0440\u0442\u043a\u0443 RepositoryResult<T> \u0434\u043b\u044f \u0438\u0437\u043e\u043b\u044f\u0446\u0438\u0438 UI \u043e\u0442 \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u043e\u0432 \u0434\u0430\u043d\u043d\u044b\u0445 (Retrofit + Room + SharedPreferences)',
            ],
            'stack': ['Kotlin', 'Android', 'Jetpack Compose', 'Navigation Compose', 'Coroutines', 'Retrofit', 'Room', 'Koin', 'Coil'],
            'period': '\u0414\u0435\u043a 2024 \u2013 \u042f\u043d\u0432 2025',
        },
        {
            'name': '\u041f\u043e\u043c\u043e\u0449\u043d\u0438\u043a \u043f\u043e\u044d\u0442\u0430',
            'desc_lines': [
                'Android-\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0434\u043b\u044f \u043f\u043e\u0434\u0431\u043e\u0440\u0430 \u0440\u0438\u0444\u043c \u0438 \u0441\u0438\u043d\u043e\u043d\u0438\u043c\u043e\u0432 \u2014 \u0434\u0438\u043f\u043b\u043e\u043c\u043d\u044b\u0439 \u043f\u0440\u043e\u0435\u043a\u0442, \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043d \u043d\u0430 Google Play.',
                '\u2022 \u0420\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043b \u0430\u043b\u0433\u043e\u0440\u0438\u0442\u043c \u043f\u043e\u0434\u0431\u043e\u0440\u0430 \u0440\u0438\u0444\u043c \u0438 \u0441\u0438\u043d\u043e\u043d\u0438\u043c\u043e\u0432 \u0441 \u043d\u0443\u043b\u044f: \u0441\u043f\u0430\u0440\u0441\u0438\u043b \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0445 \u0441\u043b\u043e\u0432\u0430\u0440\u0435\u0439, \u043d\u0430\u043f\u043e\u043b\u043d\u0438\u043b \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u0443\u044e SQLite-\u0431\u0430\u0437\u0443 \u0438 \u0440\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u043f\u043e\u0438\u0441\u043a \u043d\u0430 \u0435\u0451 \u043e\u0441\u043d\u043e\u0432\u0435',
                '\u2022 \u0421\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u043e \u043e\u0441\u0432\u043e\u0438\u043b \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u043e\u0434 Android: UI-\u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430, \u0436\u0438\u0437\u043d\u0435\u043d\u043d\u044b\u0439 \u0446\u0438\u043a\u043b Activity/Fragment, \u043c\u043d\u043e\u0433\u043e\u043f\u043e\u0442\u043e\u0447\u043d\u043e\u0441\u0442\u044c, \u0440\u0430\u0431\u043e\u0442\u0430 \u0441 \u0434\u0430\u043d\u043d\u044b\u043c\u0438',
            ],
            'stack': ['Java', 'Android', 'SQLite'],
            'period': '\u041c\u0430\u0439 2017 \u2013 \u041d\u043e\u044f\u0431 2017',
        },
    ])

    b.save()
    print('resume_ru.pdf generated')


if __name__ == '__main__':
    build_en()
    build_ru()
