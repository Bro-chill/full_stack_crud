## Table of Contents
1. Python Fundamentals
2. JavaScript/TypeScript Fundamentals
3. HTML Fundamentals
4. CSS Fundamentals
5. Advanced Topics

---

## Python Fundamentals

### 1. Basic Syntax & Data Types

```python
# Variables and Types
name = "John"              # String
age = 25                   # Integer
height = 5.9               # Float
is_active = True           # Boolean
user_data = None           # None type

# Type hints (modern Python)
def create_user(name: str, age: int) -> dict:
    return {"name": name, "age": age}

# Lists (mutable, ordered)
users = ["Alice", "Bob", "Charlie"]
users.append("David")      # Add item
users[0]                   # Access by index -> "Alice"

# Dictionaries (key-value pairs)
user = {
    "name": "Alice",
    "email": "alice@example.com",
    "age": 30
}
user["name"]              # Access value -> "Alice"
user.get("phone", "N/A")  # Safe access with default
```

**Example from project** (database.py):
```python
user_doc = {
    "name": name,
    "email": email,
    "age": age,
    "created_at": datetime.now()
}
```

---

### 2. Functions & Classes

```python
# Function definition
def calculate_average(numbers: list) -> float:
    """Calculate average of a list of numbers"""
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

# Class definition
class DatabaseManager:
    # Constructor
    def __init__(self, db_name: str):
        self.db_name = db_name
        self.connection = None
    
    # Instance method
    def connect(self):
        """Connect to database"""
        self.connection = create_connection(self.db_name)
    
    # Method with parameters
    def create_user(self, name: str, email: str) -> str:
        user_id = self.insert_user(name, email)
        return user_id
```

**Example from project** (database.py):
```python
class DatabaseManager:
    def __init__(self, db_name='example_db', connection_string=mongo_uri):
        self.client = MongoClient(connection_string)
        self.db = self.client[db_name]
        self.users_collection = self.db.users
```

**Key Concepts**:
- `self`: Reference to instance (like `this` in JS)
- `__init__`: Constructor method
- Instance variables: `self.variable_name`
- Type hints improve code readability

---

### 3. Error Handling

```python
# Try-except blocks
try:
    result = risky_operation()
    return result
except ValueError as e:
    print(f"Invalid value: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
finally:
    cleanup()  # Always runs

# Raising exceptions
if not user_id:
    raise ValueError("User ID is required")
```

**Example from project** (database.py):
```python
def create_user(self, name, email, age):
    try:
        user_doc = {...}
        result = self.users_collection.insert_one(user_doc)
        return str(result.inserted_id)
    except Exception as e:
        print(f"Error: {e}")
        return None
```

---

### 4. List Comprehensions & Iterations

```python
# For loop
for user in users:
    print(user["name"])

# List comprehension (create new list)
user_names = [user["name"] for user in users]

# With condition
active_users = [u for u in users if u["is_active"]]

# Dictionary comprehension
user_dict = {user["id"]: user["name"] for user in users}

# Enumerate (get index + value)
for index, user in enumerate(users):
    print(f"{index}: {user}")
```

**Example from project** (api.py):
```python
return [
    UserResponse(
        id=user['_id'],
        name=user['name'],
        email=user['email'],
        age=user['age'],
        created_at=user['created_at']
    )
    for user in users
]
```

---

### 5. Working with Modules

```python
# Import entire module
import os
os.getenv("API_KEY")

# Import specific items
from datetime import datetime
now = datetime.now()

# Import with alias
from bson.objectid import ObjectId as OID

# Environment variables
from dotenv import load_dotenv
load_dotenv()  # Load .env file
mongo_uri = os.getenv('MONGODB_URI')
```

**Example from project** (database.py):
```python
from pymongo import MongoClient
from datetime import datetime
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os
```

---

### 6. FastAPI Framework

