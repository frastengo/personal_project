import React, {Component} from 'react'
import './UserProfile.css'
import axios from 'axios'
import {genders, ageGroups, stateOptions} from './../AddPetForm/searchData.js'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {getAllProfilesByUserId} from './../../ducks/profilesReducer'
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone'
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/frastengo2019/image/upload"

class UserProfile extends Component {
    constructor(props){
        super(props)
        this.options = countryList().getData()

        this.state ={
            



            options: this.options,
            showEdit: false,
            editMode: false,
            editName: true,
            editAge: true,
            editFavorites: true,
            editBreed: true,
            editLocation: true,
            editGender: true,
            editImage: false,

            userProfiles: this.props.userProfiles,


            name: null,
            profileId: null,

            loggedInUserId: this.props.loggedInUserId,

            
            breeds: [],

            gender: null,
            age: null,
            city: null,
            country: null,
            state: null,
            favorites: null,
            zipcode: null,
            
            breed: null,
            profile: [],
            displayProfile: [],
            image: null,
            uploadedFile: '',
            cloudinaryUrl: [],

            
        }
    }

    componentDidMount(){
        axios.get('https://dog.ceo/api/breeds/list/all').then(res => {
            this.setState({
                breeds: res.data.message
            })
        })
        
        
    }

    

    submitUpdates = () => {
        this.setState({
            editName: !this.state.editName,
            editAge: !this.state.editAge,
            editFavorites: !this.state.editFavorites,
            editBreed: !this.state.editBreed,
            editLocation: !this.state.editLocation,
            editGender: !this.state.editGender
        })
    }

    submitChanges = () => {
        
        const {city, country, state, name, age, breed, favorites, gender, loggedInUserId, zipcode, image, profileId} = this.state

        axios.put(`/api/profile/${profileId}`, {city, country, state, name, age, breed, favorites, gender, loggedInUserId, zipcode, image}).then(res=>{
            console.log('RESDATA AT SUBMIT',res.data)
            // this.props.getAllProfilesByUserId(profileId)
            this.props.getUserAndProfiles()
            this.setState({
                // userProfiles: res.data,
                editMode: !this.state.editMode,

            })
        })
    }
     
    editName = () => {
        this.setState({
            editName: !this.state.editName
        })
    }

    delete = () => {
        const {profileId} = this.state
        console.log(profileId, 'profile id at delete')

        axios.delete(`/api/profile/${profileId}`).then(res=>{
            console.log('RESDATA AT delete',res.data)
            this.props.getUserAndProfiles()
            this.setState({
                editMode: !this.state.editMode,
                profileId: null,
    
                name: null,
                
                gender: null,
                age: null,
                city: null,
                country: null,
                state: null,
                favorites: null,
                zipcode: null,
                breed: null,
                
                image: null,
                
            })
        })

    }

    showEditFormDog = (dog) =>{
        console.log(dog)
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

    onImageDrop = (files) => {
        console.log("onImageDrop FILES", files)
        this.setState({
          uploadedFile: files[0]
        });
        
        this.handleImageUpload(files[0]);
    }

    handleImageUpload = (file) => {

        axios.get('/api/upload').then(response => {
    
            let formData = new FormData();
            formData.append("signature", response.data.signature)
            formData.append("api_key", "923861371997432");
            formData.append("timestamp", response.data.timestamp)
            formData.append("file", file);
        
            axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {

                this.setState({
                    cloudinaryUrl: [...this.state.cloudinaryUrl, response.data.secure_url],
                    image: [...this.state.cloudinaryUrl, response.data.secure_url][0]
                    })
                }).catch( err => {
                console.log(err);
            })
        
        })
     }

