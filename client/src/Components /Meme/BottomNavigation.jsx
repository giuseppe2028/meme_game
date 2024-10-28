import {Button, Col} from "react-bootstrap";




export function BottomNavigation(props){
const handleOnClick = ()=>{
    props.nextMeme();
    props.setButtonDisable(true);
    props.setRunning(false)
}
    return(
        <>
            <Col className="d-flex justify-content-between">

                {
                    props.isLast ?
                        <Button onClick={()=>handleOnClick()} variant="primary" size="lg" disabled = {props.selected || props.buttonDisabled}>Finish</Button> :
                        <Button onClick={()=>handleOnClick()} variant="primary" size="lg" disabled = {props.selected || props.buttonDisabled} >Next</Button>
                }

            </Col>
        </>
    );
}

