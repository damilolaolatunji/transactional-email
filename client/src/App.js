import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import Spinner from 'react-spinkit';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import './App.css';

class App extends React.Component {
  state = {
    emailAddress: '',
    loading: false,
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      emailAddress: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { emailAddress } = this.state;

    this.setState({
      loading: true,
    });

    axios.post("http://localhost:5000/reset-password", {
      email: emailAddress,
    }).then(() => {
      toast.success("Check your email address for the recovery link")
    })
      .catch(() => {
        toast.error("An problem occured, please try again later")
      })
      .finally(() => {
        this.setState({
          loading: false,
        })
      });
  }

  render() {
    const { emailAddress, loading } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <section>
          <form onSubmit={this.handleSubmit} className="password-reset" action="">
            <h5>Forgot your password? Reset it below</h5>
            <label htmlFor="email-input">Email address:</label>
            <input type="email" onChange={this.handleChange} value={emailAddress} className="email-input" placeholder="name@example.com" id="email-input" name="email" />
            <button type="submit">Email me a recovery link</button>
            { loading ? <Spinner name='line-scale-pulse-out' /> : null }
          </form>
          <ToastContainer />
        </section>
      </div>
    );
  }
}

export default App;
