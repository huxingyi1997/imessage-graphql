import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import type { FC } from "react";
import MessagesHeader from "./Messages/Header";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: FC<FeedWrapperProps> = ({ session }) => {
  const router = useRouter();

  const { conversationId } = router.query;
  const {
    user: { id: userId },
  } = session;

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      width="100%"
      direction="column"
    >
      {conversationId && typeof conversationId === "string" ? (
        <Flex
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
        >
          <MessagesHeader conversationId={conversationId} userId={userId} />
        </Flex>
      ) : (
        <div>No Conversation Selected</div>
      )}
    </Flex>
  );
};

export default FeedWrapper;
