import styles from '../../styles/CommentShimmer.module.css';

const CommentShimmer = () => {
  return (
    <li className={`${styles.shimmer_box} ${styles.shimmer}`}>
      <div className={`${styles.shimmer_score_box} ${styles.shimmer}`}></div>
      <div className={styles.shimmer_comment_info}>
        <div className={styles.shimmer_comment_details_box}>
          <div className={styles.shimmer}></div>
          <span className={styles.shimmer}></span>
          <span className={styles.shimmer}></span>
        </div>
        <div className={styles.shimmer_comment_text}>
          <span className={styles.shimmer}></span>
          <span className={styles.shimmer}></span>
          <span className={styles.shimmer}></span>
        </div>
      </div>
    </li>
  );
};

export default CommentShimmer;
