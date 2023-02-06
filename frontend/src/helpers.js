export const revisarPresupuesto = (total) => {
    let clase;

    if(total < 0) {
        clase = "alert alert-danger";
    }else {
        clase = "alert alert-success";
    }

    return clase;
}