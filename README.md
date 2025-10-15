## Backend Notes

### .env
**Purpose**: Environment configuration file
- Stores sensitive configuration data
- Contains MongoDB Atlas connection string
- **Key Variable**: `MONGODB_ATLAS_CLUSTER_URI` - MongoDB Atlas cluster connection URI
- **Security**: Should never be committed to version control (add to .gitignore)

---

### database.py
**Purpose**: Database layer for MongoDB operations

**Key Components**:
- **`DatabaseManager` class**: Main database interface
  - `__init__`: Initializes MongoDB connection and sets up collections
  - `init_database()`: Creates indexes for performance (unique email, user_id index)
  
**CRUD Operations**:
- **Users**:
  - `create_user(name, email, age)`: Creates new user document
  - `get_all_users()`: Retrieves all users, converts ObjectId to string
  - `delete_user(user_id)`: Deletes user and all their posts (cascade delete)
  
- **Posts**:
  - `create_post(user_id, title, content)`: Creates post linked to user
  - `get_user_posts(user_id)`: Gets all posts by specific user
  
- **Utilities**:
  - `close_connection()`: Properly closes MongoDB connection
  - `display_menu()`: CLI menu display
  - `main()`: Interactive command-line interface

**Key Features**:
- Error handling with try-catch blocks
- ObjectId validation and conversion
- Automatic timestamp (`created_at`) on documents
- Indexed fields for query optimization

---

### api.py
**Purpose**: FastAPI REST API server

**Configuration**:
- **CORS Middleware**: Allows frontend (localhost:5173) to make API calls
- **Pydantic Models**: Type validation for requests/responses
  - `UserCreate`, `UserResponse`: User data structures
  - `PostCreate`, `PostResponse`: Post data structures

**API Endpoints**:

**Root**:
- `GET /`: Health check endpoint

**Users**:
- `POST /users/`: Create new user
- `GET /users/`: Get all users
- `GET /users/{user_id}`: Get specific user
- `PUT /users/{user_id}`: Update user
- `DELETE /users/{user_id}`: Delete user (cascade deletes posts)

**Posts**:
- `POST /posts/`: Create new post
- `GET /posts/`: Get all posts
- `GET /users/{user_id}/posts`: Get posts by user
- `PUT /posts/{post_id}`: Update post
- `DELETE /posts/{post_id}`: Delete post

**Error Handling**:
- HTTP status codes (201 Created, 404 Not Found, 400 Bad Request, 500 Internal Error)
- ObjectId validation
- User existence validation for post creation
- Detailed error messages

**Lifecycle**:
- `startup_event`: Validates database connection on startup
- `shutdown_event`: Closes database connection on shutdown

---

### streamlit_app.py
**Purpose**: Streamlit-based admin dashboard UI

**Structure**:
- **Configuration**: Page layout, title, icon settings
- **API Integration**: Makes HTTP requests to FastAPI backend

**Helper Functions**:
- `check_api_connection()`: Verifies FastAPI server is running
- `create_user()`, `get_all_users()`, etc.: API wrapper functions
- All CRUD operations mirrored from API

**Pages**:
1. **Users Page** (`users_page()`):
   - Tab 1: Create user form
   - Tab 2: View all users in table
   - Tab 3: Update/delete user management

2. **Posts Page** (`posts_page()`):
   - Tab 1: Create post with user selection
   - Tab 2: View all posts with expandable details
   - Tab 3: View posts filtered by user

3. **Dashboard Page** (`dashboard_page()`):
   - Metrics cards (total users, posts, averages)
   - Age distribution chart
   - Recent activity timeline
   - Recent posts list

**Features**:
- Real-time data updates with `st.rerun()`
- Form validation
- Pandas DataFrames for data display
- Interactive charts
- Error handling with success/error messages

---

## Frontend Notes

### Configuration Files

#### package.json
**Purpose**: Node.js project configuration
- **Scripts**: `dev`, `build`, `start`, `typecheck`
- **Dependencies**: React Router v7, React 19, Lucide icons
- **Dev Dependencies**: Vite, TypeScript, Tailwind CSS v4

#### tsconfig.json
**Purpose**: TypeScript compiler configuration
- ES2022 target and module system
- React JSX transformation
- Path aliases (`~/` points to `./app/`)
- Strict type checking enabled

#### vite.config.ts
**Purpose**: Vite build tool configuration
- **Plugins**: React Router, Tailwind CSS, tsconfig paths
- **Dev Server Proxy**: Routes `/api/*` to backend (`http://localhost:8000`)
- Enables HMR (Hot Module Replacement)

#### react-router.config.ts
**Purpose**: React Router configuration
- **SSR**: Disabled (SPA mode) - `ssr: false`

---

### Styling

#### app.css
**Purpose**: Global styles with retro/cyberpunk theme

**CSS Variables** (Theme):
- Dark colors: `#0a0e27` (background), `#1a1f3a` (surface)
- Neon colors: cyan (`#00ffff`), magenta (`#ff00ff`), green (`#00ff00`)

