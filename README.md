# 📄 Simple Resume Builder Web Application

A lightweight, frontend-only resume builder that allows users to create a professional resume directly in the browser and export it as a PDF file. The application requires no authentication or backend services, ensuring fast performance and ease of use.

---

## 📌 Project Overview

The **Simple Resume Builder Web Application** enables users to input personal and professional information, preview their resume in real time, and download the final output as a PDF.  

All data handling and PDF generation are performed entirely on the client side, making the application ideal for quick resume creation without account registration or data storage.

---

## ✨ Key Features

### User Features
- **Resume Form Input**
  - Personal information (name, contact details)
  - Professional summary
  - Education and work experience
  - Skills and additional sections

- **Live Resume Preview**
  - Real-time updates as users edit content
  - Clean and professional layout

- **PDF Export**
  - Download the resume as a **PDF file**
  - Print-ready formatting
  - Optimized for standard resume sizes

- **Privacy-Focused**
  - No backend or database
  - No data persistence or tracking
  - All information stays in the browser

---

## ⚙️ Application Behavior
- Resume data is stored temporarily in browser state
- PDF files are generated client-side using browser or JavaScript-based PDF utilities
- No user authentication or server communication required

---

## 🧱 Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Language:** TypeScript / JavaScript
- **PDF Generation:** Client-side libraries (e.g., html-to-pdf / jsPDF)
- **Backend:** None (Frontend-only)

---

## 🔧 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/semajame/simple-resume-builder.git

# Install dependencies
npm install

# Run the development server
npm run dev
