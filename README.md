# Application README

## Project Overview

This application is a simple table and chart management tool built with modern web development technologies. Users can filter, sort, and edit data within a table. The project demonstrates the use of client-side state management, modals for editing and deleting data, and a flexible architecture that allows for future extensibility.

**Note**: This application does not have a backend. All data is stored and managed locally on the client side.

---

## Features

- **User Authentication**:

  - Users can register and log in.
  - Authentication is handled locally using cookies.

- **Data Management**:

  - View, filter, and sort data in a table format.
  - Edit or delete data via modal dialogs.

- **Charts**:

  - Visualize data trends with interactive charts.

- **Date Selection and Filters**:
  - Filter data by date or category.

---

## Technologies Used

The application leverages the following technologies:

- **Frameworks and Libraries**:

  - [Next.js](https://nextjs.org/) v15.1.6 for server-side rendering and routing.
  - [React](https://reactjs.org/) v19.0.0 for building user interfaces.
  - [Lucide React](https://lucide.dev/) for icons.
  - [React Hook Form](https://react-hook-form.com/) for form handling.
  - [Zod](https://zod.dev/) for schema validation.
  - [Zustand](https://zustand-demo.pmnd.rs/) for state management.
  - [Recharts](https://recharts.org/) for data visualization.

- **Other Tools**:
  - CSS modules and utility classes for styling.
  - Local storage and cookies for data persistence.

---

## Project Architecture

The project is structured as follows:

```
src/
│
├── app/                       # Next.js pages and layouts
│   ├── dashboard/             # Dashboard page
│   ├── data/                  # Data management page
│   └── login/                 # Login and authentication page
│
├── components/                # Reusable UI components
│   ├── Auth-Form/             # Login and registration forms
│   ├── Chart/                 # Chart components
│   ├── Header/                # Header components
│   ├── Modals/                # Modal components (EditModal, DateSelector)
│   ├── Table/                 # Table components
│   └── Logout.tsx             # Logout button
│
├── lib/                       # Utility functions and types
│   ├── actions.ts             # Client-side action handlers
│   ├── api.ts                 # Placeholder for API functions
│   ├── types.ts               # Type definitions
│
├── providers/                 # Global providers (e.g., modal context)
│   └── modal-provider.tsx     # Modal context provider
│
├── store/                     # Zustand store for state management
│   └── auth-store.ts          # Authentication store
│
└── middleware.ts              # Middleware for route protection
```

---

## How It Works

### Data Storage

- All data is stored locally in memory or cookies. No backend is involved.
- Users’ credentials and session data are managed using cookies for authentication.

### Key Components

1. **Table**: Displays data with sorting, filtering, and action buttons (Edit/Delete).
2. **Modals**:
   - `EditModal`: Allows users to modify or delete data entries.
   - `ModalContainer`: Provides a consistent UI wrapper for modal content.
3. **State Management**:
   - `auth-store.ts`: Manages user authentication and session state.
   - Local state (`useState`) handles table and form states.

---

## Getting Started

### Prerequisites

- Node.js installed (version 16 or higher recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser at `http://localhost:3000`.
