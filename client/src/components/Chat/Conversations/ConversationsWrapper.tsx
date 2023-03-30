import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import { FC, useEffect } from "react";

import ConversationList from "./ConversationList";
import { ConversationOperations } from "../../../graphql/operations/converstion";
import {
  ConversationCreatedSubscriptionData,
  ConversationsData,
} from "../../../util/types";
import { useRouter } from "next/router";
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
  } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);
  const router = useRouter();
  const {
    query: { conversationId },
  } = router;

  const onViewConversation = (conversationId: string) => {
    /**
     * 1. Push the conversationId to the router query params
     */
    router.push({ query: { conversationId } });

    /**
     * 2. Only mark as read if conversation is unread
     */
  };

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscription.conversationCreated,
      updateQuery: (
        prev,
        { subscriptionData }: ConversationCreatedSubscriptionData
      ) => {
        if (!subscriptionData.data) return prev;

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
    subscribeToNewConversations();
  }, []);

  return (
    <Box
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "400px" }}
      bg="whiteAlpha.50"
      px={3}
      py={6}
    >
      {/* Skeleton Loader */}
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations ?? []}
        onViewConversation={onViewConversation}
      />
    </Box>
  );
};

export default ConversationsWrapper;
