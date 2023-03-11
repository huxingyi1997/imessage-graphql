import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useState, type FC } from "react";
import { signIn } from "next-auth/react";
import type { Session } from "next-auth";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState<string>("");

  const onSubmit = async () => {
    if (!username) return;

    try {
      /**
       * createUsername mutation to send our username to the GraphQL API
       */

      /**
       * Reload session to obtain new username
       */
      reloadSession();
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  return (
    <Center height="100vh">
      <Stack align="center" spacing={8}>
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Button onClick={() => onSubmit()}>Save</Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">MessengerQL</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={<Image height="20px" src="/images/googlelogo.png" />}
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
