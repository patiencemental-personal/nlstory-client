import React from 'react'
import { useFloatingPopupStore } from 'stores/useFloatingPopupStore';
import { floatingPopupType } from 'utils/popup';
import FloatingPopupTemplate from './FloatingPopupTemplate';

export default function GlobalFloatingPopup() {
  const {visible, config} = useFloatingPopupStore();
  if (visible) {
    const { type, mousePosition } = config!;
    return <FloatingPopupTemplate mousePosition={mousePosition}>
    </FloatingPopupTemplate>
  }
  return <React.Fragment />
}