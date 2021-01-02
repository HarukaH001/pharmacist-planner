/* eslint-disable */
import React, { useState, useEffect} from 'react';
import './Manage.scss';
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Chart from 'chart.js'

export const Manage = () => {
    const base_url = window.api + "/pharmacy"

    const [loaded, setLoaded] = useState(true)
    const [content, setContent] = useState()
    const [overall, setOverall] = useState()
    const [g1, setG1] = useState()
    const [g2, setG2] = useState()
    const [g3, setG3] = useState()
    const [g4, setG4] = useState()
    const [overData, setOverData] = useState()
    const fit = false
    Chart.defaults.global.elements.arc.borderWidth = 0
    Chart.defaults.global.legend.display = false
    Chart.defaults.global.tooltips.bodyFontSize = 20
    Chart.defaults.global.tooltips.bodyFontFamily = 'mainFont'
    Chart.defaults.global.tooltips.xPadding = 8
    Chart.defaults.global.tooltips.yPadding = 8
    

    useEffect(() =>{
        reload()
        window.onresize = (e) => {
            reload(e)
        }
        return () => {
            window.onresize = null
        }
        // eslint-disable-next-line
    },[content])

    function reload(e){
        if(content || true){
            setOverall()
            setG1()
            setG2()
            setG3()
            setG4()
            ////
            let label = ["test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04"]
            let data1 = [3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12]
            let data2 = [3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12]
            let data3 = [3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12]
            let data4 =[3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12]
            let sp = label.map(ele=>0)
            setOverData({
                data1:{
                    labels: label,
                    datasets: [
                        {
                            label: "วันจันทร์ - วันศุกร์",
                            barPercentage: 0.7,
                            maxBarThickness: 100,
                            minBarThickness: 30,
                            backgroundColor: "#5BC0DEBB",
                            data: data1,
                            hoverBoarder: 0
                        },
                        {
                            label: "วันเสาร์",
                            barPercentage: 0.7,
                            maxBarThickness: 100,
                            minBarThickness: 30,
                            backgroundColor: "#C9B9F8BB",
                            data: data2
                        },
                        {
                            label: "วันอาทิตย์",
                            barPercentage: 0.7,
                            maxBarThickness: 100,
                            minBarThickness: 30,
                            backgroundColor: "#F8C1BFBB",
                            data: data3
                        },
                        {
                            label: "วันหยุดทางราชการ",
                            barPercentage: 0.7,
                            maxBarThickness: 100,
                            minBarThickness: 30,
                            backgroundColor: "#8E858EBB",
                            data: data4
                        },
                        {
                            label: "รวม",
                            barPercentage: 0.7,
                            maxBarThickness: 100,
                            minBarThickness: 30,
                            backgroundColor: "#FFFFFFBB",
                            data: sp
                        }
                    ]
                },
                data2:{
                    labels: label,
                    datasets: [
                        {
                            barPercentage: 0.7,
                            maxBarThickness: 100,
                            minBarThickness: 30,
                            backgroundColor: "#5BC0DEBB",
                            data: data1
                        }
                    ]
                },
                data3:{
                    labels: label,
                    datasets: [
                        {
                            barPercentage: 0.7,
                            maxBarThickness: 100,
                            minBarThickness: 30,
                            backgroundColor: "#C9B9F8BB",
                            data: data2
                        }
                    ]
                },
                data4:{
                    labels: label,
                    datasets: [
                        {
                            barPercentage: 0.7,
                            maxBarThickness: 100,
                            minBarThickness: 30,
                            backgroundColor: "#F8C1BFBB",
                            data: data3
                        }
                    ]
                },
                data5:{
                    labels: label,
                    datasets: [
                        {
                            barPercentage: 0.7,
                            maxBarThickness: 100,
                            minBarThickness: 30,
                            backgroundColor: "#8E858EBB",
                            data: data4
                        }
                    ]
                }
            })


            setOverall(()=>{
                return (
                    <canvas id="bar-chart-overall"></canvas>
                )
            })
            setG1(()=>{
                return (
                    <canvas id="bar-chart-g1"></canvas>
                )
            })
            setG2(()=>{
                return (
                    <canvas id="bar-chart-g2"></canvas>
                )
            })
            setG3(()=>{
                return (
                    <canvas id="bar-chart-g3"></canvas>
                )
            })
            setG4(()=>{
                return (
                    <canvas id="bar-chart-g4"></canvas>
                )
            })
            ///
        }
    }

    useEffect(()=>{
        if(overall){
            const data = overData.data1
            const ctx = document.getElementById('bar-chart-overall')
            const ref = document.querySelector('.overall-wrapper')
            if(!fit){
                ref.style.width = Math.floor((data.labels.length / 30) * 100) + '%'
            }
            let myLiveChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    animation: {
                        duration: 10,
                    },
                    responsive: true,
                    maintainAspectRatio : false,
                    tooltips: {
                        mode: 'label',
                        callbacks: {
                        label: function(tooltipItem, data) { 
                                let corporation = data.datasets[tooltipItem.datasetIndex].label;
                                let valor = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        
                                // Loop through all datasets to get the actual total of the index
                                let total = 0;
                                for (let i = 0; i < data.datasets.length; i++)
                                    total += data.datasets[i].data[tooltipItem.index];
                        
                                // If it is not the last dataset, you display it as you usually do
                                if (tooltipItem.datasetIndex !== data.datasets.length - 1) {
                                    return corporation + " : " + valor;
                                } else { // .. else, you display the dataset and the total, using an array
                                    return corporation + " : " + total;
                                }
                            }
                        }
                    },
                    scales: {
                        xAxes: [{
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: "ชื่อเภสัชกร",
                                fontSize: 20,
                                fontFamily: 'mainFont'
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            stacked: true,
                            scaleLabel: {
                                display: false,
                                labelString: "จำนวนการเข้าเวร (ครั้ง)",
                                fontSize: 20,
                                fontFamily: 'mainFont'
                            },
                            ticks: {
                                beginAtZero: true,
                                max: 80
                            }
                        }]
                    },
                }
            })
        }
    },[overall])

    useEffect(()=>{
        if(g1){
            const data = overData.data2
            const ctx = document.getElementById('bar-chart-g1')
            const ref = document.querySelector('.graph1')
            if(!fit){
                ref.style.width = Math.floor((data.labels.length / 30) * 100) + '%'
            }
            let myLiveChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio : false,
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "ชื่อเภสัชกร",
                                fontSize: 20,
                                fontFamily: 'mainFont'
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: false,
                                labelString: "จำนวนการเข้าเวร (ครั้ง)",
                                fontSize: 20,
                                fontFamily: 'mainFont'
                            },
                            ticks: {
                                beginAtZero: true,
                                steps: 2,
                                max: 20
                            }
                        }]
                    },
                }
            })
        }
    },[g1])

    useEffect(()=>{
        if(g2){
            const data = overData.data3
            const ctx = document.getElementById('bar-chart-g2')
            const ref = document.querySelector('.graph2')
            if(!fit){
                ref.style.width = Math.floor((data.labels.length / 30) * 100) + '%'
            }
            let myLiveChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio : false,
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "ชื่อเภสัชกร",
                                fontSize: 20,
                                fontFamily: 'mainFont'
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: false,
                                labelString: "จำนวนการเข้าเวร (ครั้ง)",
                                fontSize: 20,
                                fontFamily: 'mainFont'
                            },
                            ticks: {
                                beginAtZero: true,
                                steps: 2,
                                max: 20
                            }
                        }]
                    },
                }
            })
        }
    },[g2])

    useEffect(()=>{
        if(g3){
            const data = overData.data4
            const ctx = document.getElementById('bar-chart-g3')
            const ref = document.querySelector('.graph3')
            if(!fit){
                ref.style.width = Math.floor((data.labels.length / 30) * 100) + '%'
            }
            let myLiveChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio : false,
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "ชื่อเภสัชกร",
                                fontSize: 20,
                                fontFamily: 'mainFont'
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: false,
                                labelString: "จำนวนการเข้าเวร (ครั้ง)",
                                fontSize: 20,
                                fontFamily: 'mainFont'
                            },
                            ticks: {
                                beginAtZero: true,
                                steps: 2,
                                max: 20
                            }
                        }]
                    },
                }
            })
        }
    },[g3])

    useEffect(()=>{
        if(g4){
            const data = overData.data5
            const ctx = document.getElementById('bar-chart-g4')
            const ref = document.querySelector('.graph4')
            if(!fit){
                ref.style.width = Math.floor((data.labels.length / 30) * 100) + '%'
            }
            let myLiveChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio : false,
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "ชื่อเภสัชกร",
                                fontSize: 20,
                                fontFamily: 'mainFont'
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: false,
                                labelString: "จำนวนการเข้าเวร (ครั้ง)",
                                fontSize: 20,
                                fontFamily: 'mainFont'
                            },
                            ticks: {
                                beginAtZero: true,
                                steps: 2,
                                max: 20
                            }
                        }]
                    },
                }
            })
        }
    },[g4])

    return (
        <div className="Manage noselect">
            <div className="m-container">
                {!loaded && <Spinner animation="grow" variant="primary"/>}
                {loaded && (
                    <div className="m-wrapper">
                        <div className="v1-box">
                            <div className="chart-box">
                                <div className="header-v1-box">
                                    <span>{"อัตราการทำงานของเภสัชกร\nในวันจันทร์ - วันศุกร์"}</span>
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
                                <div className="left-graph-box">
                                    <div className="main-chart-title">
                                        กราฟแสดงจำนวนการทำงานของเภสัชกร
                                    </div>
                                    <div className="sub-chart-label">
                                        จำนวนการเข้าเวร (ครั้ง)
                                    </div>
                                </div>
                                <div className="right-main-graph-box">
                                    <div className="box">
                                        <div className="palette blue"></div>
                                            วันจันทร์ - ศุกร์                      
                                    </div>
                                    <div className="box">
                                        <div className="palette purple"></div>
                                            วันเสาร์                      
                                    </div>
                                    <div className="box">
                                        <div className="palette red"></div>
                                            วันอาทิตย์                     
                                    </div>
                                    <div className="box">
                                        <div className="palette grey"></div>
                                            วันหยุดทางราชการ                      
                                    </div>
                                </div>
                                <div className="main-graph-box">
                                    <div className="overall-wrapper">
                                        {overall}    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filler"></div>
                        <div className="v-box">
                            <div className="main-chart-box">
                                <div className="left-graph-box">
                                    <div className="sub-chart-title">
                                        กราฟแสดงจำนวนการทำงานของเภสัชกร ในวันจันทร์ - วันศุกร์   
                                    </div>
                                    <div className="sub-chart-label">
                                        จำนวนการเข้าเวร (ครั้ง)
                                    </div>
                                </div>
                                <div className="graph-box">
                                    <div className="graph1">
                                        {g1}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filler"></div>
                        <div className="v-box">
                            <div className="main-chart-box">
                                <div className="left-graph-box">
                                    <div className="sub-chart-title">
                                        กราฟแสดงจำนวนการทำงานของเภสัชกร ในวันเสาร์  
                                    </div>
                                    <div className="sub-chart-label">
                                        จำนวนการเข้าเวร (ครั้ง)
                                    </div>
                                </div>
                                <div className="graph-box">
                                    <div className="graph2">
                                        {g2}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filler"></div>
                        <div className="v-box">
                            <div className="main-chart-box">
                                <div className="left-graph-box">
                                    <div className="sub-chart-title">
                                        กราฟแสดงจำนวนการทำงานของเภสัชกร ในวันอาทิตย์  
                                    </div>
                                    <div className="sub-chart-label">
                                        จำนวนการเข้าเวร (ครั้ง)
                                    </div>
                                </div>
                                <div className="graph-box">
                                    <div className="graph3">
                                        {g3}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filler"></div>
                        <div className="v-box">
                            <div className="main-chart-box">
                                <div className="left-graph-box">
                                    <div className="sub-chart-title">
                                        กราฟแสดงจำนวนการทำงานของเภสัชกร ในวันหยุดทางราชการ    
                                    </div>
                                    <div className="sub-chart-label">
                                        จำนวนการเข้าเวร (ครั้ง)
                                    </div>
                                </div>
                                <div className="graph-box">
                                    <div className="graph4">
                                        {g4}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}