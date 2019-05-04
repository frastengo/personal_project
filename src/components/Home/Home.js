import React, {Component} from 'react'
import Modal from 'react-modal'
import './Home.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from './../../ducks/userReducer'
import axios from 'axios'
import Register from '../../components/Register/Register'
import Socket from './../Chat/Socket'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      height: '1000px',
      width: '1000px',
      borderRadius: '10%'

    }
  };


class Home extends Component {

    constructor(props){
        super(props)

        this.state = {
            loggedInUser: null,
            isActive: false,
          
        }
    }

    

    componentDidMount() {
        Modal.setAppElement('body');
        axios.get("/auth/user").then(res => {
            this.props.setUser(res.data);
            if (res.data){
                this.setState({
                    loggedInUser: res.data,
                })
            }
          
        });
    }

    toggleModal = ()=> {
        this.setState({
            isActive: !this.state.isActive
        })
    }
   

    render(){
        console.log('logged in user in home component', this.state.loggedInUser)
        console.log('user in component home',this.props.user)
        const {user} = this.props.user
        
        return (
            <div className='home'>
                {/* <section>

                    <button onClick={this.toggleModal}>
                    Register</button>
                    
                    
                    <Modal 
                        isOpen={this.state.isActive}
                        onRequestClose={this.toggleModal}
                        style={customStyles}
                        animationType='slide'
                        transparent={true}
                    >
                        
                        <Register />
                        <button onClick={this.toggleModal}>Exit</button>
                    </Modal>

                </section> */}
                
                <div className='welcome'>
                    <div className='opacity-container1'>
                    {!user ? (
                        <h2>Welcome to FURbook</h2>
                        
                    ):(
                        <h2>Welcome back to FURbook {user.name}</h2>
                    )}
                        
                    </div>
                </div>
                <div className='register'>
                    <div className='opacity-container2'>
                        <Link to='/register' className='link'><h2>Register</h2></Link>
                        <Link to='/login' className='link'><h2>| Login </h2></Link>
                    </div>
                </div>
                <div className='find-friends'>
                    <div className='opacity-container3'>
                        <h2>Find Friends</h2>
                    </div>
                </div>
                
            </div>
            
        )
    }
}

const mapStateToProps = reduxState => {
    return {
      user: reduxState.user
    };
  };
  
  const mapDispatchToProps = {
    setUser: setUser
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
