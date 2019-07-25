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
        newMessage: '',
        startTime: new Date("1000-00-00T12:00:00Z"),
        difference: '0 seconds ago',
        timeDifference: []
    }
    componentDidMount = () =>  {
        socket.on('chat', message => {
          let messages = this.state.messages
            messages.push(message)
            // this.setMessages(messages,message.startTime)
        })

        this.interval = setInterval(() => this.updateTimeDifference(), 10000);
      }

    componentWillUnmount = ()  => {
        socket.close()
        clearInterval(this.interval)
    }
    updateTimeDifference =  () => {
        this.state.messages.forEach((chat_msg)=>{
            
            const today = new Date();
            const endDate = new Date(chat_msg.startTime);
            const days = parseInt((endDate - today) / (1000 * 60 * 60 * 24));
            const hours = parseInt(Math.abs(endDate - today) / (1000 * 60 * 60) % 24);
            const minutes = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60) % 60);
            const seconds = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000) % 60);
            
            var new_messages ={name:chat_msg.name,
                                message: chat_msg.newMessage,
                                timestamp: chat_msg.timestamp,
                                startTime: chat_msg.startTime,
                             }
            // if(minutes > 60){
            //     this.setState({difference:hours})
                
            // }else if(hours > 24){
            //     this.setState({difference:days +  ' ' + 'days ago'})
            // }else if(minutes <= 0 || minutes === NaN ){
                chat_msg.timeDifference = seconds;

                
                console.log('chat_msg', chat_msg)
                // this.setState({messages:seconds +  ' ' + 'sec ago'})
                
            
            // }else{
            //     this.setState({difference:minutes +  ' ' + 'min ago'})
            //     this.setState({timeDifference:minutes})
            // }
            
        })
      
    }
    setMessages = (chat_message) => {
        // this.setState( { messages: chat_message, startTime: new Date(start_time)})
        this.setState( { messages: chat_message})
    }

    handleSubmitName = (name) => {
        this.setState({name:name})
    }
    handleSubmitMasseges = (e) => {
        e.preventDefault()
        socket.emit('chat', {
            name:this.state.name,
            message: this.state.newMessage,
            timestamp: new Date().toISOString(),
            startTime: new Date()
        })
        this.setState({
            newMessage:''
        })
    }
    render() {
        const {open, name, messages, newMessage} = this.state;
         return (
            <div>
                <List style={{height:'400px'}}>
                    {
                        messages.map((message, i) => [
                           <ListItem alignItems="flex-start" key={i}>
                        
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={message.name}
                                    secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            {message.message}
                                        </Typography>
                                        {'  '}{this.state.difference}
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
