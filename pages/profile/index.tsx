import { gql, useQuery } from "@apollo/client";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Athlete, Team } from "../../generated/graphql";

const ATHLETES_AND_TEAMS_FOR_CURRENT_USER_QUERY = gql`
  query AthletesAndTeamsForUser($userId: ID!) {
    getAthletesForUser(userId: $userId) {
      id
      firstName
      lastName
      email
      picture
      createdAt
      updatedAt
    }
    getTeamsForUser(userId: $userId) {
      id
      name
    }
  }
`;

const ProfilePage: NextPage = () => {
  const { data: session } = useSession({ required: true });
  const { data, error, loading } = useQuery(
    ATHLETES_AND_TEAMS_FOR_CURRENT_USER_QUERY,
    {
      variables: {
        userId: session?.userId,
      },
      // Prevent a 400 error from Apollo on initial render
      skip: !session?.userId,
    }
  );

  if (error) console.error(error);

  const { getAthletesForUser, getTeamsForUser } = data || {};
  return (
    <>
      <h1>Profile Page</h1>
      <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box display="flex">
          <List>
            {getAthletesForUser?.map((athlete: Athlete) => (
              <ListItem key={athlete.id}>
                <ListItemText
                  primary={`${athlete.firstName} ${athlete.lastName}`}
                  secondary={athlete.email}
                />
              </ListItem>
            ))}
          </List>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {getTeamsForUser?.map((team: Team) => (
              <ListItem key={team.id}>
                <ListItemText primary={team.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  );
};

export default ProfilePage;
