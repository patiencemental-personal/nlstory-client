import React from 'react'
import { usePopupStore } from 'stores/usePopupStore';
import styles from './PopupTemplate.module.css';
import textStyles from 'styles/Text.module.css';
import CancleButton from 'components/common/CancleButton';

export default function PopupTemplate({children}: { children: React.ReactNode }) {
  const { getOption, closePopup } = usePopupStore();
  const title = getOption()?.title;
  const customClosePopup = getOption()?.closePopup;
  const hideHeader = (() => {
    let hide = getOption()?.hideHeader;
    if (hide === undefined) hide = false;
    return hide;
  })();

  const closePopupByBackgroundClick = (event: React.BaseSyntheticEvent) => {
    if (event.target.id === 'background') {
      closePopup();
    }
  }

  return (
    <div id='background' className={styles.background}>
      <div id='template' className={styles.template}>
        {!hideHeader && (
          <div className={`${styles.header} ${textStyles.xl}`}>
            {title ? <span className={styles.title}>{title}</span> : <div></div>}
            <CancleButton onClick={customClosePopup || closePopup} />
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
