import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (

        <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion bg-theme-basic" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">Core</div>
                            <Link class="nav-link" to="/">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </Link>
                            <div class="sb-sidenav-menu-heading">Product</div>
                            <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Products
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <Link class="nav-link" to="/product">Product List</Link>
                                    <Link class="nav-link" to="/product/create">Add Product</Link>
                                    <Link class="nav-link" to="/product/trash">Trash</Link>
                                </nav>
                            </div>
                            <div class="sb-sidenav-menu-heading">Management</div>
                            <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Category
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <Link class="nav-link" to="/category">Category List</Link>
                                    <Link class="nav-link" to="/category/create">Add Category</Link>
                                </nav>
                            </div>

                             <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#sub_category" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Sub Category
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="sub_category" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <Link class="nav-link" to="/sub-category">Sub Category List</Link>
                                    <Link class="nav-link" to="/sub-category/create">Sub Add Category</Link>
                                </nav>
                            </div>

                            
                             <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#brand" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Brand
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="brand" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <Link class="nav-link" to="/brand">Brand List</Link>
                                    <Link class="nav-link" to="/brand/create">Add Brand</Link>
                                </nav>
                            </div>

                              <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#supplier" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Supplier
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="supplier" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <Link class="nav-link" to="/supplier">Supplier List</Link>
                                    <Link class="nav-link" to="/supplier/create">Add Supplier</Link>
                                </nav>
                            </div>

                            <Link class="nav-link" to="product-attributes">
                                <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                                Product Attributes
                            </Link>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer text-silver">
                        <div class="small">Logged in as:</div>
                        {localStorage.name != undefined ? localStorage.name : null}
                    </div>
                </nav>
            </div>
     );
};

export default SideBar;