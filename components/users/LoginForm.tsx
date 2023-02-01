import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const LoginForm: React.FC = () => {
  return (
    <Box>
      <Button onClick={() => signIn("github")}>Sign in with GitHub</Button>
    </Box>
  );
};

export default LoginForm;
