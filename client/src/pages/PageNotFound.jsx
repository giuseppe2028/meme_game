export function PageNotFound(){
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1>Oops!</h1>
            <img src="/404_img.jpg" width={500} height={400} alt="page 404"/>
        </div>
    );
}