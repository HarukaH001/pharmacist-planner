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

                            </div>
                            <div className="h-filler"></div>
                            <div className="chart-box">
                        
                            </div>
                            <div className="h-filler"></div>
                            <div className="chart-box">
                        
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