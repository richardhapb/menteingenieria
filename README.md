# Mente Ingenieria Website

Corporate website and blog platform built with Django REST Framework and React. Features a modern UI, blog system, and AI-powered content generation capabilities.

Link: [https://menteingenieria.com](https://menteingenieria.com)

## Technology Stack

### Backend (Django)
- Django REST Framework
- OpenAI integration for content generation (as a sample)
- Contact management system
- Blog content management

### Frontend (React)
- Built with React 18 + Vite
- Modern UI components
- Dynamic article rendering
- KaTeX for mathematical equations
- Responsive navigation and layout
- Markdown support for blog posts

## Project Structure

```bash
├── backend/
│   ├── blog/               # Blog management
│   ├── contact/            # Contact form handling
│   ├── menteingenieria/    # Core Django settings
│   ├── openai_requests/    # AI integration
│   └── manage.py
│
└── frontend/
    └── src/
        └── components/
        │   ├── Article.jsx    # Blog article component
        │   ├── Contact.jsx    # Contact form
        │   ├── Header.jsx     # Site header
        │   ├── Nav.jsx        # Navigation
        │   ├── NewsAI.jsx     # AI-generated content
        │   └── ServicesItem.jsx # Service listings
        └── pages/
            ├── About.jsx        # About page
            ├── ArticleEntry.jsx # Article with full content
            ├── Blog.jsx         # Blog view
            └── Home.jsx         # Home page
```

## Technical Requirements

- Node.js 18+
- Python 3.x
- Django REST Framework
- React 18.2
- Vite 4.x

Built in 2023 as part of a professional portfolio, demonstrating integration of modern web technologies and AI capabilities.
