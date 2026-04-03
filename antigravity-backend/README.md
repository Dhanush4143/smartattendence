# Anti-Gravity Research Backend

This is the Spring Boot backend for the University Anti-Gravity Research Project.

## Technologies
- Java 17
- Spring Boot 3.2.0
- Spring Security + JWT
- Spring Data JPA
- H2 (Dev) & MySQL (Prod)

## Setup & Run Locally
1. Ensure Java 17+ and Maven are installed.
2. Run `./mvnw spring-boot:run` to start the application with H2 in-memory database.
3. The server runs on `http://localhost:8080`.
4. Demo Accounts:
   - `teacher@gravity.edu` / `password`
   - `alice@student.edu` / `password`

## Deployment on Render
1. Push this repository to GitHub.
2. Go to [Render](https://render.com), connect your GitHub account, and select "New Web Service".
3. Choose this repository.
4. Build Command: `./mvnw clean install -DskipTests`
5. Start Command: `java -jar target/antigravity-backend-0.0.1-SNAPSHOT.jar`
6. Set Environment Variables:
   - `SPRING_DATASOURCE_URL`: `jdbc:mysql://<your-db-host>:3306/<your-db-name>`
   - `SPRING_DATASOURCE_USERNAME`: `<your-db-username>`
   - `SPRING_DATASOURCE_PASSWORD`: `<your-db-password>`
   - `JWT_SECRET`: `<any-long-random-string>`
   - `APP_ENV`: `prod`