    render(){


        console.log('USER PROFILES IN USER PROFILE FROM REDUX',this.props.userProfiles.userProfiles)


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
        const {name, age, city, state, country, favorites, breed, gender, image, zipcode, profile_id} = this.props.dog
        return (
            <div>
            {!this.state.editMode ? (
                <div className='user-profile-container'>
                    <div className='user-profile'>
                        <div className='user-profile-information'>
                            <div className="user-profile-name">
                                <div className='user-profile-info-logo'></div>
                                <h1>{name}</h1>
                            </div>
                            <div className='user-profile-info'>
                                <h3>{age}</h3>
                                <h3>{breed}</h3>
                                <h3>{gender}</h3>
                                <h3>{city}, {state}, {country},  {zipcode}</h3>
                            
                                <h3>Favorites: {favorites}</h3>
                            <div className='user-profile-buttons'>
                                <button className="edit" onClick={(e)=>this.showEditFormDog(this.props.dog)}>EDIT MODE</button>
                            </div>
                        </div>
                    </div>
                        <div className='user-profile-image-container'>
                        <img alt='dog' src={image} />
                    </div>
                </div>
                
            
                </div>
            ):(
                //editForm
                <div className='user-profile-container'  >
                    <div className='user-profile'>
                        <div className="user-profile-information">
                            <div className='user-profile-name'>
                                <div className='user-profile-info-logo'></div>
                                <input
                                    className='edit-select-regular'
                                    placeholder={this.state.name}
                                    type='text'
                                    onChange={(e)=> this.setState({
                                        name: e.target.value
                                    })}
                                />
                            </div>
                            <div  className='edit-user-profile-info'>       
                                <Select
                                    id='select'
                                    className='edit-select'
                                    placeholder={this.state.age}
                            
                                    value={this.age}
                                    onChange={(age)=>this.setState({
                                    age: age.value
                                    })}
                                    options={ageGroups}
                                />
                        
                                <Select
                                    id='select'
                                    className='edit-select'
                                    placeholder={this.state.breed}
                                    
                                    value={this.breed}
                                    onChange={(breed)=>this.setState({
                                        breed: breed.value
                                    })}
                                    options={array}
                                />
                        
                                <Select
                                    id='select'
                                    className='edit-select'
                                    placeholder={this.state.gender}
                                    value={this.gender}
                                    onChange={(gender)=>this.setState({
                                        gender: gender.value
                                    })}
                                    options={genders}
                                />
                                <Select
                                    id='select'
                                    className='edit-select'
                                    placeholder={this.state.state}
                                    value={this.state}
                                    onChange={(state)=>this.setState({
                                        state: state.value
                                    })}
                                    options={stateOptions}
                                />


                                <Select
                                    id='select'
                                    className='edit-select'
                                    placeholder={this.state.country}
                                    name="country"
                                    value={this.country}
                                    onChange={(country)=>this.setState({
                                        country: country.value
                                    })}
                                    options={this.state.options}
                                />

                                <input 
                                    className='edit-select-regular'
                                    className='edit-select'
                                    placeholder={this.state.city}
                                    type='text'


                                    onChange={(e)=> this.setState({
                                        city: e.target.value
                                    })}
                                />

                                <input
                                    className='edit-select-regular'
                                    className='edit-select'
                                    placeholder={this.state.zipcode}
                                    type='text'
                                    onChange={(e)=> this.setState({
                                    zipcode: e.target.value
                                    })}
                                />
                                <textarea 
                                    id='select'
                                    className='edit-select'
                                    className='edit-select-regular'
                                    placeholder={this.state.favorites}
                                    
                                    value={this.state.favorites}
                                    onChange={(e)=> this.setState({
                                        favorites: e.target.value
                                    })}
                                />
                            <div className='user-profile-buttons'>
                                <button className="edit" onClick={this.submitUpdates}>UPDATE</button>
                                <button className="edit" onClick={this.showEditFormDog}>CANCEL</button>
                                <button className="edit" onClick={this.submitChanges}>SUBMIT</button>
                                <button className="edit" onClick={this.delete}>DELETE</button>
                            </div>
                        </div>
                    </div>
                    {!this.state.editImage ? (
                        <div onClick={(e)=>this.setState({editImage: !this.state.editImage})}className='user-profile-image-container'>
                            <img alt='dog' src={image} />
                        </div>
                    
                    ):(
                        <div>
                            <Dropzone onDrop={this.onImageDrop}accept="image/*, video/*" multiple={false}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p id="dropzone-edit">Click to select files, or drop file here</p>
                                </div>
                                </section>
                            )}
                            </Dropzone>
                        </div>
                    )}
                    </div>
                </div>
            )}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
      user: reduxState.user,
      userProfiles: reduxState.userProfiles
    };
  };
  
  const mapDispatchToProps = {
    getAllProfilesByUserId: getAllProfilesByUserId
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);


