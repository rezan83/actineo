import { Box, Flex, HStack, Button, useColorModeValue } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { filter, selectfiltered } from "../githubStars/githubSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import './navbar.scss'

const Navbar = () => {
  const dispatch = useAppDispatch();
  const filtered = useAppSelector(selectfiltered);
  return (
    <nav>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box color={"#000317"}><h1><b>GithubStars</b> </h1></Box>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              onClick={() => dispatch(filter())}
              variant={"solid"}
              background="#000317"
              color ={"white"}
              size={"sm"}
              mr={4}
              leftIcon={
                <StarIcon color={filtered ? "yellow.500" : "gray.300"} />
              }
            >
              Stared
            </Button>
          </Flex>
        </Flex>
      </Box>
    </nav>
  );
};

export default Navbar;