```python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, EmailStr

app = FastAPI(title="My API")

# Pydantic model (data validation)
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    age: int

# Route decorator
@app.get("/")
async def root():
    return {"message": "Hello World"}

# POST endpoint with request body
@app.post("/users/", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate):
    # user is automatically validated
    user_id = db.create_user(user.name, user.email, user.age)
    return {"user_id": user_id}

# Path parameters
@app.get("/users/{user_id}")
async def get_user(user_id: str):
    user = db.get_user(user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    return user

# CORS middleware
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Example from project** (api.py):
```python
@app.post("/users/", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate):
    try:
        user_id = db.create_user(user.name, user.email, user.age)
        if user_id:
            return {"message": "User created successfully", "user_id": user_id}
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create user"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )
```

---

### 7. String Formatting

```python
# f-strings (modern)
name = "Alice"
age = 30
message = f"Hello, {name}! You are {age} years old."

# Multiple lines
info = f"""
Name: {name}
Age: {age}
Status: {"Active" if age > 18 else "Minor"}
"""

# Expression inside f-string
total = f"Total: ${price * quantity:.2f}"
```

**Example from project** (database.py):
```python
print(f"✓ User created successfully! ID: {user_id}")
print(f"Error creating post: {e}")
```

---

### 8. Working with MongoDB (PyMongo)

```python
from pymongo import MongoClient
from bson.objectid import ObjectId

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["my_database"]
collection = db["users"]

# Insert document
result = collection.insert_one({
    "name": "Alice",
    "email": "alice@example.com"
})
user_id = result.inserted_id  # ObjectId

# Find documents
user = collection.find_one({"email": "alice@example.com"})
all_users = list(collection.find())

# Update document
collection.update_one(
    {"_id": ObjectId(user_id)},
    {"$set": {"age": 25}}
)

# Delete document
collection.delete_one({"_id": ObjectId(user_id)})

# Create index
collection.create_index("email", unique=True)
```

**Example from project** (database.py):
```python
def init_database(self):
    self.users_collection.create_index("email", unique=True)
    self.posts_collection.create_index("user_id")

def create_user(self, name, email, age):
    user_doc = {
        "name": name,
        "email": email,
        "age": age,
        "created_at": datetime.now()
    }
    result = self.users_collection.insert_one(user_doc)
    return str(result.inserted_id)
```

---

## JavaScript/TypeScript Fundamentals

### 1. Variables & Data Types

```javascript
// Variable declarations
let age = 25;           // Mutable variable
const name = "John";    // Immutable constant
var old = "avoid";      // Old style (avoid)

// Data types
const string = "Hello";
const number = 42;
const boolean = true;
const array = [1, 2, 3];
const object = { name: "Alice", age: 30 };
const nothing = null;
const notDefined = undefined;

// TypeScript types
const userName: string = "Alice";
const userAge: number = 25;
const isActive: boolean = true;

// Arrays with types
const numbers: number[] = [1, 2, 3];
const users: string[] = ["Alice", "Bob"];

// Objects with interfaces
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

const user: User = {
  id: "123",
  name: "Alice",
  email: "alice@example.com",
  age: 30
};
```

**Example from project** (api.ts):
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  created_at: string;
}

export interface UserCreate {
  name: string;
  email: string;
  age: number;
}
```

---

### 2. Functions

```javascript
// Function declaration
function add(a, b) {
  return a + b;
}

// Arrow function (modern)
const add = (a, b) => a + b;

// Arrow function with block
const greet = (name) => {
  const message = `Hello, ${name}!`;
  return message;
};

// Async function
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data;
}

// Arrow async function
const fetchUser = async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
};

// TypeScript function types
function add(a: number, b: number): number {
  return a + b;
}

const greet = (name: string): string => {
  return `Hello, ${name}!`;
};
```

**Example from project** (api.ts):
```typescript
async getAllUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users/`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}
```

---

### 3. Arrays & Array Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter - select elements
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// find - get first match
const firstEven = numbers.find(n => n % 2 === 0);
// 2

// reduce - accumulate values
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// forEach - iterate (no return value)
numbers.forEach(n => console.log(n));

// sort - order elements
const sorted = numbers.sort((a, b) => b - a);
// [5, 4, 3, 2, 1]

// slice - get portion
const first3 = numbers.slice(0, 3);
// [1, 2, 3]
```

**Example from project** (dashboard.tsx):
```typescript
const recentPosts = [...posts]
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  .slice(0, 5);
```

**Example from project** (user.tsx):
```typescript
const userOptions = users.map(user => ({
  value: user.id,
  label: `${user.name} (${user.email})`,
}));
```

---

### 4. Objects & Destructuring

