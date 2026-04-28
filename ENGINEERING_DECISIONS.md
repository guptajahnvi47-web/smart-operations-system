# Engineering Decision Document

## 1. System Architecture
The application uses a strict **Layered Architecture** on the backend:
- **Routes:** Define the API endpoints and attach middleware.
- **Controllers:** Handle HTTP request/response logic and extract payload data.
- **Services:** Isolate core business logic. For instance, `LogService` handles the automated creation of activity logs. This prevents controllers from becoming bloated.
- **Models:** Mongoose schemas that define the data layer structure and constraints.

## 2. Database Design (MongoDB)
- **MongoDB/Mongoose** was chosen because its schema-less nature allows for rapid iteration and it scales well with document-oriented data like Tasks and generic Activity Logs.
- **Relational Integrity:** We rely on `ObjectId` references (e.g., `assignedTo` and `createdBy` in the Task model linking to the User model).

## 3. Key Technical Decisions
- **Authentication:** JWT is used because it is stateless, making the backend horizontally scalable. `bcryptjs` is used to hash passwords securely before saving them to the DB.
- **Role-Based Access Control (RBAC):** Implemented as an Express middleware (`authorizeRoles`) which cleanly abstracts permission checks away from controller logic.
- **Mandatory Feature (Activity Logging):** A `LogService` was created. Whenever a controller mutates state (e.g., creating a task or changing a status), it invokes `LogService.logAction()`. This clearly demonstrates accountability tracking while maintaining Separation of Concerns.
- **Frontend Styling:** Vanilla CSS was used with a CSS Variables (Tokens) based Design System. This avoids the overhead of Tailwind for small-scale projects while ensuring a premium, unified aesthetic (glassmorphism, consistent spacing/radius).

## 4. Trade-offs
- **State Management:** React's Context API was used instead of Redux. Context is sufficient for global states like `User Auth` in this scope, reducing boilerplate.
- **Soft Deletes:** Tasks are hard-deleted. For a full enterprise system, soft-deletes (e.g., an `isDeleted` flag) would be preferred to maintain absolute audit integrity.

## 5. Scaling Strategy (Handling 10,000+ Users)
- **Database:** Add indexes to heavily queried fields (`Task.assignedTo`, `ActivityLog.createdAt`). Use MongoDB Atlas for automated sharding and replication.
- **Backend:** Run Express in a cluster mode or deploy as containerized microservices (Docker/Kubernetes) behind a load balancer (Nginx/AWS ALB).
- **Caching:** Implement Redis to cache frequent, read-heavy queries like fetching the Dashboard task statistics.
