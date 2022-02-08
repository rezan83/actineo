import { SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Card from "./Card";
import {
  githubDataAsync,
  selectfiltered,
  selectRepos,
  selectStaredRepos,
} from "./githubSlice";

const CardList: React.FC = () => {
  let filtered = useAppSelector(selectfiltered);
  let allRepos = useAppSelector(selectRepos);
  let staredRepos = useAppSelector(selectStaredRepos);

  let reposList = filtered ? staredRepos : allRepos;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(githubDataAsync());
  }, [dispatch]);

  return (
    <SimpleGrid columns={[1, 3, 3, 4]} spacing="40px" padding="40px">
      {reposList.length ? reposList.map((repo) => <Card repo={repo} key={repo.id} data-testid={repo.id} />) : ""}
    </SimpleGrid>
  );
};

export default CardList;
