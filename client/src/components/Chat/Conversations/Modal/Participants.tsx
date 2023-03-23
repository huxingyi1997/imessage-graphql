import { Flex, Stack, Text } from "@chakra-ui/react";
import { type FC } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { SearchedUser } from "../../../../util/types";

interface ParticipantsProps {
  participants: Array<SearchedUser>;
  removeParticipant: (userId: string) => void;
}

const Participants: FC<ParticipantsProps> = ({
  participants,
  removeParticipant,
}) => {
  console.log("HERE ARE PARTICIPANTS", participants);

  return (
    <Flex mt={8} gap="10px" flexWrap="wrap">
      {participants.map((participant) => (
        <Stack
          key={participant.id}
          direction="row"
          align="center"
          bg="whiteAlpha.200"
          borderRadius={4}
          p={2}
        >
          <Text>{participant.username}</Text>
          <IoIosCloseCircleOutline
            size={20}
            cursor="pointer"
            onClick={() => {
              removeParticipant(participant.id);
            }}
          />
        </Stack>
      ))}
    </Flex>
  );
};

export default Participants;
