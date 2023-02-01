import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import LoginForm from "../components/users/LoginForm";
import LogoutForm from "../components/users/LogoutForm";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Box>
        <Typography>Signed in as {session?.user?.name}</Typography>
        <LogoutForm />
      </Box>
    );
  }

  return <LoginForm />;
};

export default Home;
