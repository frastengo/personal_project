import React, {Component} from 'react'
import './ProfileDisplay.css'


export default class ProfileDisplay extends Component {
    render(){
        const {name, age, city, state, country, favorites, breed, gender, image} = this.props.dog
        return (
            <div id='profile-display-container-profile'>
                <div id='profile-display'>
                    <div className="profile-display-name">
                        <div className='profile-display-info-logo'></div>
                        <h1>{name}</h1>
                    </div>
                    <div className='profile-info'>
                        <h3>{age}</h3>
                        <h3>{breed}</h3>
                        <h3>{gender}</h3>
                        <h3>{city}, {state}, {country}</h3>
                        <h3>Favorites: {favorites}</h3>
                        <div id='display-profile-buttons'>
                            <div id="display-add"></div>
                        
                        </div>
                    </div>
                </div>
           
                <div className='display-profile-image-container'>
                    <img alt="dog" src={image} />
                </div>
            </div>
        )
    }
}
