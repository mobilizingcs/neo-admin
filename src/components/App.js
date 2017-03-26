import React from 'react';
import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';
import { Link } from 'react-router';

import AppProgressBar from './AppProgressBar';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <Layout fixedHeader fixedDrawer>
            <Header title={this.props.children.props.route.title} />
            <AppProgressBar />
            <Drawer title="Admin Tool">
                <Navigation>
                    <Link activeClassName="is-active" to="/summary">Summary</Link>
                    {/*<Link activeClassName="is-active" to="/users">Users</Link>
                    <Link activeClassName="is-active" to="/classes">Classes</Link>*/}
                    <Link activeClassName="is-active" to="/teacher-setup">Teacher Setup</Link>
                    <Link activeClassName="is-active" to="/audits">Audit Console</Link>
                </Navigation>
            </Drawer>
            <Content>
                {this.props.children}
            </Content>
        </Layout>
    </div>
    );
  }
}

export default AppComponent;
