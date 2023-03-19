import { useLazyQuery } from "@apollo/client";
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
import { type FC, FormEvent, useState } from "react";

import { UserOperations } from "../../../../graphql/operations/user";
import type {
  SearchedUser,
  SearchUsersData,
  SearchUsersInputs,
} from "../../../../util/types";
import Participants from "./Participants";
import UserSearchList from "./UserSearchList";

interface ConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: FC<ConversationModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState<string>("");
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInputs
  >(UserOperations.Queries.searchUsers);
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

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
            <Participants
              participants={participants}
              removeParticipant={removeParticipant}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConversationModal;
