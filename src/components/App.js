import React from 'react';
import {  Route,
          Switch,
          Redirect,
          matchPath } from 'react-router-dom';

import { MuiThemeProvider } from 'material-ui';
import {  AvWeb,
          ActionSearch,
          ActionSupervisorAccount } from 'material-ui/svg-icons';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';

import Header from './templates/Header';
import LeftDrawer from './templates/LeftDrawer';
import Theme from '../styles/theme';

import AppProgressBar from './utils/AppProgressBar';
import Notifications from './utils/Notifications';

import Summary from './Summary';
import AuditConsole from './AuditConsole/AuditConsole';
import TeacherSetup from './TeacherSetup/TeacherSetup';
import Classes from './Class/Classes';
import ClassComponent from './Class/ClassComponent';

import Perf from 'react-addons-perf'
window.Perf = Perf

class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      navDrawerOpen: true
    };
    this.routes = [
      { path: '/summary', isExact: false, title: 'Summary', component: Summary },
      { path: '/audit-console', isExact: false, title: 'Audit & API Console', component: AuditConsole },
      { path: '/teacher-setup', isExact: false, title: 'Teacher Setup Wizard', component: TeacherSetup },
      { path: '/classes', isExact: false, title: 'Classes', component: Classes },
      { path: '/class/:urn', isExact: false, title: 'Class Details', component: ClassComponent }
    ];
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState( ( prevState ) => ( {
      navDrawerOpen: !prevState.navDrawerOpen
    } ) );
  }

  getHeaderTitle = ( location ) => {
    for( let i = 0; i < this.routes.length; i++ ) {
      if( matchPath( location.pathname, { path: this.routes[ i ].path } ) ) {
        return this.routes[ i ].title;
      }
    }
    return '';
  };

  getMenuItems = ( location ) => {
    let menu_items = [
      { active: false, text: 'Summary', icon: <AvWeb />, path: '/summary' },
      { active: false, text: 'Teacher Setup', icon: <ActionSupervisorAccount />, path: '/teacher-setup' },
      { active: false, text: 'Audit & API Console', icon: <ActionSearch />, path: '/audit-console'},
      { active: false, text: 'Classes', icon: null, path: '/classes' }
    ];
    for( let i = 0; i < menu_items.length; i++ ) {
      menu_items[ i ].active = matchPath( location.pathname, { path: menu_items[ i ].path } );
    }
    return menu_items;
  };

  render( ) {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;
    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };
    return (
      <div>
        <MuiThemeProvider muiTheme={Theme}>
          <div>
            <Header title={this.getHeaderTitle( this.props.location )}
                    styles={styles.header}
                    handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)} />
            <LeftDrawer navDrawerOpen={navDrawerOpen} menus={this.getMenuItems( this.props.location )} />
            <Notifications />
            <div style={styles.container}>
              <AppProgressBar progress_type='linear' />
                <Switch>
                  <Redirect exact from='/' to='/summary' />
                  {
                    this.routes.map( ( route, i ) => {
                      return (<Route key={i}
                                      exact={route.isExact}
                                      path={route.path}
                                      title={route.title}
                                      component={route.component} />);
                    } )
                  }
                </Switch>
                <div style={{clear: 'both'}}/>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withWidth()( App );
