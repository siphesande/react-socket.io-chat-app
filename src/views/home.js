import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class extends Component {
    state = {
        name: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()

        localStorage.removeItem('name');
        localStorage.setItem('name', JSON.stringify(this.state.name))
        this.state.name?
        this.props.history.push('/chat'):
        this.props.history.push('/')

    }
    render() {
        return (
            <div>
                <TextField
                    style={{left:20}}
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
                    style={{top:17, left:22, height:'56px'}}
                    size="large"
                    variant="outlined"
                    onClick={this.handleSubmit}
                    >
                    submit
                </Button>

                
            </div>
        )
    }
}
