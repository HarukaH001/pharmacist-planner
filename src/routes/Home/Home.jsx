import React from 'react';
import './Home.scss';
import { Col, Row } from 'react-bootstrap'
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
                                <div className="logo-wrapper noselect">
                                    <img src={hospitalLogo} alt="โรงพยาบาลพระปกเกล้า จังหวัดจันทบุรี" />
                                </div>
                                <div className="hospital-thai-name noselect">
                                    โรงพยาบาลพระปกเกล้า จังหวัดจันทบุรี
                                    <div className="hospital-eng-name noselect">Prapokklao Hospital</div>
                                </div>
                            </div>
                            <div className="hospital-photo noselect">
                                <img src={hospitalImage} alt="โรงพยาบาลพระปกเกล้า จังหวัดจันทบุรี" />
                            </div>
                        </div>
                        <div className="right-panel">
                            <div className="info-header">
                                แผนกเภสัชกรรม
                                <div className="info-header-eng">Pharmacentical Department</div>
                            </div>
                            <div className="info-history-header">
                                ประวัติโรงพยาบาล
                                <div className="info-history-body">
                                &emsp;{"โรงพยาบาลพระปกเกล้า เดิมชื่อ โรงพยาบาลจันทบุรี คณะรัฐมนตรีมีมติให้เปลี่ยนชื่อเป็นโรงพยาบาลพระปกเกล้าเพื่อน้อมเกล้าถวายเป็นพระบรมราชานุสรณ์แด่พระบาทสมเด็จพระปกเกล้าเจ้าอยู่หัวเมื่อวันที่ 11 กันยายน พ.ศ. 2496"}
                                <br></br>{"นอกจากนี้ ยังมีการสร้างพระบรมราชานุสาวรีย์พระบาทสมเด็จพระปกเกล้าเจ้าอยู่หัวและตึกต่างๆ เช่น อาคารประชาธิปก อาคารประชาธิปกศักดิเดชน์ ภายในโรงพยาบาล รวมทั้ง มีการจัดตั้งโรงเรียนพยาบาลผดุงครรภ์และอนามัยขึ้นที่โรงพยาบาลพระปกเกล้า ปัจจุบัน คือ วิทยาลัยพยาบาลพระปกเกล้า จันทบุรี และสมเด็จพระนางเจ้ารำไพพรรณี พระบรมราชินี ยังได้พระราชทานพระราชทรัพย์จัดตั้ง \"ทุนประชาธิปก\" (ต่อมาเปลี่ยนเป็น มูลนิธิประชาธิปก-รำไพพรรณี) เพื่อสนับสนุนกิจการของโรงพยาบาลพระปกเกล้า, วิทยาลัยพยาบาลพระปกเกล้า จันทบุรี และมหาวิทยาลัยราชภัฏรำไพพรรณ"}
                                </div>
                            </div>
                            <div className="info-contact">
                                <div className="info-contact-header noselect">ติดต่อ</div>
                                <div className="info-contact-name">โรงพยาบาลพระปกเกล้า</div>
                                <Row className="location-contact">
                                    <Col sm={1}>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-geo-alt-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        </svg>
                                    </Col>
                                    <Col>
                                        <span>{"38 ถนนเลียบเนิน ตำบลวัดใหม่ \nเทศบาลเมืองจันทบุรี จ.จันทบุรี 22000"}</span>
                                    </Col>
                                </Row>
                                <Row className="tel-contact">
                                    <Col sm={1}>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-telephone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z" />
                                        </svg>
                                    </Col>
                                    <Col>
                                        <span>{"039-319-666"}</span>
                                    </Col>
                                </Row>
                                <Row className="email-contact">
                                    <Col sm={1}>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                        </svg>
                                    </Col>
                                    <Col>
                                        <span>{"ppkhosp.go.th@gmail.com"}</span>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}