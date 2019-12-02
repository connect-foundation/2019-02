import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fscreen from 'fscreen';

class FullScreen extends Component {
  static actionFullScreen(node) {
    if (fscreen.fullscreenEnabled) {
      fscreen.requestFullscreen(node);
    }
  }

  static actionNormalScreen() {
    if (fscreen.fullscreenEnabled) {
      fscreen.exitFullscreen();
    }
  }

  constructor(props) {
    super(props);

    this.findFullScreen = this.findFullScreen.bind(this);
  }

  componentDidMount() {
    fscreen.addEventListener('fullscreenchange', this.findFullScreen);
  }

  componentDidUpdate() {
    this.handleProps(this.props);
  }

  componentWillUnmount() {
    fscreen.removeEventListener('fullscreenchange', this.findFullScreen);
  }

  handleProps(props) {
    const enabled = fscreen.fullscreenElement === this.node;
    if (enabled && !props.enabled) {
      FullScreen.actionNormalScreen();
    } else if (!enabled && props.enabled) {
      FullScreen.actionFullScreen(this.node);
    }
  }

  findFullScreen() {
    const { onChange } = this.props;

    if (onChange) {
      onChange(fscreen.fullscreenElement === this.node);
    }
  }

  render() {
    const { enabled, children } = this.props;
    const customClassName = ['fullscreen'];
    if (enabled) {
      customClassName.push('fullscreen-enabled');
    }

    return (
      <div
        className={customClassName.join(' ')}
        ref={(node) => { this.node = node; }}
        style={{ height: '100%', width: '100%' }}
      >
        {children}
      </div>
    );
  }
}

FullScreen.propTypes = {
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

FullScreen.defaultProps = {
  enabled: false,
};

export default FullScreen;