```javascript
// Object creation
const user = {
  name: "Alice",
  email: "alice@example.com",
  age: 30
};

// Access properties
user.name;           // "Alice"
user["email"];       // "alice@example.com"

// Destructuring
const { name, email } = user;
// name = "Alice", email = "alice@example.com"

// Destructuring with rename
const { name: userName } = user;
// userName = "Alice"

// Spread operator (copy/merge objects)
const updatedUser = { ...user, age: 31 };

const merged = { ...user, ...extraData };

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]
```

**Example from project** (useUsers.ts):
```typescript
export function useUsers() {
  const { users, loading, error, refreshUsers } = useUsers();
  // Destructure return value
}
```

**Example from project** (FormInput.tsx):
```typescript
export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: FormInputProps) {
  // Destructure props with defaults
}
```

---

### 5. Template Literals

```javascript
const name = "Alice";
const age = 30;

// Template string
const message = `Hello, ${name}! You are ${age} years old.`;

// Multi-line
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// Expressions inside
const status = `Status: ${age >= 18 ? "Adult" : "Minor"}`;
```

**Example from project** (api.ts):
```typescript
const response = await fetch(`${API_BASE_URL}/users/${userId}`);
```

---

### 6. Async/Await & Promises

```javascript
// Promise
const promise = fetch('/api/users');
promise
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/await (cleaner)
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Multiple parallel requests
async function fetchMultiple() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  return { users, posts };
}
```

**Example from project** (api.ts):
```typescript
async createUser(userData: UserCreate) {
  const response = await fetch(`${API_BASE_URL}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
}
```

---

### 7. React Hooks

```typescript
import { useState, useEffect } from "react";

// useState - manage component state
const [count, setCount] = useState(0);
setCount(count + 1);  // Update state

const [user, setUser] = useState<User | null>(null);
setUser({ id: "1", name: "Alice" });

// useEffect - side effects (API calls, subscriptions)
useEffect(() => {
  // Run on mount and when dependencies change
  fetchData();
  
  // Cleanup function (optional)
  return () => {
    cleanup();
  };
}, [dependency1, dependency2]);

// Empty dependency array = run once on mount
useEffect(() => {
  console.log("Component mounted");
}, []);

// Custom hook pattern
function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    setLoading(true);
    const data = await api.getAllUsers();
    setUsers(data);
    setLoading(false);
  };
  
  return { users, loading, refreshUsers: loadUsers };
}
```

**Example from project** (useUsers.ts):
```typescript
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return { users, loading, error, refreshUsers: loadUsers };
}
```

---

### 8. React Components

```typescript
// Function component with TypeScript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  onClick,
  variant = "primary"
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}

// Using the component
<Button onClick={() => alert("Clicked!")} variant="primary">
  Click Me
</Button>

// Component with state
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**Example from project** (Button.tsx):
```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  icon?: LucideIcon;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  icon: Icon,
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={variantClasses[variant]}>
      {Icon && <Icon className="w-5 h-5" />}
      &gt; {children}
    </button>
  );
}
```

---

### 9. Event Handling

```typescript
// Form submission
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();  // Prevent page reload
  console.log("Form submitted");
};

<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>

// Input changes
const [value, setValue] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

<input value={value} onChange={handleChange} />

// Click events
const handleClick = () => {
  console.log("Button clicked");
};

<button onClick={handleClick}>Click</button>

// With parameters
<button onClick={() => deleteUser(userId)}>Delete</button>
```

**Example from project** (user.tsx):
```typescript
const handleCreateUser = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await api.createUser(formData);
    resetForm();
    await refreshUsers();
  } catch (err) {
    alert('Failed to create user');
  }
};

<form onSubmit={handleCreateUser}>
  {/* form fields */}
</form>
```

---

### 10. Conditional Rendering

```typescript
// Ternary operator
{isLoggedIn ? <Dashboard /> : <Login />}

// Logical AND
{users.length > 0 && <UserList users={users} />}

// Logical OR (fallback)
{user.name || "Guest"}

// Multiple conditions
{loading ? (
  <LoadingSpinner />
) : error ? (
  <ErrorMessage message={error} />
) : (
  <DataDisplay data={data} />
)}
```

**Example from project** (user.tsx):
```typescript
{loading ? (
  <LoadingSpinner />
) : (
  <Card className="overflow-hidden">
    {/* table content */}
  </Card>
)}

{users.length === 0 && (
  <EmptyState message="No users found." />
)}
```

