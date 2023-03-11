import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { type FC } from "react";

interface IChatProps {}

const Chat: FC<IChatProps> = (props: IChatProps) => {
  return (
    <div>
      <Button onClick={() => signOut()}>LogOut</Button>
    </div>
  );
};

export default Chat;
