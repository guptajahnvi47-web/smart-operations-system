# Engineering Decision Document
**Project:** Smart Internal Operations System

## 1. System Architecture
The application uses a strict **Layered Architecture** within a Node.js/React environment:
- **Presentation Layer (React):** A dynamic SPA using React Router for navigation, Context API for state management, and a custom CSS variable-driven Design System for a premium aesthetic (glassmorphism, dark mode).
- **Routing Layer (Express):** Defines the REST API endpoints and enforces authentication (`protect`) and authorization (`authorizeRoles`) middlewares.
- **Controller Layer:** Extracts payload data, handles business rules, and returns standardized JSON responses.
- **Service Layer:** Isolates reusable core business logic (e.g., `LogService.logAction`) to prevent controller bloat and ensure consistency.
- **Data Access Layer (Mongoose):** Defines strict schemas and constraints for MongoDB.

## 2. Database Design (MongoDB)
MongoDB was chosen for its flexibility with document-oriented data. The schema relies on `ObjectId` references for relational integrity:
- **User Entity:** Stores authentication credentials (`bcryptjs` hashed) and role definition (`admin`, `manager`, `user`).
- **Task Entity:** Represents the core operational unit. Links to `assignedTo` (User) and `createdBy` (User). Includes status, priority, and `dueDate`.
- **ActivityLog Entity:** A generic logging schema that tracks the `actor` (User), `action` string, `entityId`, and arbitrary JSON `metadata` for complete audit trails.

## 3. Key Technical Decisions
- **Authentication:** Selected **JWT (JSON Web Tokens)** because it is stateless, enabling the backend to be horizontally scaled without sticky sessions or centralized session stores.
- **Role-Based Access Control (RBAC):** Built a flexible Express middleware (`authorizeRoles`) that intercepts requests before they hit controllers. This guarantees standard users cannot perform destructive actions (like `DELETE /tasks`).
- **Frontend Styling:** Opted for **Vanilla CSS** with CSS Variables over Tailwind. This decision prioritized maximum customizability for implementing advanced aesthetics (backdrop filters, custom hover shadows) without polluting JSX with utility classes.

## 4. Trade-offs
- **State Management:** Used React's Context API instead of Redux. *Trade-off:* Context is simpler and reduces boilerplate, but it can cause unnecessary re-renders if the state tree grows massive. For this scale, it is optimal.
- **Data Deletion:** Tasks are currently hard-deleted. *Trade-off:* Saves storage space and simplifies queries, but ruins historical audit trails. In a true enterprise system, soft-deletes (an `isDeleted` flag) would be mandatory.

## 5. Scaling Strategy (10,000+ Users)
If the system grows to 10,000+ concurrent users, the following bottlenecks will emerge:
- **What will break first?** The MongoDB connection pool and the CPU utilization of the single Node.js thread, specifically when executing complex queries like the aggregation pipeline for `Smart Workload Insights`.
- **How I would improve it:**
  1. **Database:** Implement heavy indexing on frequently queried fields (`assignedTo`, `status`, `createdAt`). Use MongoDB Atlas for automated sharding across distributed clusters.
  2. **Application Layer:** Deploy the Express backend as containerized microservices via Kubernetes, sitting behind an Application Load Balancer.
  3. **Caching:** Introduce Redis to cache read-heavy endpoints (e.g., Dashboard statistics) to drastically reduce database hits.

## 6. Future Improvements
👉 *"If you had 2 more days, what would you improve?"*
1. **Real-time Collaboration:** I would implement WebSockets (Socket.io) so that task status updates and new assignments reflect on users' screens instantly without a manual refresh.
2. **Task Comments & File Attachments:** A sub-document schema to allow users to discuss tasks directly within the card, and AWS S3 integration for attaching operational documents.
3. **Advanced Analytics:** A dedicated reporting dashboard for Admins to view historical efficiency trends (e.g., average time to complete tasks per user).

---

## Scope Decision & Mandatory Creativity Requirement
### What was Built
I built a complete end-to-end task management lifecycle. Managers can assign tasks, Users can log in to view their specific queue, update statuses, and view due dates. The system tracks these actions invisibly via the `LogService`.

### What was Intentionally Not Built
I intentionally omitted "Email Notifications" and "Password Resets". While crucial for a production launch, they require third-party integrations (SendGrid, Twilio) that distract from demonstrating core architectural competence in this exercise.

### Invented Feature: Smart Workload Insights
- **Why I added it:** Task management tools often fail because managers assign work blindly, leading to team burnout or bottlenecks.
- **What problem it solves:** When a manager creates a task, the UI now queries a dedicated `GET /api/tasks/workload` endpoint. It dynamically alerts the manager if the selected user is currently overloaded (e.g., has 5 or more active tasks). This prevents unbalanced work delegation and improves overall operational efficiency.
