# Bike Point Possible Negative Scenarios

## **Frontend Negative Scenarios**

### 1. **Missing Page to Manage User/Bike**
- **Scenario**: Admin attempts to manage new user/bike.
- **Consequence**: No page available for management, leading to administrative bottlenecks.
- **Fix**: Implement a dedicated page to manage users and bikes. Ensure that this page is easily accessible from the admin panel.

### 2. **Same Bike Can Be Assembled Twice**
- **Scenario**: A user attempts to assemble an already assembled bike.
- **Consequence**: Leads to redundant actions and wasted resources, causing confusion and inefficiencies.
- **Fix**: Implement a filter or validation to show only unassembled bikes in the bike assembly process. Provide an error message if an already assembled bike is selected.

### 3. **Limited Time Options**
- **Scenario**: A user completes the assembly either before 50 minutes or takes more than 1 hour and 20 minutes.
- **Consequence**: Results in incorrect assembly data, affecting performance metrics and potentially causing data inconsistencies.
- **Fix**: Implement a more flexible time input option, such as removing the fixed select box and replacing it with a time picker that allows users to set the actual completion time.

### 4. **Session Expiration**
- **Scenario**: The user's JWT token expires, but they continue to make requests.
- **Consequence**: API requests will fail, resulting in poor user experience and potential confusion.
- **Fix**: Detect token expiration on the frontend and prompt the user to log in again. Implement automatic logout with a session expiration message.

---

## **Backend Negative Scenarios**

### 1. **Unauthenticated or Unauthorized Access to APIs**
- **Scenario**: Unauthorized users or users without the correct roles attempt to access protected API endpoints (e.g., user management, bike assembly).
- **Consequence**: The system responds with a 401 (Unauthorized) or 403 (Forbidden) error, preventing access to sensitive data.
- **Fix**: Implement robust authentication and authorization middleware. Ensure that the system checks user roles and permissions for sensitive endpoints.

### 2. **Database Connection Failures**
- **Scenario**: The backend cannot connect to the database due to issues such as server downtime, misconfiguration, or network issues.
- **Consequence**: API requests fail, and data cannot be retrieved or saved, leading to 500 Internal Server Errors.
- **Fix**: Implement proper error handling and automatic retry mechanisms in case of database connection failures. Monitor the database connection status and implement appropriate logging to detect issues early.

### 3. **API Rate Limiting or Abuse**
- **Scenario**: A user or system sends too many requests in a short period, exceeding the API rate limit.
- **Consequence**: The system responds with a 429 Too Many Requests error, temporarily blocking further requests and impacting the user experience.
- **Fix**: Implement API rate limiting and throttling using tools like Redis, Nginx, or API Gateways to prevent abuse and ensure fair usage. Inform users about the rate limit and implement a backoff strategy for retries.

### 4. **Unexpected Server Crashes**
- **Scenario**: The server crashes due to unhandled exceptions, memory leaks, database issues, or heavy load.
- **Consequence**: The application becomes unavailable, leading to downtime and loss of service.
- **Fix**: Implement thorough error handling and logging to capture unhandled exceptions. Use process managers like **PM2** or **forever** to automatically restart the server on failure. Consider utilizing a service like **Docker** for containerization to isolate issues and improve system resilience.

---

### Additional Considerations

1. **Data Integrity Issues**
   - **Scenario**: Inconsistent or incorrect data due to unexpected errors or improper handling.
   - **Consequence**: Potential data corruption and a poor user experience.
   - **Fix**: Implement transaction management to ensure atomic operations. Use database constraints and validation checks to enforce data integrity.

2. **API Versioning and Backward Compatibility**
   - **Scenario**: Changes to the API (e.g., new endpoints or parameter changes) break backward compatibility for older frontend or mobile clients.
   - **Consequence**: Frontend or mobile applications may fail to interact with the updated backend.
   - **Fix**: Implement proper API versioning and ensure backward compatibility by supporting both old and new API versions for a period. Notify clients about changes in advance.

3. **Lack of Logging and Monitoring**
   - **Scenario**: Critical errors or server failures occur without proper logging, making it difficult to diagnose and resolve the issue.
   - **Consequence**: Delayed resolution of issues, and a lack of transparency for the system's health.
   - **Fix**: Implement structured logging for both the frontend and backend. Use logging libraries like **Winston** (for Node.js) or **Logback** (for Java) and set up monitoring tools like **New Relic** or **Datadog** for proactive issue tracking.

---