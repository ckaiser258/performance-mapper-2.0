import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage: NextPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is already logged in, redirect to home page
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session, router]);

  return <div>Login</div>;
};

export default LoginPage;
