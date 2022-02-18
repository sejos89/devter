import styles from './styles.module.css';

export const Avatar = ({ alt, src, text }) => {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={src} alt={alt} title={alt} />
      {text && <strong>{text}</strong>}
    </div>
  );
};
