import React, { useEffect, useState, useRef } from 'react';
import './Staff.scss';
import { Button, Col, Row, Form } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import { isMobile } from 'react-device-detect'

export const Staff = () => {
    const [cPreg, setCPreg] = useState(false)
    const [cName, setCName] = useState()
    const [cAge, setCAge] = useState()
    const [cSex, setCSex] = useState()
    const [cTel, setCTel] = useState()
    const [cMail, setCMail] = useState()
    const [cRole, setCRole] = useState()
    const [cSkill, setCSkill] = useState([])
    const [form, showForm] = useState(false)
    const [eForm, showEForm] = useState(false)
    const [dForm, showDForm] = useState(false)
    const [eFormMode, selectEForm] = useState(false)
    const [selection, select] = useState([])
    const [editSelection, selectEdit] = useState(null)
    const [loading, setLoading] = useState(false)
    const [tags, setTags] = useState()
    const [skillDropdown, setSkillDropdown] = useState(false)
    const formRef = useRef()
    // const history = useHistory()
    const [users, setUsers] = useState([])
    const [loaded, setLoaded] = useState(false)
    const base_url = window.api + "/pharmacy"
    const rolemap = {
        P:"เภสัชกร",
        O:"เจ้าพนักงานเภสัชกร",
        S:"เจ้าหน้าที่"
    }
    const skillmap = {
        I: "แผนกผู้ป่วยใน",
        "I*" : "แผนกผู้ป่วยใน (ตรวจยาเสพติด)",
        S: "Screen ทำงาน 8.00-16.00",
        Sx: "Screen ทำงาน 8.30-16.30",
        T: "เตรียมสารอาหารหลอดเลือดดำ",
        C: "เตรียมยาเคมีบำบัด",
        IC: "เตรียมยาเคมีบำบัด (order)",
        O: "แผนกผู้ป่วยนอก"
    }

    useEffect(()=>{
        let target = ''
        window.onmousedown = (e) => {
            target = e.target.classList
        }
    
        window.onmouseup = (e) => {
            if (e.target.classList.contains('form') && e.target.classList === target & !loading) {
                showForm(false)
                showEForm(false)
                showDForm(false)
                clearFormState()
            } else if (e.target.classList.contains('skill-box') && e.target.classList === target){
                toggleSkillDropdown()
            }
        }

        return ()=>{
            window.onmousedown = null
            window.onmouseup = null
        }
        // eslint-disable-next-line
    },[skillDropdown])

    useEffect(()=>{
        async function fetchAll(){
            setLoaded(false)
            let res = await axios.get(base_url + "/all")
            console.log(res.data)
            setUsers(res?.data?res.data.sort((a,b)=>a.name-b.name):[])
            setLoaded(true)
        }
        fetchAll()
        // eslint-disable-next-line
    },[])

    // useEffect(()=>{
    //     console.log(users)
    // },[users])

    useEffect(() =>{
        clearFormState()
        selectEForm(false)
        if(form){

        } else {

        }
    },[form])

    useEffect(() =>{
        if(eForm){
            setEFormState()
        } else {
            clearFormState()
            select([])
        }
    // eslint-disable-next-line
    },[eForm])

    useEffect(()=>{
        if(dForm){
        } else {
            clearFormState()
        }
    },[dForm])

    useEffect(()=>{
        if(eFormMode){
        } else {
            clearFormState()
            select([])
        }
    },[eFormMode])

    useEffect(() =>{
        renderTags(cSkill)
    },[cSkill])

    function toggleSkillDropdown(){
        setSkillDropdown(!skillDropdown)
    }

    function clearFormState(){
        window.getSelection().removeAllRanges();
        setCPreg(false)
        setCName()
        setCAge()
        setCSex()
        setCTel()
        setCMail()
        setCRole()
        setCSkill([])
        setSkillDropdown(false)
        setLoading(false)
    }

    function setEFormState(){
        const user = users.find(ele=>ele.pid===editSelection)
        // console.log(user)
        if(user){
            setCPreg(user.pregnant)
            setCName(user.name)
            setCAge(user.birth_date.split('T')[0])
            setCSex(user.sex)
            setCTel(user.phone)
            setCRole(rolemap[user.role])
            setCMail(user.email)
            setCSkill(toSkillList(user))
            document.getElementById('name-form').value = user.name
            document.getElementById('age-form').value = user.birth_date.split('T')[0]
            document.getElementById('sex-form').value = user.sex
            document.getElementById('tel-form').value = user.phone
            document.getElementById('email-form').value = user.email
            document.getElementById('role-form').value = user.role
            setLoading(false)
        } else showEForm(false)
    }

    function errorForm(){
        document.getElementById('name-form').style.borderColor = cName?':#CCCCCC':'#e94c4c'
        document.getElementById('age-form').style.borderColor = cAge?':#CCCCCC':'#e94c4c'
        document.querySelector('.overtext').style.borderColor = cAge?':#CCCCCC':'#e94c4c'
        document.getElementById('sex-form').style.borderColor = cSex?':#CCCCCC':'#e94c4c'
        document.getElementById('tel-form').style.borderColor = (cTel && cTel.length === 10)?':#CCCCCC':'#e94c4c'
        document.getElementById('email-form').style.borderColor = cMail?':#CCCCCC':'#e94c4c'
        document.getElementById('role-form').style.borderColor = cRole?':#CCCCCC':'#e94c4c'
    }

    async function confirmDelete(e){
        if(selection.length !== 0){
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 2000))
            let newData = await axios.post(base_url+'/delete_bash', {
                pid: selection.map(ele=>{
                    const user = users.find(content=>content.pid === ele)
                    if(user){
                        return user.pid
                    } else return null
                }).filter(ele=>ele!==null)
            })
            if(newData?.data){
                setUsers(newData.data.sort((a,b)=>a.name-b.name))
            }
            showDForm(false)
        }
    }

    async function submitForm(e){
        errorForm()
        let content = {
            name: cName,
            birth_date: cAge,
            sex: cSex,
            phone: cTel,
            email: cMail,
            pregnant: cPreg,
            role: cRole,
            ...toSkillObject(cSkill)
        }
        console.log(content)
        if(!cName || !cAge || !cSex || !cTel || (cTel && cTel.length !== 10) || !cRole || !cMail){

        } else {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 2000))
            if(form){
                console.log('create form')
                let newData = await axios.post(base_url+'/add',content)
                if(newData?.data){
                    setUsers(newData.data.sort((a,b)=>a.name-b.name))
                }
            } else if(eForm){
                const user = users.find(ele=>ele.pid===editSelection)
                if(user){
                    content.pid = user.pid
                    let newData = await axios.put(base_url,content)
                    if(newData?.data){
                        setUsers(newData.data.sort((a,b)=>a.name-b.name))
                    }
                }
            }

            showForm(false)
            showEForm(false)
        }
    }

    function toSkillList(data){
        let list = []
        if(data.I) list.push("I")
        if(data.I_) list.push("I*")
        if(data.S) list.push("S")
        if(data.Sx) list.push("Sx")
        if(data.T) list.push("T")
        if(data.C) list.push("C")
        if(data.IC) list.push("IC")
        if(data.O) list.push("O")
        return list
    }

    function toSkillObject(list){
        let obj = {
            I:list.includes('I'),
            I_:list.includes('I*'),
            S:list.includes('S'),
            Sx:list.includes('Sx'),
            T:list.includes('T'),
            C:list.includes('C'),
            IC:list.includes('IC'),
            O:list.includes('O')
        }

        return obj
    }
    
    function renderUserTable() {
        let ar = []
        const count = 20
        for (let i = 0; i < count; i++) {
            ar[i] = i + 1
        }

        return users?.map((ele, i) => {
            let list = toSkillList(ele)
            
            return (
                <tr key={"r1-" + ele.pid} className="content-row noselect">
                    {eFormMode ? (
                        <td className="s selection-box add-line" onClick={() => {
                            if(selection.includes(ele.pid)){
                                select(selection.filter((number, index)=>number!==ele.pid))
                            } else {
                                select(selection.concat([ele.pid]))
                            }
                        }}>
                            {selection.includes(ele.pid)?
                            <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-check-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                            :
                            <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            </svg>}
                        </td>
                    ) : null}
                    <td className="tag-td add-line">{i+1}</td>
                    <td title="คลิกเพื่อแก้ไขข้อมูลผู้ใช้นี้" className={"name-td add-line" + (!eFormMode?" btn-mode":"")} onClick={()=>{if(!eFormMode){selectEdit(ele.pid);showEForm(true)}}}>{ele.name.split(' ')[0]}&nbsp;&nbsp;&nbsp;{ele.name.split(' ')[1]}</td>
                    <td className="age-td add-line">{ele.age}</td>
                    <td className="can-td add-line">
                        {list.reduce((pre,cur,i)=>pre + (i!==0?" ":"") + cur,"")}
                    </td>
                    <td className="nut-td add-line">
                        {rolemap[ele.role]}
                    </td>
                    <td className="tel-td add-line">{ele.phone.substring(0,3) + "-" + ele.phone.substring(3,6) + "-" + ele.phone.substring(6)}</td>
                </tr>
            )
        })
    }

    function renderTags(data){
        setTags(data.map((ele,i)=>{
            return (
                <div className="tag noselect" key={'tag-'+i}>
                    <div className="tag-text">{ele}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" fill="currentColor" className="bi bi-x" viewBox="0 -0.75 16 16" onClick={()=>{
                        let c = data.filter(iter=>iter!==ele)
                        setCSkill(c)
                    }}>
                        <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
            )
        }))
    }

    return (
        <div className="Staff">
            {dForm ? (
                <div className="create-form form noselect">
                    <div className="del-form-container">
                        <Row className="content-text">
                            {selection.length !== users.length ? "ยืนยันที่จะลบผู้ใช้ดังนี้ ?" : (<div>{"ยืนยันที่จะลบผู้ใช้ "}<span style={{color:'rgb(180, 39, 39)'}}>{"ทั้งหมด ?"}</span></div>)} 
                        </Row>
                        {(selection.length !== users.length) &&
                        <Row className="content-text-2">
                            <ul>
                                {users?.map((ele,i)=>{
                                    if(selection.includes(ele.pid)){
                                        return <li key={"ul-"+ele.pid}>{ele.name}</li>
                                    }
                                    return null
                                })}
                            </ul>
                        </Row>}
                        <Row style={!isMobile?{padding:'1.5rem 1.5rem 1.5rem 0'}:{}}>
                            <Col xs={6}></Col>
                            <Col><Button className="cancel-btn" variant="light" onClick={()=>{showDForm(false)}} disabled={loading}>Cancel</Button></Col>
                            <Col><Button className="submit-btn" variant="danger" onClick={confirmDelete} disabled={loading}>{loading?(
                                <svg width="1.2em" height="1.4em" viewBox="0 0 16 16" className="bi bi-hourglass-split" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13s-.866-1.299-3-1.48V8.35z"/>
                                </svg>
                            ) : "Confirm"}</Button></Col>
                        </Row>
                    </div>
                </div>
            ) : null}
            {form || eForm ? <div className="create-form form">
                <div className="form-container">
                    <div className="form-wrapper">
                        <Form ref={formRef} autoComplete="off">
                            <Form.Group as={Row} controlId="name-form">
                                <Form.Label column className="noselect">
                                    ชื่อ
                                </Form.Label>
                                <Col xs={9}>
                                    <Form.Control type="text" onChange={(e)=>setCName(e.target.value)}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="age-form">
                                <Form.Label column className="noselect">
                                    วันเกิด
                                </Form.Label>
                                <Col xs={9}>
                                    <Form.Control type="date" min="1900-01-01" max={(new Date()).getFullYear() + '-' + ((new Date()).getMonth()+1) + '-' + (new Date()).getDate()} onChange={(e)=>{
                                        setCAge(e.target.value)
                                    }}/>
                                    
                                    <Form.Control className="overtext noselect" type="text" disabled placeholder="วว/ดด/ปปปป" value={cAge? cAge.split('-')[2] + '/' + cAge.split('-')[1] + '/' + cAge.split('-')[0] : ''}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="sex-form">
                                <Form.Label column className="noselect">
                                    เพศ
                                </Form.Label>
                                <Col xs={9}>
                                    <Form.Control as="select" defaultValue="x" className="noselect" onChange={(e)=>{if(e.target.value!=='f')setCPreg(false);setCSex(e.target.value)}}>
                                        <option value="x" disabled>เพศ</option>
                                        <option value="m">ชาย</option>
                                        <option value="f">หญิง</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="tel-form">
                                <Form.Label column className="noselect">
                                    เบอร์โทร
                                </Form.Label>
                                <Col xs={9}>
                                    <Form.Control type="text" maxLength="10" onChange={(e)=>{
                                        if(/^\d+$/.test(e.target.value)) setCTel(e.target.value)
                                        else e.target.value = e.target.value.replace(/[^0-9]/g, "")
                                    }}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="email-form">
                                <Form.Label column className="noselect">
                                    อีเมล
                                </Form.Label>
                                <Col xs={9}>
                                    <Form.Control placeholder="example@email.com" type="email" onChange={(e)=>{ // eslint-disable-next-line
                                        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                        if(re.test(e.target.value)) {
                                            setCMail(e.target.value)
                                        } else {
                                            setCMail()
                                        }
                                    }}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="preg-form">
                                <Form.Label column className="noselect">
                                    ตั้งครรภ์
                                </Form.Label>
                                <Col xs={9}>
                                    <div className="checkbox-center" onClick={() => {if(cSex==='f')setCPreg(!cPreg)}} style={{color:cSex!=='f'?"rgb(175, 175, 175)":"inherit"}}>{cPreg ? (
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
                                        </svg>
                                    ) : (
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        </svg>
                                    )}</div>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="role-form" >
                                <Form.Label column className="noselect">
                                    หน้าที่
                                </Form.Label>
                                <Col xs={9}>
                                    <Form.Control as="select" defaultValue="x" className="noselect" onChange={(e)=>setCRole(e.target.value)}>
                                        <option value="x" disabled>หน้าที่</option>
                                        <option value="P">เภสัชกร</option>
                                        <option value="O">เจ้าพนักงานเภสัชกร</option>
                                        <option value="S">เจ้าหน้าที่</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="skill-form" >
                                <Form.Label column className="noselect">
                                    ความสามารถ
                                </Form.Label>
                                <Col xs={9}>
                                    <div className="skill-box">
                                        {tags}
                                    </div>
                                    {/* {cSkill.length === 8 && <div className="skill-limit-box noselect">
                                        Only 8 values can be added
                                     </div>} */}
                                    {skillDropdown === true && <div className="skill-rad-box noselect">
                                        {Object.entries(skillmap).map((ele,i)=>{
                                            const key = ele[0]
                                            const value = ele[1]

                                            return (
                                                <div key={"rad-"+ele}>
                                                    <div className="checkbox-center" onClick={()=>{
                                                        const copy = [...cSkill]
                                                        if(!copy.includes(key)){
                                                            copy.splice(i,0,key)
                                                            setCSkill(copy)
                                                        } else {
                                                            copy.splice(copy.indexOf(key),1)
                                                            setCSkill(copy)
                                                        }
                                                    }}>{cSkill.includes(key) ? (
                                                        <svg width=".9em" height=".9em" viewBox="0 0 16 16" fill="currentColor" className="bi bi-check-square-fill" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                    </svg>
                                                    ) : (
                                                        <svg width=".9em" height=".9em" viewBox="0 0 16 16" className="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                        </svg>
                                                    )}</div>
                                                    <div className="list-key">{key}</div> 
                                                    <div className="list-text">{": " + value}</div> 
                                                </div>
                                            )
                                        })}
                                    </div>}
                                </Col>
                            </Form.Group>
                            
                            <Form.Group as={Row} controlId="sub-form" className="remove-margin">
                                <Col xs={5}></Col>
                                <Col><Button className="cancel-btn" variant="light" onClick={()=>{showEForm(false);showForm(false)}} disabled={loading}>Cancel</Button></Col>
                                <Col><Button className="submit-btn" variant="primary" onClick={submitForm} disabled={loading}>{loading?(
                                    <svg width="1.2em" height="1.4em" viewBox="0 0 16 16" className="bi bi-hourglass-split" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13s-.866-1.299-3-1.48V8.35z"/>
                                    </svg>
                                ) : eForm ? "Update" : "Create"}</Button></Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div> : null}
            <div className="container">
                <div className="add-user-wrapper noselect" >
                    <Button variant="primary" className="add-user-btn nofocus" size="sm" block onClick={() => showForm(true)}>
                        Create
                    </Button>
                    <Button variant="outline-secondary" className="select-user-btn nofocus" size="sm" block onClick={() => selectEForm(true)} disabled={eFormMode}>
                        Select
                    </Button>
                    {eFormMode ? (
                        <Button variant="outline-dark" className="x-user-btn nofocus" size="sm" block onClick={() => selectEForm(false)}>
                            <svg width="1.4em" height="1.6em" viewBox="1 0.5 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </Button>
                    ) : null}
                    {eFormMode ? (
                        <Button variant="outline-danger" className="delete-user-btn nofocus" size="sm" block onClick={() => showDForm(true)} disabled={selection.length===0}>
                            <svg width="1.2em" height="1.4em" viewBox="-0.25 0.5 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                            </svg>
                        </Button>
                    ) : null}
                </div>

                <div className="wrapper">
                    { loaded?
                        <Table borderless hover className="edit-table">
                            <thead className="noselect add-line">
                                <tr>
                                    {eFormMode ? (
                                    <th className="selection-box ss" onClick={()=>select(selection.length === users?.length?[]:users.map(ele=>ele.pid))}>
                                        {selection.length === users?.length?
                                        <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-check-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                        :
                                        <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        </svg>}
                                    </th>
                                    ) : null}
                                    <th className="tag-th">#</th>
                                    <th className="name-th">ชื่อ</th>
                                    <th className="age-th">อายุ</th>
                                    <th className="can-th">ความสามารถ</th>
                                    <th className="nut-th">ตำแหน่ง</th>
                                    <th className="tel-th">เบอร์โทร</th>
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