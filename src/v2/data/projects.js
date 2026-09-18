export const projects = [
  {
    slug: 'malware-classifier',
    title: 'Malware Image Classification',
    tagline: 'Detecting malware families through computer vision',
    description: 'A machine learning project that classifies malware by converting binary samples into grayscale images and running them through a classification model. Applies computer vision techniques to cybersecurity threat detection.',
    overview: `Traditional malware detection relies on signatures or dynamic analysis — both have significant drawbacks. This project takes a different approach: converting malware binaries into grayscale images and using computer vision to classify them by family.\n\nThe insight is that malware from the same family shares structural similarities in memory layout, code patterns, and data sections that become visually distinguishable when the binary is rendered as an image.`,
    howItWorks: `Each byte of the binary file is mapped to a pixel intensity value (0–255), producing a grayscale image whose width is fixed and height scales with file size. These images are fed into a convolutional neural network trained on labeled malware samples.\n\nThe CNN learns to recognize visual patterns corresponding to specific malware families — no code execution required. This makes it fast, safe, and effective against obfuscated or packed variants that evade signature-based detection tools.`,
    features: [
      'Binary-to-image conversion pipeline',
      'CNN-based malware family classification',
      'No code execution — static analysis only',
      'Effective against obfuscated / packed variants',
      'TensorBoard training metric visualization',
      'REST API with Flask serving predictions',
    ],
    techStack: [
      {
        category: 'Machine Learning',
        items: ['TensorFlow 2.18', 'Keras (Sequential CNN)', 'OpenCV 4.11', 'NumPy 2.0', 'TensorBoard'],
      },
      {
        category: 'Backend',
        items: ['Python', 'Flask 3.1', 'Gunicorn'],
      },
      {
        category: 'Frontend',
        items: ['React 19', 'React Router DOM 7', 'Vite 6'],
      },
      {
        category: 'Deployment',
        items: ['Vercel (frontend)', 'Heroku (backend)'],
      },
    ],
    highlights: ['Neural Network (CNN)', 'Python', 'TensorFlow / Keras', 'OpenCV', 'Flask', 'React', 'Vercel'],
    tags: ['Python', 'Machine Learning', 'Computer Vision', 'Cybersecurity'],
    badge: { label: 'BDAA 1st Place', color: 'gold' },
    live: 'https://malware-image-classification.vercel.app/',
    github: '',
    wip: false,
  },
  {
    slug: 'aes-image-messenger',
    title: 'AES Image Messenger',
    tagline: 'Two-layer security — encryption meets steganography',
    description: 'A secure messaging tool that hides encrypted text messages inside images using AES encryption combined with least significant bit (LSB) steganography. Merges cryptography with image processing to enable confidential communication.',
    overview: `AES Image Messenger provides two layers of security for sensitive communication: first encrypting the message with AES-256-GCM, then concealing the ciphertext inside an ordinary image using LSB steganography. The resulting image looks visually identical to the original — the hidden message is completely invisible.\n\nThis dual-layer approach means an adversary must first detect that a message is hidden (non-trivial with LSB steganography), then break AES-256-GCM — a practically infeasible combination.`,
    howItWorks: `The message is encrypted using AES-256-GCM with a key derived from the user's passphrase via PBKDF2 + SHA-256 (100,000 iterations), producing authenticated ciphertext with a random 16-byte salt and 12-byte nonce per message. That ciphertext is embedded into the image by overwriting the least significant bit of the blue channel of each pixel.\n\nSince the human eye cannot perceive single-bit color changes, the image appears unchanged. To decode, the recipient provides the same image and passphrase — the app extracts the LSB bits, reconstructs the ciphertext, and decrypts it with AES-GCM, which also verifies the message hasn't been tampered with.`,
    features: [
      'AES-256-GCM authenticated encryption',
      'PBKDF2 + SHA-256 key derivation (100k iterations)',
      'LSB steganography — visually undetectable',
      'No messages stored server-side',
    ],
    techStack: [
      {
        category: 'Frontend',
        items: ['React', 'Vite'],
      },
      {
        category: 'Backend',
        items: ['Python', 'FastAPI', 'Pillow', 'PyCryptodome'],
      },
      {
        category: 'Security / Algorithms',
        items: ['AES-256-GCM', 'PBKDF2 + SHA-256', 'LSB Steganography'],
      },
      {
        category: 'Deployment',
        items: ['Vercel (frontend)', 'Render (backend)'],
      },
    ],
    highlights: ['AES-256-GCM', 'PBKDF2 Key Derivation', 'LSB Steganography', 'Python', 'FastAPI', 'React'],
    tags: ['Python', 'AES Encryption', 'Steganography', 'React'],
    live: 'https://aes-image-messenger-frontend.vercel.app/',
    github: '',
    wip: false,
  },
  {
    slug: 'verdict',
    title: 'Verdict',
    tagline: 'AI-powered college admissions prediction tool',
    description: 'A college admissions prediction tool that simulates how real admissions committees evaluate applications. Analyzes student profiles across 150+ US colleges and generates tiered lists with predicted acceptance chances and feedback.',
    overview: `Verdict helps students navigate the college admissions process by simulating how admissions committees evaluate applications. Students input their academic profile — GPA, test scores, extracurriculars — and receive acceptance probability estimates across 150+ US colleges, organized into Reach, Match, and Safety tiers.\n\nThe goal is to give applicants a realistic picture of their chances before committing to application fees, while also surfacing schools they might not have considered.`,
    howItWorks: `Verdict uses a weighted scoring model that evaluates student profiles against historical admission data and published institutional statistics. Each college's model accounts for GPA, standardized test scores, extracurricular strength, and other factors weighted by that school's known priorities.\n\nThe AI layer generates personalized feedback explaining why a student's chances are high or low at a specific school and which factors are most influential in their profile.`,
    features: [
      '150+ US colleges covered',
      'Reach / Match / Safety tiering',
      'AI-powered essay analysis via Claude',
      'ML prediction models trained on real applicant data',
      'Interactive US college map',
      'Authentication & persistent profiles via Supabase',
    ],
    techStack: [
      {
        category: 'Frontend',
        items: ['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'shadcn/ui + Base UI', 'React Hook Form + Zod'],
      },
      {
        category: 'AI / API',
        items: ['Anthropic Claude API'],
      },
      {
        category: 'Database & Auth',
        items: ['Supabase (Postgres)'],
      },
      {
        category: 'ML Layer',
        items: ['Python', 'XGBoost', 'scikit-learn', 'FastAPI', 'pandas'],
      },
      {
        category: 'Infrastructure',
        items: ['Vercel'],
      },
    ],
    highlights: ['Python', 'Next.js', 'React', 'TypeScript', 'Supabase', 'XGBoost / scikit-learn', 'Claude API', 'Vercel'],
    tags: ['AI', 'Web App', 'Education'],
    live: 'https://verdict-lake.vercel.app/',
    github: '',
    wip: false,
  },
];
