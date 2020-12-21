import React, { useEffect, useState, useRef } from 'react';
import './Calendar.scss';
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import { Button, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import holidays from '../../assets/holidays.json'

export const Calendar = () => {
    const [selectedMonth, setSelectedMonth] = useState(formatMonth((new Date()).toISOString().substring(0, 7)))
    const [lastSelected, setLastSelected] = useState()
    const [picker, showPicker] = useState(false)
    const pickerRef = useRef()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const [contents, setContents] = useState()
    const [days, setDays] = useState()
    const [fDate, setFDate] = useState()
    const [loaded, setLoaded] = useState(false)
    const base_url = window.api + "/planner"
    
    useEffect(()=>{
        let target = ''
        window.onmousedown = (e) => {
            target = e.target.classList
        }
    
        window.onmouseup = (e) => {
            if (!e.target.classList.contains('pick') && e.target.classList === target) {
                showPicker(false)
            }
        }

        return ()=>{
            window.onmousedown = null
            window.onmouseup = null
        }
        // eslint-disable-next-line
    },[])

    // useEffect(()=>{
    //     console.log(contents)
    // },[contents])

    useEffect(()=>{
        if(!picker && selectedMonth !== lastSelected){
            const [mm, yyyy] = selectedMonth.split('/')
            console.log('fetch data of ' + selectedMonth)
            console.log('the days in this month of this year is ' + daysInMonth(mm,yyyy))
            setDays(daysInMonth(mm,yyyy))
            setFDate(firstDateInMonth(mm,yyyy))
            fetch()
            setLastSelected(selectedMonth)
        }
        // eslint-disable-next-line
    },[picker])

    async function fetch(){
        setLoaded(false)
        let res = await axios.get(base_url+'/month?did='+selectedMonth)
        let data = Object.entries(res.data).map((ele)=>{
            return {
                name: ele[0],
                schedule: ele[1]
            }
        })
        console.log(data)
        setContents(data.sort((a,b)=>a.name-b.name))
        setLoaded(true)
    }   

    async function reschedule(){
        setLoaded(false)
        let now = new Date()
        await axios.get(window.api+'/pharmacy/generate_planner?year='+ now.getFullYear() + "&month=" + (now.getMonth()+1) + "&day=" + now.getDate() + "&add=true")
        await new Promise(resolve=>setTimeout(resolve, 3000))
        await fetch()
        setLoaded(true)
    }   

    function rescheduleHandler(){
        reschedule()
    }

    function mathModuleHandler(){
        console.log('Math Module')
    }

    function reloadHandler(){
        fetch();
    }

    function formatMonth(date) {
        const [yyyy, mm] = date.split('-')
        return mm + '/' + yyyy
    }

    function daysInMonth (month, year) {
        let date = new Date()
        date.setFullYear(year)
        date.setMonth(month)
        date.setDate(0)
        return date.getDate();
    }

    function firstDateInMonth(month, year){
        let date = new Date()
        date.setFullYear(year)
        date.setMonth(month-1)
        date.setDate(1)
        return date.getDay()
    }

    function renderTableHead() {
        let ar = []
        
        for (let i = 0; i < days; i++) {
            ar[i] = i + 1
        }

        return ar.map((ele, i) => {
            return (
                <th className="date-th noselect" key={"h" + ele}>
                    {ele}
                </th>
            )
        })
    }

    function renderTableHead2() {
        let ar = []
        const dates = ['อา','จ','อ','พ','พฤ','ศ','ส']
        let index = fDate
        for (let i = 0; i < days; i++) {
            ar[i] = i + 1
        }

        return ar.map((ele, i) => {
            let isHoliday = false
            try{
                isHoliday = holidays[selectedMonth.split('/')[1]][selectedMonth.split('/')[0]].includes(ele)
            } catch (e) {

            }

            return (
                <th className="date2-th noselect" key={"h" + ele} style={{backgroundColor:((index + i)%7) === 0 ? '#E19F9D' : ((index + i)%7) === 6 ? '#B8A4F2' : isHoliday ? '#B7E6F4' : ''}}>
                    {dates[(index + i)%7]}
                </th>
            )
        })
    }

    function renderTableBody(schedule, inside, highlight) {
        let ar = []
        // const dates = ['อา','จ','อ','พ','พฤ','ศ','ส']
        let index = fDate

        for (let i = 0; i <= days; i++) {
            ar[i] = i + 1
        }

        return ar.map((ele, i) => {
            let assigned = schedule[i]?.detail ? schedule[i].detail : "-"
            let isHoliday = false
            try{
                isHoliday = holidays[selectedMonth.split('/')[1]][selectedMonth.split('/')[0]].includes(i)
            } catch (e) {

            }

            return i!==0 && (
                <td className={"stat-td noselect " + (highlight ? "highlight" : "coverlight")} key={"h" + ele} style={{paddingTop:(assigned === '-' ? '0.6rem':'0.4rem'),fontSize:(assigned === '-' ? '1rem':'1.2rem'),backgroundColor:((index + (i-1))%7) === 0 ? '#E19F9D' : ((index + (i-1))%7) === 6 ? '#B8A4F2' : isHoliday ? '#B7E6F4' : ''}}>
                    {assigned}
                </td>
            )
        })
    }

    function renderUserTable() {
        if(contents){
            let ar = []
            const count = contents.length
            for (let i = 0; i < count; i++) {
                ar[i] = i + 1
            }

            return ar.map((ele, index) => {
                    const fname = contents[index].name

                    return (
                        <tr key={"r1-"+index}>
                            <td className={"name-td" + (index%2===0?" highlight":"")} colSpan="3">{fname}</td>
                            {renderTableBody(contents[index].schedule, false,index%2===0)}
                        </tr>
                    )
            })
        }
    }

    function renderMonthPicker(){
        const [mm, yyyy] = selectedMonth.split('/')

        return (
            <div className="modal-wrapper pick">
                <Row className="c-row pick">
                    <Col className="c-col pick" style={{paddingRight:'0'}} onClick={()=>setSelectedMonth(mm + "/" + ((parseInt(yyyy)-1 > 1969)?parseInt(yyyy)-1:yyyy))}>
                        <div className="c-col-1 pick">
                            <svg width="1em" height="1em" viewBox="0 1.5 16 16" className="bi bi-chevron-left pick" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path className="pick" fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                            </svg>
                        </div>
                    </Col>
                    <Col className="c-col pick" style={{paddingRight:'3px',paddingLeft:'3px'}}>
                        <div className="c-col-2 pick">
                            <div className="year pick">{yyyy}</div>
                        </div>
                    </Col>
                    <Col className="c-col pick" style={{paddingLeft:'0'}}onClick={()=>setSelectedMonth(mm + "/" + (parseInt(yyyy)+1))}>
                        <div className="c-col-3 pick">
                            <svg width="1em" height="1em" viewBox="0 1.5 16 16" className="bi bi-chevron-right pick" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path className="pick" fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                    </Col>
                </Row>

                {renderMonths()}
            </div>
        )
    }

    function renderMonths() {
        const [mm, yyyy] = selectedMonth.split('/')
        let ar = []
        const count = 4
        for (let i = 0; i < count; i++) {
            ar[i] = i + 1
        }

        return ar.map((ele,i)=>{
            return (
                <Row className="d-row pick" key={"d-pick-"+i}>
                    <Col className={"d-col pick"} style={{paddingRight:'0'}}>
                        <div className={"d-col-1 pick" + (parseInt(mm)===(i*3+1) ? " selected":"")} onClick={()=>setSelectedMonth((i*3+1) + "/" + yyyy)}>
                            <div className="month pick">{months[i*3]}</div>
                        </div>
                    </Col>
                    <Col className={"d-col pick"} style={{paddingRight:'3px',paddingLeft:'3px'}}>
                        <div className={"d-col-2 pick" + (parseInt(mm)===(i*3+2) ? " selected":"")} onClick={()=>setSelectedMonth((i*3+2) + "/" + yyyy)}>
                            <div className="month pick">{months[i*3+1]}</div>
                        </div>
                    </Col>
                    <Col className={"d-col pick"} style={{paddingLeft:'0'}}>
                        <div className={"d-col-3 pick" + (parseInt(mm)===(i*3+3) ? " selected":"")} onClick={()=>setSelectedMonth((i*3+3) + "/" + yyyy)}>
                            <div className="month pick">{months[i*3+2]}</div>
                        </div>
                    </Col>
                </Row>
            )
        })
    }

    return (
        <div className="Calendar">
            <div className="container">
                <div className="right-btn-group">
                    <div className="month-picker noselect pick" >
                        <div ref={pickerRef} className="pick" onClick={() => showPicker(!picker)}>
                        <div className="calendar-btn pick">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-calendar2-date-fill pick" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path className="pick" fillRule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 3.5c0-.276.244-.5.545-.5h10.91c.3 0 .545.224.545.5v1c0 .276-.244.5-.546.5H2.545C2.245 5 2 4.776 2 4.5v-1zm7.336 9.29c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm.066-2.544c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2zm-2.957-2.89v5.332H5.77v-4.61h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z" />
                            </svg>
                        </div>
                        <div className="text pick">{selectedMonth}</div>
                        </div>
                        {picker?<div className="modal-picker pick">
                            {renderMonthPicker()}
                        </div>:null}
                    </div>

                    <div className="descriptor-group">
                        <div className="box">
                            <div className="palette blue"></div>
                            วันหยุดราชการ                            
                        </div>
                        <div className="box">
                            <div className="palette purple"></div>
                            วันเสาร์                            
                        </div>
                        <div className="box">
                            <div className="palette red"></div>
                            วันอาทิตย์                            
                        </div>
                    </div>
                </div>

                

                <div className="left-btn-group">
                    <Button variant="primary" className="reschedule noselect nofocus" block onClick={()=>rescheduleHandler()}>
                        Reschedule
                    </Button>

                    <Button disabled variant="primary" className="math noselect nofocus" block onClick={()=>mathModuleHandler()}>
                        Math Module
                    </Button>

                    <Button variant="outline-secondary" className="reload nofocus" block title="Reload" onClick={()=>reloadHandler()}>
                        <svg width="1em" height="1em" viewBox="0 0.75 16 16" className="bi bi-arrow-counterclockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                        </svg>
                    </Button>
                </div>

                <div className="wrapper">
                    { loaded?
                        <Table striped bordered hover className="edit-table">
                            <thead>
                                <tr>
                                    <th className="name-th" colSpan="3" rowSpan="2">ชื่อ</th>
                                    {renderTableHead()}
                                </tr>
                                <tr>
                                    {renderTableHead2()}
                                </tr>
                            </thead>
                            <tbody>
                                {renderUserTable()}
                            </tbody>
                        </Table>
                        :
                        <Spinner animation="grow" variant="primary"/>
                    }
                </div>
            </div>
        </div>
    )
}