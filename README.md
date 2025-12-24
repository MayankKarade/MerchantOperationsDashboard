# Merchant Operations Dashboard

A React-based dashboard for managing merchant operations, built as part of the Axipays frontend assignment.

## 🚀 How to Run the Project

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Setup

# 1. Clone the repository or extract the project files

# Navigate to project directory

# 2. Install dependencies

npm install

# 3. Start the development server

npm run dev

# 4. Open your browser and navigate to:

# http://localhost:5173 (or the port shown in your terminal)

# Optional: Build for production

npm run build
npm run preview

## 🛠️ Technologies Used

- **React 18 with Vite** - Fast development and building
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - For page navigation and routing
- **Recharts** - For data visualizations and charts
- **Lucide React** - Icon library

## ⏱️ Time Spent

Approximately **12-18 hours** were spent on this project, distributed as follows:

- **Project Setup & Structure: 30min**

  - Creating component architecture and file structure
  - Setting up routing and context providers

- **Dashboard Page Development: 4 hours**

  - Summary statistics calculation logic
  - Chart implementation with Recharts
  - Responsive design implementation

- **Merchants Page Development: 3 hours**

  - Complete merchant table with search, filter, and sort
  - CRUD operations (Add, Edit, Delete, View)
  - Form validation and business logic implementation
  - Modal components for viewing and editing

- **Layout & Navigation: 3 hour**

  - Responsive sidebar and top navigation
  - Mobile-friendly design implementation

- **Business Logic & Polish: 9 hours**
  - Implementing assignment requirements (chargeback warnings, risk validations)
  - Error handling and form validations
  - Loading states and empty states
  - Testing and debugging

## 🔮 What I Would Improve if Given More Time

### 1. Backend Integration

- Replace mock data with real API endpoints
- Implement proper authentication and authorization
- Add API error handling and loading states

### 2. Enhanced User Experience

- Add pagination for large merchant lists
- Implement data export functionality (CSV/Excel)
- Include more detailed analytics and reporting features
- Include Login and Logged Out button

### 5. Performance Optimizations

- Implement virtualization for large data tables
- Add memoization for expensive calculations
- Optimize bundle size with lazy loading
- Implement service workers for offline capability

### 6. Deployment & DevOps

- Set up CI/CD pipeline
- Add environment configurations
- Implement monitoring and error tracking
- Create comprehensive documentation

## 📁 Project Structure

src/
├── components/ # Reusable UI components
│ ├── Layout/ # Navigation components
│ ├── Dashboard/ # Dashboard widgets and charts
│ ├── Merchants/ # Merchant management components
│ └── Form/ # Form components with validation
├── pages/ # Main page components
├── data/ # Mock data
└── context/ # Context providers

### Dashboard Page

- ✅ 3+ summary statistics (Total Volume, Avg Success Rate, Active Merchants Count + additional)
- ✅ Simple visualization (bar chart showing merchant performance)
- ✅ Dynamic calculations from merchant dataset

### Merchants Page

- ✅ Table display with all required fields
- ✅ Search by name
- ✅ Filter by status and risk level
- ✅ Sort by volume or chargeback ratio
- ✅ Merchant detail view in modal
- ✅ Add/Edit merchant form with validation

### Business Logic

- ✅ Warning when chargebackRatio > 2% and status is active
- ✅ Confirmation step when setting status to active while risk is high
- ✅ Proper form validation with error messages
