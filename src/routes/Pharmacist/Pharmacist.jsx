/* eslint-disable */
import React, { useState, useEffect} from 'react';
import './Pharmacist.scss';
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Chart from 'chart.js'
import { Pie } from 'react-chartjs-2'

export const Pharmacist = () => {
    const base_url = window.api + "/pharmacy"

    const [loaded, setLoaded] = useState(false)
    const [type, setType] = useState("เตรียมยาเคมีบำบัด (order)")
    const [content, setContent] = useState()
    const [chart_sex, setSex] = useState()
    const [chart_role, setRole] = useState()
    const [chart_age, setAge] = useState()
    const [overall, setOverall] = useState()
    const [overData, setOverData] = useState()
    const fit = false
    Chart.defaults.global.elements.arc.borderWidth = 0
    Chart.defaults.global.legend.display = false
    Chart.defaults.global.tooltips.bodyFontSize = 20
    Chart.defaults.global.tooltips.bodyFontFamily = 'mainFont'
    Chart.defaults.global.tooltips.xPadding = 8
    Chart.defaults.global.tooltips.yPadding = 8
    

    useEffect(() =>{
        window.onresize = (e) => {
            reload()
        }
        return () => {
            window.onresize = null
        }
        // eslint-disable-next-line
    },[content])

    useEffect(() =>{
        // console.log(type)
        setContent()
        fetch()
        //////
        setLoaded(true)
        // eslint-disable-next-line
    },[type])

    useEffect(() =>{
        reload()
        // eslint-disable-next-line
    },[content,fit])

    function reload() {
        if(content || true){
            setSex()
            setRole()
            setAge()
            setOverall()
            let data = ''
            // if(type === 'อบรมยาเคมีบำบัด'){
            //     const ref = content.cancer
            //     if(!content || !ref) data = []
            //     else 
            //     data = {
            //         sex: [ref.sex.male, ref.sex.female, ref.sex.other],
            //         preg: [ref.pregnant.preg, ref.pregnant['non-preg']],
            //         age: [ref.age['more_than55'], ref.age['more_than50'], ref.age['not_50']]
            //     }
            // } else if(type === 'อบรมเตรียมยาสารอาหาร'){
            //     const ref = content.nutrient
            //     if(!content || !ref) data = []
            //     else 
            //     data = {
            //         sex: [ref.sex.male, ref.sex.female, ref.sex.other],
            //         preg: [ref.pregnant.preg, ref.pregnant['non-preg']],
            //         age: [ref.age['more_than55'], ref.age['more_than50'], ref.age['not_50']]
            //     }
            // } else if(type === 'ไม่มีใบอบรม'){
            //     const ref = content.nope
            //     if(!content || !ref) data = []
            //     else 
            //     data = {
            //         sex: [ref.sex.male, ref.sex.female, ref.sex.other],
            //         preg: [ref.pregnant.preg, ref.pregnant['non-preg']],
            //         age: [ref.age['more_than55'], ref.age['more_than50'], ref.age['not_50']]
            //     }
            // }

            data = {
                sex: [12, 10],
                role: [2, 12,8],
                age: [3, 6, 25]
            }

            setOverData({
                labels: ["test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04","test01","test02","test03","test04"],
                datasets: [
                    {
                        barPercentage: 0.7,
                        maxBarThickness: 100,
                        minBarThickness: 30,
                        backgroundColor: "#5BC0DEBB",
                        data: [3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12,3, 6, 18, 12]
                    }
                ]
            })

            setSex(()=>{
                return (
                    <div className="sex-pie">
                        <Pie
                            data={{
                                labels: ["",""],
                                datasets: [{
                                    data: data.sex,
                                    backgroundColor: ['#ACB9FF', '#855CF8']
                                }]
                            }}
                            options={{
                                maintainAspectRatio : false,
                            }}
                        ></Pie>
                    </div>
                )
            })

            setRole(()=>{
                return (
                    <div className="role-pie">
                        <Pie
                            data={{
                                labels: ["","",""],
                                datasets: [{
                                    data: data.role,
                                    backgroundColor: ['#ACB9FF', '#855CF8', '#A758B4']
                                }]
                            }}
                            options={{
                                maintainAspectRatio : false,
                            }}
                        ></Pie>
                    </div>
                )
            })

            setAge(()=>{
                return (
                    <div className="age-pie">
                        <Pie
                            data={{
                                labels: ["","",""],
                                datasets: [{
                                    data: data.age,
                                    backgroundColor: ['#A758B4', '#855CF8', '#ACB9FF']
                                }]
                            }}
                            options={{
                                maintainAspectRatio : false
                            }}
                        ></Pie>
                    </div>
                )
            })

            setOverall(()=>{
                return (
                    <canvas id="bar-chart-overall"></canvas>
                )
            })
        }
    }

    useEffect(()=>{
        if(overall){
            const data = overData
            const ctx = document.getElementById('bar-chart-overall')
            const ref = document.querySelector('.graph-wrapper')
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
    },[overall])

    async function fetch(){
        setLoaded(false)
        let res = await axios.get(base_url+'/data_chart')
        // console.log(res.data)
        setContent(res.data)
        setLoaded(true)
    }  

    return (
        <div className="Pharmacist noselect">
            <div className="p-container">
                {!loaded && <Spinner animation="grow" variant="primary"/>}
                <div className="top-wrapper">
                    <div className="main-chart-title">{type}</div>
                    <select className="main-chart-type-select noselect" defaultValue="เตรียมยาเคมีบำบัด (order)" onChange={(e)=>setType(e.target.value)}>
                        <option value="เตรียมยาเคมีบำบัด (order)">IC</option>
                        <option value="เตรียมยาเคมีบำบัด">C</option>
                        <option value="Screen ทำงาน 8.00-16.00">S</option>
                        <option value="เตรียมสารอาหารหลอดเลือดดำ">T</option>
                    </select>
                </div>
                {loaded && (
                    <div className="bottom-wrapper">
                        <div className="top">
                            <div className="chart-box">
                                <div className="sub-chart-title">เพศ</div>
                                <div className="sub-chart-box">
                                    {chart_sex}
                                    <div className="right-box">
                                        <div className="filler"></div>
                                        <div className="tag-chart">
                                            <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#ACB9FF" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="8" cy="8" r="5"/>
                                            </svg>
                                            &nbsp;เพศชาย
                                        </div>
                                        <div className="tag-chart">
                                            <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#855CF8" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="8" cy="8" r="5"/>
                                            </svg>
                                            &nbsp;เพศหญิง
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-filler"></div>
                            <div className="chart-box">
                                <div className="sub-chart-title">ตำแหน่ง</div>
                                <div className="sub-chart-box">
                                    {chart_role}
                                    <div className="right-box">
                                        <div className="filler"></div>
                                        <div className="tag-chart">
                                            <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#ACB9FF" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="8" cy="8" r="5"/>
                                            </svg>
                                            &nbsp;เภสัชกร
                                        </div>
                                        <div className="tag-chart">
                                            <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#855CF8" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="8" cy="8" r="5"/>
                                            </svg>
                                            &nbsp;เจ้าพนักงานเภสัชกร
                                        </div>
                                        <div className="tag-chart">
                                            <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#A758B4" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="8" cy="8" r="5"/>
                                            </svg>
                                            &nbsp;เจ้าหน้าที่
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-filler"></div>
                            <div className="chart-box">
                                <div className="sub-chart-title">ช่วงอายุ</div>
                                <div className="sub-chart-box">
                                    {chart_age}
                                    <div className="right-box">
                                        <div className="filler"></div>
                                        <div className="tag-chart">
                                            <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#A758B4" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="8" cy="8" r="5"/>
                                            </svg>
                                            &nbsp;อายุมากกว่า 55 ปี
                                        </div>
                                        <div className="tag-chart">
                                            <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#855CF8" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="8" cy="8" r="5"/>
                                            </svg>
                                            &nbsp;อายุมากกว่า 50 ปี
                                        </div>
                                        <div className="newline-tag-chart">
                                            <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="8" cy="8" r="5"/>
                                            </svg>
                                            &nbsp;แต่น้อยกว่า 55 ปี
                                        </div>
                                        <div className="tag-chart">
                                            <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#ACB9FF" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="8" cy="8" r="5"/>
                                            </svg>
                                            &nbsp;อายุน้อยกว่า 50 ปี
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filler"></div>
                        <div className="bottom">
                            <div className="main-chart-box">
                                <div className="sub-chart-title">
                                    กราฟแสดงจำนวนการทำงานของเภสัชกร
                                </div>
                                <div className="sub-chart-label">
                                    จำนวนการเข้าเวร (ครั้ง)
                                </div>
                                <div className="graph-box">
                                    <div className="graph-wrapper">
                                        {overall}    
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