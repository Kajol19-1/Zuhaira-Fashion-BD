import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumbs";
import {Modal} from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import Constants from "../../../Contants";
import Loader from "../../partials/miniComponent/Loader";
import NoDataFound from "../../partials/miniComponent/NoDataFound";
import Pagination from "react-js-pagination";

const ProductAttributes = () => {

    const [modalShow, setModalShow] =useState(false);
    const [input,setInput] = useState({ status: 1 })
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [attributes, setAttributes] = useState([])

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [modalTitle, setModalTitle] = useState('Add')
    const [valueModalTitle, setValueModalTitle] = useState('Add')
    const [valueModalShow, setValueModalShow] =useState(false);
    const [isEditModal, setIsEditModal] = useState(false)

    const [modalValue, setModalValue] = useState([])
    const [modalValueShow, setModalValueShow] = useState(false)
    
    const handleInput = (e) => setInput(prevState =>({...prevState, [e.target.name]: e.target.value}))

    
    const handleValueCreate = () =>{
         setIsLoading(true)

          axios.post(`${Constants.BASE_URL}/value`, input).then(res=>{
                setIsLoading(false)
               Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
                });

                setErrors([])
                setInput({status : 1})
                setValueModalShow(false)
                getAttributes()

          }).catch(errors =>{
                setIsLoading(false)
                if(errors.response.status == 422)
                    setErrors(errors.response.data.errors)
            })

    }
    const getAttributes = () => {
         setIsLoading(true)
        axios.get(`${Constants.BASE_URL}/attribute`, input).then(res=>{
            setIsLoading(false)
            setAttributes(res.data.data)
           setItemsCountPerPage(res.data.meta.per_page)
           setStartFrom(res.data.meta.from)
           setTotalItemsCount(res.data.meta.total)
           setActivePage(res.data.meta.current_page)
          
        })
    }
    const handleAttributeCreate = () => {
            setIsLoading(true)

          axios.post(`${Constants.BASE_URL}/attribute`, input).then(res=>{
                setIsLoading(false)
               Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
                });

                setErrors([])
                setInput({status : 1})
                setModalShow(false)
                getAttributes()

          }).catch(errors =>{
                setIsLoading(false)
                if(errors.response.status == 422)
                    setErrors(errors.response.data.errors)
            })

      }
      const handleAttributeUpdate = (id) => {
            setIsLoading(true)

          axios.put(`${Constants.BASE_URL}/attribute/${id}`, input).then(res=>{
                setIsLoading(false)
               Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
                });

                setErrors([])
                setInput({status : 1})
                setModalShow(false)
                getAttributes()

          }).catch(errors =>{
                setIsLoading(false)
                if(errors.response.status == 422)
                    setErrors(errors.response.data.errors)
            })

      }

    const handleAttributeDelete = (id) => {
         Swal.fire({
                            title: "Are you sure?",
                            text: "Attribute will be deleted",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, Delete it!"
                            }).then((result) => {
                            if (result.isConfirmed) {
          setIsLoading(true)

          axios.delete(`${Constants.BASE_URL}/attribute/${id}`).then(res=>{
                setIsLoading(false)
               Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
                })

                getAttributes()
    })   
    
        }
    })
}
          
      const handelModal = (attribute = undefined) => {
        setInput({status: 1})
        
        if(attribute != undefined){
            setModalTitle('Update')
            setIsEditModal(true)
            setInput({status: attribute.original_status, name : attribute.name, id:attribute.id})
        }else{
            setIsEditModal(false)
            setModalTitle('Add')
        }
        setErrors([])
        setModalShow(true)
      }

      const handleValueDetailsModal = (value) => {
        setModalValue(value)
        setModalValueShow(true)
      }

      const handleValueDelete = (id) =>{
         Swal.fire({
                    title: "Are you sure?",
                    text: "Attribute Value will be deleted",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Delete it!"
                    }).then((result) => {
                    if (result.isConfirmed) {
                      axios.delete(`${Constants.BASE_URL}/value/${id}`).then(res=>{
                        getAttributes()

                          Swal.fire({
                                        position: 'top-end',
                                        icon: res.data.cls,
                                        title: res.data.msg,
                                        showConfirmButton: false,
                                        toast: true,
                                        timer: 1500
                                    });

                         })
                    }
                });
      }

      const handleValueCreateModal = (id) =>{
        setIsEditModal(false)
        setValueModalShow(true)
        setValueModalTitle('Add')
        setInput({status: 1, attribute_id : id})

    }

      const handleValueEditModal = (value) =>{
        setIsEditModal(true)
        setValueModalShow(true)
        setValueModalTitle('Update')
        setInput({status: value.status_original, name: value.name, id: value.id})
      }

      const handleValueEdit = () =>{
        setIsLoading(true)

          axios.put(`${Constants.BASE_URL}/value/${input.id}`, input).then(res=>{
                setIsLoading(false)
               Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
                });

                setErrors([])
                setInput({status : 1})
                setValueModalShow(false)
                getAttributes()

          }).catch(errors =>{
                setIsLoading(false)
                if(errors.response.status == 422)
                    setErrors(errors.response.data.errors)
            })

      }


      useEffect(() => {
        getAttributes()
      }, []);
    return (
        <>
            <BreadCrumb title = {'Pruduct Attributes'}/>
            <div class="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="text-theme">Product Attributes</h4>
                                <button onClick={()=>handelModal()} className={'btn theme-button'}>
                                    <i class={`fa-solid fa-plus`}/> Add 
                                </button>
                            </div>
                        </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-12">
                                         {isLoading ? <Loader/> :
                                               <div className="table-responsive soft-landing">
                                                <table className={'my-table table table-hover table-striped table-bordered'}>
                                                   <thead>
                                                        <tr className={'text-center'}>
                                                            <th>SL</th>
                                                            <th>Name</th>
                                                            <th>Value</th>
                                                            <th>Status</th>
                                                            <th>Created By</th>
                                                            <th>Date TIme</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead> 
                                                     <tbody>
                                                        {Object.keys(attributes).length > 0 ? attributes.map((attribute, index )=>(
                                                        <tr key={index}>
                                                            <td>{startFrom + index}</td>
                                                            <td>{attribute.name}</td>
                                                            <td className={'text-center'}>
                                                                <div className="value-container-parent">
                                                                     {attribute.value != undefined ? attribute.value.map((value, valIndex)=>(
                                                                    <div className={'value-container'}>
                                                                        {value.name}
                                                                        <div className="value-buttons">
                                                                            <button onClick={()=>handleValueDetailsModal(value)} className={'bg-info'}><i className={`fa-solid fa-eye`}></i></button>
                                                                            <button onClick={()=>handleValueEditModal(value)}className={'bg-warning'}><i className={`fa-solid fa-edit`}></i></button>
                                                                            <button onClick={()=>handleValueDelete(value.id)} className={'bg-danger'}><i className={`fa-solid fa-trash`}></i></button>
                                                                        </div>
                                                                      </div>
                                                                    )) :null}
                                                                </div>
                                                                
                                                                <button onClick={()=>handleValueCreateModal(attribute.id)} className={"small-button"}> <i class={`fa-solid fa-plus`}/></button>
                                                            </td>
                                                            <td>{attribute.status} </td>
                                                            <td>{attribute.created_by}</td>
                                                            <td>
                                                                 <p className={'text-theme'}><small>Created: {attribute.created_at}</small></p>
                                                                <p className={'text-info'}><small>Updated: {attribute.updated_at}</small></p>
                                                            </td>
                                                            <td>
                                                               
                                                               <button onClick={()=>handelModal(attribute)} className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-solid fa-edit" /></button>
                                                                <button onClick={()=>handleAttributeDelete(attribute.id)} className={'btn btn-sm btn-danger my-1'}><i className="fa-solid fa-trash" /></button>
                                                            </td>
                                                        </tr>
                                                        )): <NoDataFound/> }
                                                        
                                                    </tbody> 
                                                </table>
                                            </div>
                                            }
                                    </div>
                                </div>
                                    <div className="card-footer">
                                        <nav className={'pagination-sm'}>
                                            <   Pagination
                                                    activePage={activePage}
                                                    itemsCountPerPage={itemsCountPerPage}
                                                    totalItemsCount={totalItemsCount}
                                                    pageRangeDisplayed={5}
                                                    onChange={getAttributes}
                                                    nextPageText={'Next'}
                                                    firstPageText={'First'}
                                                    prevPageText={'Previous'}
                                                    lastPageText={'Last'}
                                                    itemClass={'page-item'}
                                                    linkClass={'page-link'}
                                            />
                                        </nav>
                                    </div>
                        
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                centered
                show={modalShow}
                onHide={() => setModalShow(false)}
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    {modalTitle} Product Attribute
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className={'w-100'}>
                        <p>Name</p>
                        <input
                        className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                        type={'text'}
                        name = {'name'}
                        value = {input.name}
                        onChange = {handleInput}
                        placeholder = {'Enter attribute name'}
                        />
                        <p className={'login-error-msg'}><small>{errors.name != undefined ? errors.name[0] :null}</small></p>
                    </label>

                    <label className={'w-100 mt-4'}>
                        <p>Status</p>
                        <select
                        className={errors.status != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2' }
                        name={'status'}
                        value={input.status}  
                        onChange={handleInput}
                        placeholder={'Select brand status'}
                        >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                        </select>
                               
                        <p className={'login-error-msg'}><small>{errors.status != undefined ? errors.status[0] :null}</small></p>
                    </label>
                    <div className="col-md-12">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <div className="d-grid mt-4">
                                    <button className={'btn theme-button mt-4'} onClick={isEditModal ? ()=>handleAttributeUpdate(input.id) :handleAttributeCreate} dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : `${modalTitle} Attribute`}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </Modal.Body>
            </Modal>

            <Modal
                centered
                show={valueModalShow}
                onHide={() => setValueModalShow(false)}
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    {valueModalTitle} Attribute Value
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className={'w-100'}>
                        <p>Name</p>
                        <input
                        className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2' }
                        type={'text'}
                        name = {'name'}
                        value = {input.name}
                        onChange = {handleInput}
                        placeholder = {'Enter attribute name'}
                        />
                        <p className={'login-error-msg'}><small>{errors.name != undefined ? errors.name[0] :null}</small></p>
                    </label>

                    <label className={'w-100 mt-4'}>
                        <p>Status</p>
                        <select
                        className={errors.status != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2' }
                        name={'status'}
                        value={input.status}  
                        onChange={handleInput}
                        placeholder={'Select brand status'}
                        >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                        </select>
                               
                        <p className={'login-error-msg'}><small>{errors.status != undefined ? errors.status[0] :null}</small></p>
                    </label>
                    <div className="col-md-12">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <div className="d-grid mt-4">
                                    <button className={'btn theme-button mt-4'} onClick={isEditModal ? handleValueEdit :handleValueCreate} 
                                    dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : `${valueModalTitle} Value`}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </Modal.Body>
            </Modal>

              <Modal
                centered
                show={modalValueShow}
                onHide={() => setModalValueShow(false)}
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Value Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className={'table table-bordered table-hover table-striped'}>
                        <tbody>
                            <tr className={'text-center'}>
                                <th>ID</th>
                                <td>{modalValue.id}</td>
                            </tr>
                            <tr className={'text-center'}>
                                <th>Name</th>
                                <td>{modalValue.name}</td>
                            </tr>
                            <tr className={'text-center'}>
                                <th>Status</th>
                                <td>{modalValue.status}</td>
                            </tr>
                             <tr className={'text-center'}>
                                <th>Created By</th>
                                <td>{modalValue.created_by}</td>
                            </tr>
                             <tr className={'text-center'}>
                                <th>Created At</th>
                                <td>{modalValue.created_at}</td>
                            </tr>
                             <tr className={'text-center'}>
                                <th>Updated At</th>
                                <td>{modalValue.updated_at}</td>
                            </tr>


                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
           </>
    );
};
export default ProductAttributes;