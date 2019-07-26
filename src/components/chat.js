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
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';

const socket = io('http://localhost:8000',{ transports: ['websocket'] });

export default class extends Component {
    state = {
        name : JSON.parse(localStorage.getItem('name')),
        messages: [],
        newMessage: '',
        difference: '0 seconds ago',
        online_users: []
    }
    componentDidMount = () =>  {
        socket.on('chat', message => {
            this.setState(prevState => ({
                messages: [...prevState.messages, message]
              }));
       
        })
        this.interval = setInterval(() => this.updateTimePassAfterMessageHasSent(), 2000);
        this.getOnlineUsers()
        
    }
    componentWillUnmount = ()  => {
        socket.close()
        clearInterval(this.interval)
    }
    updateTimePassAfterMessageHasSent =  () => {
        var array_of_messages = []
        this.state.messages.forEach((chat_message)=> {
            const today = new Date();
            const endDate = new Date(chat_message.startTime);
            const days = parseInt((endDate - today) / (1000 * 60 * 60 * 24));
            const hours = parseInt(Math.abs(endDate - today) / (1000 * 60 * 60) % 24);
            const minutes = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60) % 60);
            const seconds = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000) % 60);
            
            if(minutes > 60){
                chat_message.timeDifference = hours + ' ' + 'hour/s ago'
                array_of_messages.push(chat_message)
            }else if(hours > 24){
                chat_message.timeDifference = days + ' ' + 'day/s ago'
                array_of_messages.push(chat_message)
            }else if(minutes <= 0 ){
                chat_message.timeDifference = seconds + ' ' + 'second/s ago'
                array_of_messages.push(chat_message)
            }else{
                chat_message.timeDifference = minutes + ' ' + 'minute/s ago'
                array_of_messages.push(chat_message)
            }
        })
       this.setState({message:array_of_messages})
       
    }
    handleSubmitName = (name) => {
        this.setState({name:name})
    }
    getOnlineUsers = () => {
        var login_users = [];
        var online_users = login_users.push(this.state.name)
        this.setState({online_users: online_users})
        console.log('this.state.online_users', login_users.push(this.state.name))
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
        const { name, messages, newMessage} = this.state;
        const ROOT_CSS = css({
            height: 300
          });
    
         return (
            <div>
                 <ScrollToBottom className={ ROOT_CSS }>
                 
                <List 
                       
                    > 
                          
                    {
                        messages.map((message, i) => [
                           <ListItem alignItems="flex-start" key={i} >
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
                                        {'  '}{message.timeDifference}
                                    </React.Fragment>
                                    }
                                />
                             </ListItem>,
                            <Divider variant="inset" component="li" />
                        ]
                    )}
                    
                </List>
                </ScrollToBottom>
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
