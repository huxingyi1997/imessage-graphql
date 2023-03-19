import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import type { FC } from "react";
import ConversationList from "./ConversationList";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: FC<ConversationsWrapperProps> = ({ session }) => {
  return (
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" px={3} py={6}>
      {/* Skeleton Loader */}
      <ConversationList session={session} />
    </Box>
  );
};

export default ConversationsWrapper;
