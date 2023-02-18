import React from 'react'
import { usePopupStore } from 'stores/usePopupStore';
import styles from './PopupTemplate.module.css';
import textStyles from 'styles/Text.module.css';
import CancleButton from 'components/common/CancleButton';

export default function PopupTemplate({children}: { children: React.ReactNode }) {
  const { getOption, closePopup } = usePopupStore();
  const { title } = getOption();

  const closePopupByBackgroundClick = (event: React.BaseSyntheticEvent) => {
    if (event.target.id === 'background') {
      closePopup();
    }
  }

  return (
    <div id='background' className={styles.background}>
      {/* w-auto로 함으로써 팝업 구현체에서 default, max, min width를 지정 */}
      <div id='template' className={styles.template}>
        <div className={`${styles.header} ${textStyles.xl}`}>
          {title ? <span className={styles.title}>{title}</span> : <div></div>}
          <CancleButton onClick={closePopup} />
        </div>
        {children}
      </div>
    </div>
  )
}
