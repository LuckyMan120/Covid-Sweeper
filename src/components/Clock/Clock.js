import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerOn: this.props.playing,
      timerStart: 0,
      timerTime: 0,
    };
  }

  componentDidMount() {
    if (this.state.timerOn) {
      this.startClock();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playing !== this.props.playing) {
      this.setState({
        timerOn: this.props.playing,
      });

      this.props.playing ? this.startClock() : this.stopClock();
    }
  }

  startClock = () => {
    this.setState({
      timerOn: true,
      timerStart: Date.now(),
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 10);
  };

  stopClock = () => {
    this.setState({ timerOn: false });
    this.props.updateTime(this.state.timerTime);
    clearInterval(this.timer);
  };

  resetClock = () => {
    console.log('resetting clock');
    this.setState({
      timerStart: 0,
      timerTime: 0,
    });
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);

    return (
      <div className='clock'>
        <div>
          {minutes} : {seconds} : {centiseconds}
        </div>
      </div>
    );
  }
}

export default Clock;
