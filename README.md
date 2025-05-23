

# 🚀 Elevate AI – AI-Powered Career Advancement Platform

**Elevate AI** is an innovative platform designed to empower individuals in their career journeys using the latest advancements in Artificial Intelligence. Whether you're a student preparing for your first job, a recent graduate seeking opportunities, or a professional looking to advance your career, Elevate AI provides the tools and insights you need to succeed.

---

## 🔑 Key Features

* **AI-Powered Career Guidance:** Receive personalized advice and insights tailored to your industry, skills, and career goals, all driven by advanced AI technology.
* **Smart Resume Creation:** Generate Applicant Tracking System (ATS)-optimized resumes with AI assistance, ensuring your application stands out to recruiters.
* **Intelligent Cover Letter Creation:** Craft compelling and tailored cover letters for specific job applications, leveraging AI to highlight your relevant skills and experience.
* **AI Career Coach:** Get personalized guidance on career paths, skill development, networking strategies, and motivation throughout your job search and career growth.
* **Adaptive Interview Preparation:** Practice with role-specific interview questions and receive instant AI-powered feedback to improve your performance and boost your confidence.
* **Industry Insights:** Stay ahead of the curve with real-time industry trends, salary data, in-demand skills, and comprehensive market analysis.
* **Skill Gap Analysis:** Identify the discrepancies between your current skills and the requirements of your desired roles, receiving actionable recommendations for professional development.
* **Progress Tracking:** Monitor your interview preparation progress with detailed performance analytics, allowing you to identify areas for improvement.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** Prisma ORM with PostgreSQL
* **Authentication:** Clerk
* **AI Integration:** OpenAI API
* **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v14 or above)
* npm or yarn
* PostgreSQL

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/NAIDU0019/AI-POWERED-RESUME-AND-JOB-SEARCH.git
   cd AI-POWERED-RESUME-AND-JOB-SEARCH
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=your_postgresql_database_url
   NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
   CLERK_API_KEY=your_clerk_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

---

## 📁 Project Structure

* `app/`: Contains the main application components and pages.
* `api/`: Backend API routes for handling requests.
* `components/`: Reusable React components.
* `lib/`: Utility functions and libraries.
* `prisma/`: Prisma schema and database migrations.
* `public/`: Static assets.
* `styles/`: Global styles and Tailwind CSS configurations.

---

## 📸 Screenshots

![Dashboard](public/screenshots/dashboard.png)
*Dashboard showcasing personalized career insights.*

![Resume Builder](public/screenshots/resume_builder.png)
*AI-powered resume builder interface.*

![Interview Prep](public/screenshots/interview_prep.png)
*Adaptive interview preparation module.*

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.

2. Create a new branch:

   ```bash
   git checkout -b feature/YourFeature
   ```

3. Commit your changes:

   ```bash
   git commit -m 'Add YourFeature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/YourFeature
   ```

5. Open a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

For any inquiries or feedback, please contact:

* **Name:** RAJ

* **LinkedIn**: https://www.linkedin.com/in/rajappa-adabala

---





