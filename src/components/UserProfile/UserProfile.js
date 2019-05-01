import React, {Component} from 'react'
import './UserProfile.css'
import axios from 'axios'
import {genders, ageGroups, stateOptions} from './../AddPetForm/searchData.js'
import Select from 'react-select'

export default class Profile extends Component {
    constructor(props){
        super(props)

        this.state ={
            showEdit: false,
            editMode: false,
            editName: false,
            editAge: false,
            editFavorites: false,
            editBreed: false,
            editLocation: false,


            name: null,
            profileId: null,

            loggedInUserId: this.props.loggedInUserId,

            
            breeds: [],

            gender: "",
            age: '',
            city: "",
            country: '',
            state: '',
            favorites: '',
            zipcode: '',
            breed: '',
            profile: [],
            displayProfile: [],
            image: '',
            uploadedFile: '',
            cloudinaryUrl: []
        }
    }

    componentDidMount(){
        axios.get('https://dog.ceo/api/breeds/list/all').then(res => {
            this.setState({
                breeds: res.data.message
            })
        })
    }

    submitChanges = () => {
        this.setState({
            editName: !this.state.editName,
            editAge: !this.state.editAge
        })
    }
    
    editName = () => {
        this.setState({
            editName: !this.state.editName
        })
    }

    showEditFormDog = (dog) =>{
        this.setState({
            editMode: !this.state.editMode,
            profileId: dog.profile_id,

            name: dog.name,
            
            gender: dog.gender,
            age: dog.age,
            city: dog.city,
            country: dog.country,
            state: dog.state,
            favorites: dog.favorites,
            zipcode: dog.zipcode,
            breed: dog.breed,
            
            image: dog.image,
            uploadedFile: '',
            cloudinaryUrl: []
        })
    }

    render(){
        //breeds api
        var newBreedsObject = {...this.state.breeds}
        newBreedsObject['goldenDoodle'] = []
        newBreedsObject['pitbull'] = []
        console.log('NEW BREEDS OBJECT', newBreedsObject)

      
        var array = []
        for (const [key, value] of Object.entries(newBreedsObject)) {
            if (value.length > 0){
                var options = []
                for (let i = 0; i < value.length; i++){
                    options.push({value: (value[i].charAt(0).toUpperCase() + value[i].slice(1)) + " " + (key.charAt(0).toUpperCase()+(key.slice(1))), label: (value[i].charAt(0).toUpperCase() + value[i].slice(1)) + ' ' + (key.charAt(0).toUpperCase()+(key.slice(1)))})
                }
                array.push({label: (key.charAt(0).toUpperCase()+(key.slice(1))), options})
            }else {
                array.push({label: (key.charAt(0).toUpperCase()+(key.slice(1))), value: (key.charAt(0).toUpperCase()+(key.slice(1)))})
            }
        }




        console.log('STATE IN USERPROFILE TO EDIT PROFILE', this.state)
        const {name, age, city, state, country, favorites, breed, gender, image, profile_id} = this.props.dog
        return (
            <div>
            {!this.state.editMode ? (
                <div className='user-profile-container'>
                    <div className='user-profile'>
                        <div className="user-profile-name">
                            <div className='user-profile-info-logo'></div>
                            <h1>{name}</h1>
                        </div>
                        <div className='user-profile-info'>
                            <h3>{age}</h3>
                            <h3>{breed}</h3>
                            <h3>{gender}</h3>
                            <h3>{city}, {state}, {country}</h3>
                            <h3>Favorites: {favorites}</h3>
                        </div>
                        <div className='user-profile-buttons'>
                            <button className="edit" onClick={(e)=>this.showEditFormDog(this.props.dog)}>EDIT MODE</button>
                        </div>
                    </div>
            
                    <div className='user-profile-image-container'>
                        <img alt='dog' src={image} />
                    </div>
                </div>
            ):(
                //editForm
                <div className='user-profile-container'  >
                    <div className='user-profile'>
                        <div className="user-profile-name">
                            <div className='user-profile-info-logo'></div>
                        {!this.state.editName ? (
                        <div onClick={this.editName} >
                            <h1>{this.state.name}</h1>
                        </div>
                        ):(
                        <div>
                            <input
                                placeholder={this.state.name}
                                type='text'
                                onChange={(e)=> this.setState({
                                    name: e.target.value
                                })}
                            />
                        </div>
                        )}
                        </div>
                        <div className='user-profile-info'>
                        {!this.state.editAge ? (
                        <div onClick={(e)=> this.setState({editAge: !this.state.editAge})}>
                            <h3>{this.state.age}</h3>
                        </div>
                        ):(
                            <Select
                            className='edit-select'
                            placeholder="Age"
                            
                            value={this.age}
                            onChange={(age)=>this.setState({
                                age: age.value
                            })}
                            options={ageGroups}
                            />
                        )}
                        {!this.state.editBreed ? (
                        <div onClick={(e)=> this.setState({editBreed: !this.state.editBreed})}>
                            <h3 >{this.state.breed}</h3>
                        </div>
                        ):(
                            <Select
                            className='edit-select'
                            placeholder="Breed"
                            
                            value={this.breed}
                            onChange={(breed)=>this.setState({
                                breed: breed.value
                            })}
                            options={array}
                        />
                        )}
                            <Select
                            className='edit-select'
                            placeholder="Gender"
                            value={this.selectedGender}
                            onChange={this.handleGender}
                            options={genders}
                        />
                            <h3>{city}, {state}, {country}</h3>
                        {!this.state.editFavorites ? (
                            <h3 onClick={(e)=>this.setState({editFavorites: !this.state.editFavorites})}>Favorites: {favorites}</h3>
                        ):(
                            <textarea 
                            className='select'
                            placeholder={this.state.favorites}
                            
                            value={this.state.favorites}
                            onChange={(e)=> this.setState({
                                favorites: e.target.value
                            })}
                            />
                        )}
                        </div>
                        <div className='user-profile-buttons'>
                            <button className="edit" onClick={this.submitChanges}>SUBMIT</button>
                            <button className="edit" onClick={this.showEditFormDog}>CANCEL</button>
                        </div>
                    </div>
            
                    <div className='user-profile-image-container'>
                        <img alt='dog' src={image} />
                    </div>
                </div>
            )}
            </div>
        )
    }
}
