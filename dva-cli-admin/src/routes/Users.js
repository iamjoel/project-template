import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';

function Users() {
  return (
    <div className={styles.normal}>
      Route Component: Users
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Users);
