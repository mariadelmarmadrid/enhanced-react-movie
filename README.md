# 🎬 TMDB Client – Enhanced React Movie App

An enhanced React web application that connects to **The Movie Database (TMDB) API**, allowing users to explore, filter, and interact with movie data in a modern and responsive interface.  
This project extends the base coursework version with **pagination, improved design, MUI components, and a dynamic watchlist system**.

---

## 🚀 Features Implemented

### 🎨 1. Modern UI / UX Redesign
- Updated **Site Header** with a purple gradient and responsive navigation bar.
- Redesigned **Filter Bar** with MUI components and soft lilac background.
- Consistent color palette across all screens for a cohesive experience.
- Improved movie card layout with rating badges, release dates, and hover effects.

### 🧩 2. Core Functionality
- Displays movies using **TMDB API** (Discover, Popular, Upcoming, Now Playing, Top Rated).
- Each movie card links to a **detailed page** with:
  - Movie overview
  - Runtime, genres, and ratings
  - Production countries
  - Cast and crew (Director, Writers, Producers)
    - “More” button to view full cast and crew.
  - Recommended Movies

### ❤️ 3. Favorites and Watchlist
- Add or remove movies from:
  - **Favorites**
  - **Watchlist**
- Managed through React Context API (`MoviesContext`).

### 🔍 4. Filtering and Sorting
- Filter movies by:
  - Search title
  - Genre
  - Sort by release date or title.
- Built with **Material UI Select**, **TextField**, and **Stack** components.

### 📄 5. Pagination
- Implemented pagination across pages using MUI’s `Pagination` component.
- Available on:
  - Home (Discover)
  - Popular
  - Upcoming
  - Now Playing
  - Top Rated
- Smooth scroll-to-top behavior when changing pages.

### 🌍 6. Language and Region
- User can switch between **languages** (English, Spanish, French) and **regions** (IE, US, GB, ES).
- Integrated globally using context for all API requests.

### 🏠 Home Page
![Home Page Screenshot](./screenshots/homePage.png)
