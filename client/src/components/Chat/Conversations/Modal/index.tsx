import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { Session } from "next-auth";
import { type FC, FormEvent, useState } from "react";
import { useRouter } from "next/router";

import { UserOperations } from "../../../../graphql/operations/user";
import { ConverstionOperations } from "../../../../graphql/operations/converstion";
import type {
  CreateConversationData,
  CreateConversationsInput,
  SearchedUser,
  SearchUsersData,
  SearchUsersInputs,
} from "../../../../util/types";
import Participants from "./Participants";
import UserSearchList from "./UserSearchList";

interface ConversationModalProps {
  isOpen: boolean;
  session: Session;
  onClose: () => void;
}

const ConversationModal: FC<ConversationModalProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const {
    user: { id: userId },
  } = session;

  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInputs
  >(UserOperations.Queries.searchUsers);
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);
  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationsInput>(
      ConverstionOperations.Mutations.createConversation
    );

  const onSearch = async (event: FormEvent) => {
    event.preventDefault();
    // search users query
    searchUsers({ variables: { username } });
  };

  console.log("HERE IS SEARCH DATA", data);

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
  };

  const onCreateConversation = async () => {
    const participantIds = [userId, ...participants.map((p) => p.id)];
    try {
      const { data } = await createConversation({
        variables: {
          participantIds,
        },
      });

      if (!data?.createConversation) {
        throw new Error("Failed to create conversation");
      }

      const {
        createConversation: { conversationId },
      } = data;

      router.push({ query: { conversationId } });

      /**
       * Clear state and close modal
       * on successful creation
       */
      setParticipants([]);
      setUsername("");
      onClose();
      console.log("HERE IS DATA", data);
    } catch (error: any) {
      console.log("createConversations error", error);
      toast.error(error?.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#2d2d2d" pb={4}>
        <ModalHeader>Create a conversation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSearch}>
            <Stack spacing={4}>
              <Input
                placeholder="Enter a username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <Button type="submit" disabled={!username} isLoading={loading}>
                Search
              </Button>
            </Stack>
          </form>
          {data?.searchUsers && (
            <UserSearchList
              users={data?.searchUsers}
              addParticipant={addParticipant}
            />
          )}
          {participants.length > 0 && (
            <>
              <Participants
                participants={participants}
                removeParticipant={removeParticipant}
              />
              <Button
                bg="brand.100"
                width="100%"
                mt={6}
                _hover={{ bg: "brand.100" }}
                isLoading={createConversationLoading}
                onClick={onCreateConversation}
              >
                Create Conversation
              </Button>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConversationModal;
