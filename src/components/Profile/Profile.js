import React, {Component} from 'react'
import './Profile.css'

export default class Profile extends Component {
    render(){
        const {name, age, city, state, country, favorites, breed, gender, image} = this.props.dog
        return (
            <div className='profile-container'>
                <div className='profile'>
                    <div className="name">
                        <h1>{name}</h1></div>
                    <div className='info'>
                        <h3>{age}</h3>
                        <h3>{breed}</h3>
                        <h3>{gender}</h3>
                        <h3>{city}, {state}, {country}</h3>
                        <h3>Favorites: {favorites}</h3>
                    </div>
                </div>
                <div className='image-container'>
                    <img src={image} />
                </div>
            </div>
        )
    }
}
