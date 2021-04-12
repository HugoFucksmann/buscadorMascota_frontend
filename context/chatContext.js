import React, { createContext, Component } from 'react'
import { getMyChats } from '../helpers/getMyChats';

export const chatContext = createContext();

class ChatProvider extends Component {
    state = {       
        toogleChat: false,
        chats: []
    }

    async componentDidMount(){
       this.chats = await getMyChats()
    }
     
   

    setToogleChat = () => {
        this.setState({toogleChat: !this.state.toogle});
    }

    setChats = (chats) => this.setState({ chats: chats })
    

    render(){
      
        return (
            <chatContext.Provider value={{...this.state, setToogleChat: this.setToogleChat, setChats: this.setChats }} >
                { this.props.children }
            </chatContext.Provider>
        )
    }
}

export default ChatProvider;