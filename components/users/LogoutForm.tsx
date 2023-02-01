import { Box, Button } from "@mui/material";
import { signOut } from "next-auth/react";

const LogoutForm: React.FC = () => {
  return (
    <Box>
      <Button onClick={() => signOut()}>Logout</Button>
    </Box>
  );
};

export default LogoutForm;
