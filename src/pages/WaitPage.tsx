import styles from './WaitPage.module.css';
import textStyles from 'styles/Text.module.css';

export default function WaitPage() {
  return (
    <div className={`${textStyles.xl4} ${styles.page}`}><div>Wait...</div></div>
  )
}
