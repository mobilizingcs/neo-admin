import React from 'react';

import { Paper, MuiThemeProvider } from 'material-ui';
import {  AvWeb,
          ActionSearch,
          ActionSupervisorAccount } from 'material-ui/svg-icons';

import Header from './templates/Header';
import LeftDrawer from './templates/LeftDrawer';
import Theme from '../styles/theme';

import AppProgressBar from './AppProgressBar';
import Notifications from './Notifications';

const menu_items = [
  { text: 'Summary', icon: <AvWeb />, link: '/summary' },
  //{ text: 'Users', icon: <SocialGroup />, link: '/users' },
  //{ text: 'Classes', icon: <SocialSchool />, link: '/classes' },
  { text: 'Teacher Setup', icon: <ActionSupervisorAccount />, link: '/teacher-setup' },
  { text: 'Audit Console', icon: <ActionSearch />, link: '/audit-console'}
];


class AppComponent extends React.Component {
  constructor( ) {
    super( );
    this.styles = {
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: 236
      }
    };
  }
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={Theme}>
          <div>
            <Header title={this.props.children.props.route.title} styles={{paddingLeft:248}}/>
            <LeftDrawer navDrawerOpen={true} menus={menu_items} />
            <Notifications />
            <div style={this.styles.container}>
              <AppProgressBar />
              <Paper style={{padding: 30, marginLeft: 1}}>
                {this.props.children}
                <div style={{clear: 'both'}}/>
              </Paper>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default AppComponent;
