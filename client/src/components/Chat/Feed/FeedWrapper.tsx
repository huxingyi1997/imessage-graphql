import { Session } from "next-auth";
import type { FC } from "react";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: FC<FeedWrapperProps> = (props) => {
  return <div>FeedWrapper</div>;
};

export default FeedWrapper;
