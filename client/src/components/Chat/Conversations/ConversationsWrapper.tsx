import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import { FC, useEffect } from "react";

import ConversationList from "./ConversationList";
import { ConverstionOperations } from "../../../graphql/operations/converstion";
import {
  ConversationCreatedSubscriptionData,
  ConversationsData,
} from "../../../util/types";
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

  console.log("HERE IS QUERY DATA", conversationsData);

  const subscribeToNewConverstions = () => {
    subscribeToMore({
      document: ConverstionOperations.Subscription.conversationCreated,
      updateQuery: (
        prev,
        { subscriptionData }: ConversationCreatedSubscriptionData
      ) => {
        if (!subscriptionData.data) return prev;

        console.log("HERE IS QUERY DATA", subscriptionData);

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...(prev?.conversations ?? [])],
        });
      },
    });
  };

  /**
   * Execute subscription on mount
   */
  useEffect(() => {
    subscribeToNewConverstions();
  }, []);

  console.log("HERE IS conversations DATA", conversationsData);

  return (
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" px={3} py={6}>
      {/* Skeleton Loader */}
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations ?? []}
      />
    </Box>
  );
};

export default ConversationsWrapper;
