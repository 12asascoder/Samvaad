# Samvaad - Your Cognitive Twin for Learning & Advocacy

<div align="center">
  <h3>🧠 Learn in your unique way. Communicate with confidence.</h3>
  <p><strong>Samvaad</strong> is a human-centered artificial intelligence platform that creates a secure digital twin of an individual's learning and communication style, using it to both teach and advocate on their behalf.</p>
  <p><em>Built with ❤️ for Microsoft Imagine Cup</em></p>
</div>

---

## 🎯 Project Vision

Samvaad addresses a fundamental gap in modern society where education systems focus on delivering knowledge and digital tools automate tasks, but millions of people still struggle to learn effectively, express themselves confidently, and negotiate fairly in real-world situations.

**Samvaad bridges this gap by combining personalized learning intelligence with real-time conversational advocacy.**

### Core Innovation

At its core, Samvaad builds a **cognitive twin** that understands how a person thinks, learns, hesitates, and communicates. By continuously analyzing learning patterns, mistakes, pace, and comprehension style, the platform adapts explanations exactly to the user's needs, ensuring no learner is left behind silently.

This same cognitive understanding extends beyond education into everyday life through an **AI advocate** that speaks, negotiates, and communicates on behalf of the user in calls and chats. Whether it's requesting a fee extension, negotiating a salary, booking essential services, or overcoming language and social barriers, Samvaad converts human intent into polite, context-aware, and culturally sensitive dialogue.

### Accessibility & Equity Foundation

Designed with accessibility and equity at its foundation, Samvaad empowers individuals with:
- Speech or hearing impairments
- Social anxiety
- Language limitations

By giving them a confident and respectful digital voice.

### Powered by Microsoft Azure AI

Built on **Microsoft Azure AI capabilities**, the platform leverages:
- Advanced reasoning models (Azure OpenAI)
- Speech technologies (Azure Speech Services)
- Multilingual understanding (Azure Translator)
- Adaptive learning intelligence (Azure Cognitive Services)

While maintaining strong privacy, transparency, and user control.

**Samvaad does not replace human agency—it amplifies it.** By teaching users in the way they learn best and advocating for them when their voice is constrained, Samvaad aims to create a more inclusive, fair, and empowered digital society where everyone has the ability to learn, communicate, and negotiate with confidence.

---

## ✨ Features

### 🎓 Adaptive Learning Intelligence
- **Personalized Learning Paths** - AI adapts to your unique cognitive patterns (Visual, Auditory, Kinesthetic, Reading/Writing)
- **Real-time Comprehension Tracking** - Monitors understanding and adjusts explanations dynamically
- **Learning Velocity Analysis** - Identifies your optimal learning pace and times
- **Progress Analytics** - Track goals, sessions, and cognitive growth over time

### 🛡️ AI-Powered Advocacy
- **Communication Templates** - Pre-built templates for salary negotiations, complaint resolution, medical appointments, and more
- **Cultural Sensitivity** - Adapts communication style to different contexts and recipients
- **Confidence Building** - Helps users with social anxiety communicate effectively
- **Multi-language Support** - Communicate in 8+ languages

### ♿ Accessibility First
- **Text-to-Speech** - Have any message read aloud
- **Speech-to-Text** - Voice input for hands-free interaction
- **High Contrast Mode** - Enhanced visibility for visual impairments
- **Reduced Motion** - Minimize animations for vestibular disorders
- **Adjustable Font Sizes** - Small to extra-large text options

