## Project Overview

This application is a simple table and chart management tool built with modern web development technologies. Users can filter, sort, and edit data within a table. The project demonstrates the use of client-side state management, modals for editing and deleting data, and a flexible architecture that allows for future extensibility.

**Note**: This application does not have a backend. All data is stored and managed locally on the client side or fetched from static files.

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
  - Environment variables for managing site configuration.

---

## Environment Variables

The application uses an environment variable to configure the base URL for fetching static data:

- `NEXT_PUBLIC_SITE_URL`: Base URL for fetching `chartsData.json` and `tableData.json`. Defaults to `http://localhost:3000`.

Example `.env` file:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

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
│   ├── api.ts                 # Data fetching functions
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

- All data is either hardcoded or fetched from static files (`chartsData.json`, `tableData.json`).
- Users’ credentials and session data are managed using cookies for authentication.

### Key Components

1. **Table**: Displays data with sorting, filtering, and action buttons (Edit/Delete).
2. **Charts**: Displays processed data trends using `Recharts`.
3. **Modals**:
   - `EditModal`: Allows users to modify or delete data entries.
   - `ModalContainer`: Provides a consistent UI wrapper for modal content.
4. **State Management**:
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
3. Create a `.env` file in the root of the project and add the following:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser at `http://localhost:3000`.
