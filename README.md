# 📋 Job Board Application - React Router Mastery

## 🌟 Project Overview
This is a React-based Job Board application featuring a premium UI and advanced routing logic. The project focuses on 5 specific job listings with distinct locations and roles:

1. **Varun** - Software Engineer (Banglore) - ₹28,000
2. **Rohith** - Frontend Developer (Chennai) - ₹27,500
3. **Rocky** - Backend Developer (Noida) - ₹26,500
4. **Vijay** - Full Stack Developer (Karnataka) - ₹28,400
5. **Chetan** - DevOps Engineer (Kerela) - ₹26,700

### 🔄 Navigation Flow
The application follows a strict state-preserving navigation flow:
**Job Listings** → (click job) → **Job Details** → (click apply) → **Application Form**

---

## 🚀 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The app will force itself to **http://localhost:5174**.

---

## 🛠 Technical Implementation

This project follows two core technical patterns as requested:

### 1. Use Params - App Creation
We use dynamic routing to create unique pages for each job. The job ID is captured from the URL to fetch the correct data.

-   **Routing Setup** (`src/App.jsx`):
    ```jsx
    <Route path="/jobs/:jobId" element={<JobDetails />} />
    ```
-   **Data Retrieval** (`src/pages/JobDetails.jsx`):
    ```jsx
    const { jobId } = useParams();
    const job = jobs.find(j => j.id === parseInt(jobId));
    ```

### 2. Navigation State (`useNavigate` & `useLocation`)
To provide a seamless experience, we pass filtering and search data through the navigation state. This ensures that when a user clicks "Back to Jobs", their previous filters are automatically restored.

-   **Sending Data** (`src/pages/JobListings.jsx`):
    ```jsx
    const navigate = useNavigate();
    
    // When clicking a job, we pass the current filters and search term
    const handleJobClick = (job) => {
      navigate(`/jobs/${job.id}`, { 
        state: { filters, searchTerm } 
      });
    };
    ```

-   **Receiving Data** (`src/pages/JobDetails.jsx`):
    ```jsx
    const location = useLocation();
    
    // We retrieve the state to pass it back when the user returns
    const handleBack = () => {
      navigate('/', { state: location.state });
    };
    ```

-   **Restoring State** (`src/pages/JobListings.jsx`):
    ```jsx
    const location = useLocation();
    
    // Initialize state from location.state if it exists
    const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
    const [filters, setFilters] = useState(location.state?.filters || { ...defaults });
    ```

---

## 🎨 Design Features
- **Premium UI**: Gradient headers, glassmorphism-inspired cards, and smooth hover transitions.
- **Custom Animations**: Featured `fade-in-up` animation for page entries.
- **Responsive**: Fully optimized for mobile, tablet, and desktop views.

---

## 📁 Project Structure
- `src/data/jobs.js`: Mock data for 5 jobs.
- `src/components/Layout.jsx`: Shared navigation and footer.
- `src/pages/JobListings.jsx`: Main board with filters.
- `src/pages/JobDetails.jsx`: Detailed job view usage `useParams`.
- `src/pages/ApplicationForm.jsx`: Apply page with state preservation.