### 🔒 Privacy & Security
- **Row Level Security** - Your data is protected at the database level
- **Local Processing** - Speech features use browser APIs, not external services
- **User Control** - You own your cognitive profile and can delete it anytime

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account
- Azure OpenAI account (optional, for full AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/samvaad.git
   cd samvaad
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following:
   ```env
   # Required - Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Required - Azure OpenAI (for AI chat capabilities)
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
   AZURE_OPENAI_API_KEY=your_azure_openai_api_key
   AZURE_OPENAI_DEPLOYMENT=gpt-4
   AZURE_OPENAI_API_VERSION=2024-02-15-preview
   
   # Optional - Azure Speech Services (for enhanced TTS/STT)
   NEXT_PUBLIC_AZURE_SPEECH_KEY=your_azure_speech_key
   NEXT_PUBLIC_AZURE_SPEECH_REGION=your_azure_region  # e.g., eastus
   
   # Optional - Azure Translator (for multilingual support)
   NEXT_PUBLIC_AZURE_TRANSLATOR_KEY=your_azure_translator_key
   NEXT_PUBLIC_AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
   NEXT_PUBLIC_AZURE_TRANSLATOR_REGION=your_azure_region
   
   # Optional - Azure Cognitive Services (for sentiment analysis)
   NEXT_PUBLIC_AZURE_COGNITIVE_ENDPOINT=https://your-resource.cognitiveservices.azure.com
   NEXT_PUBLIC_AZURE_COGNITIVE_KEY=your_cognitive_services_key
   ```
   
   **How to get Azure credentials:**
   1. Create an Azure account: https://azure.microsoft.com/free
   2. Create an Azure OpenAI resource: https://portal.azure.com
   3. Deploy a model (gpt-4 or gpt-35-turbo)
   4. Create Azure Speech Services resource (optional)
   5. Create Azure Translator resource (optional)
   6. Create Azure Cognitive Services resource (optional)

4. **Set up the database**
   
   Run the migration in your Supabase SQL editor:
   ```bash
   # The migration file is at:
   supabase/migrations/20250313212230_init.sql
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | Supabase (PostgreSQL) with Row Level Security |
| **Authentication** | Supabase Auth |
| **AI Services** | **Microsoft Azure AI Suite** |
| | • Azure OpenAI (GPT-4) for reasoning |
| | • Azure Speech Services for TTS/STT |
| | • Azure Translator for multilingual support |
| | • Azure Cognitive Services for sentiment analysis |
| **Icons** | Lucide React |
| **Speech** | Azure Speech Services + Web Speech API (fallback) |

---

---

## 🎯 Key Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with feature overview |
| `/login` | Sign in / Sign up |
| `/dashboard` | Main dashboard with neural overview |
| `/dashboard/chat` | AI chat interface (Learning & Advocacy modes) |
| `/dashboard/learning` | Learning analytics and goals |
| `/dashboard/profile` | Profile and preferences |

---

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | Supabase anonymous key |
| `AZURE_OPENAI_ENDPOINT` | ✅ Yes | Azure OpenAI endpoint URL |
| `AZURE_OPENAI_API_KEY` | ✅ Yes | Azure OpenAI API key |
| `AZURE_OPENAI_DEPLOYMENT` | ⚠️ Recommended | Model deployment name (default: gpt-4) |
| `AZURE_OPENAI_API_VERSION` | No | API version (default: 2024-02-15-preview) |
| `NEXT_PUBLIC_AZURE_SPEECH_KEY` | No | Azure Speech Services key (for enhanced TTS/STT) |
| `NEXT_PUBLIC_AZURE_SPEECH_REGION` | No | Azure region for Speech Services |
| `NEXT_PUBLIC_AZURE_TRANSLATOR_KEY` | No | Azure Translator API key |
| `NEXT_PUBLIC_AZURE_TRANSLATOR_ENDPOINT` | No | Azure Translator endpoint |
| `NEXT_PUBLIC_AZURE_TRANSLATOR_REGION` | No | Azure region for Translator |
| `NEXT_PUBLIC_AZURE_COGNITIVE_ENDPOINT` | No | Azure Cognitive Services endpoint |
| `NEXT_PUBLIC_AZURE_COGNITIVE_KEY` | No | Azure Cognitive Services key |

> **Note:** Azure OpenAI is required for full functionality. Other Azure services are optional but recommended for enhanced features like multilingual support and advanced speech capabilities.

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import in [Netlify](https://netlify.com)
3. Set build command: `pnpm build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy!

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🌟 Microsoft Imagine Cup Features

### Azure AI Integration Showcase

Samvaad demonstrates comprehensive use of Microsoft Azure AI services:

1. **Azure OpenAI Service**
   - Advanced reasoning with GPT-4
   - Personalized system prompts based on cognitive profiles
   - Context-aware responses in learning and advocacy modes

2. **Azure Speech Services**
   - Real-time speech-to-text for voice input
   - Natural text-to-speech with neural voices
   - Support for 140+ languages and dialects
   - Accessible communication for users with impairments

3. **Azure Translator**
   - Real-time translation in 12+ languages
   - Cultural sensitivity in translated communications
   - Multilingual advocacy capabilities

4. **Azure Cognitive Services**
   - Sentiment analysis for communication optimization
   - Key phrase extraction for learning insights
   - Language detection for adaptive responses

### Human-Centered Design

- **Privacy First**: Row-level security, user-controlled data
- **Accessibility**: WCAG 2.1 compliant, multiple accessibility options
- **Inclusivity**: Designed for users with disabilities, language barriers, social anxiety
- **Transparency**: Users understand how their cognitive twin works

### Impact Potential

Samvaad addresses United Nations Sustainable Development Goals:
- **Goal 4**: Quality Education (personalized learning)
- **Goal 10**: Reduced Inequalities (accessibility, multilingual support)
- **Goal 16**: Peace, Justice and Strong Institutions (advocacy for fair treatment)

---

## 📊 Key Metrics & Analytics

The platform tracks comprehensive learning analytics:
- Cognitive comprehension scores
- Learning velocity and optimal times
- Communication effectiveness metrics
- Advocacy success rates
- Neural pattern insights

---

## 🎓 Use Cases

### Learning Scenarios
- Students struggling with traditional teaching methods
- Adult learners acquiring new skills
- Individuals with learning disabilities
- ESL learners improving comprehension

### Advocacy Scenarios
- Salary negotiations
- Fee extension requests
- Medical appointment bookings
- Complaint resolution
- Service bookings
- Language barrier communication
- Social anxiety support

---

## 🔬 Technical Architecture

### Cognitive Twin Engine
- Continuous learning pattern analysis
- Real-time adaptation to user needs
- Neural pattern detection and storage
- Personalized response generation

### Advocacy Engine
- Context-aware message generation
- Cultural sensitivity adaptation
- Template-based communication
- Success tracking and optimization

### Data Privacy
- End-to-end encryption for sensitive data
- Row-level security in database
- User-controlled data deletion
- Transparent privacy policies

---

## 📱 Application Structure

```
Samvaad/
├── app/
│   ├── api/
│   │   ├── chat/              # AI chat endpoint with Azure OpenAI
│   │   ├── advocacy/          # Advocacy templates API
│   │   └── azure/             # Azure services proxies
│   │       ├── translate/     # Translation API
│   │       └── sentiment/     # Sentiment analysis API
│   ├── dashboard/
│   │   ├── chat/              # Main chat interface
│   │   ├── learning/          # Learning analytics dashboard
│   │   ├── profile/           # User profile settings
│   │   └── page.tsx           # Main dashboard
│   ├── login/                 # Authentication
│   └── page.tsx               # Landing page
├── components/
│   └── ui/                    # Reusable UI components
│       ├── AccessibilityPanel.tsx
│       └── AdvocacyTemplateSelector.tsx
├── lib/
│   ├── ai/                    # AI logic & prompts
│   │   ├── cognitive-twin.ts  # Cognitive twin engine
│   │   ├── advocacy-templates.ts
│   │   └── learning-analytics.ts  # Advanced analytics
│   ├── azure/                 # Azure AI integrations
│   │   ├── speech.ts          # Speech Services
│   │   ├── translator.ts      # Translator API
│   │   └── cognitive-services.ts  # Cognitive Services
│   ├── accessibility/         # Speech services
│   └── supabase/              # Database clients
└── supabase/
    └── migrations/            # Database schema
```

---

## 🤝 Contributing

We welcome contributions! This project is built for the Microsoft Imagine Cup, and we're excited to see how the community can help improve it.

### Development Guidelines
1. Follow TypeScript best practices
2. Maintain accessibility standards (WCAG 2.1)
3. Test with multiple user personas
4. Document all Azure service integrations
5. Respect user privacy in all features

---

---

## 🙏 Acknowledgments

- **Microsoft Azure AI** for providing powerful AI capabilities
- **Supabase** for secure, scalable backend infrastructure
- **Next.js** for the excellent framework
- **The accessibility community** for inspiration and guidance

---

<div align="center">
  <p><strong>Samvaad</strong> - Amplifying your voice, adapting to your mind.</p>
  <p>Built with ❤️ for accessibility, equity, and human-centered AI</p>
  <p><em>Microsoft Imagine Cup 2024 Submission</em></p>
</div>