---

## HTML Fundamentals

### 1. Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Website Title</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>Article Title</h2>
      <p>Content goes here...</p>
    </article>
  </main>
  
  <footer>
    <p>&copy; 2025 Company Name</p>
  </footer>
  
  <script src="app.js"></script>
</body>
</html>
```

**Example from project** (root.tsx):
```tsx
<html lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta />
    <Links />
  </head>
  <body>
    {children}
    <ScrollRestoration />
    <Scripts />
  </body>
</html>
```

---

### 2. Common HTML Elements

```html
<!-- Headings (h1 is most important) -->
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>

<!-- Paragraphs -->
<p>This is a paragraph of text.</p>

<!-- Links -->
<a href="https://example.com">External Link</a>
<a href="/about">Internal Link</a>

<!-- Images -->
<img src="photo.jpg" alt="Description of image">

<!-- Lists -->
<ul>
  <li>Unordered item 1</li>
  <li>Unordered item 2</li>
</ul>

<ol>
  <li>Ordered item 1</li>
  <li>Ordered item 2</li>
</ol>

<!-- Divisions (containers) -->
<div class="container">
  <p>Content in a div</p>
</div>

<!-- Spans (inline containers) -->
<p>This is <span class="highlight">highlighted</span> text.</p>

<!-- Buttons -->
<button type="button">Click Me</button>
<button type="submit">Submit Form</button>
```

---

### 3. Forms & Inputs

```html
<form action="/submit" method="POST">
  <!-- Text input -->
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required>
  
  <!-- Email input -->
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  
  <!-- Password input -->
  <label for="password">Password:</label>
  <input type="password" id="password" name="password">
  
  <!-- Number input -->
  <label for="age">Age:</label>
  <input type="number" id="age" name="age" min="1" max="120">
  
  <!-- Textarea -->
  <label for="bio">Bio:</label>
  <textarea id="bio" name="bio" rows="4"></textarea>
  
  <!-- Select dropdown -->
  <label for="country">Country:</label>
  <select id="country" name="country">
    <option value="">Choose...</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
  </select>
  
  <!-- Checkbox -->
  <label>
    <input type="checkbox" name="terms">
    I agree to terms
  </label>
  
  <!-- Radio buttons -->
  <label>
    <input type="radio" name="gender" value="male">
    Male
  </label>
  <label>
    <input type="radio" name="gender" value="female">
    Female
  </label>
  
  <!-- Submit button -->
  <button type="submit">Submit</button>
</form>
```

**Example from project** (user.tsx):
```tsx
<form onSubmit={handleCreateUser}>
  <FormInput
    label="Name"
    value={formData.name}
    onChange={(value) => setFormData({ ...formData, name: value })}
    required
  />
  <FormInput
    label="Email"
    type="email"
    value={formData.email}
    onChange={(value) => setFormData({ ...formData, email: value })}
    required
  />
  <button type="submit">Create</button>
</form>
```

---

### 4. Tables

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>alice@example.com</td>
      <td>30</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>bob@example.com</td>
      <td>25</td>
    </tr>
  </tbody>
</table>
```

**Example from project** (user.tsx):
```tsx
<table className="min-w-full">
  <thead>
    <tr>
      <th>&gt; Name</th>
      <th>&gt; Email</th>
      <th>&gt; Age</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.age}</td>
      </tr>
    ))}
  </tbody>
</table>
```

---

### 5. Semantic HTML

```html
<!-- Use semantic tags for better structure -->
<header>Header content</header>
<nav>Navigation</nav>
<main>Main content</main>
<article>Article content</article>
<section>Section content</section>
<aside>Sidebar content</aside>
<footer>Footer content</footer>

<!-- Instead of -->
<div class="header">Header content</div>
<div class="nav">Navigation</div>
```

**Benefits**:
- Better accessibility for screen readers
- Improved SEO
- Clearer code structure

---

## CSS Fundamentals

### 1. Selectors

