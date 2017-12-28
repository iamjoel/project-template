import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Users from "./routes/Users.js";


function RouterConfig({ history }) {
  return (
    <Router history={history}>  
      <Switch>
        // Switch 渲染第一个匹配的组件，性能比较好。具体见 https://reacttraining.com/react-router/core/api/Switch
        一些公共的内容。。。
        <Route path="/" exact component={IndexPage} />
        <Route path="/users" component={Users} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
