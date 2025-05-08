import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type AlignValue = "left" | "middle" | "right";
type SizeValue = "small" | "middle" | "large";

interface AlignmentStore {
  alignment: AlignValue;
  size: SizeValue;
  setAlignment: (value: AlignValue) => void;
  setSize: (value: SizeValue) => void;
  reset: () => void;
}

const defaultState = {
  alignment: "left" as AlignValue,
  size: "middle" as SizeValue,
};

export const useAlignmentStore = create<AlignmentStore>()(
  devtools(
    persist(
      (set) => ({
        ...defaultState,
        setAlignment: (value) =>
          set({ alignment: value }, false, "setAlignment"),
        setSize: (value) => set({ size: value }, false, "setSize"),
        reset: () => set(defaultState, false, "reset"),
      }),
      {
        name: "alignment-store", // localStorage key
        partialize: (state) => ({
          alignment: state.alignment,
          size: state.size,
        }),
      }
    ),
    { name: "AlignmentStore" }
  )
);
