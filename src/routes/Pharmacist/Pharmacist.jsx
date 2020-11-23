import React, { useState, useEffect} from 'react';
import './Pharmacist.scss';
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Chart from 'chart.js'
import { Pie } from 'react-chartjs-2'

export const Pharmacist = () => {
    const base_url = window.api + "/pharmacy"

    const [loaded, setLoaded] = useState(false)
    const [type, setType] = useState("อบรมยาเคมีบำบัด")
    const [content, setContent] = useState()
    const [chart_sex, setSex] = useState()
    const [chart_preg, setPreg] = useState()
    const [chart_age, setAge] = useState()
    Chart.defaults.global.elements.arc.borderWidth = 0
    Chart.defaults.global.legend.display = false
    Chart.defaults.global.tooltips.bodyFontSize = 20
    Chart.defaults.global.tooltips.bodyFontFamily = 'mainFont'
    Chart.defaults.global.tooltips.xPadding = 8
    Chart.defaults.global.tooltips.yPadding = 8
    

    useEffect(() =>{
        fetch()
        // eslint-disable-next-line
    },[])

    useEffect(() =>{
        console.log(type)
        setContent()
        fetch()
        // eslint-disable-next-line
    },[type])

    useEffect(() =>{
        if(content){
            let data = ''
            if(type === 'อบรมยาเคมีบำบัด'){
                const ref = content.cancer
                if(!content || !ref) data = []
                else 
                data = {
                    sex: [ref.sex.male, ref.sex.female, ref.sex.other],
                    preg: [ref.pregnant.preg, ref.pregnant['non-preg']],
                    age: [ref.age['more_than55'], ref.age['more_than50'], ref.age['not_50']]
                }
            } else if(type === 'อบรมเตรียมยาสารอาหาร'){
                const ref = content.nutrient
                if(!content || !ref) data = []
                else 
                data = {
                    sex: [ref.sex.male, ref.sex.female, ref.sex.other],
                    preg: [ref.pregnant.preg, ref.pregnant['non-preg']],
                    age: [ref.age['more_than55'], ref.age['more_than50'], ref.age['not_50']]
                }
            } else if(type === 'ไม่มีใบอบรม'){
                const ref = content.nope
                if(!content || !ref) data = []
                else 
                data = {
                    sex: [ref.sex.male, ref.sex.female, ref.sex.other],
                    preg: [ref.pregnant.preg, ref.pregnant['non-preg']],
                    age: [ref.age['more_than55'], ref.age['more_than50'], ref.age['not_50']]
                }
            }

            // data = {
            //     sex: [12, 10, 2],
            //     preg: [2, 12],
            //     age: [3, 6, 25]
            // }

            setSex(()=>{
                return (
                    <div className="sex-pie">
                        <Pie
                            data={{
                                labels: ["เพศชาย","เพศหญิง","อื่น ๆ (ไม่ระบุ)"],
                                datasets: [{
                                    data: data.sex,
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

            setPreg(()=>{
                return (
                    <div className="preg-pie">
                        <Pie
                            data={{
                                labels: ["ตั้งครรภ์","ไม่ตั้งครรภ์"],
                                datasets: [{
                                    data: data.preg,
                                    backgroundColor: ['#ACB9FF', '#A758B4']
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
                                labels: ["อายุมากกว่า 55 ปี","อายุมากกว่า 50 ปี แต่น้อยกว่า 55 ปี","อายุน้อยกว่า 50 ปี"],
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
        }
        // eslint-disable-next-line
    },[content])

    async function fetch(){
        setLoaded(false)
        let res = await axios.get(base_url+'/data_chart')
        console.log(res.data)
        setContent(res.data)
        setLoaded(true)
    }  

    return (
        <div className="Pharmacist">
            <div className="container">
                {!loaded && <Spinner animation="grow" variant="primary"/>}
                <div className="left">
                    <div className="top-wrapper">
                        <div className="main-chart-title">{type}</div>
                    </div>
                    {loaded && <div className="bottom-wrapper">
                        <div className="chart-sex-module">
                            <div className="sub-chart-title">เพศ</div>
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
                                <div className="tag-chart">
                                    <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#A758B4" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="5"/>
                                    </svg>
                                    &nbsp;{"อื่น ๆ (ไม่ระบุ)"}
                                </div>
                            </div>
                        </div>
                        <div className="filler"></div>
                        <div className="chart-preg-module">
                            <div className="sub-chart-title">เภสัชกรหญิงที่ตั้งครรภ์</div>
                            {chart_preg}
                            <div className="right-box">
                                <div className="filler"></div>
                                <div className="tag-chart">
                                    <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#ACB9FF" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="5"/>
                                    </svg>
                                    &nbsp;ตั้งครรภ์
                                </div>
                                <div className="tag-chart">
                                    <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#A758B4" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="5"/>
                                    </svg>
                                    &nbsp;ไม่ตั้งครรภ์
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
                <div className="filler"></div>
                <div className="right">
                    <div className="top-wrapper">
                        <select className="main-chart-type-select noselect" defaultValue="อบรมยาเคมีบำบัด" onChange={(e)=>setType(e.target.value)}>
                            <option value="อบรมยาเคมีบำบัด">อบรมยาเคมีบำบัด</option>
                            <option value="อบรมเตรียมยาสารอาหาร">อบรมเตรียมยาสารอาหาร</option>
                            <option value="ไม่มีใบอบรม">ไม่มีใบอบรม</option>
                        </select>
                    </div>
                    {loaded && <div className="bottom-wrapper">
                        <div className="sub-chart-title">ช่วงอายุ</div>
                        {chart_age}
                        <div className="bottom-box">
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
                                &nbsp;อายุมากกว่า 50 ปี แต่น้อยกว่า 55 ปี
                            </div>
                            <div className="tag-chart">
                                <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#ACB9FF" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="8" cy="8" r="5"/>
                                </svg>
                                &nbsp;อายุน้อยกว่า 50 ปี
                            </div>
                            <div className="filler"></div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}