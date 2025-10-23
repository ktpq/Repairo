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