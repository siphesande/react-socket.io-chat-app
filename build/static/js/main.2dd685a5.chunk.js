(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{107:function(e,t,a){e.exports=a(185)},112:function(e,t,a){},139:function(e,t){},185:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(8),i=a.n(s),o=(a(112),a(96)),c=a(62),l=a(24),m=a(95),u=a(38),h=a(39),g=a(48),p=a(40),f=a(49),d=a(223),b=a(224),E=a(227),v=a(230),y=a(222),w=a(90),x=a.n(w),S=a(231),k=a(228),O=a(225),A=a(226),j=a(51),I=a(219),M=a(221),D=a(229),T={isAuthenticated:!1,authenticate:function(){this.isAuthenticated=!0},signout:function(){this.isAuthenticated=!1},getAuth:function(){return this.isAuthenticated}},C=a(91),N=a.n(C),P=a(32),J=x()("https://express-socket-io-server.herokuapp.com",{transports:["websocket"]}),W=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(g.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={name:JSON.parse(localStorage.getItem("name")),messages:[],newMessage:"",difference:"0 seconds ago",online_users:[]},a.componentDidMount=function(){J.on("chat",function(e){a.setState(function(t){return{messages:[].concat(Object(m.a)(t.messages),[e])}})}),a.interval=setInterval(function(){return a.updateTimePassAfterMessageHasSent()},2e3),a.getOnlineUsers()},a.componentWillUnmount=function(){J.close(),clearInterval(a.interval)},a.updateTimePassAfterMessageHasSent=function(){var e=[];a.state.messages.forEach(function(t){var a=new Date,n=new Date(t.startTime),r=parseInt((n-a)/864e5),s=parseInt(Math.abs(n-a)/36e5%24),i=parseInt(Math.abs(n.getTime()-a.getTime())/6e4%60),o=parseInt(Math.abs(n.getTime()-a.getTime())/1e3%60);i>60?(t.timeDifference=s+" hour/s ago",e.push(t)):s>24?(t.timeDifference=r+" day/s ago",e.push(t)):i<=0?(t.timeDifference=o+" second/s ago",e.push(t)):(t.timeDifference=i+" minute/s ago",e.push(t))}),a.setState({message:e})},a.handleSubmitName=function(e){a.setState({name:e})},a.logout=function(){T.signout(),a.props.history.push("/")},a.getOnlineUsers=function(){var e=[],t=e.push(a.state.name);a.setState({online_users:t}),console.log("this.state.online_users",e)},a.handleSubmitMasseges=function(e){e.preventDefault(),J.emit("chat",{name:a.state.name,message:a.state.newMessage,timestamp:(new Date).toISOString(),startTime:new Date}),a.setState({newMessage:""})},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=(t.name,t.messages),n=t.newMessage,s=Object(P.css)({height:500});return r.a.createElement(I.a,{style:{margin:"50px",background:"#fafafa"}},r.a.createElement(M.a,{container:!0,spacing:3},r.a.createElement(M.a,{item:!0,xs:3},r.a.createElement(I.a,{style:{height:"500px",background:"#fafafa"}},r.a.createElement(j.a,{variant:"h5",gutterBottom:!0,style:{textAlign:"center"}},"Chat App"),r.a.createElement("hr",{style:{color:"grey"}}),r.a.createElement(M.a,{container:!0,direction:"row",justify:"center",alignItems:"center"},r.a.createElement(y.a,{style:{textAlign:"center"},size:"small",variant:"contained",onClick:this.logout},"logout")),r.a.createElement(j.a,{style:{textAlign:"center",top:20,marginTop:"20px"}},"Channels"))),r.a.createElement(M.a,{item:!0,xs:9},r.a.createElement(I.a,{style:{height:"500px",background:"#e8f5e9",backgroundImage:"url(".concat("http://i.imgur.com/TnNwdvV.png",")")}},r.a.createElement(N.a,{className:s},r.a.createElement(d.a,null,a.map(function(e,t){return[r.a.createElement(b.a,{alignItems:"flex-start",key:t},r.a.createElement(O.a,null,r.a.createElement(A.a,{alt:"Remy Sharp",src:"https://img.icons8.com/bubbles/2x/user.png"})),r.a.createElement(E.a,{primary:e.name,secondary:r.a.createElement(r.a.Fragment,null,r.a.createElement(j.a,{component:"span",variant:"body2",color:"textPrimary"},e.message),"  ",e.timeDifference)})),r.a.createElement(k.a,{variant:"inset",component:"li",color:"#212121",key:e.timestamp})]})))))),r.a.createElement("div",{style:{display:S.a,bottom:0}},r.a.createElement(v.a,{position:"fixed",id:"outlined-full-width",label:"Chat",style:{top:10,left:2,right:2,width:"87%",bottom:0},placeholder:"Type a message",fullWidth:!0,margin:"normal",variant:"outlined",value:n,onChange:function(t){e.setState({newMessage:t.target.value})},InputLabelProps:{shrink:!0}}),r.a.createElement(y.a,{position:"fixed",style:{width:"12%",height:"56px",top:26,left:4,bottom:0},size:"large",variant:"outlined",onClick:this.handleSubmitMasseges},r.a.createElement(D.a,null,"send"))))}}]),t}(n.Component),z=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(g.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={name:""},a.handleSubmit=function(e){e.preventDefault(),localStorage.removeItem("name"),localStorage.setItem("name",JSON.stringify(a.state.name)),a.state.name?(a.login(),a.props.history.push("/chat")):a.props.history.push("/")},a.login=function(){T.authenticate(),console.log(T.getAuth())},a.logout=function(){T.signout()},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(M.a,{item:!0,xs:12},r.a.createElement(I.a,{style:{textAlign:"center",height:"640px",background:"#efebe9"}},r.a.createElement(v.a,{style:{left:50},id:"outlined-name",label:"Login",placeholder:"Enter your name",value:this.state.name,onChange:function(t){e.setState({name:t.target.value})},margin:"normal",variant:"outlined"}),r.a.createElement(y.a,{style:{top:17,left:52,height:"56px"},size:"large",variant:"outlined",onClick:this.handleSubmit},"submit"))))}}]),t}(n.Component),B=function(){return r.a.createElement("h1",null," This is a Public route")},U=function(e){var t=e.component,a=Object(o.a)(e,["component"]);return r.a.createElement(l.b,Object.assign({},a,{render:function(e){return T.getAuth()?r.a.createElement(t,e):r.a.createElement(l.a,{to:{pathname:"/"}})}}))},_=function(e){return r.a.createElement(c.a,null,r.a.createElement(l.d,null,r.a.createElement(l.b,{exact:!0,path:"/public",component:B}),r.a.createElement(l.b,{exact:!0,path:"/",component:z}),r.a.createElement(U,{path:"/chat",component:W})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(function(){return r.a.createElement("div",null,r.a.createElement(_,null))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[107,1,2]]]);
//# sourceMappingURL=main.2dd685a5.chunk.js.map