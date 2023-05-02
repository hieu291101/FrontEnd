import { useEffect, useState } from "react"
import API, { endpoints } from "../../configs/API"
import { Button, Form, Modal, Table } from "react-bootstrap";
import Loading from "../../layouts/Common/Loading";
import ModalPopUp from "./ModalPopUp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";


const CoursePoints = () => {
    let {courseId} = useParams();
    const [coursePoints, setCoursePoints] = useState(null);
    const [upload, setUpload] = useState([]);
    const [exportList, setExportList] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showFile, setFileShow] = useState(false);
    const handleFileClose = () => setFileShow(false);
    const handleFileShow = () => setFileShow(true);

    const notify = (message) => toast(message);

    useEffect(() => {
        const loadCoursePoint = async () => {
            let res = await API.get(endpoints['users'])
            setCoursePoints(res.data)
        }
        loadCoursePoint()

        // const uploadFile = async () => {
        //     let res = await API.post(endpoints['upload'])
        //     setUpload(res.data)
        // }
        // uploadFile()

        // const exportFile = async () => {
        //     let res = await API.post(endpoints['export'])
        //     setUpload(res.data)
        // }
        // exportFile()

    }, [show])

    if (coursePoints === null) return <Loading />

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmission = (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('file', selectedFile);
        
        // Gọi API
        const uploadFile = async () => {
            let res = await API.post(endpoints['upload'], formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            if(res.status === 200) {
                setUpload(res.data)
            }
        }
        uploadFile();

        // Api sẽ đổ ra dữ liệu từ trong file mà mình upload, length = 0 nếu format không đúng
        if(upload.length > 0) {
            notify("Upload thành công")
        } else {
            let message = upload.hasOwnProperty('message') ? upload.message : "Upload thất bại, Vui lòng chọn đúng format"
            notify(message)
        }
    };

    const handleExportFile = () => {
        const exportFile = async () => {
            let res = await API.post(endpoints['export'])
            console.log(res.data)
            setUpload(res.data)
        }
        exportFile();
    };

    return (
        <>
            <h1 className="text-center">Chấm điểm</h1>
            <Button variant="primary" onClick={handleFileShow} className="align-items-end">Import</Button>
            <Button variant="primary" onClick={handleExportFile} className="align-items-end">Export</Button>
            <ToastContainer />  
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {coursePoints.map((user, index) => (
                        <tr className="btn-doubleClick" key={index}>
                            <td>{user.email}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.username}</td>
                            <td>
                                <Button variant="primary" onClick={handleShow} className="btn-editUser">
                                    Chỉnh sửa
                                </Button>
                            </td>
                            {show ? <ModalPopUp show={show} handleClose={handleClose} user={user} /> : false}
                        </tr>

                    ))}
                </tbody>
            </Table>

            <Modal show={showFile} onHide={handleFileClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Content</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmission(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="file" accept=".csv" placeholder="Upload File..." name="file" onChange={changeHandler} />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={selectedFile===null ? true : false}>Save</Button>
                    </Form>

                </Modal.Body>
            </Modal>




        </>
    )
}

export default CoursePoints