```bash
+----------------+          +------------+           +-------------------+       +----------------+
|  React Client  |  <--->   | API Gateway|  ------>  |   Auth Service     |  -->  |   Keycloak      |
+----------------+          +------------+           +-------------------+       +----------------+
                                      |                       |
                                      |    - login            |   - token issue
                                      |    - logout           |   - token introspect
                                      |    - refresh          |   - user mgmt (admin)
                                      |                       |
                            +-------------------+     
                            | Redis (Optional)  |  --> Token Blacklisting / Session Store
                            +-------------------+

```

---

## 🛠️ REST API Endpoints (Example)

| Method | Endpoint         | Description                          |
|--------|------------------|--------------------------------------|
| POST   | /auth/login      | Redirects to Keycloak login          |
| GET    | /auth/callback   | Handles code exchange via PKCE       |
| POST   | /auth/refresh    | Refresh token                        |
| POST   | /auth/logout     | Logs out user, invalidates session   |
| GET    | /auth/me         | Returns user profile from token      |
| POST   | /auth/register   | (optional) Admin creates user        |
