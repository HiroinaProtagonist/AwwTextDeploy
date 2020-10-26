import React, { Component } from 'react';
import './MMSForm.css'

//Ref: https://www.twilio.com/blog/send-an-sms-react-twilio
class MMSForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message: {
            to: '',
            body: '',
            mediaURL: ''
          },
          submitting: false,
          error: false
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    render() {
        return (
          <div>
            <span></span>
            <form 
              onSubmit={this.onSubmit} 
              className={this.state.error ? 'error mms-form' : 'mms-form'}
            >
              <div>
                <label htmlFor="to" >To: </label>
                <input
                  type="tel"
                  name="to"
                  id="to"
                  placeholder = "XXXXXXXXXX"
                  value={this.state.message.to}
                  onChange={this.onHandleChange}
                />
              </div>
              <label id="hiddenPlaceholder" htmlFor="submit">To: </label>
              <button type="submit" disabled={this.state.submitting}>
                Send message
              </button>
            </form>
            <span>
              {this.state.error ? 'There was an error sending your message. Please check the number and try again.' : ''}
            </span>
          </div>
        );
    }

    onHandleChange(event) {
        const name = event.target.getAttribute('name');
        this.setState({
          message: { ...this.state.message, [name]: event.target.value }
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({ submitting: true });
        //Send message data
        fetch('/api/mmsmessages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.message)
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              this.setState({
                error: false,
                submitting: false,
                message: {
                  to: ''
                }
              });
            } else {
              this.setState({
                error: true,
                submitting: false
              });
            }
          });
      }
}

export default MMSForm;