import React, { Component } from 'react';
import Pusher from 'pusher-js';

import './Dashboard.css';

class Dashboard extends Component {
  state = {
    processed: 0,
    dropped: 0,
    delivered: 0,
    deferred: 0,
    bounce: 0,
  }

  componentDidMount() {
    const pusher = new Pusher('<your app key>', {
      cluster: '<your app cluster>',
      forceTLS: true
    });

    var channel = pusher.subscribe('email-events');
    channel.bind('new-event', data => {
      const { event } = data;
      this.setState(prevState => {
        return {
          [event]: prevState[event] + 1
        }
      });
    });
  }

  render() {
    const { processed, dropped, delivered, deferred, bounce } = this.state;
    return (
      <div className="Dashboard">
        <h1>Realtime Transactional Email Monitoring</h1>
        <div className="metrics">

        <div className="metric">
          <span className="metric-name">Emails Processed</span>
          <span className="metric-value">{processed}</span>
        </div>
      <div className="metric">
      <span className="metric-name">Emails Delivered</span>
      <span className="metric-value">{delivered}</span>
      </div>
      <div className="metric">
          <span className="metric-name">Emails Dropped</span>
          <span className="metric-value">{dropped}</span>
      </div>
      <div className="metric">
          <span className="metric-name">Emails Deferred</span>
          <span className="metric-value">{deferred}</span>
       </div>
      <div className="metric">
          <span className="metric-name">Bounced Emails</span>
          <span className="metric-value">{bounce}</span>
        </div>
      </div>
      </div>
    );
  }
}

export default Dashboard;
