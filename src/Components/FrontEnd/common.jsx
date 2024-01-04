import leftImage from '../../../Assets/Images/BackGround.jpg'

const LeftSide = (props) => {
    return (
        <div className='leftSide'>
            <div className='content'>
                <img src={leftImage} alt="CareImage" />
                <div>
                    <h1>{props.title} {props.msg? <i>{props.msg}</i>: null}</h1>
                    <p>{props.desc}</p>
                </div>
            </div>
        </div>
    )
}

export { LeftSide }