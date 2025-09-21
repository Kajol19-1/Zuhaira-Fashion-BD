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

const ProductList = () =>{

      const [input,setInput] = useState({
       order_by : 'id',
       per_page : 10,
       direction :'desc',
       search : '',

    })
    const [isLoading,setIsLoading] = useState(false)
    const [ products,setProducts] = useState([])

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)

      const handleInput = (e) => {
         setInput(prevState =>({...prevState, [e.target.name]: e.target.value}))
      }

    
    
     const getCategories = (pageNumber = 1) => {
        setIsLoading(true)
       axios.get(`${Constants.BASE_URL}/product?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then(res=>{
            setProducts(res.data.data)
           setItemsCountPerPage(res.data.meta.per_page)
           setStartFrom(res.data.meta.from)
           setTotalItemsCount(res.data.meta.total)
           setActivePage(res.data.meta.current_page)
           setIsLoading(false)
        })
    }

   

        const handleProductDelete = (id) => {

            Swal.fire({
                    title: "Are you sure?",
                    text: "Product will be deleted",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Delete it!"
                    }).then((result) => {
                    if (result.isConfirmed) {
                      axios.delete(`${Constants.BASE_URL}/api/product/${id}`).then(res=>{
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
        <BreadCrumb title = {'Product List'}/>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card mb-4">
                                    <div className="card-header">
                                         <CardHeader 
                                            title={'Product List'}
                                            link={'/product/create'} 
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
                                                <table className={'my-table table-sm product-table table table-hover table-striped table-bordered'}>
                                                   <thead>
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                            <th>Status</th>
                                                            <th>Category</th>
                                                            <th>Photo</th>
                                                            <th>Date TIme</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead> 
                                                     <tbody>
                                                        {Object.keys(products).length > 0 ? products.map((product, index )=>(
                                                        <tr key={index}>
                                                            <td>{startFrom + index}</td>
                                                            <td>
                                                                <p className={'text-theme'}>Name: {product.name}</p>
                                                                <p className={'text-info'}>Slug: {product.slug}</p>
                                                                <p className={'text-theme'}>
                                                                    {product.attributes != undefined && Object.keys(product.attributes). length > 0 ?
                                                                        product.attributes.map((attribute, index)=>(
                                                                           <p><small> {attribute.name} : {attribute.value} </small></p>
                                                                        )):null
                                                                    }
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p className={'text-theme'}>Price: {product.price}</p>
                                                                <p className={'text-info'}>Discount : {product.discount_percent}  + {product.discount_fixed} </p>
                                                                <p className={'text-theme'}>Cost : {product.cost} </p>
                                                                <p className={'text-info'}>Discount Start : {product.discount_start} </p>
                                                                <p className={'text-theme'}>Discount End : {product.discount_end} </p>
                                                            </td>
                                                             <td>
                                                                <p className={'text-theme'}>Status: {product.status}</p>
                                                                <p className={'text-info'}>SKU : {product.sku} </p>
                                                                <p className={'text-theme'}>Stock : {product.stock} </p>
                                                            </td>
                                                            <td>
                                                                <p className={'text-theme'}>Category: {product.category}</p>
                                                                <p className={'text-info'}>Sub Category : {product.sub_category} </p>
                                                                <p className={'text-theme'}>Brand : {product.brand} </p>
                                                                <p className={'text-info'}>Origin: {product.country}</p>
                                                                <p className={'text-theme'}>Supplier : {product.supplier}</p>
                                                            </td>
                                                            <td>
                                                                    <img 
                                                                    src={product.primary_photo} alt={product.name}
                                                                    className={'img-thumbnail table-image'}
                                                                    />
                                                             </td>
                                                            <td>
                                                                <p className={'text-theme'}><small>Created: {product.created_at}</small></p>
                                                                <p className={'text-info'}><small>Updated: {product.updated_at}</small></p>
                                                                <p className={'text-theme'}><small>Created By: {product.created_by}</small></p>
                                                                <p className={'text-info'}><small>Updated By: {product.updated_by}</small></p>
                                                                </td>
                                                            <td>
                                                                <div className={'w-30'}>
                                                                    <button  className={'btn btn-sm btn-info'}><i className="fa-solid fa-eye" /></button>
                                                                    <Link to={`/product/edit/${product.id}`}><button className={'btn btn-sm btn-warning my-1'}><i className="fa-solid fa-edit" /></button></Link>
                                                                    <button onClick={()=>handleProductDelete(product.id)} className={'btn btn-sm btn-danger'}><i className="fa-solid fa-trash" /></button>
                                                                </div>
                                                                
                                                            </td>
                                                        </tr>
                                                        )): <NoDataFound/> }
                                                        
                                                    </tbody> 
                                                </table> 
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
export default ProductList;