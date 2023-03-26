import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import type { FC } from "react";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: FC<FeedWrapperProps> = (props) => {
  const router = useRouter();

  const { conversationId } = router.query;

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      width="100%"
      direction="column"
    >
      {conversationId ? (
        <Flex>{conversationId}</Flex>
      ) : (
        <div>No Conversation Selected</div>
      )}
    </Flex>
  );
};

export default FeedWrapper;
