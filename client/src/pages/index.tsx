import { Box } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import type { NextPage, NextPageContext } from "next";

import Chat from "../components/Chat";
import Auth from "../components/Auth";

const Home: NextPage = () => {
  const { data: session } = useSession();

  console.log("HERE IS SESSION", session);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <Box>
      {session?.user?.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
};

export const getServiceSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};

export default Home;
