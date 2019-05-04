import React, {Component} from 'react'
import './FriendProfile.css'
import {Link} from 'react-router-dom'

export default class FriendsProfile extends Component {
    constructor(props){
        super(props)

        this.state ={
         
        }
    }


    render(){
        console.log(this.props.dog)
        const {name, age, city, state, country, favorites, breed, gender, image, user_id} = this.props.dog
        return (
            <div className='friend-profile-container'>
                <div className='friend-image-container'><img alt='friend-dog' src={image} />
                </div>
                <div className='friend-profile'>
                        <div className="friend-name">
                            <div className='friend-info-logo'></div>
                            <h1>{name}</h1>
                        </div>
                        
                        <div className='friend-info'>
                            <h3>{age}</h3>
                            <h3>{breed}</h3>
                            <h3>{gender}</h3>
                            <h3>{city}, {state}, {country}</h3>
                            <h3>Favorites: {favorites}</h3>
                        <div className='friend-buttons'>
                            <button className="friend-delete" onClick={()=> this.props.delete(this.props.profileId)}></button>
                            <Link to={`/messages`} ><button  className="friend-message" onClick={this.props.createChatroom}></button></Link>
                    </div>
                    </div>
                    
                     
                  
                    
                    
                    
               </div>
           
            </div>
        )
    }
}
