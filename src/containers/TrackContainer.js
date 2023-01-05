import styles from 'styles/Search-results.module.scss';

const TrackContainer = ({ children }) => {
  children = children ? children : 'hola';
    return (
        <div className={styles["tracks-list"]}>
           {children}
        </div>
    );
}

export default TrackContainer;