```css
/* Element selector */
h1 {
  color: blue;
}

/* Class selector */
.button {
  padding: 10px 20px;
}

/* ID selector (use sparingly) */
#header {
  background: black;
}

/* Descendant selector */
.container p {
  margin: 10px;
}

/* Child selector (direct children only) */
.nav > li {
  display: inline-block;
}

/* Multiple selectors */
h1, h2, h3 {
  font-family: Arial;
}

/* Pseudo-classes */
a:hover {
  color: red;
}

button:disabled {
  opacity: 0.5;
}

/* Pseudo-elements */
p::first-line {
  font-weight: bold;
}

.element::before {
  content: "→ ";
}
```

**Example from project** (app.css):
```css
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: #00ffff;
}

/* Hover effects */
.retro-button:hover::before {
  left: 100%;
}
```

---

### 2. Box Model

```css
.box {
  /* Content area */
  width: 200px;
  height: 100px;
  
  /* Padding (inside border) */
  padding: 20px;
  padding-top: 10px;
  padding-right: 15px;
  padding: 10px 15px;  /* top/bottom left/right */
  
  /* Border */
  border: 2px solid black;
  border-radius: 5px;
  
  /* Margin (outside border) */
  margin: 20px;
  margin: 10px auto;  /* Center horizontally */
  
  /* Box sizing (include padding/border in width) */
  box-sizing: border-box;
}
```

