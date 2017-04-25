import React from 'react';
import { connect } from 'react-redux';

import { LinearProgress } from 'material-ui';

class AppProgressBar extends React.Component {
  constructor( ) {
    super( );
  }

  render( ) {
    return (
      <LinearProgress style={ { 'width': '100%', visibility: this.props.progress_bar.is_visible ? 'visible' : 'hidden' } }
        value={ this.props.progress_bar.progress > 0 ? this.props.progress_bar.progress : 0 }
        mode={ this.props.progress_bar.is_indeterminate ? 'indeterminate' : 'determinate' } />
      );
  }
}

const mapStateToProps = ( state ) => {
  return {
    progress_bar: state.progressBar
  };
}

export default connect( mapStateToProps, null )( AppProgressBar );