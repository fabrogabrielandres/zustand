import { create } from "zustand";
import { PersonSlice, createPersonSlice } from "./person.Slice";
import { GuestSLice, createWeddingSLice } from "./guests.Slice";
import { devtools } from "zustand/middleware";
import { DateSlice, createDateSlice } from "./dateSlice";

type ShareState = PersonSlice & GuestSLice & DateSlice;

export const useWeddingBoundStore = create<ShareState>()(
    devtools((...a) => ({
  ...createPersonSlice(...a),
  ...createWeddingSLice(...a),
  ...createDateSlice(...a)
}))
);
