import {ButtonGroup, Col, Row, ToggleButton} from "react-bootstrap";
import React, {useEffect, useState} from "react";

export function ButtonMemeGroup(props){
    const [radioValue, setRadioValue] = useState('1');
    useEffect(()=>{
    setRadioValue('-1')
    },[props.indexMeme])
    return(
        <ButtonGroup toggle>
            <Row>
                {props.descriptions.map((element, idx) => (
                    <Col xs={12} md={6} key={idx} className="mb-2">
                        <ToggleButton
                            disabled={props.buttonDisable}
                            className={`MemeContainer ${radioValue === idx ? 'selected' : ''}`}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="outline-primary"
                            name="radio"
                            value={idx}
                            checked={radioValue === idx}
                            onChange={(e) =>
                            {
                                setRadioValue(Number(e.currentTarget.value))
                                props.updateResponse(props.indexMeme,element.description,assignScore(element))
                                props.setSelected(false)
                            }
                            }>
                            {element.description}
                        </ToggleButton>
                    </Col>
                ))}
            </Row>
        </ButtonGroup>
    )
}

const assignScore = (element)=>{
    if(element.correct){
        return 5;
    }else{
        return 0;
    }
}