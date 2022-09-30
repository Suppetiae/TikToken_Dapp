import { atom, useAtom } from 'jotai';

export type MODAL_VIEW = 'TIK_VIEW';
const modalAtom = atom({ isOpen: false, view: 'TIK_VIEW' });

export function useTikModal() {
  const [state, setState] = useAtom(modalAtom);
  const openTikModal = (view: MODAL_VIEW) =>
    setState({ ...state, isOpen: true, view });
  const closeTikModal = () => setState({ ...state, isOpen: false });

  return {
    ...state,
    openTikModal,
    closeTikModal,
  };
}
