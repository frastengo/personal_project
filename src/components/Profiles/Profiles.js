import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Profiles.css'
import {getAllProfiles} from './../../ducks/profilesReducer'
import {getFriends} from './../../ducks/friendsReducer'
import {setUser} from './../../ducks/userReducer'
import Profile from './../Profile/Profile'
import Select from 'react-select'
import options from './searchData.js'



const genders = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
]

const ageGroups = [
    { value: 'puppy', label: 'Puppy' },
    { value: 'adult', label: 'Adult' },
]

const breedOptions = []
console.log('breedoptions', breedOptions)

class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: null,
            profiles: [],
            breeds: [],
            selectedGender: {},
            selectedBreed: {}
        };
    }
    
    getAllProfiles = () => {
        axios.get('/api/profiles').then(res => {
            this.setState({
                profiles: res.data,
                selectedGender: {},
                selectedBreed: {}
                
            })
        })
    }

    componentDidMount(){
        axios.get("/auth/user").then(res => {
            this.props.setUser(res.data);
            if (res.data){
                this.setState({
                    loggedInUser: res.data,
                })
            }
          
        });
        this.getAllProfiles()
        
        // this.props.getAllProfiles();
        axios.get('https://dog.ceo/api/breeds/list/all').then(res => {
            this.setState({
                breeds: res.data.message
            })
        })
    }

    handleGender = (selectedGender) => {
        let {value} = selectedGender
        let {label} = this.state.selectedBreed

        // this.getAllProfiles();

        // if (selectedGender & selectedBreed){

        // } else if {
        //     (selectedGender && !selectedBreed)
        // } else if {
        //     (!selectedGender && selectedBreed)
        // }


        // let {value} = selectedGender

        if (!label){
            console.log('Hit !label');
            
            axios.get(`/api/profiles/?gender=${value}`).then(res => {
                this.setState({
                    selectedGender,
                    profiles: res.data
                })
            })
        } else {
            console.log('Hit else')
            axios.get(`/api/profiles/?breed=${label}&gender=${value}`).then(res => {
                this.setState({
                    profiles: res.data,
                    selectedGender,
                })
            })
        }
    }






        // value = value.charAt(0).toUpperCase() + value.slice(1)
        // console.log('value at handlegender', value)
        // axios.get(`/api/profiles/?gender=${value}`).then(res => {
        //     this.setState({ 
        //         selectedGender,
        //         profiles: res.data
        //     });
        // })
        
    
    addFriend = (profileId) => {
        
    }


    handleBreed = (selectedBreed) => {
        // this.getAllProfiles();

        let {value} = selectedBreed
        let {label} = this.state.selectedGender

        console.log('LABEL AT HANDLE BREED', label)
        // label = (value.charAt(0).toUpperCase()) + (label.slice(1))
 

        
        value = value.charAt(0).toUpperCase() + value.slice(1)
        // value = value.charAt(0).toUpperCase() + value.slice(1)
        console.log('IIII AMM HERE   value at handlebreed', value)
        console.log('IIII AMM HERE   label at handlebreed', label)
        if (!label){
            console.log('Hit !label');
            
            axios.get(`/api/profiles/?breed=${value}`).then(res => {
                this.setState({
                    selectedBreed,
                    profiles: res.data
                })
            })
        } else {
            console.log('Hit else')
            axios.get(`/api/profiles/?breed=${value}&gender=${label}`).then(res => {
                this.setState({
                    profiles: res.data,
                    selectedBreed,
                })
            })
        }
    }
        // let result = this.state.profiles.filter(dog => dog.breed.toLowerCase() == value);

        // this.setState({ 
        //     selectedBreed,
        //     // filteredProfiles: result,
        //     profiles: result
        // });
    



        // console.log('SELECTED GENDER IN HANDLE GENDER', value)

        // console.log('GENDER VALUE TO UPPER CASE', value)
        // let mappedProfilesByGender = this.state.profiles.filter(dog => dog.gender.toLowerCase() == value)
        // let result = 

        // this.setState({
        //     filteredProfiles: mappedProfilesByGender
        // })
        // console.log('filtered by gender',mappedProfilesByGender)


    
    

    
    render() {
        console.log('OPTIONS', options)
        const {selectedGender} = this.state
        console.log('selectegender on state', (selectedGender))
        const {value} = selectedGender
        console.log(value)

        console.log('BREEDS FROM API', this.state.breeds)
        var breedsToAdd = {goldendoogle: [], pitbull: []}
        var newBreedsObject = {...this.state.breeds}
        newBreedsObject['goldenDoodle'] = []
        newBreedsObject['pitbull'] = []
        console.log('NEW BREEDS OBJECT', newBreedsObject)

        var valuesArray = []
        var array = []
        for (const [key, value] of Object.entries(newBreedsObject)) {
            if (value.length > 0){
                var options = []
                for (let i = 0; i < value.length; i++){
                    // array.push({label: key, options: [
                    //     {value: value[i], label: value[i]}
                    // ]})
                    options.push({value: (value[i].charAt(0).toUpperCase() + value[i].slice(1)) + " " + (key.charAt(0).toUpperCase()+(key.slice(1))), label: (value[i].charAt(0).toUpperCase() + value[i].slice(1)) + ' ' + (key.charAt(0).toUpperCase()+(key.slice(1)))})
                }
                array.push({label: (key.charAt(0).toUpperCase()+(key.slice(1))), options})
            }else {

                // array.push({value: breed, label: breed.charAt(0).toUpperCase()+breed.slice(1)})
                array.push({label: (key.charAt(0).toUpperCase()+(key.slice(1))), value: (key.charAt(0).toUpperCase()+(key.slice(1)))})
            }
        }
        // console.log('array of values', valuesArray)
        console.log('ARRAY OF KEYS', array)
        

        // array.push("pitbull", "boston Bulldog", "english Bulldog", "french Bulldog", "staffordshire bullterrier", "australian Cattledog", "border Collie", "cardigan Corgi", "great Dane", "scottish Deerhound", "norwegian Elkhound", "bichon frise", "italian Greyhound", "walker Hound", "ibizan Hound", "english Hound", "blood Hound", "basset Hound" , "afghan Hound", "english Mastiff", "tibetan Mastiff", "bull Mastiff" , "swiss moutain" )
        // console.log('ARRAY WITH PITBULL ADDED', array)

        // const mappedArray = array.map(breed => {
        //     return {value: breed, label: breed.charAt(0).toUpperCase()+breed.slice(1)}
        // })


        // console.log('mappedArray', mappedArray)



        // const {breeds} = this.state
        // console.log(breeds)
        // console.log('objectkeys', Object.keys(breeds))
        // console.log(breedsObjects)
    // const mappedBreeds = this.state.breeds.map(breed => {
    //     return <p>{breed}</p>
    // })
    //     return (
    //         <div>
    //             <select>
    //                 <option value={`"${breed}"`}>{breed}</option>
    //             </select>
    //         </div>
    //     )
    // })
    



    console.log('PROFILES FROM AXIOS', this.state.profiles)
    
    // let { loggedInUser, profiles} = this.props;
    const mappedProfiles = this.state.profiles.map(dog =>
     {
        return <Profile key={dog.profile_id} dog={dog} profileId={dog.profile_id}/>
    })


     
    console.log('THIS.STATE', this.state)
    console.log('LOGGED IN USER IN PROFILES COMPONENT', this.state.loggedInUser)

    return (
        <div className="profiles">
            <div className="select-container">
                <h1 >Search by </h1>

                <Select
                    className='select'
                    placeholder="Gender"
                    value={this.selectedGender}
                    onChange={this.handleGender}
                    options={genders}
                />

                <Select
                    className='select'
                    placeholder="Breed"
                    value={this.selectedBreed}
                    onChange={this.handleBreed}
                    options={array}
                />

                <Select
                    className='select'
                    placeholder="Age"
                    value={this.selectedAge}
                    onChange={this.handleAge}
                    options={ageGroups}
                />

                <button onClick={this.getAllProfiles}>Show All</button>


            </div>
            
            <div className="mapped-profiles">{mappedProfiles} </div>
                {/* <h1>{mappedBreeds}</h1> */}
        </div>
        );
    }
}

    function mapStateToProps(state){
        return state.profiles;
    }
      
      //mapDispatchToProps will map functions imported from the reducer onto the props of this component
    
      
      //exporting as a new enhanced component
      //connect component evoked 
      //if not using mapStateToProps, use null because it is ordinal 
      export default connect(mapStateToProps, {getAllProfiles, setUser, getFriends})(Profiles);