**Effects**:
- `.neon-text`: Glowing text effect with text-shadow
- `.retro-button`: Sliding highlight animation on hover
- Scanline overlay on body (`:before` pseudo-element)
- Custom scrollbar styling (cyan colored)

**Form Styling**:
- Dark backgrounds with neon borders
- Cyan focus glow effect
- Monospace font family

**Animations**:
- `flicker`: Subtle opacity animation
- `pulse-glow`: Pulsing shadow effect

---

### Routing

#### routes.ts
**Purpose**: Route configuration
- **Routes**:
  - `/` → home.tsx
  - `/user` → user.tsx
  - `/post` → post.tsx
  - `/dashboard` → dashboard.tsx

#### root.tsx
**Purpose**: Root layout component
- HTML structure with meta tags
- Font loading (Inter from Google Fonts)
- Error boundary for handling route errors
- Renders `<Outlet />` for nested routes

---

### Components

#### Navbar.tsx
**Purpose**: Navigation bar component

**Features**:
- Responsive design (mobile hamburger menu)
- Active route highlighting using `useLocation()`
- Navigation items: HOME, USERS, POSTS, STATS
- Neon-themed styling with hover effects
- Mobile toggle state management

---

#### PageLayout.tsx
**Purpose**: Consistent page wrapper layout

**Props**:
- `children`: Page content
- `title`: Page heading
- `actions`: Optional action buttons (top-right)

**Structure**:
- Includes `Navbar`
- Centered content container with padding
- Neon-styled title with uppercase transform

---

#### Card.tsx
**Purpose**: Styled container component

**Features**:
- Dark background with border
- Decorative corner elements (cyan borders)
- Relative positioning for nested content
- Accepts custom className for extensions

---

#### Button.tsx
**Purpose**: Themed button component

**Props**:
- `children`: Button text
- `onClick`: Click handler
- `type`: HTML button type
- `variant`: `primary` | `secondary` | `danger`
- `icon`: Optional Lucide icon component

**Variants**:
- **Primary**: Cyan background, dark text
- **Secondary**: Dark background, light text
- **Danger**: Magenta background, dark text

**Features**:
- Retro hover animation (sliding highlight)
- Icon + text layout with gap
- Uppercase text with tracking

---

#### IconButton.tsx
**Purpose**: Small icon-only button

**Props**:
- `icon`: Lucide icon component
- `onClick`: Click handler
- `variant`: Color scheme
- `title`: Tooltip text

**Use Cases**: Edit, delete actions in tables/cards

---

#### FormInput.tsx
**Purpose**: Styled text/number input field

**Props**:
- `label`: Field label
- `type`: Input type (text, email, number)
- `value`: Current value
- `onChange`: Change handler
- `required`, `placeholder`, `min`, `max`, `disabled`

**Features**:
- Uppercase label with cyan color
- Dark input with cyan focus border
- Focus glow effect
- Number validation (handles NaN)

---

#### FormTextarea.tsx
**Purpose**: Multi-line text input

**Props**: Similar to FormInput + `rows` for height

---

#### FormSelect.tsx
**Purpose**: Dropdown select input

**Props**:
- `options`: Array of `{value, label}` objects
- `placeholder`: Default option text

**Features**:
- Dark-styled options
- Cyan focus highlight

---

#### LoadingSpinner.tsx
**Purpose**: Loading indicator

**Features**:
- Animated spinning border (cyan)
- Blur effect for glow
- "LOADING..." text with pulse animation

---

#### ErrorMessage.tsx
**Purpose**: Error display component

**Features**:
- Magenta border (danger color)
- Warning icon (⚠)
- Error title and message

---

#### EmptyState.tsx
**Purpose**: Empty data placeholder

**Features**:
- Dashed border box
- Large "[ ]" symbol
- Gray message text

---

#### StatCard.tsx
**Purpose**: Dashboard metric card

**Props**:
- `icon`: Lucide icon
- `title`: Metric name
- `value`: Metric value
- `iconColor`, `bgColor`: Color scheme

**Features**:
- Color mapping for cyan/green/magenta/orange
- Glowing icon with backdrop blur
- Decorative corner borders
- Gradient hover effect

---

#### FeatureCard.tsx
**Purpose**: Home page feature link card

**Props**:
- `icon`, `title`, `description`: Content
- `link`: Navigation URL
- `iconColor`, `bgColor`: Theme colors

**Features**:
- Grid pattern background overlay
- Icon with colored background
- Corner decorative borders
- Hover lift effect (-translate-y)

---

#### PostCard.tsx
**Purpose**: Post display card

**Props**:
- `post`: Post object
- `authorName`: User name string
- `onEdit`, `onDelete`: Action handlers

**Features**:
- Title with neon glow on hover
- Content text in gray
- Author and date footer section
- Edit/delete action buttons

---

### Services

#### api.ts
**Purpose**: API client service

**Configuration**:
- Base URL: `http://localhost:8000` (or `VITE_API_URL`)

