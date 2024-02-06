import './homeInterface.css'

function homeInterface(){
    return(
        <div className='homeInterface_main'>
            <div className='homeInterface_container'>
                <div className='homeInterface_transparentLayer'>
                    <div className='homeInterface_contaierBox'>
                        <div  className='homeInterface_heading'>
                            <p>More Than A Residence -- It's A Community Built On Care, Respect, And Shared Joy</p>
                        </div>
                        <div className='homeInterface_body'>
                            <p>This is not Just a Residence - It's a community where both residents and caretakers discover opportunities for mutual growth and support. So for what are ou waiting for. Join Now!</p>
                        </div>
                        <div className='homeInterface_bottomMain'>
                            <div className='homeInterface_bottomContainer'>
                                <div className="homeInterface_careTaker">
                                    <button className='neon-button' type="submit">Care Taker</button>
                                </div>
                                <div className="homeInterface_patient">
                                    <button className='neon-button' type="submit">Patient</button>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default homeInterface;