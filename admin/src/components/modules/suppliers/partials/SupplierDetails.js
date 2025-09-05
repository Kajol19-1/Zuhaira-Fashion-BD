import React from "react";
import {Modal} from "react-bootstrap";

const SupplierDetails = (props) =>
{
    return (
       <>
            <Modal
                {...props}
                size={props.size}
                aria-labelledby="supplier_details_modal"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="supplier_details_modal">
                           {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <table className={'my-table table table-sm table-hover table-striped table-bordered'}>
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{props.supplier.id}</td>
                                </tr>
                                  <tr>
                                    <th>Name</th>
                                    <td>{props.supplier.name}</td>
                                </tr>
                                  <tr>
                                    <th>Email</th>
                                    <td>{props.supplier.email}</td>
                                  </tr>
                                  <tr>
                                    <th>Phone</th>
                                    <td>{props.supplier.phone}</td>
                                </tr>
                                  <tr>
                                    <th>Status</th>
                                    <td>{props.supplier.status}</td>
                                </tr>
                                  <tr>
                                    <th>Created By</th>
                                    <td>{props.supplier.created_by}</td>
                                </tr>
                                  <tr>
                                    <th>Created At</th>
                                    <td>{props.supplier.created_at}</td>
                                </tr>
                                <tr>
                                    <th>Updated At</th>
                                    <td>{props.supplier.updated_at}</td>
                                </tr>

                                <tr>
                                    <th>Address</th>
                                    <td>
                                        {
                                            `${props.supplier.address?.address},
                                             ${props.supplier.address?.landmark},
                                             ${props.supplier.address?.area},
                                             ${props.supplier.address?.district}, 
                                             ${props.supplier.address?.division}`
                                        }
                                    </td>
                                </tr>

                                <tr>
                                    <th>Photo</th>
                                    <td><img src={props.supplier.logo} className={'img-thumbnail'} alt={'Photo'} /></td>
                                </tr>
                            </tbody>
                            
                        </table>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SupplierDetails;