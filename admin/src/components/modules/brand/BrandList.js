import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumbs";
import CardHeader from "../../partials/miniComponent/CardHeader";
import Constants from "../../../Contants";
import axios from "axios";
import CategoryPhotoModal from "../../partials/modals/CategoryPhotoModal";
import Pagination from "react-js-pagination";
import { Link, useNavigate } from "react-router-dom";
import CategoryDetailsModal from "../../partials/modals/CategoryDetailsModal";
import Swal from "sweetalert2";
import Loader from "../../partials/miniComponent/Loader";
import NoDataFound from "../../partials/miniComponent/NoDataFound";

const BarndList = () => {

     const [input,setInput] = useState({
       order_by : 'serial',
       per_page : 10,
       direction :'asc',
       search : '',

    })
    const [isLoading,setIsLoading] = useState(false)
    const [ brand,setBrand] = useState([])

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)


    const [modalShow, setModalShow] = React.useState(false)
    const [modalPhotoShow, setModalPhotoShow] = React.useState(false)
    const [categories, setCategories] = useState([])
    const [modalPhoto, setModalPhoto] = useState('')


      const handleInput = (e) => {
         setInput(prevState =>({...prevState, [e.target.name]: e.target.value}))
      }

    
    
    const getCategories = (pageNumber = 1) => {
        setIsLoading(true)
        axios.get(`${Constants.BASE_URL}/brand?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then(res=>{
           setCategories(res.data.data)
           setItemsCountPerPage(res.data.meta.per_page)
           setStartFrom(res.data.meta.from)
           setTotalItemsCount(res.data.meta.total)
           setActivePage(res.data.meta.current_page)
           setIsLoading(false)
        })
    }

    const handlePhotoModal = (logo) => {
        setModalPhoto(logo)
        setModalPhotoShow(true)
    }
    const handleDetailsModal = (brand) => {
            setBrand(brand) 
            setModalShow(true)
        }

        const handleBrandDelete = (id) => {

            Swal.fire({
                    title: "Are you sure?",
                    text: "Brand will be deleted",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Delete it!"
                    }).then((result) => {
                    if (result.isConfirmed) {
                      axios.delete(`${Constants.BASE_URL}/brand/${id}`).then(res=>{
                        getCategories()

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

    useEffect( () => {
        getCategories()

    }, [])

    return (
        <>
        <BreadCrumb title = {'Brand List'}/>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card mb-4">
                                    <div className="card-header">
                                         <CardHeader 
                                            title={'Brand List'}
                                            link={'/brand/create'} 
                                            icon={'fa-add'}
                                            button_text={'Add'}
                                            />
                                    </div>
                                        <div className="card-body">
    
                                            <div className="search-area mb-4">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label className={'w-100 '}>
                                                           <p>Search</p>

                                                           <input
                                                                className="form-control form-control-sm"
                                                                type={'search'}
                                                                name = {'search'}
                                                                value = {input.search}
                                                                onChange = {handleInput}
                                                                placeholder = {'Search.....'}
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className={'w-100'} >
                                                           <p>Order By</p>

                                                           <select
                                                                className="form-select form-select-sm"
                                                                name = {'order_by'}
                                                                value = {input.order_by}
                                                                onChange = {handleInput}
                                                                >
                                                                    <option value={'name'}>Name</option>
                                                                    <option value={'created_at'}>Created at</option>
                                                                    <option value={'updated_at'}>Updated at</option>
                                                                    <option value={'serial'}>Serial</option>
                                                                    <option value={'status'}>Status</option>
                                                            </select>
                                                           
                                                        </label>
                                                    </div>
                                                     <div className="col-md-2">
                                                        <label className={'w-100'}>
                                                           <p>Order Direction</p>

                                                           <select
                                                                className="form-select form-select-sm"
                                                                name = {'direction'}
                                                                value = {input.direction}
                                                                onChange = {handleInput}
                                                                >
                                                                    <option value={'asc'}>ASC</option>
                                                                    <option value={'desc'}>DESC</option>
                                                            </select>
                                                           
                                                        </label>
                                                    </div>



                                                       <div className="col-md-2">
                                                        <label className={'w-100'}>
                                                           <p>Per Page</p>
                                                           <select
                                                                className="form-select form-select-sm"
                                                                name = {'per_page'}
                                                                value = {input.per_page}
                                                                onChange = {handleInput}
                                                                >
                                                                    <option value={'10'}>10</option>
                                                                    <option value={'25'}>25</option>
                                                                    <option value={'50'}>50</option>
                                                                    <option value={'100'}>100</option>
                                                            </select>  
                                                        </label>
                                                    </div>


                                                        <div className="col-md-2">
                                                            <div className="d-grid mt-4">
                                                                <button className={'btn btn-sm theme-button'} onClick={()=>getCategories(1)}>
                                                                    <i className="fa-solid fa-magnifying-glass"/> Search</button>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                            {isLoading ? <Loader/> :
                                               <div className="table-responsive soft-landing">
                                                <table className={'my-table table table-hover table-striped table-bordered'}>
                                                   <thead>
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Name / Slug</th>
                                                            <th>Serial / Status</th>
                                                            <th>Photo</th>
                                                            <th>Created By</th>
                                                            <th>Date TIme</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead> 
                                                     <tbody>
                                                        {Object.keys(categories).length > 0 ? categories.map((brand, index )=>(
                                                        <tr key={index}>
                                                            <td>{startFrom + index}</td>
                                                            <td>
                                                                <p className={'text-theme'}>Name: {brand.name}</p>
                                                                <p className={'text-info'}>Slug: {brand.slug}</p>
                                                            </td>
                                                            <td>
                                                                <p className={'text-theme'}>Serial: {brand.serial}</p>
                                                                <p className={'text-info'}>Status: {brand.status}</p>
                                                            </td>
                                                            <td>
                                                                    <img onClick={()=>handlePhotoModal(brand.photo_full)} 
                                                                    src={brand.photo} alt={brand.name}
                                                                    className={'img-thumbnail table-image'}
                                                                    />
                                                             </td>
                                                            <td> {brand.created_by}</td>
                                                            <td>
                                                                 <p className={'text-theme'}><small>Created: {brand.created_at}</small></p>
                                                                <p className={'text-info'}><small>Updated: {brand.updated_at}</small></p>
                                                            </td>
                                                            <td>
                                                                <button onClick={()=>handleDetailsModal(brand)} className={'btn btn-sm btn-info my-1'}><i className="fa-solid fa-eye" /></button>
                                                                <Link to={`/brand/edit/${brand.id}`}><button className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-solid fa-edit" /></button></Link>
                                                                <button onClick={()=>handleBrandDelete(brand.id)} className={'btn btn-sm btn-danger my-1'}><i className="fa-solid fa-trash" /></button>
                                                            </td>
                                                        </tr>
                                                        )): <NoDataFound/> }
                                                        
                                                    </tbody> 
                                                </table>
                                                            <CategoryPhotoModal
                                                             show={modalPhotoShow}
                                                             onHide={() => setModalPhotoShow(false)}
                                                             title={'Brand logo'}
                                                             size={''}
                                                             photo={modalPhoto}
                                                            />
                                                            <CategoryDetailsModal
                                                             show={modalShow}
                                                             onHide={() => setModalShow(false)}
                                                             title={'Brand Details'}
                                                             size={''}
                                                             category={brand}
                                                            />
                                            </div>
                                            }
                                     
                                                            <div className="card-footer">
                                                                <nav className={'pagination-sm'}>
                                                                <   Pagination
                                                                    activePage={activePage}
                                                                    itemsCountPerPage={itemsCountPerPage}
                                                                    totalItemsCount={totalItemsCount}
                                                                    pageRangeDisplayed={5}
                                                                    onChange={getCategories}
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
        </>
    );
};
export default BarndList