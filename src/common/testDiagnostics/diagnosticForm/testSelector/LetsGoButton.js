import React from 'react';
import Slide from '@material-ui/core/Slide';

export default class LetsGoButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }

  mouseEnter = () => {
    this.setState({ hovered: true });
  };

  mouseLeave = () => {
    this.setState({ hovered: false });
  };
  render() {
    return (
      <div
        className={
          // 'lets-go button'
          this.props.loadingTestStatus
            ? 'lets-go button is-loading'
            : 'lets-go button'
        }
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={this.props.handleSubmit}
        value="Let's Go!"
        style={{ overflow: 'hidden', width: '5em' }}
      >
        <Slide
          in={!this.state.hovered}
          direction="right"
          timeout={200}
          style={{ position: 'absolute', margin: 'auto' }}
        >
          <div>Let's Go!</div>
        </Slide>
        <Slide
          in={this.state.hovered}
          direction="right"
          timeoute={200}
          style={{ transitionDelay: 0 }}
        >
          <div
            style={{ position: 'absolute', margin: 'auto', fontSize: '1.5em' }}
          >
            <i className="fas fa-long-arrow-right" />
          </div>
        </Slide>
      </div>
    );
  }
}
