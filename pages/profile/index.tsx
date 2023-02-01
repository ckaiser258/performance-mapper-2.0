import { gql, useQuery } from "@apollo/client";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ATHLETES_FOR_CURRENT_USER_QUERY = gql`
  query AthletesForUser($userId: ID!) {
    getAthletesForUser(userId: $userId) {
      id
      firstName
      lastName
      email
      picture
      createdAt
      updatedAt
    }
  }
`;

const ProfilePage: NextPage = () => {
  const { data: session } = useSession({ required: true });
  const { data, error, loading } = useQuery(ATHLETES_FOR_CURRENT_USER_QUERY, {
    variables: {
      userId: session?.userId,
    },
    // Prevent a 400 error from Apollo on initial render
    skip: !session?.userId,
  });

  if (error) console.error(error);

  const athletes = data?.getAthletesForUser;
  return (
    <>
      <h1>Profile Page</h1>
      <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <List>
          {athletes?.map((athlete) => (
            <ListItem key={athlete.id}>
              <ListItemText
                primary={`${athlete.firstName} ${athlete.lastName}`}
                secondary={athlete.email}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default ProfilePage;
