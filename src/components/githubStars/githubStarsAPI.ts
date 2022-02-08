import axios from "axios";
import { DateTime } from "luxon";

const date = DateTime.now().plus({ days: -7 }).toFormat("yyyy-MM-dd");
const URL = `https://api.github.com/search/repositories?q=created:%3E${date}&sort=stars&order=desc`;

export const getData = async () => {
  let res = await axios.get(URL);
  let data = await res.data.items;

  return data;
};
