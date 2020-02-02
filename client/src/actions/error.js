import swal from 'sweetalert'
const handleError = (errMessage) => {
    swal("Error!", errMessage, "error")
}
export default handleError