import React from 'react';
import './Home.scss';
import hospitalImage from '../../assets/hospital-image.svg'
import hospitalLogo from '../../assets/hospital-logo.png'

export const Home = () => {

    return (
        <div className="Home">
            <div className="home-container">
                <div className="wrapper">
                    <div className="home-content-container">
                        <div className="left-panel">
                            <div className="hospital-title">
                                <img src={hospitalLogo} alt="โรงพยาบาลพระปกเกล้า จังหวัดจันทบุรี"/>
                                <div className="hospital-title-name">
                                    <h5>โรงพยาบาลพระปกเกล้า จังหวัดจันทบุรี</h5>
                                </div>
                            </div>
                            <div className="hospital-photo">
                                <img src={hospitalImage} alt="โรงพยาบาลพระปกเกล้า จังหวัดจันทบุรี"/>
                            </div>
                        </div>
                        <div className="right-panel">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}