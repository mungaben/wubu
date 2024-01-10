

import { type } from 'os';
import { create } from 'zustand';







// open and close nav modal when clicking on the hamburger icon

export type ZustandtorageType = {
  modalName: string;
  navModalOpen: boolean;
  toggleNavModal: () => void;
};

export const Zustandtorage = create<ZustandtorageType>((set) => ({
  navModalOpen: false,
  modalName: '',
  toggleNavModal: () => set((state) => ({ navModalOpen: !state.navModalOpen })),

}));

