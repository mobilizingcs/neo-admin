import React from 'react';

import { Paper, MuiThemeProvider } from 'material-ui';
import { SocialSchool, SocialGroup, AvWeb, ActionSupervisorAccount } from 'material-ui/svg-icons';

import Header from './templates/Header';
import LeftDrawer from './templates/LeftDrawer';
import Theme from '../styles/theme';

import AppProgressBar from './AppProgressBar';
import Notification from './Notification';
import 'react-mdl/extra/material.js';

const menu_items = [
  { text: 'Summary', icon: <AvWeb />, link: '/summary' },
  { text: 'Users', icon: <SocialGroup />, link: '/users' },
  { text: 'Classes', icon: <SocialSchool />, link: '/classes' },
  { text: 'Teacher Setup', icon: <ActionSupervisorAccount />, link: '/teacher-setup' }
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
            <AppProgressBar />
            <LeftDrawer navDrawerOpen={true} menus={menu_items} />
            <Notification />
            <div style={this.styles.container}>
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
