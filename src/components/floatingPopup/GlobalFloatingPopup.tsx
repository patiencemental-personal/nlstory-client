import React from 'react'
import { useFloatingPopupStore } from 'stores/useFloatingPopupStore';
import { floatingPopupType } from 'utils/freezeTypes';
import FloatingPopupTemplate from './FloatingPopupTemplate';
import TagManagementSelectionFloatingPopup from './TagManagementSelectionFloatingPopup';

export default function GlobalFloatingPopup() {
  const {visible, config} = useFloatingPopupStore();
  if (visible) {
    const { type, mousePosition } = config!;
    return <FloatingPopupTemplate mousePosition={mousePosition}>
      {type === floatingPopupType.TAG_MANAGEMENT_SELECTION && <TagManagementSelectionFloatingPopup />}
    </FloatingPopupTemplate>
  }
  return <React.Fragment />
}
