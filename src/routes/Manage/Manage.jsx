import React, { useState, useEffect} from 'react';
import './Manage.scss';
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Chart from 'chart.js'

export const Manage = () => {
    const base_url = window.api + "/pharmacy"

    const [loaded, setLoaded] = useState(true)
    const [content, setContent] = useState()
    Chart.defaults.global.elements.arc.borderWidth = 0
    Chart.defaults.global.legend.display = false
    Chart.defaults.global.tooltips.bodyFontSize = 20
    Chart.defaults.global.tooltips.bodyFontFamily = 'mainFont'
    Chart.defaults.global.tooltips.xPadding = 8
    Chart.defaults.global.tooltips.yPadding = 8
    

    useEffect(() =>{
        window.onresize = (e) => {
            reload(e)
        }
        return () => {
            window.onresize = null
        }
        // eslint-disable-next-line
    },[content])

    function reload(e){
        console.log(e.target.clientHeight,e.target.clientWidth)
    }

    return (
        <div className="Manage noselect">
            <div className="m-container">
                {!loaded && <Spinner animation="grow" variant="primary"/>}
                {loaded && (
                    <div className="m-wrapper">
                        <div className="v1-box">
                            <div className="chart-box">
                                <div className="header-v1-box">
                                    <span>{"อัตราการทำงานของเภสัชกร\nในวันจันทร์-วันศุกร์"}</span>
                                </div>
                                <div className="body-v1-box">
                                    <div className="static-body">
                                        <div className="static-wrapper">
                                            <div className="stick-1 c1"></div>
                                            <div className="stick-trans"></div>
                                            <div className="stick-2 c1"></div>
                                            <div className="stick-trans"></div>
                                            <div className="stick-3 c1"></div>
                                        </div>
                                    </div>
                                    <div className="dynamic-body">
                                        <span>36</span>
                                        <span style={{fontSize:'5vh'}}> %</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-filler"></div>
                            <div className="chart-box">
                                <div className="header-v1-box">
                                    <span>{"อัตราการทำงานของเภสัชกร\nในวันเสาร์"}</span>
                                </div>
                                <div className="body-v1-box">
                                    <div className="static-body">
                                        <div className="static-wrapper">
                                            <div className="stick-1 c2"></div>
                                            <div className="stick-trans"></div>
                                            <div className="stick-2 c2"></div>
                                            <div className="stick-trans"></div>
                                            <div className="stick-3 c2"></div>
                                        </div>
                                    </div>
                                    <div className="dynamic-body">
                                        <span>20</span>
                                        <span style={{fontSize:'5vh'}}> %</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-filler"></div>
                            <div className="chart-box">
                                <div className="header-v1-box">
                                    <span>{"อัตราการทำงานของเภสัชกร\nในวันอาทิตย์"}</span>
                                </div>
                                <div className="body-v1-box">
                                    <div className="static-body">
                                        <div className="static-wrapper">
                                            <div className="stick-1 c3"></div>
                                            <div className="stick-trans"></div>
                                            <div className="stick-2 c3"></div>
                                            <div className="stick-trans"></div>
                                            <div className="stick-3 c3"></div>
                                        </div>
                                    </div>
                                    <div className="dynamic-body">
                                        <span>14</span>
                                        <span style={{fontSize:'5vh'}}> %</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-filler"></div>
                            <div className="chart-box">
                                <div className="header-v1-box">
                                    <span>{"อัตราการทำงานของเภสัชกร\nในวันหยุดทางราชการ"}</span>
                                </div>
                                <div className="body-v1-box">
                                    <div className="static-body">
                                        <div className="static-wrapper">
                                            <div className="stick-1 c4"></div>
                                            <div className="stick-trans"></div>
                                            <div className="stick-2 c4"></div>
                                            <div className="stick-trans"></div>
                                            <div className="stick-3 c4"></div>
                                        </div>
                                    </div>
                                    <div className="dynamic-body">
                                        <span>100</span>
                                        <span style={{fontSize:'5vh'}}> %</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filler"></div>
                        <div className="v2-box">
                            <div className="main-chart-box">
                            
                            </div>
                        </div>
                        <div className="filler"></div>
                        <div className="v-box">
                            <div className="main-chart-box">
                            
                            </div>
                        </div>
                        <div className="filler"></div>
                        <div className="v-box">
                            <div className="main-chart-box">
                            
                            </div>
                        </div>
                        <div className="filler"></div>
                        <div className="v-box">
                            <div className="main-chart-box">
                            
                            </div>
                        </div>
                        <div className="filler"></div>
                        <div className="v-box">
                            <div className="main-chart-box">
                            
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}