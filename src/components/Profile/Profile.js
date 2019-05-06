import React, {Component} from 'react'
import './Profile.css'


export default class Profile extends Component {
    render(){
        const {name, age, city, state, country, favorites, breed, gender, image} = this.props.dog
        return (
            <div id='profile-container-profile'>
                <div id='profile'>
                    <div className="name">
                        <div className='info-logo'></div>
                        <h1>{name}</h1>
                    </div>
                    <div className='info'>
                        <h3>{age}</h3>
                        <h3>{breed}</h3>
                        <h3>{gender}</h3>
                        <h3>{city}, {state}, {country}</h3>
                        <h3>Favorites: {favorites}</h3>
                        <div id='profile-buttons'>
                            <div id="add" onClick={()=> this.props.addFriend(this.props.profileId)}></div>
                        
                        </div>
                    </div>
                </div>
           
                <div className='profile-image-container'>
                    <img alt="dog" src={image} />
                </div>
            </div>
        )
    }
}
