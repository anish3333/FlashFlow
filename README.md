# FlashFlow

FlashFlow is an advanced video conferencing application that mirrors the functionality of Zoom, crafted using the latest web technologies. It ensures a smooth, secure, and intuitive experience for users. The application is built with [Next.js](https://nextjs.org/) and TypeScript, integrating [GetStream](https://getstream.io/) for real-time communication, [Clerk](https://clerk.dev/) for authentication, [Tailwind CSS](https://tailwindcss.com/) and [shadcn](https://shadcn.dev/) for elegant styling, and [react-hot-toast](https://react-hot-toast.com/) for dynamic notifications.

## Features

- **Real-time Video Conferencing:** Delivering high-definition video and crystal-clear audio using GetStream.
- **Screen Sharing:** Facilitate seamless collaboration by sharing your screen with participants.
- **Secure Authentication:** Robust user authentication and management via Clerk.
- **Adaptive Design:** Visually appealing and responsive interface created with Tailwind CSS and shadcn.
- **Interactive Notifications:** Informative and interactive notifications powered by React Hot Toast.
- **Efficient User Management:** Easily create, join, and manage meetings with an intuitive interface.

## Tech Stack

- **Frontend Framework:** [Next.js](https://nextjs.org/) with TypeScript
- **Real-time Communication:** [GetStream](https://getstream.io/)
- **Authentication:** [Clerk](https://clerk.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [shadcn](https://ui.shadcn.com/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

## Getting Started

Follow these steps to set up and run FlashFlow locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/flashflow.git
   cd flashflow
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   NEXT_PUBLIC_STREAM_API_KEY=
   STREAM_SECRET_KEY=

   NEXT_PUBLIC_BASE_URL=localhost:3000
   ```

4. **Start the Development Server:**

   ```bash
   npm run dev
   ```

5. **Access the Application:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to use FlashFlow.

## Contributing

We welcome contributions! Feel free to fork the repository and submit pull requests with improvements or bug fixes.

## License

FlashFlow is licensed under the MIT License.
