// Content sourced from the owner's existing portfolio (my-portofolio).
export const profile = {
  name: 'Jordy Cahya Buana',
  role: 'Creative Web Developer',
  typewriter: ['Creative Developer', 'Front-End Developer', 'Web Developer'],
  tagline:
    'I design and build premium web applications, translating complex ideas into elegant, responsive, and high-performance digital experiences.',
  location: 'Malang, Indonesia',
  email: 'buana779@gmail.com',
  photo: import.meta.env.BASE_URL + 'jordy.jpg',
  resume: import.meta.env.BASE_URL + 'CV_Jordy_Cahya_Buana.pdf',
  aboutTitle: 'Fusing Design with Technical Precision',
  about: [
    'I am a motivated Informatics Engineering graduate from Brawijaya University, specializing in Front-End Development. As a dedicated vibe coder, I thrive on bridging the gap between design and functionality — combining intuitive AI-assisted workflows and modern tech to build scalable, responsive web applications. My expertise spans the JavaScript ecosystem, including React, Next.js, and advanced CSS frameworks.',
    'With a strong focus on responsive architecture, fluid micro-interactions, and computational efficiency, I transform complex ideas into high-impact digital products across the modern JavaScript and mobile ecosystems.',
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/Joestarjordy' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jordycahya/' },
  ],
}

export const skills = [
  'HTML5 / CSS3', 'Modern ES6+ JS', 'TypeScript', 'React.js', 'Next.js', 'Kotlin',
  'Android SDK', 'Jetpack Compose', 'PostgreSQL / MySQL', 'MongoDB / Redis', 'Docker / Git',
]

export const stats = [
  { value: 'S.Kom', label: 'Informatics Engineering' },
  { value: "'23", label: 'Bangkit Alum' },
  { value: '1', label: 'Published Paper' },
]

export const experience = [
  {
    role: 'Internship',
    date: 'Feb 2023 – Jul 2023',
    org: 'Bangkit Academy (by Google, GoTo, Traveloka)',
    desc: 'Developed native Android applications using Kotlin, Android SDK, and modern system architectures under mentorship from top tech companies.',
  },
  {
    role: 'Student — Informatics Engineering (S.Kom)',
    date: 'Jan 2020 – Dec 2025',
    org: 'Universitas Brawijaya · Faculty of Computer Science (FILKOM)',
    desc: 'Built a foundation in Software Architecture, Web & Mobile Systems, and Algorithmic Problem Solving while leading research on declarative UI performance.',
  },
]

export const education = {
  school: 'Universitas Brawijaya',
  faculty: 'Faculty of Computer Science (FILKOM)',
  degree: 'Informatics Engineering (S.Kom)',
  date: 'Jan 2020 - Dec 2025',
  location: 'Malang, Indonesia',
  summary:
    'Six years at one of Indonesia\'s leading computer science faculties - building a foundation in Software Architecture, Web & Mobile Systems and Algorithmic Problem Solving, and finishing with published research on declarative UI performance.',
  highlights: ['Software Architecture', 'Web & Mobile Systems', 'Algorithmic Problem Solving', 'Published Thesis Paper'],
  milestones: [
    { year: '2020', title: 'Enrolled at FILKOM', desc: 'Began the Informatics Engineering programme at Universitas Brawijaya, Malang.' },
    { year: '2023', title: 'Bangkit Academy', desc: 'Selected for the Google, GoTo & Traveloka programme - shipped native Android apps with Kotlin.' },
    { year: '2024', title: 'Thesis research', desc: 'Benchmarked RecyclerView against Jetpack Compose LazyColumn - frame latency, memory and scroll velocity.' },
    { year: '2025', title: 'Graduated - S.Kom', desc: 'Completed the degree and published the research in Jurnal PTIIK, Universitas Brawijaya.' },
  ],
  focus: [
    { icon: 'mobile', title: 'Mobile Engineering', desc: 'Native Android from XML and RecyclerView to modern Jetpack Compose, with performance profiling.', tags: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Macrobenchmark'] },
    { icon: 'web', title: 'Web Development', desc: 'Responsive front-ends, fluid micro-interactions and game-like experiences on the web.', tags: ['React', 'Next.js', 'TypeScript', 'CSS'] },
    { icon: 'research', title: 'Research & Performance', desc: 'Empirical, data-driven comparison of UI toolkits - methodology, measurement and writing.', tags: ['Benchmarking', 'Profiling', 'Academic Writing'] },
    { icon: 'systems', title: 'Systems & Architecture', desc: 'Software engineering coursework applied to full-stack projects with databases and clean structure.', tags: ['PHP', 'MySQL', 'Software Design'] },
  ],
}
export const thesis = {
  title:
    'Comparative Analysis of RecyclerView and LazyColumn Performance in Displaying Data Collection in Android Applications',
  journal: 'Jurnal PTIIK, Universitas Brawijaya',
  summary:
    'Empirical research measuring frame render latency, memory overhead, and scroll velocity comparing Jetpack Compose with traditional RecyclerView.',
  href: 'https://j-ptiik.ub.ac.id/index.php/j-ptiik/article/view/16234/7161',
  cover: import.meta.env.BASE_URL + 'thesis_cover.jpg',
}

export type Category = 'web' | 'mobile' | 'system'
export const categories: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web Apps & Games' },
  { id: 'mobile', label: 'Android' },
  { id: 'system', label: 'Benchmarks' },
]