**Interfaces**:
- `User`, `UserCreate`: User type definitions
- `Post`, `PostCreate`: Post type definitions

**`ApiService` Class Methods**:

**Users**:
- `createUser(userData)`: POST /users/
- `getAllUsers()`: GET /users/
- `getUser(userId)`: GET /users/{id}
- `updateUser(userId, userData)`: PUT /users/{id}
- `deleteUser(userId)`: DELETE /users/{id}

**Posts**:
- `createPost(postData)`: POST /posts/
- `getAllPosts()`: GET /posts/
- `getUserPosts(userId)`: GET /users/{id}/posts
- `updatePost(postId, title, content)`: PUT /posts/{id}
- `deletePost(postId)`: DELETE /posts/{id}

**Utilities**:
- `checkConnection()`: Tests API availability

**Error Handling**: Throws errors on non-ok responses

---

### Hooks

#### useUsers.ts
**Purpose**: User data state management hook

**Returns**:
- `users`: User array
- `loading`: Boolean loading state
- `error`: Error message string or null
- `refreshUsers`: Function to reload data

**Features**:
- Loads users on mount (`useEffect`)
- Error handling with state
- Async data fetching

---

#### usePosts.ts
**Purpose**: Post data state management hook

**Returns**: Same pattern as useUsers
- `posts`, `loading`, `error`, `refreshPosts`

---

### Route Pages

#### home.tsx
**Purpose**: Landing page

**Content**:
- Title: "MongoDB Database Manager"
- Feature cards for Users, Posts, Dashboard
- Getting started instructions

**Features**:
- Links to main sections
- Icon-based navigation cards
- Step-by-step guide

---

#### user.tsx
**Purpose**: User management page

**State**:
- `showCreateForm`: Toggle create form visibility
- `editingUser`: Currently editing user or null
- `formData`: Form input values

**Features**:
1. **Create/Edit Form**:
   - Conditional rendering (create OR edit)
   - 3-column grid (name, email, age)
   - Form reset on submit/cancel

2. **User Table**:
   - Sortable columns
   - Edit/delete actions per row
   - Hover highlight rows
   - Empty state when no users

**Functions**:
- `handleCreateUser`: Submits new user
- `handleUpdateUser`: Updates existing user
- `handleDeleteUser`: Deletes with confirmation
- `startEdit`: Loads user into form
- `handleAgeChange`: Number input validation

---

#### post.tsx
**Purpose**: Post management page

**State**:
- Similar to user.tsx but for posts
- `formData` includes `user_id` for author selection

**Features**:
1. **Create/Edit Form**:
   - User dropdown (from `useUsers`)
   - Title and content inputs
   - Disabled author field when editing

2. **Post Grid**:
   - 3-column responsive grid
   - `PostCard` components
   - Shows author name via `getUserName()` helper

**Functions**:
- `getUserName(userId)`: Maps user ID to name
- `handleEditPost`: Populates form with post data
- Post CRUD operations similar to users

---

#### dashboard.tsx
**Purpose**: Analytics/statistics page

**Data**:
- Uses both `useUsers` and `usePosts` hooks

**Calculated Stats**:
- Total users count
- Total posts count
- Average user age
- Posts per user ratio

**Layout**:
1. **Stat Cards**: 4-column grid with `StatCard` components
2. **Recent Posts**: Card with sorted posts (newest first, limit 5)

**Features**:
- Real-time calculations
- Empty state handling
- Loading state for both data sources

---

## Architecture Summary

### Backend Stack
- **Database**: MongoDB (Atlas)
- **ODM**: PyMongo
- **API Framework**: FastAPI
- **Admin UI**: Streamlit
- **Validation**: Pydantic

### Frontend Stack
- **Framework**: React 19
- **Router**: React Router v7 (SPA mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 + Custom CSS
- **Icons**: Lucide React
- **Language**: TypeScript

### Data Flow
1. User interacts with React components
2. Components call `api` service methods
3. API service makes HTTP requests to FastAPI backend
4. FastAPI validates requests with Pydantic models
5. `DatabaseManager` executes MongoDB operations
6. Response flows back through API → service → hooks → components
7. React re-renders with updated data

### Key Patterns
- **Custom Hooks**: Centralized data fetching (`useUsers`, `usePosts`)
- **Component Composition**: Reusable UI components with props
- **Type Safety**: TypeScript interfaces for all data structures
- **Error Handling**: Try-catch with user-friendly error messages
- **Responsive Design**: Mobile-first with breakpoints
- **Theme**: Consistent retro/cyberpunk aesthetic

### Deployment Considerations
- **Backend**: Run with `uvicorn api:app --host 0.0.0.0 --port 8000`
- **Frontend**: Build with `npm run build`, serve static files
- **Environment**: Set `MONGODB_ATLAS_CLUSTER_URI` in production
- **CORS**: Update allowed origins for production domain
- **Docker**: Dockerfile provided for containerized frontend deployment
</assistant>