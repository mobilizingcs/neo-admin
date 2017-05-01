import React from 'react';
import { connect } from 'react-redux';

import { LinearProgress, CircularProgress } from 'material-ui';

class AppProgressBar extends React.Component {
  constructor( props ) {
    super( props );
  }

  render( ) {
    const { is_visible } = this.props.progress_bar;
    const visibility = is_visible ? 'visible' : 'hidden';
    if( this.props.progress_type === 'circular' ) {
      return <CircularProgress style= { { visibility } } />;
    } else if( this.props.progress_type === 'linear' ) {
      const mode = this.props.progress_bar.is_indeterminate ? 'indeterminate' : 'determinate';
      let value;
      if( mode === 'indeterminate' ) {
        value = this.props.progress_bar.value > 0 ? this.props.progress_bar.value : 0;
      } else {
        value = null;
      }
      // todo: make linearprogress work with visibility: hidden/visible to occupy blank space
      // when there is no progress bar needed
      if( !is_visible ) {
        return null;
      }
      return (
        <LinearProgress style={ { 'width': '100%' } } mode={ mode } value={ value } />
      );
    }
  }
}

const mapStateToProps = ( state ) => {
  return {
    progress_bar: state.progressBar
  };
}

export default connect( mapStateToProps, null )( AppProgressBar );