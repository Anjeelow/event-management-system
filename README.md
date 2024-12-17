# Event Management System

This is a full-stack **Event Management System** with both a **client-side** (frontend) and a **server-side** (backend).

---

## 📂 Project Structure

- **`client`** - Frontend (Next.js)  
- **`server`** - Backend (Express.js)  

---

## 🚀 How to Run the Project

### 1. Start the MySQL Database

1. Open **XAMPP**.  
2. Start the **Apache** and **MySQL** services.  
3. Go to **phpMyAdmin** (usually at `http://localhost/phpmyadmin`).  
4. Create a new database named **`event-management-system`**.  
5. Import the provided SQL file:
   - Click on the **Import** tab.  
   - Select the SQL file (e.g., `event-management-system.sql`).  
   - Click **Go** to execute the import.

---

### 2. Run the Server (Backend)

1. Open a terminal and navigate to the `server` folder:  
   ```bash
   cd server
   ```
2. Install the dependencies
   ```bash
   npm install
   ```

3. Start the backend server:  
   ```bash
   npm run dev
   ```

---

### 3. Run the Client (Frontend)

1. Open a new terminal and navigate to the `client` folder:  
   ```bash
   cd client
   ```

2. Install the dependencies (--legacy-peer-deps is required because of the date picker)
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the frontend development server:  
   ```bash
   npm run dev
   ```

The client will run on **`http://localhost:3000`**.

---

## 🌐 Access the Application

1. Open your browser and go to:  
   **`http://localhost:3000`**  

---

## 🎉 You're all set!  
Now you can explore the Event Management System.