const gh = (r: string) => `https://github.com/Joestarjordy/${r}`
export const projects: {
  id: string; title: string; cat: string; category: Category; desc: string
  tags: string[]; color: string; github: string; live?: string
}[] = [
  {
    id: '01', title: 'Pixel Rush', cat: 'Arcade Web Game', category: 'web', color: '#ff6b9d',
    desc: 'A pseudo-3D pixel-art arcade racer built from scratch with plain HTML5 Canvas and JavaScript. 4 unique stages, AI rivals, segment projection, and procedural audio.',
    tags: ['HTML5 Canvas', 'JavaScript', 'Web Audio', 'Game Loop'], github: gh('Pixel-Rush'),
  },
  {
    id: '02', title: 'Ketik', cat: 'Web App', category: 'web', color: '#5ee7ff',
    desc: 'A zero-dependency typing speed trainer with real-time WPM, accuracy heatmaps, bilingual wordlists, and adaptive weak-key drills.',
    tags: ['JavaScript', 'CSS3', 'LocalStorage', 'Bilingual'], github: gh('Ketik'),
  },
  {
    id: '03', title: 'My-Saku', cat: 'Web App', category: 'web', color: '#c6ff3d',
    desc: 'A privacy-first personal finance and expense tracker with hand-drawn SVG charts, monthly category budgets, and zero external dependencies.',
    tags: ['JavaScript', 'SVG Charts', 'CSS Grid', 'LocalStorage'], github: gh('My-Saku'),
  },
  {
    id: '04', title: 'The Legend of Knight', cat: 'Web Game', category: 'web', color: '#ffb84d',
    desc: 'A pixel-art adventure game: play the brave knight to save the kidnapped princess and bring joy back to the kingdom.',
    tags: ['JavaScript', 'Pixel Art', 'Game'], github: gh('The-Legend-of-Knight'),
    live: 'https://joestarjordy.github.io/The-Legend-of-Knight/',
  },
  {
    id: '05', title: 'Android Fordaku', cat: 'Android App', category: 'mobile', color: '#4fd1c5',
    desc: 'A native Android community and forum platform built for communication and interactive thread discussions.',
    tags: ['Kotlin', 'Android SDK', 'Retrofit'], github: gh('Android_Fordaku'),
  },
  {
    id: '06', title: 'Complex LazyColumn', cat: 'Jetpack Compose', category: 'mobile', color: '#30cfd0',
    desc: 'Benchmark subject comparing declarative list loading with traditional XML layout managers using Jetpack Compose.',
    tags: ['Kotlin', 'Jetpack Compose', 'Benchmark'], github: gh('Complex-LazyColumn'),
  },
  {
    id: '07', title: 'Complex RecyclerView', cat: 'Android XML', category: 'mobile', color: '#8b9cff',
    desc: 'Android XML view rendering performance validation subject, designed for scroll-loading benchmarking in academic research.',
    tags: ['Kotlin', 'Android XML', 'RecyclerView'], github: gh('Complex-RecyclerView'),
  },
  {
    id: '08', title: 'Macrobenchmark Startup', cat: 'Benchmarks', category: 'system', color: '#a78bfa',
    desc: 'An automated suite profiling app startup, render frames, and scrolling velocities with Jetpack Macrobenchmark.',
    tags: ['Kotlin', 'Macrobenchmark', 'Performance'], github: gh('Macrobenchmark'),
  },
  {
    id: '09', title: 'Projek RPL', cat: 'Software Eng', category: 'web', color: '#80d0c7',
    desc: 'Collaborative software-engineering class application validating design cycles, system patterns, and relational databases.',
    tags: ['PHP', 'MySQL', 'Hack'], github: gh('Projek-RPL'),
  },
]
