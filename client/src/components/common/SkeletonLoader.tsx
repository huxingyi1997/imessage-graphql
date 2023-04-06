import { Skeleton } from "@chakra-ui/react";
import { type FC } from "react";

interface SkeletonLoaderProps {
  count: number;
  height: string;
  width?: string;
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({ count, height }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Skeleton
          key={i}
          startColor="blackAlpha.400"
          endColor="whiteAlpha.300"
          height={height}
          width={{ base: "full" }}
          borderRadius={4}
        />
      ))}
    </>
  );
};
export default SkeletonLoader;
