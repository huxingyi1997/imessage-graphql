import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { FC, useState } from "react";

import {
  ConversationPopulated,
  ParticipantPopulated,
} from "../../../../../server/src/util/types";
import ConversationItem from "./ConversationItem";
import ConversationModal from "./Modal";

interface ConversationListProps {
  session: Session;
  conversations: Array<ConversationPopulated>;
  onViewConversation: (
    conversationId: string,
    hasSeenLatestMessage?: boolean
  ) => void;
}

const ConversationList: FC<ConversationListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const router = useRouter();
  const {
    user: { id: userId },
  } = session;

  const getUserParticipantObject = (conversation: ConversationPopulated) => {
    return conversation.participants.find(
      (p: ParticipantPopulated) => p.user.id === userId
    ) as ParticipantPopulated;
  };

  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <ConversationModal session={session} isOpen={isOpen} onClose={onClose} />
      {conversations.map((conversation) => {
        const { hasSeenLatestMessage } = getUserParticipantObject(conversation);

        return (
          <ConversationItem
            key={conversation.id}
            userId={userId}
            conversation={conversation}
            hasSeenLatestMessage={hasSeenLatestMessage}
            onClick={() =>
              onViewConversation(conversation.id, hasSeenLatestMessage)
            }
            isSelected={conversation.id === router.query.conversationId}
          />
        );
      })}
    </Box>
  );
};

export default ConversationList;
