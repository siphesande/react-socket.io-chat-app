import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Auth from '../Auth';
import { flexbox } from '@material-ui/system';
import { BrowserRouter as Router, Route } from "react-router-dom";


export default class extends Component {
    state = {
        name: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        localStorage.removeItem('name');
        localStorage.setItem('name', JSON.stringify(this.state.name))
        if(this.state.name){
          this.login()
          this.props.history.push('/chat')
        }else{
            this.props.history.push('/')
        }
    }
    login = ()=>{
        Auth.authenticate();
        console.log(Auth.getAuth())
    }

    logout  = () => {
        Auth.signout();
    }
    render() {
        return (
            <div>
                <Grid item xs={12}>
                    <Paper style={{textAlign: 'center', height:'640px', background:'#efebe9'}}>
                        <Typography 
                            variant="h5" 
                            gutterBottom
                            style={{ textAlign:'center'}}
                            >
                           Real-Time Chat App
                        </Typography>
              
                        <TextField
                            style={{left:50}}
                            id="outlined-name"
                            label="Login"
                            placeholder="Enter your name"
                            value={this.state.name}
                            onChange={(e)=>{
                                this.setState({name:e.target.value})
                            }}
                            margin="normal"
                            variant="outlined"
                    >
                 
                    </TextField>
                    <Button 
                        style={{top:17, left:52, height:'56px'}}
                        size="large"
                        variant="outlined"
                        onClick={this.handleSubmit}
                    >
                        submit
                    </Button>
                </Paper>
            </Grid>
        </div>
        )
    }
}
