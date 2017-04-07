import React from 'react';

import {  ContentAdd,
          ContentClear,
          ActionOpenInBrowser,
          AvPlayCircleOutline } from 'material-ui/svg-icons';

import {  Dialog,
          Popover,
          Menu,
          Chip,
          IconMenu,
          IconButton,
          MenuItem,
          RaisedButton,
          Toolbar,
          ToolbarGroup,
          ToolbarSeparator } from 'material-ui';

import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import FetchAuditLogs from './FetchAuditLogs';

class AuditConsoleToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      openMenu: false
    };
  }

  handleOpenDialog = ( ) => {
    this.setState({
      openDialog: true
    });
  };

  handleCloseDialog = ( ) => {
    this.setState({
      openDialog: false
    });
  };

  handleTouchTapMenu = (event) => {
    event.preventDefault();

    this.setState({
      openMenu: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestCloseMenu = () => {
    this.setState({
      openMenu: false
    });
  };

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <RaisedButton label='Import a recipe'
                          onClick={this.handleTouchTapMenu}
                          icon={<ActionOpenInBrowser />} />
            <Popover  open={this.state.openMenu}
                      onRequestClose={this.handleRequestCloseMenu}
                      anchorEl={this.state.anchorEl}
                      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                      targetOrigin={{horizontal: 'left', vertical: 'top'}}>
              <Menu>
                <MenuItem value="1" primaryText="Find a user" />
              </Menu>
            </Popover>
            <ToolbarSeparator />
            <RaisedButton label='Execute'
                          primary={true}
                          onClick={this.props.onClickExecute}
                          icon={<AvPlayCircleOutline />} />
            <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarGroup>
            <Chip>{'Local Log Count: ' + this.props.count }</Chip>
            <RaisedButton label='Append More Logs'
                          primary={true}
                          icon={<ContentAdd />}
                          onClick={this.handleOpenDialog} />
            <RaisedButton label='Clear Local Logs'
                          disabled={ this.props.count === 0 }
                          icon={<ContentClear />}
                          secondary={true} />
            <IconMenu iconButtonElement={
                        <IconButton touch={true}>
                          <NavigationExpandMoreIcon />
                        </IconButton>
                      } >
              <MenuItem primaryText="Save File" />
              <MenuItem primaryText="Clear" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <Dialog title="Fetch Ohmage Audit Logs"
                modal={false}
                open={this.state.openDialog}
                onRequestClose={this.handleCloseDialog} >
            <FetchAuditLogs />
        </Dialog>
      </div>
    );
  }
}

export default AuditConsoleToolbar;