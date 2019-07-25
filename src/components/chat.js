import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import io from 'socket.io-client';
import { flexbox } from '@material-ui/system';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
const socket = io('http://localhost:8000',{ transports: ['websocket'] });

export default class extends Component {
    state = {
        endpoint: 'http://localhost:8000/',
        name : JSON.parse(localStorage.getItem('name')),
        messages: [],
        newMessage: ''
    }
    componentDidMount = () =>  {
        socket.on('chat', message => {
          let messages = this.state.messages
            messages.push(message)
            this.setMessages(messages)
        })
      }

    componentWillUnmount = ()  => {
        socket.close()
    }
    setMessages = (msgs) => {
        this.setState( 
            {
               messages: msgs
            })
    }

    handleSubmitName = (name) => {
        this.setState({name:name})
    }
    handleSubmitMasseges = (e) => {
        e.preventDefault()
        socket.emit('chat', {
            name:this.state.name,
            message: this.state.newMessage,
            timestamp: new Date().toISOString()

        })
        
        this.setState({
            newMessage:''
        })
        
    }
    render() {
        const {open, name, messages, newMessage} = this.state;

        return (
            <div>
                <List style={{height:'500px'}}>
                
                     {
                        messages.map((message, key) => [
                           <ListItem alignItems="flex-start" key={key}>
                        
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={message.timestamp}
                            secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                {message.name}
                                </Typography>
                                {' - '}{message.message},
                            </React.Fragment>
                            
                              }
                        />
                         
                    </ListItem>,
                    <Divider variant="inset" component="li" />
                     ]
                 )}
             </List>

                
                <div style={{display:flexbox,bottom:0}}>
               
                    <TextField
                        position="fixed"
                        id="outlined-full-width"
                        label="Chat"
                        style={{ top: 10, left:2, right:2, width:'85%',bottom:0}}
                        placeholder="write message"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={newMessage}
                        onChange={(e)=>{
                            this.setState({newMessage:e.target.value})
                        }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    >
                    </TextField>
              
                    <Button 
                        position="fixed"
                        style={{width:'12%', height:'56px',top:26, left:4, bottom:0}}
                        size="large"
                        variant="outlined"
                        onClick={this.handleSubmitMasseges}
                    >
                    submit
                    </Button>
               </div>
            </div>
        )
    }
}
