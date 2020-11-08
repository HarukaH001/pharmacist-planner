import React, { useEffect, useState, useRef } from 'react';
import './Staff.scss';
// import { Link, useLocation, useHistory } from 'react-router-dom';
import { Button, Col, Row, Form } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import axios from 'axios'

export const Staff = () => {
    const [cPreg, setCPreg] = useState(false)
    const [cCan, setCCan] = useState(false)
    const [cNut, setCNut] = useState(false)
    const [cName, setCName] = useState()
    const [cAge, setCAge] = useState()
    const [cSex, setCSex] = useState()
    const [cTel, setCTel] = useState()
    const [form, showForm] = useState(false)
    const [eForm, showEForm] = useState(false)
    const [dForm, showDForm] = useState(false)
    const [eFormMode, selectEForm] = useState(false)
    const [selection, select] = useState([])
    const [editSelection, selectEdit] = useState(null)
    const [loading, setLoading] = useState(false)
    const formRef = useRef()
    // const history = useHistory()
    const [users, setUsers] = useState([])
    const base_url = "https://266f9c25a1bb.ap.ngrok.io/pharmacy"


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
            }
        }

        return ()=>{
            window.onmousedown = null
            window.onmouseup = null
        }
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        async function fetchAll(){
            let res = await axios.get(base_url + "/all")
            setUsers(res?.data?res.data.sort((a,b)=>a.id-b.id):[])
        }
        fetchAll()
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

    function clearFormState(){
        window.getSelection().removeAllRanges();
        setCPreg(false)
        setCCan(false)
        setCNut(false)
        setCName()
        setCAge()
        setCSex()
        setCTel()
        setLoading(false)
    }

    function setEFormState(){
        const user = users.find(ele=>ele.id===editSelection)
        // console.log(user)
        if(user){
            setCPreg(user.pregnant)
            setCCan(user.cancer)
            setCNut(user.nutrient)
            setCName(user.name)
            setCAge(user.age)
            setCSex(user.sex)
            setCTel(user.phone)
            document.getElementById('name-form').value = user.name
            document.getElementById('age-form').value = user.age
            document.getElementById('sex-form').value = user.sex
            document.getElementById('tel-form').value = user.phone
            setLoading(false)
        } else showEForm(false)
    }

    function errorForm(){
        document.getElementById('name-form').style.borderColor = cName?'white':'#e94c4c'
        document.getElementById('age-form').style.borderColor = cAge?'white':'#e94c4c'
        document.getElementById('sex-form').style.borderColor = cSex?'white':'#e94c4c'
        document.getElementById('tel-form').style.borderColor = (cTel && cTel.length === 10)?'white':'#e94c4c'
    }

    async function confirmDelete(e){
        if(selection.length !== 0){
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 2000))
            let newData = await axios.post(base_url+'/delete_bash', {
                pid: selection.map(ele=>{
                    const user = users.find(content=>content.id === ele)
                    if(user){
                        return user.pid
                    } else return null
                }).filter(ele=>ele!==null)
            })
            if(newData?.data){
                setUsers(newData.data.sort((a,b)=>a.id-b.id))
            }
            showDForm(false)
        }
    }

    async function submitForm(e){
        errorForm()
        if(!cName || !cAge || !cSex || !cTel || (cTel && cTel.length !== 10)){

        } else {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 2000))
            if(form){
                console.log('create form')
                const content = {
                    name: cName,
                    sex: cSex,
                    age: cAge,
                    role: 'เภสัช',
                    phone: cTel,
                    nutrient: cNut,
                    cancer: cCan,
                    pregnant: cPreg
                }
                let newData = await axios.post(base_url+'/add',content)
                if(newData?.data){
                    setUsers(newData.data.sort((a,b)=>a.id-b.id))
                }
            } else if(eForm){
                const user = users.find(ele=>ele.id===editSelection)
                if(user){
                    const content = {
                        pid: user.pid,
                        name: cName,
                        sex: cSex,
                        age: cAge,
                        role: user.role,
                        phone: cTel,
                        nutrient: cNut,
                        cancer: cCan,
                        pregnant: cPreg
                    }
                    let newData = await axios.put(base_url,content)
                    if(newData?.data){
                        setUsers(newData.data.sort((a,b)=>a.id-b.id))
                    }
                }
            }

            showForm(false)
            showEForm(false)
        }
    }

    function renderUserTable() {
        let ar = []
        const count = 20
        for (let i = 0; i < count; i++) {
            ar[i] = i + 1
        }

        return users?.map((ele, i) => {
            return (
                <tr key={"r1-" + ele.id} className="content-row noselect">
                    {eFormMode ? (
                        <td className="s selection-box add-line" onClick={() => {
                            if(selection.includes(ele.id)){
                                select(selection.filter((number, index)=>number!==ele.id))
                            } else {
                                select(selection.concat([ele.id]))
                            }
                        }}>
                            {selection.includes(ele.id)?
                            <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-check-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                            :
                            <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            </svg>}
                        </td>
                    ) : null}
                    <td className="tag-td add-line">{ele.id}</td>
                    <td title="คลิกเพื่อแก้ไขข้อมูลผู้ใช้นี้" className={"name-td add-line" + (!eFormMode?" btn-mode":"")} onClick={()=>{if(!eFormMode){selectEdit(ele.id);showEForm(true)}}}>{ele.name.split(' ')[0]}&nbsp;&nbsp;&nbsp;{ele.name.split(' ')[1]}</td>
                    <td className="age-td add-line">{ele.age}</td>
                    <td className="can-td add-line" style={!ele.cancer?{color: 'transparent'}:{}}>
                        <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </td>
                    <td className="nut-td add-line" style={!ele.nutrient?{color: 'transparent'}:{}}>
                        <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </td>
                    <td className="preg-td add-line" style={!ele.pregnant?{color: 'transparent'}:{}}>
                        <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </td>
                    <td className="tel-td add-line">{ele.phone.substring(0,3) + "-" + ele.phone.substring(3,6) + "-" + ele.phone.substring(6)}</td>
                </tr>
            )
        })
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
                                    if(selection.includes(ele.id)){
                                        return <li key={"ul-"+ele.id}>{"#"+(ele.id===129?'33':ele.id) + (ele.id < 10?"\t\t":ele.id < 100?"\t\t":"\t") + ele.name}</li>
                                    }
                                    return null
                                })}
                            </ul>
                        </Row>}
                        <Row>
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
                    <Form ref={formRef} autoComplete="off">
                        <Form.Group as={Row} controlId="name-form">
                            <Form.Label column className="noselect">
                                ชื่อ
                            </Form.Label>
                            <Col xs={7}>
                                <Form.Control type="text" onChange={(e)=>setCName(e.target.value)} style={{borderColor:"white"}}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="age-form">
                            <Form.Label column className="noselect">
                                อายุ
                            </Form.Label>
                            <Col xs={7}>
                                <Form.Control type="text" maxLength="3" onChange={(e)=>{
                                    if(/^\d+$/.test(e.target.value)) setCAge(e.target.value)
                                    else e.target.value = e.target.value.replace(/[^0-9]/g, "")
                                }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="sex-form">
                            <Form.Label column className="noselect">
                                เพศ
                            </Form.Label>
                            <Col xs={7}>
                                <Form.Control as="select" defaultValue="x" className="noselect" onChange={(e)=>setCSex(e.target.value)}>
                                    <option value="x" disabled>กรุณาเลือก</option>
                                    <option value="m">ชาย</option>
                                    <option value="f">หญิง</option>
                                    <option value="o">อื่น ๆ (ไม่ระบุ)</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="tel-form">
                            <Form.Label column className="noselect">
                                เบอร์โทร
                            </Form.Label>
                            <Col xs={7}>
                                <Form.Control type="text" maxLength="10" onChange={(e)=>{
                                    if(/^\d+$/.test(e.target.value)) setCTel(e.target.value)
                                    else e.target.value = e.target.value.replace(/[^0-9]/g, "")
                                }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="preg-form" >
                            <Form.Label column className="noselect">
                                ตั้งครรภ์
                            </Form.Label>
                            <Col xs={7}>
                                <div className="checkbox-center" onClick={() => setCPreg(!cPreg)}>{cPreg ? (
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
                        <Form.Group as={Row} controlId="can-form" >
                            <Form.Label column className="noselect">
                                อบรมด้านการเคมีบำบัด
                            </Form.Label>
                            <Col xs={7}>
                                <div className="checkbox-center" onClick={() => setCCan(!cCan)}>{cCan ? (
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
                        <Form.Group as={Row} controlId="nut-form" >
                            <Form.Label column className="noselect">
                                อบรมด้านการเตรียมอาหาร
                            </Form.Label>
                            <Col xs={7}>
                                <div className="checkbox-center" onClick={() => setCNut(!cNut)}>{cNut ? (
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
                        <Form.Group as={Row} controlId="sub-form">
                            <Col xs={6}></Col>
                            <Col><Button className="cancel-btn" variant="light" onClick={()=>{showEForm(false);showForm(false)}} disabled={loading}>Cancel</Button></Col>
                            <Col><Button className="submit-btn" variant="primary" onClick={submitForm} disabled={loading}>{loading?(
                                <svg width="1.2em" height="1.4em" viewBox="0 0 16 16" className="bi bi-hourglass-split" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13s-.866-1.299-3-1.48V8.35z"/>
                                </svg>
                            ) : eForm ? "Update" : "Create"}</Button></Col>
                        </Form.Group>
                    </Form>
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
                    {/* {eFormMode ? (
                        <Button variant="outline-info" className="edit-user-btn nofocus" size="sm" block onClick={() => showEForm(true)} disabled={selection.length===0}>
                            <svg width="1.2em" height="1.4em" viewBox="-0.25 0.5 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                            </svg>
                        </Button>
                    ) : null} */}
                    {eFormMode ? (
                        <Button variant="outline-danger" className="delete-user-btn nofocus" size="sm" block onClick={() => showDForm(true)} disabled={selection.length===0}>
                            <svg width="1.2em" height="1.4em" viewBox="-0.25 0.5 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                            </svg>
                        </Button>
                    ) : null}
                </div>

                <div className="wrapper-0">
                    <Table borderless hover>
                        <thead className="noselect add-line">
                            <tr>
                                {eFormMode ? (
                                <th className="selection-box s" onClick={()=>select(selection.length === users?.length?[]:users.map(ele=>ele.id))}>
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
                                <th className="can-th">มะเร็ง</th>
                                <th className="nut-th">สารอาหาร</th>
                                <th className="preg-th">ตั้งครรภ์</th>
                                <th className="tel-th">เบอร์โทร</th>
                            </tr>
                        </thead>
                    </Table>
                </div>

                <div className="wrapper">
                    <Table borderless hover className="edit-table">
                        <thead className="noselect">
                            <tr>
                                {eFormMode ? (
                                <th className="selection-box"></th>
                                ) : null}
                                <th className="tag-td">#</th>
                                <th className="name-td">ชื่อ</th>
                                <th className="age-td">อายุ</th>
                                <th className="can-td">มะเร็ง</th>
                                <th className="nut-td">สารอาหาร</th>
                                <th className="preg-td">ตั้งครรภ์</th>
                                <th className="tel-td">เบอร์โทร</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderUserTable()}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}