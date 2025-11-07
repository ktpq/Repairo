import Swal from "sweetalert2";

export const alertSuccess = (text:string) => {
    return Swal.fire({
            title: `${text}`,
            icon: "success"
        });
}

export const alertFailed = (text:string) => {
    return Swal.fire({
                title: `${text}`,
                icon: "error"
            });
}

export const alertChoice = (text:string) => {
   return  Swal.fire({
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
            });
        }
        });
}