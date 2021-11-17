import {Cow} from "./models/cows.model";

export function nextCowId (cows: Cow[]): number {
  return cows.reduce((acc, curr) => acc.cowId > curr.cowId ? acc : curr).cowId + 1;
}
