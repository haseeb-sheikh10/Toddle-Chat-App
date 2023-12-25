// pages/auth/index.tsx

import { GetServerSideProps } from "next";

const RedirectToLogin: React.FC = () => {
  // This component will never be rendered, as the redirection happens on the server side.
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Perform the redirection to /auth/login
  res.writeHead(404, { Location: "/auth/login" });
  res.end();

  // Return an empty object to satisfy Next.js requirements
  return { props: {} };
};

export default RedirectToLogin;
