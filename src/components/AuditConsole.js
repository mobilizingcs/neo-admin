import React from 'react';
import { connect } from 'react-redux';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';

import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/textmate';

import AuditConsoleToolbar from './AuditConsoleToolbar';
import { fetchLocalLogsState } from '../actions/auditconsole';

class AuditConsole extends React.Component {

  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    if( !this.props.local_state.is_fetched ) {
      this.props.dispatch( fetchLocalLogsState( ) );
    }
  }

  render( ) {
    const { local_state } = this.props;
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs>
              <AuditConsoleToolbar count={local_state.state.count} />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <AceEditor  fontSize={20}
                          tabSize={2}
                          width="100%"
                          mode="javascript"
                          theme="textmate"
                          name="code_editor" />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { auditConsole } = state;
  return {
    local_state: auditConsole.local_state
  }
}

export default connect(mapStateToProps)(AuditConsole);