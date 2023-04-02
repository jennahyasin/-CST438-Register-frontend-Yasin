import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SERVER_URL} from '../constants.js'
import { TextField } from '@mui/material';
import { withRouter } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddCourse from './AddCourse';

class AddStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      statusCode: 0
    };
  }

  //takes care of the event when it is changed
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {name, email} = this.state;
    const token = Cookies.get('XSRF-TOKEN');
    //uses backend to make a fetch call to post a new student
    fetch(`${SERVER_URL}/student/add/${email}/${name}`, {
      method: 'POST',
      headers: { 'X-XSRF-TOKEN': token }
    })
    .then(res => {
      if (res.ok) {
        //if student is added with no errors, send out toast message
        toast.success("Student Successfully Added!", {
            position: toast.POSITION.BOTTOM_LEFT
        });
      } else {
        //if student is not added due to an error 
        toast.error("Student NOT Added", {
            position: toast.POSITION.BOTTOM_LEFT
        });
  }})
  }

  
  render() {
    const { name, email } = this.state;

    // code to display on screen
    return (
      <div>
        <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  { 'Students - Add a New Student' }
                </Typography>
            </Toolbar>
          </AppBar>
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
            style={{height: 50, width: "20%", borderColor: 'black', borderWidth: 2,  marginBottom: 20, textAlign: "center" }}
            placeholder = "STUDENT NAME"
          />
          <br />
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            required
            style={{height: 50, width: "20%", borderColor: 'black', borderWidth: 2,  marginBottom: 20, textAlign: "center"}}
            placeholder = "STUDENT EMAIL"
          />
          <br/>
          <Button id = "submitButton" type="submit" variant = "contained" style = {{ backgroundColor: 'green', margin:10}}>
             Add Student</Button>
        </form>
        <Button component={Link}
                      to={{pathname:'/'}}
              variant = "contained" color="primary" style = {{margin:10}}>
              Back
          </Button>
          <ToastContainer autoClose={1500} />   
      </div>
    );
  }
}

export default withRouter(AddStudent);




