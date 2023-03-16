import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useState, type FC } from "react";
import { signIn } from "next-auth/react";
import type { Session } from "next-auth";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

import { UserOperations } from "../../graphql/operations/user";
import type {
  CreateUsernameData,
  CreateUsernameVariables,
} from "../../util/types";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState<string>("");

  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) return;

    try {
      /**
       * createUsername mutation to send our username to the GraphQL API
       */
      const { data } = await createUsername({ variables: { username } });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        throw new Error(error);
      }

      toast.success("Username successfully created! 🚀");
      /**
       * Reload session to obtain new username
       */
      reloadSession();
    } catch (error: any) {
      toast.error(`There was an onSubmit error: ${error?.message}`);
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
