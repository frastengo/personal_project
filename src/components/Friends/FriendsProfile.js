import React from 'react'
import './FriendsProfile.css'

export default function FriendsProfile (props)  {
 
    

    
    const {name, image} = props.dog
    const {dog, display} = props

    return(
         
            <div className='friends-profile-container'>
                
                <div onClick={() => props.display(dog)}className='friends-image-container'>
                    <img alt='friends-dog' src={image} />
                </div>
                
           
            </div>
        )

}

