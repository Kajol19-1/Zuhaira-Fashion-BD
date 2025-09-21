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
import SupplierDetails from "../suppliers/partials/SupplierDetails";

const ShopList = () =>{

       const [input,setInput] = useState({
       order_by : 'created_at',
       per_page : 10,
       direction :'desc',
       search : '',

    })
    const [isLoading,setIsLoading] = useState(false)
    const [shop,setShop] = useState([])

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)


    const [modalShow, setModalShow] = React.useState(false)
    const [modalPhotoShow, setModalPhotoShow] = React.useState(false)
    const [shops, setShops] = useState([])
    const [modalPhoto, setModalPhoto] = useState('')


      const handleInput = (e) => {
         setInput(prevState =>({...prevState, [e.target.name]: e.target.value}))
      }

    
    
    const getShops = (pageNumber = 1) => {
        setIsLoading(true)
        axios.get(`${Constants.BASE_URL}/shop?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then(res=>{
           setShops(res.data.data)
           setItemsCountPerPage(res.data.meta.per_page)
           setStartFrom(res.data.meta.from)
           setTotalItemsCount(res.data.meta.total)
           setActivePage(res.data.meta.current_page)
           setIsLoading(false)
        })
    }

    const handlePhotoModal = (photo) => {
        setModalPhoto(photo)
        setModalPhotoShow(true)
    }
    const handleDetailsModal = (shop) => {
            setShop(shop) 
            setModalShow(true)
        }

        const handleShopDelete = (id) => {

            Swal.fire({
                    title: "Are you sure?",
                    text: "Shop will be deleted",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Delete it!"
                    }).then((result) => {
                    if (result.isConfirmed) {
                      axios.delete(`${Constants.BASE_URL}/shop/${id}`).then(res=>{
                        getShops()

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
        getShops()

    }, [])


    return (
            <>
        <BreadCrumb title = {'Shop List'}/>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card mb-4">
                                    <div className="card-header">
                                         <CardHeader 
                                            title={'Shop List'}
                                            link={'/shop/create'} 
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
                                                                    <option value={'name'}>Shop Name</option>
                                                                    <option value={'created_at'}>Created at</option>
                                                                    <option value={'updated_at'}>Updated at</option>
                                                                    <option value={'phone'}>Phone</option>
                                                                    <option value={'email'}>Email</option>
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
                                                                <button className={'btn btn-sm theme-button'} onClick={()=>getShops(1)}>
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
                                                            <th>Shop Name</th>
                                                            <th>Phone/Email</th>
                                                            <th>Status</th>
                                                            <th>Photo</th>
                                                            <th>Created By</th>
                                                            <th>Date TIme</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead> 
                                                     <tbody>
                                                        {Object.keys(shops).length > 0 ? shops.map((shop, index )=>(
                                                        <tr key={index}>
                                                            <td>{startFrom + index}</td>
                                                            <td>{shop.name}</td>
                                                            <td>
                                                                <p className={'text-success'}> Email: {shop.email}</p>
                                                                <p className={'text-info'}> Phone: {shop.phone}</p>
                                                            </td>
                                                            <td>{shop.status} </td>
                                                            <td>
                                                                    <img onClick={()=>handlePhotoModal(shop.logo_full)} 
                                                                    src={shop.logo} alt={shop.name}
                                                                    className={'img-thumbnail table-image'}
                                                                    />
                                                             </td>
                                                            <td> {shop.created_by}</td>
                                                            <td>
                                                                 <p className={'text-theme'}><small>Created: {shop.created_at}</small></p>
                                                                <p className={'text-info'}><small>Updated: {shop.updated_at}</small></p>
                                                            </td>
                                                            <td>
                                                                <button onClick={()=>handleDetailsModal(shop)} className={'btn btn-sm btn-info my-1'}><i className="fa-solid fa-eye" /></button>
                                                                <Link to={`/shop/edit/${shop.id}`}><button className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-solid fa-edit" /></button></Link>
                                                                <button onClick={()=>handleShopDelete(shop.id)} className={'btn btn-sm btn-danger my-1'}><i className="fa-solid fa-trash" /></button>
                                                            </td>
                                                        </tr>
                                                        )): <NoDataFound/> }
                                                        
                                                    </tbody> 
                                                </table>
                                                            <CategoryPhotoModal
                                                             show={modalPhotoShow}
                                                             onHide={() => setModalPhotoShow(false)}
                                                             title={'Shop logo'}
                                                             size={''}
                                                             photo={modalPhoto}
                                                            />
                                                            <SupplierDetails
                                                             show={modalShow}
                                                             onHide={() => setModalShow(false)}
                                                             title={'Shop Details'}
                                                             size={''}
                                                             supplier={shop}
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
                                                                    onChange={getShops}
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

export default ShopList;