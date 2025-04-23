# LisBon Business Portal - Frontend

## Description

This project is a fully functional frontend for the LisBon Business Portal, designed to provide a user-friendly interface for business users to manage their operations. It includes essential pages for user authentication (login and registration) and a protected dashboard with key functionalities.

## How to Run the Project Locally

1.  **Clone the repository:**
    ```bash
    git clone github.com:davidjoywin/fleet-management.git
    cd cd fleet-management
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # if it failed
    npm install --force
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    - If using NextAuth.js, you might need to configure environment variables such as `NEXTAUTH_SECRET` and potentially database connection details if you extend the authentication. Create a `.env.local` file in the root of your project and add these variables. For basic local testing with the credentials provider, a strong `NEXTAUTH_SECRET` is usually sufficient.
    ```
    NEXTAUTH_SECRET=your_secure_random_secret_here
    
    use the code below to generate secret key for NEXT AUTH
        - openssl rand -hex 32
    ```

4.  **Run the development server:**
    ```bash
    npm run dev

5.  **Open your browser and navigate to `http://localhost:3000`** to view the application.

## Technologies Used

* **TypeScript:** Superset of JavaScript that adds static typing.
* **Next.js:** (v13 or 14+) - React framework for building server-rendered and static web applications.
* **TailwindCSS:** Utility-first CSS framework for rapid UI development.
* **NextAuth.js:** Authentication library for Next.js.
* **Shadcn/ui:** (Optional) Collection of reusable UI components built using Radix UI and Tailwind CSS.
* **lucide-react:** Beautifully simple SVG icons for React.
* **recharts:** Composable charting library built on React components.
* **@/components/ui/\*:** Custom UI components built within the project.
* **@/contexts/auth-context:** Custom React Context for managing authentication state.

## Optional Improvements I would make with more time

With more time, I would consider implementing the following improvements:

* **Backend Integration:** Connect the frontend to a real backend API for user registration, data fetching for the dashboard (vehicles, drivers, reports), and persistent data storage.
* **Advanced Form Validation:** Implement more robust server-side validation and provide more specific feedback to the user.
* **User Roles and Permissions:** Implement a more sophisticated authentication system with different user roles and permissions to control access to specific features. Integrating google Authentication
* **State Management:** I would consider using a dedicated state management library like Zustand or Redux for better organization and scalability.
* **Testing:** Write unit and integration tests to ensure the reliability and correctness of the application.
* **Accessibility:** Ensure the application is fully accessible to users with disabilities by following WCAG guidelines.
* **Create more Pages:** Ensure theirs no voided link in application and pages does not lack content 
* **Performance Optimization:** Optimize the application for better performance, including code splitting, image optimization, and lazy loading.
* **Real-time Updates:** Explore the possibility of implementing real-time updates for certain dashboard components using technologies like WebSockets.
* **Error Handling:** Implement more comprehensive error handling and user-friendly error messages throughout the application.

## Live Deployment Link

* `VERCEL.COM`

---

* `GITHUB.COM:DAVIDJOYWIN/FLEET-MANAGEMENT.GIT` with the actual URL of your public GitHub repository.
* `FLEET-MANAGEMENT` with the name of your repository.
* `your_secure_random_secret_here` with a strong, randomly generated secret for `NEXTAUTH_SECRET`.
* `VERCEL.COM` with the URL of your deployed application on Vercel or Netlify.

As you build the project, you can update the "Technologies Used" and "Optional Improvements" sections to reflect your actual implementation and any new ideas you have. Good luck with building the LisBon Business Portal! Let me know when you're ready to move on to the next step.
