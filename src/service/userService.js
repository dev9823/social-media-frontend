import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/fetchData";

export default function getProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getData("people/me/"),
  });
}
