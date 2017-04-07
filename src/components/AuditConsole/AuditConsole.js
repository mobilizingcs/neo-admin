import React from 'react';
import { connect } from 'react-redux';

import {  Grid,
          Row,
          Col } from 'react-flexbox-grid';

import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/textmate';

import AuditConsoleToolbar from './AuditConsoleToolbar';
import OutputConsole from './OutputConsole';
import { fetchLocalLogsState } from '../../actions/auditconsole';

class AuditConsole extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      code: '',
      output: [ ]
    };
    this.worker;
  }

  componentDidMount() {
    if( !this.props.local_state.is_fetched ) {
      this.props.dispatch( fetchLocalLogsState( ) );
    }
  }

  updateCode = ( value ) => {
    this.setState( {
      code: value
    } );
  };

  logToOutputConsole = ( text, type, lineno, colno ) => {
    this.setState( {
      output: this.state.output.concat( [ { text, lineno, colno, type } ] )
    } );
  };

  clearOutputConsole = ( ) => {
    this.setState( {
      output: [ ]
    } );
  };

  executeCode = ( ) => {
    var blobURL = URL.createObjectURL(
      new Blob([ '(function(){', this.state.code, '})()' ], {type: 'application/javascript'} )
    );
    this.worker = new Worker( blobURL );

    this.worker.onerror = error => {
      this.logToOutputConsole( error.message, 'error', error.lineno, error.colno );
    };
    this.worker.onmessage = message => {
      if( message.data.type === 'output_console' ) {
        const { text, type, lineno, colno } = message.data.data;
        this.logToOutputConsole( text, type, lineno, colno );
      }
    };

    URL.revokeObjectURL( blobURL );
  };

  render( ) {
    const { local_state } = this.props;
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs>
              <AuditConsoleToolbar  onClickExecute={this.executeCode}
                                    count={local_state.state.count} />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <AceEditor  fontSize={20}
                          tabSize={2}
                          value={this.state.code}
                          onChange={this.updateCode}
                          width="100%"
                          height="300px"
                          mode="javascript"
                          theme="textmate"
                          name="code_editor" />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <OutputConsole onClearConsole={this.clearOutputConsole} output={this.state.output} />
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