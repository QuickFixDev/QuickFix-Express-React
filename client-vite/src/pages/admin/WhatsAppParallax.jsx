import { Container, Row, Col } from 'react-bootstrap';
import './WhatsAppParallax.css'; // Create a CSS file for styling

const WhatsAppParallax = () => {
    return (
        <Container fluid>
            <Row className="whatsapp-parallax-container">
                <Col xs={4} className="fixed-column">
                    <h1>Fixed Column</h1>
                    <p>This column will remain fixed.</p>
                </Col>
                <Col xs={8} className="scrolling-column">
                    <h1>Scrolling Column</h1>
                    <p>Scroll in this column to see the parallax effect similar to WhatsApp!</p>
                </Col>
            </Row>
        </Container>
    );
};

export default WhatsAppParallax;
