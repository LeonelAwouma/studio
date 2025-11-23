# Leonel Awouma's Portfolio - Next.js & GenAI

[![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FLeonelAwouma%2FPortfolio&countColor=%23263759&style=flat)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2FLeonelAwouma%2FPortfolio)
[![Vercel Deployment](https://img.shields.io/badge/View_Live-black?logo=vercel&style=flat)](https://portfolio-iayg.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leonelawouma)

This is the repository for my personal portfolio website, designed to showcase my skills and experience as a Network & Security Engineer, SOC Analyst, and automation enthusiast. It is a modern, responsive, and multilingual web application built with Next.js and enriched with AI-powered features using Google's Genkit.

The portfolio highlights my technical skills, professional experience, key projects, and certifications in an interactive and visually appealing format.

## 🚀 Live Demo

You can view the live version of the portfolio here: **[portfolio-iayg.vercel.app](https://portfolio-iayg.vercel.app/)**

![Portfolio Screenshot](./public/scam.jpg)

## ✨ Key Features

- **Dynamic & Responsive Design**: Built with Next.js and Tailwind CSS for a fast, mobile-first experience.
- **AI-Powered Insights**: Uses **Google's Genkit** to generate AI summaries and insights for my work experience, providing a deeper look into my skills.
- **Internationalization (i18n)**: Fully bilingual, supporting both **English** and **French** to reach a broader audience.
-**Interactive Project Showcase**: Detailed pages for key projects, allowing visitors to dive deep into my work.
- **Modern UI/UX**: Clean and professional user interface built with **ShadCN UI** components.
- **Contact Form**: An integrated Nodemailer-powered contact form for easy communication.
- **Secure by Design**: Follows best practices by managing sensitive keys and credentials through environment variables.

## 🛠️ Built With

This project leverages a modern and powerful tech stack:

- **Frontend**: [Next.js](https://nextjs.org/) (React Framework)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative**: [Google Genkit](https://firebase.google.com/docs/genkit) & Gemini API
- **Internationalization**: `next-intl`
- **Forms**: `react-hook-form` & `zod`
- **Deployment**: [Vercel](https://vercel.com/)

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/LeonelAwouma/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the following variables. You will need to provide your own credentials for the Gemini API and your email service.

    ```env
    # Your Google AI Gemini API Key
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

    # Your email credentials for the contact form (using Gmail as an example)
    EMAIL_USER="your-email@gmail.com"
    EMAIL_PASS="your-gmail-app-password"
    ```

    > **Note:** For `EMAIL_PASS`, it's highly recommended to use an "App Password" generated from your Google account settings if you have 2-Factor Authentication enabled.

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 🌐 Genkit AI Flows

This project uses Genkit to run AI flows locally. To start the Genkit development server:

```sh
npm run genkit:dev
```

This will start the Genkit developer UI, allowing you to inspect and test the AI flows used in the application.

## 📫 Contact

**Leonel AWOUMA**

- **LinkedIn**: [linkedin.com/in/leonelawouma](https://www.linkedin.com/in/leonelawouma)
- **GitHub**: [@LeonelAwouma](https://github.com/LeonelAwouma)
- **Email**: leonelawouma65@gmail.com

---

_This README was generated with the help of an AI assistant in Firebase Studio._

