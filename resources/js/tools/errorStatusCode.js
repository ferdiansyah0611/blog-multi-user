const errorStatusCode = (e, closed) => {
    if (e.response.status == 401) {
        Swal.fire({
            title: 'Unauthorization',
            html: e.response.data.message,
            icon: 'error',
            timer: 3000,
            timerProgressBar: true,
            showCloseButton: true,
            focusConfirm: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
                $('.sidenav').sidenav('close');
            },
            willClose: () => {
                closed()
            }
        })
    }
    if (e.response.status == 500) {
        Swal.fire("Error", "Server Error", "error")
    }
}
export default errorStatusCode;