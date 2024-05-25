import React from 'react';
import './showCase.css';
import showcaseImage from '../../Assets/Images/search2.jpg';

const Showcase = () => {
    return (
        <section id="showcase" style={{backgroundImage: `url(${showcaseImage})`}}>
            <div className="container">
                <h1>Find the Perfect Caretaker</h1>
                <p>Search and view profiles of experienced caretakers for your needs.</p>
            </div>
        </section>
    );
}

export default Showcase;