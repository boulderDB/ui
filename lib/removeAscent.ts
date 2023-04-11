import axios from "axios";
import { Location, Event, User } from "./types";

type RemoveAscentArgs = {
  location: Location;
  ascentId: number;
  boulderId: number;
  forEvent?: Event | null;
  forUser?: User | null;
};

export async function removeAscent({
  location,
  ascentId,
  boulderId,
  forEvent,
  forUser,
}: RemoveAscentArgs): Promise<string[]> {
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

  await axios.delete(`/api/${location.url}/ascents/${ascentId}`, {
    params,
  });

  return mutations;
}
