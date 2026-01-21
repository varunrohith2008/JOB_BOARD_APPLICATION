# Job Board Application

## Use Params
Explanation of how :jobId is used to load unique job data.

### Code Implementation:
```jsx
// src/App.jsx
// Routing setup
<Route path="/jobs/:jobId" element={<JobDetails />} />

// src/pages/JobDetails.jsx
// Getting data from URL
const { jobId } = useParams();
const job = jobs.find(j => j.id === parseInt(jobId));
```

## Navigation State
Code snippets showing how useNavigate sends filter data and useLocation retrieves it to maintain a seamless user experience.

### Code Implementation:

**Sending State:**
```jsx
// src/pages/JobListings.jsx
const navigate = useNavigate();

const handleJobClick = (job) => {
  // Sending current filters and search to the details page
  navigate(`/jobs/${job.id}`, { 
    state: { filters, searchTerm } 
  });
};
```

**Receiving & Restoring State:**
```jsx
// src/pages/JobDetails.jsx
const location = useLocation();

const handleBack = () => {
  // Passing the state back to the home page
  navigate('/', { state: location.state });
};

// src/pages/JobListings.jsx
const location = useLocation();

// Restoring the search and filters from location state
const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
const [filters, setFilters] = useState(location.state?.filters || { 
  location: '', 
  minSalary: '', 
  jobTypes: [] 
});
```

---
**Server running at:** [http://localhost:5174](http://localhost:5174)
