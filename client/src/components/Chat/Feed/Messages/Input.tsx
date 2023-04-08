import { useState, type FC, type FormEvent } from "react";
import { Session } from "next-auth";
import { Box, Input } from "@chakra-ui/react";
import { ObjectId } from "bson";
import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";

import { MessagesOperations } from "../../../../graphql/operations/messages";
import { MessagesData, SendMessageVariables } from "../../../../util/types";

interface MessageInputProps {
  session: Session;
  conversationId: string;
}

const MessageInput: FC<MessageInputProps> = ({ session, conversationId }) => {
  const [messageBody, setMessageBody] = useState<string>("");
  const [sendMessage] = useMutation<
    { sendMessage: boolean },
    SendMessageVariables
  >(MessagesOperations.Mutation.sendMessage);

  const onSendMessage = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const {
        user: { id: senderId, username },
      } = session;
      const messageId = new ObjectId().toString();
      const newMessage: SendMessageVariables = {
        id: messageId,
        senderId,
        conversationId,
        body: messageBody,
      };

      const { data, errors } = await sendMessage({
        variables: {
          ...newMessage,
        },
        /**
         * Optimistically update UI
         */
        optimisticResponse: {
          sendMessage: true,
        },
        update: (cache) => {
          // Clearinput state
          setMessageBody("");
          const existing = cache.readQuery<MessagesData>({
            query: MessagesOperations.Query.messages,
            variables: { conversationId },
          });

          cache.writeQuery<MessagesData, { conversationId: string }>({
            query: MessagesOperations.Query.messages,
            variables: { conversationId },
            data: {
              ...existing,
              messages: [
                {
                  ...newMessage,
                  sender: {
                    id: senderId,
                    username,
                  },
                  createdAt: new Date(Date.now()),
                  updatedAt: new Date(Date.now()),
                },
                ...(existing?.messages ?? []),
              ],
            },
          });
        },
      });

      if (!data?.sendMessage || errors) {
        throw new Error("Failed to send message");
      }
    } catch (error: any) {
      console.log("onSendMessage error", error);
      toast.error(error?.message);
    }
  };

  return (
    <Box px={4} py={6} width="100%">
      <form onSubmit={onSendMessage}>
        <Input
          value={messageBody}
          onChange={(event) => setMessageBody(event.target.value)}
          size="md"
          placeholder="New message"
          color="whiteAlpha.900"
          resize="none"
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "whiteAlpha.300",
          }}
          _hover={{
            borderColor: "whiteAlpha.300",
          }}
        />
      </form>
    </Box>
  );
};

export default MessageInput;
