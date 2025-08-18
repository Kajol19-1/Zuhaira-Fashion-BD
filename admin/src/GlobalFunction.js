const GlobalFunction ={
    logOut(){
                localStorage.removeItem('email')
                localStorage.removeItem('name')
                localStorage.removeItem('phone')
                localStorage.removeItem('photo')
                localStorage.removeItem('token')
    }
}
export default GlobalFunction