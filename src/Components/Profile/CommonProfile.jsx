import React from 'react'
import './CommonProfile.css'

const CommonProfile = ({ pageName }) => {
    return (
        <div>
            <h1>I am on a {pageName} Profile Page</h1>
        </div>
    )
}

function Services() {
    return (
        <div className='main'>

            <div className='upper'>SERVICES</div>
            <div className='lower'>
                <div className='box'>OldCare</div>
                <div className='box'>ChildCare</div>
            </div>
            <div className='lower'>
                <div className='addBox'>+</div>
            </div>

        </div>
    )
}

export { Services }

export default CommonProfile;
