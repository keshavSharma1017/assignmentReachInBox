# ReachInbox Email Application

A modern email client built with React that provides a streamlined email management experience.

## Features

### Core Functionality
- **Email List View**: Display emails with sender, subject, preview, and timestamp
- **Email Detail View**: Full email content with HTML support
- **Reply Functionality**: Rich text editor with variable insertion
- **Delete Operations**: Remove emails with keyboard shortcuts support
- **Theme Toggle**: Light/dark mode support

### Technical Features
- **Real-time Error Handling**: Graceful error management with user feedback
- **Comprehensive Logging**: Detailed API interaction logging
- **Responsive Design**: Mobile-friendly interface
- **Keyboard Shortcuts**: 
  - `R` - Reply to email
  - `D` - Delete email

### Security
- Token-based authentication
- Secure API communication
- Protected routes with authentication checks

## Architecture

### Frontend Structure
```
src/
 components/
   common/         # Shared components (Header, ThemeToggle)
   editor/         # Email composition components
   features/       # Feature-specific components
   onebox/         # Main email interface components
contexts/           # React context providers
services/           # API service layer
styles/            # Component-specific styles
utils/             # Utility functions
```

### Key Technologies
- React 18.3
- React Router for navigation
- React Quill for rich text editing
- Axios for API communication
- CSS Modules for styling

### State Management
- React Context for global state (auth, theme)
- Local component state for UI interactions
- Prop drilling minimized through context usage

### API Integration
- RESTful API communication
- Comprehensive request/response logging
- Error handling with user feedback
- Automatic token management

### Logging System
The application implements detailed API logging that captures:
- Request details (method, URL, headers, body)
- Response information (status, data, duration)
- Error scenarios with full context
- Performance metrics

```

## Implementation Details

### Authentication Flow
1. User initiates login
2. Redirected to Google OAuth
3. Token stored in localStorage
4. Protected routes check token validity

### Email Operations
- **List View**: Fetches and displays email threads
- **Detail View**: Shows full email content with HTML parsing
- **Reply**: Rich text editor with variable insertion
- **Delete**: Removes emails with immediate UI update

### Error Handling Strategy
- User-friendly error messages
- Automatic retry mechanisms
- Graceful fallbacks
- Network error handling

### Performance Optimizations
- Efficient re-rendering with React hooks
- Lazy loading of components
- Optimized API calls
- Debounced user interactions




