import React from 'react';
import './showCase.css';
// import showcaseImage from '../../Assets/Images/search2.jpg';

const Showcase = () => {
    return (
        <section id="showcase" style={{background:'linear-gradient(180deg, rgba(25, 132, 134, 0.849), rgba(71, 49, 196, 0.788))', marginTop:'50px'}}>
            <div className="container">
                <h1>Find the Perfect Caretaker</h1>
                <p>Search and view profiles of experienced caretakers for your needs.</p>
            </div>
        </section>
    );
}

export default Showcase;