import axios from "axios";
import { Ascent, Location, Event, User } from "./types";

type AddAscentArgs = {
  type: Ascent["type"];
  location: Location;
  boulderId: number;
  forEvent?: Event | null;
  forUser?: User | null;
};

export async function addAscent({
  type,
  location,
  boulderId,
  forEvent,
  forUser,
}: AddAscentArgs): Promise<string[]> {
  const params: {
    event?: number;
    forUser?: number;
  } = {};

  const mutations = [
    `/api/${location.url}/boulders`,
    `/api/${location.url}/boulders/${boulderId}`,
  ];

  if (forEvent) {
    params.event = forEvent.id;
    mutations.push(`/api/${location?.url}/events/${forEvent.id}`);
  }

  if (forUser) {
    params.forUser = forUser.id;
  }

  await axios.post(
    `/api/${location.url}/ascents`,
    {
      boulder: boulderId,
      type,
    },
    {
      params,
    }
  );

  return mutations;
}
