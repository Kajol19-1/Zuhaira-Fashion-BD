import React from 'react';

const Footer = () => {
    return (  
  <footer class="py-1 bg-theme mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <small class="text-silver">Copyright &copy; Zuhaira Fashion BD {new Date().getFullYear()} | Version: 0.1.0 Beta</small>
                            <div>
                              
                                <small class="text-silver">Design & Developed By <a className={'text-white'} href="https://kajol.99bd@gmail.com">Kajol</a></small>
                            </div>
                        </div>
                    </div>
                </footer>

     );
};

export default Footer;