import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {ButtonMemeGroup} from "./ButtonMemeGroup.jsx";

export function MemeContent(props) {

    const descriptions = props.memeElement.descriptions;

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <img height={350} width={350} src={"http://localhost:3006/" + props.memeElement.name} className="img-fluid" alt="meme" />
                </Col>
                <Col md={9}>
                    <ButtonMemeGroup buttonDisable = {props.buttonDisable} descriptions = {descriptions} updateResponse = {props.updateResponse} indexMeme = {props.indexMeme} setSelected={props.setSelected}/>
                </Col>
            </Row>

        </Container>
    );
}