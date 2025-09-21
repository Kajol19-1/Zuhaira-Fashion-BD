import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumbs";
import CardHeader from "../../partials/miniComponent/CardHeader";
import $ from 'jquery';
import axios from "axios";
import Constants from "../../../Contants";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const AddProductPhoto = () =>{
    const params = useParams()
    const navigate = useNavigate();
    const [photos, setPhotos] =useState({})
    const [isLoading, setIsLoading]=useState(false)
    const [progress, setProgress]=useState(0)

    const handlePhotoUpload = () =>{
          setIsLoading(true)

          axios.post(`${Constants.BASE_URL}/product-photo-upload/${params.id}`, {photos},{
            onUploadProgress: (ProgressEvent) =>{
                const progress = Math.round(
                  (ProgressEvent.loaded * 100) / ProgressEvent.total
                )
                setProgress(progress)
            }
          }).then(res=>{
                setIsLoading(false)
               Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
                });

               navigate('/product')

          })
    }

    const handlePhotoInputField = () =>{
        $('#photo_input').trigger('click')
    }

    const handlePhotoUploadInput = (e) =>{
        let images = e.target.files;
        for (let i = 0 ; i < images.length; i++ ){
             let reader = new FileReader()
             reader.onloadend = () =>{
                 setPhotos(prevState => ({
                    ...prevState,
                    [i]:{
                        ...prevState[i], photo: reader.result,
                        ...prevState[i], is_primary: i == 0 ? 1 : 0,
                    }
                }))
            }
            reader.readAsDataURL(images[i])
        }
       
    }

    const handlePrimaryPhoto = (key) =>{
        for (let i= 0; i < Object.keys(photos).length; i++){
             setPhotos(prevState => ({
                    ...prevState,
                    [i]:{
                        ...prevState[key], is_primary: i==key ? 1 : 0,
                    }
                }))
        }
       
    }

    useEffect(()=>{
       console.log(photos)
    }, [photos]);

    return (
        <>
        <BreadCrumb title = {'Add Product Photo'}/>
                        <div class="row">
                            <div className="col-md-12">
                                <div className="card">
                                        <div className="card-header">
                                            <CardHeader 
                                            title={'Add Product Photo'}
                                            link={'/product'} 
                                            icon={'fa-list'}
                                            button_text={'List'}
                                            />
                                        </div>
                                <div className="card-body">
                                    <div className="photo-upload-container">
                                        <div className="icon" onClick={handlePhotoInputField}>
                                            <i className="fa-solid fa-camera fa-2x"/>
                                        </div>
                                        
                                    </div>

                                    <input id={'photo_input'}
                                        type ={'file'}
                                        className={'d-none'} 
                                        multiple={true}
                                        accept="image/png, image/jpg, image/jpeg, image/webp"
                                        onChange={handlePhotoUploadInput}
                                    />
                                    <div className="row">
                                       {Object.keys(photos).map((key) =>(
                                        <div className={'col-md-2 my-2'} key={key}>
                                            <img onClick={()=>handlePrimaryPhoto(key)} src={photos[key].photo} className={photos[key].is_primary == 1 ? 'primary-photo img-thumbnail preview-photo' : 'img-thumbnail  preview-photo'} alt={'preview'} />
                                        </div>
                                       ))}

                                       <div className="row align-items-center">
                                            <div className="col-md-9" >
                                                <div className="progress" style = {{display : `${progress < 1 ? 'none' : 'block'}`}}>
                                                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" style={{width : `${progress}%`}}>
                                                        {`${progress}%`}
                                                    </div>
                                                </div>
                                            </div>
                                                <diV className="col-md-3 text-end">
                                                    <button className={'btn theme-button'} disabled={isLoading} onClick={handlePhotoUpload} dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : 'Upload Photo'}}/>
                                                </diV>
                                            </div>
                                        <div>
                                       </div>
                                    </div>
                                </div>
                            </div>

                     </div>
                 </div> 

        </>
    );
};
export default AddProductPhoto;