**Visual representation**:
```
┌─────────────── margin ────────────────┐
│  ┌─────────── border ──────────────┐  │
│  │  ┌─────── padding ──────────┐  │  │
│  │  │                           │  │  │
│  │  │       content area        │  │  │
│  │  │       (width/height)      │  │  │
│  │  │                           │  │  │
│  │  └───────────────────────────┘  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

---

### 3. Colors & Backgrounds

```css
.element {
  /* Named colors */
  color: red;
  
  /* Hex colors */
  color: #ff0000;
  color: #f00;  /* Shorthand */
  
  /* RGB */
  color: rgb(255, 0, 0);
  
  /* RGBA (with transparency) */
  color: rgba(255, 0, 0, 0.5);
  
  /* Background */
  background-color: #333;
  background-image: url('image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  /* Gradients */
  background: linear-gradient(to right, #ff0000, #00ff00);
  background: radial-gradient(circle, #ff0000, #0000ff);
}
```

**Example from project** (app.css):
```css
@theme {
  --color-retro-bg: #0a0e27;
  --color-neon-cyan: #00ffff;
}

body {
  background: #0a0e27;
  color: #e0e7ff;
}
```

---

### 4. Typography

```css
.text {
  /* Font family */
  font-family: Arial, sans-serif;
  font-family: "Courier New", monospace;
  
  /* Font size */
  font-size: 16px;
  font-size: 1.2em;   /* Relative to parent */
  font-size: 1.5rem;  /* Relative to root */
  
  /* Font weight */
  font-weight: normal;  /* 400 */
  font-weight: bold;    /* 700 */
  font-weight: 600;
  
  /* Font style */
  font-style: italic;
  
  /* Text decoration */
  text-decoration: underline;
  text-decoration: none;
  
  /* Text transform */
  text-transform: uppercase;
  text-transform: lowercase;
  text-transform: capitalize;
  
  /* Text alignment */
  text-align: left;
  text-align: center;
  text-align: right;
  
  /* Line height */
  line-height: 1.5;
  
  /* Letter spacing */
  letter-spacing: 2px;
}
```

**Example from project** (app.css):
```css
html, body {
  font-family: "Courier New", "Courier", monospace;
}

.neon-text {
  text-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
}
```

---

### 5. Layout (Flexbox)

```css
.container {
  display: flex;
  
  /* Direction */
  flex-direction: row;         /* default */
  flex-direction: column;
  flex-direction: row-reverse;
  
  /* Justify content (main axis) */
  justify-content: flex-start;  /* default */
  justify-content: center;
  justify-content: space-between;
  justify-content: space-around;
  
  /* Align items (cross axis) */
  align-items: stretch;        /* default */
  align-items: center;
  align-items: flex-start;
  
  /* Wrap */
  flex-wrap: nowrap;           /* default */
  flex-wrap: wrap;
  
  /* Gap between items */
  gap: 20px;
}

.item {
  /* Grow factor */
  flex-grow: 1;
  
  /* Shrink factor */
  flex-shrink: 0;
  
  /* Basis (initial size) */
  flex-basis: 200px;
  
  /* Shorthand */
  flex: 1;  /* grow: 1, shrink: 1, basis: 0 */
}
```

**Example from project** (Button.tsx):
```tsx
<button className="flex items-center gap-2">
  {Icon && <Icon className="w-5 h-5" />}
  &gt; {children}
</button>
```

---

### 6. Layout (Grid)

```css
.container {
  display: grid;
  
  /* Define columns */
  grid-template-columns: 200px 200px 200px;
  grid-template-columns: 1fr 1fr 1fr;  /* Equal fractions */
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  
  /* Define rows */
  grid-template-rows: 100px auto 100px;
  
  /* Gap */
  gap: 20px;
  grid-column-gap: 20px;
  grid-row-gap: 10px;
}

.item {
  /* Span multiple columns */
  grid-column: span 2;
  
  /* Specific placement */
  grid-column: 1 / 3;  /* Start at 1, end before 3 */
  grid-row: 2 / 4;
}
```

**Example from project** (dashboard.tsx):
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard {...} />
  <StatCard {...} />
  <StatCard {...} />
  <StatCard {...} />
</div>
```

---

### 7. Responsive Design

```css
/* Mobile first approach */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 20px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    width: 1000px;
  }
}

/* Common breakpoints */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

**Example from project** (Tailwind CSS classes):
```tsx
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column mobile, 2 tablet, 3 desktop */}
</div>
```

---

### 8. Positioning

```css
.element {
  /* Static (default) */
  position: static;
  
  /* Relative (offset from normal position) */
  position: relative;
  top: 10px;
  left: 20px;
  
  /* Absolute (relative to nearest positioned ancestor) */
  position: absolute;
  top: 0;
  right: 0;
  
  /* Fixed (relative to viewport) */
  position: fixed;
  bottom: 20px;
  right: 20px;
  
  /* Sticky (hybrid relative/fixed) */
  position: sticky;
  top: 0;
}
```

**Example from project** (Card.tsx):
```tsx
<div className="relative">
  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2"></div>
  {children}
</div>
```

---

### 9. Transitions & Animations

```css
.button {
  background: blue;
  transition: background 0.3s ease;
}

.button:hover {
  background: darkblue;
}

/* Transition properties */
.element {
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-delay: 0.1s;
  
  /* Shorthand */
  transition: all 0.3s ease-in-out 0.1s;
}

/* Keyframe animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.element {
  animation: fadeIn 1s ease-in;
}
```

**Example from project** (app.css):
```css
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.95; }
}

.flicker {
  animation: flicker 3s infinite;
}
```

---

### 10. CSS Variables (Custom Properties)

```css
:root {
  --primary-color: #007bff;
  --spacing-unit: 8px;
  --border-radius: 4px;
}

.button {
  background: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
}

/* Can be scoped */
.dark-theme {
  --primary-color: #0056b3;
}
```

**Example from project** (app.css):
```css
@theme {
  --color-retro-bg: #0a0e27;
  --color-neon-cyan: #00ffff;
}

body {
  background: var(--color-retro-bg);
}
```

---

## Advanced Topics

### 1. Tailwind CSS

Tailwind is a **utility-first CSS framework** where you apply pre-defined classes instead of writing custom CSS.

```tsx
// Instead of custom CSS
<div className="container">
  <h1 className="title">Hello</h1>
</div>

// With Tailwind
<div className="max-w-7xl mx-auto px-4">
  <h1 className="text-4xl font-bold text-blue-600">Hello</h1>
</div>
```

**Common patterns**:
```tsx
// Flexbox
<div className="flex items-center justify-between gap-4">

// Grid
<div className="grid grid-cols-3 gap-6">

// Responsive
<div className="w-full md:w-1/2 lg:w-1/3">

// Hover states
<button className="bg-blue-500 hover:bg-blue-700">

// Colors
<p className="text-gray-800 dark:text-gray-200">
```

**Example from project** (user.tsx):
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <FormInput ... />
</div>
```

---

### 2. TypeScript Interfaces vs Types

```typescript
// Interface (extendable)
interface User {
  id: string;
  name: string;
}

interface AdminUser extends User {
  role: 'admin';
}

// Type alias (more flexible)
type User = {
  id: string;
  name: string;
};

type AdminUser = User & {
  role: 'admin';
};

// Union types
type Status = 'pending' | 'approved' | 'rejected';

// Function types
type ClickHandler = (event: MouseEvent) => void;
```

**When to use**:
- **Interface**: For object shapes, especially if you'll extend them
- **Type**: For unions, intersections, primitives

---

### 3. React Router v7

```typescript
// routes.ts - Define routes
export default [
  index("routes/home.tsx"),
  route("users", "routes/users.tsx"),
  route("users/:id", "routes/user-detail.tsx"),
] satisfies RouteConfig;

// Navigation
import { Link } from "react-router";
<Link to="/users">Users</Link>

// Get URL params
import { useParams } from "react-router";
const { id } = useParams();

// Get current location
import { useLocation } from "react-router";
const location = useLocation();
const isActive = location.pathname === "/users";
```

**Example from project** (routes.ts):
```typescript
export default [
  index("routes/home.tsx"),
  route("user", "routes/user.tsx"),
  route("post", "routes/post.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
```

---

### 4. Environment Variables

**Backend (.env)**:
```
MONGODB_ATLAS_CLUSTER_URI=mongodb+srv://...
API_KEY=secret123
```

```python
import os
from dotenv import load_dotenv

load_dotenv()
uri = os.getenv('MONGODB_ATLAS_CLUSTER_URI')
```

**Frontend (Vite)**:
```
# .env
VITE_API_URL=http://localhost:8000
```

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Security**: Never commit `.env` files to git!

---

### 5. Error Handling Best Practices

**Python**:
```python
try:
    result = risky_operation()
    return result
except SpecificError as e:
    # Handle specific error
    logger.error(f"Specific error: {e}")
except Exception as e:
    # Catch-all
    logger.error(f"Unexpected: {e}")
finally:
    # Always runs
    cleanup()
```

**JavaScript/TypeScript**:
```typescript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;  // Re-throw or handle
  }
}
```

---

### 6. Component Composition

```typescript
// Bad: Monolithic component
function UserDashboard() {
  return (
    <div>
      {/* 500 lines of JSX */}
    </div>
  );
}

// Good: Composed components
function UserDashboard() {
  return (
    <PageLayout title="Dashboard">
      <StatCards stats={stats} />
      <UserTable users={users} />
      <RecentActivity activities={activities} />
    </PageLayout>
  );
}
```

**Benefits**:
- Easier to test
- Reusable components
- Better code organization

**Example from project** (dashboard.tsx):
```typescript
<PageLayout title="Dashboard">
  <div className="grid grid-cols-4 gap-6">
    <StatCard {...} />
    <StatCard {...} />
  </div>
  <Card>
    <h2>Recent Posts</h2>
    {/* ... */}
  </Card>
</PageLayout>
```

---

## Practice Projects

### Beginner Level
1. **Todo List**: CRUD operations, local state
2. **Weather App**: API integration, async/await
3. **Calculator**: Event handling, state management

### Intermediate Level
4. **Blog Platform**: Full CRUD, user authentication
5. **E-commerce Cart**: Complex state, calculations
6. **Dashboard**: Data visualization, charts

### Advanced Level
7. **Social Media App**: Real-time updates, file uploads
8. **Project Management Tool**: Drag-drop, complex relationships
9. **Analytics Platform**: Large datasets, performance optimization

---

## Learning Resources

### Python
- [Official Python Tutorial](https://docs.python.org/3/tutorial/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Real Python](https://realpython.com/)

### JavaScript/TypeScript
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### React
- [React Official Docs](https://react.dev/)
- [React Router Docs](https://reactrouter.com/)

### CSS
- [CSS Tricks](https://css-tricks.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Flexbox Froggy](https://flexboxfroggy.com/) (interactive learning)
- [Grid Garden](https://cssgridgarden.com/) (interactive learning)

---

## Key Takeaways

1. **Python**: Focus on clean syntax, type hints, and error handling
2. **JavaScript**: Master async/await, array methods, and destructuring
3. **TypeScript**: Add type safety to catch errors early
4. **HTML**: Use semantic tags for better structure
5. **CSS**: Learn Flexbox and Grid for modern layouts
6. **React**: Think in components, hooks manage state and effects
7. **Practice**: Build projects, read code, refactor often

**Remember**: This guide uses real examples from the project - refer back to the original files to see these concepts in action!
</assistant>