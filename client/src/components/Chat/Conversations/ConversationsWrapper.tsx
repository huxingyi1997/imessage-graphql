import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import type { FC } from "react";

import ConversationList from "./ConversationList";
import { ConverstionOperations } from "../../../graphql/operations/converstion";
import { ConversationsData } from "../../../util/types";
interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: FC<ConversationsWrapperProps> = ({ session }) => {
  /**
   * Queries
   */
  const {
    data: conversationsData,
    loading: conversationsLoading,
    error: conversationsError,
    subscribeToMore,
  } = useQuery<ConversationsData>(ConverstionOperations.Queries.conversations);

  console.log("HERE IS DATA", conversationsData);

  return (
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" px={3} py={6}>
      {/* Skeleton Loader */}
      <ConversationList session={session} />
    </Box>
  );
};

export default ConversationsWrapper;
