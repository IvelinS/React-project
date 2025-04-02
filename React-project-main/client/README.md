# Book Catalog Application

A React-based web application for managing a book catalog where users can browse, add, edit, and comment on books.

## Features

### Public Access
- Home page with welcome message
- Browse book catalog
- View detailed book information
- User registration
- User login

### Authenticated Users
- Create new books
- Edit own books
- Delete own books
- Add comments to books
- View personal profile with book collection
- Logout functionality

## Technical Implementation

### Architecture
The application is structured into several main directories:
- `/src/components` - Reusable UI components
- `/src/Authentication` - Authentication context and logic
- `/src/services` - API services for books and comments
- `/src/components/pages` - Page-level components

### React Concepts Implemented

#### React Hooks
- useState for local state management
- useEffect for side effects and lifecycle events
- useContext for global state access
- Custom hooks (useAuth)

#### Context API
- AuthContext for global authentication state
- User authentication status
- Login/Register/Logout functionality

#### Components
- Stateless Components (Header, Footer, BookCard)
- Stateful Components (CreateBook, EditBook, ProfilePage)
- Form Components with validation
- Protected Route Components

#### Forms and Events
- Controlled form components
- Form validation
- Synthetic event handling
- Error handling and user feedback


### Security Features
- Route guards for private routes
- Route guards for public routes (preventing authenticated users from accessing login/register)
- Owner-only access for book editing/deletion
- Token-based authentication


## API Integration
The application integrates with a REST API running on `http://localhost:3030` providing:
- User authentication
- Book management
- Comment functionality


