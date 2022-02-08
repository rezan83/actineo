import { Badge, Box, Image, Link, Flex } from "@chakra-ui/react";
import { StarIcon, LinkIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../../app/hooks";
import { star } from "./githubSlice";

const Card = ({ repo }: any) => {
  const dispatch = useAppDispatch();
  const starRepo = (id: string) => {
    dispatch(star(id));
  };
  const property = {
    imageAlt: "Repositories Owner Avatar image",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Flex
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Image src={repo.owner.avatar_url} alt={property.imageAlt} />
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {repo.name}
          </Badge>
        </Box>
      </Box>

      <Box p="6">
        <Box
          my="5"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          color="gray.600"
          // isTruncated
        >
          {repo.description}
        </Box>

        <Box
          display="flex"
          mt="2"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            <StarIcon
              onClick={() => starRepo(repo.id)}
              color={repo.star ? "yellow.500" : "gray.300"}
            />
            {repo.stargazers_count} stars
          </Box>
          <Box as="span" color="gray.600" fontSize="sm">
            <Link href={repo.html_url}>repo link</Link> <LinkIcon />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Card;
