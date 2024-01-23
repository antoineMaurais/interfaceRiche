// Chapitres.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function formatTime(timestamp) {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp % 3600) / 60);
    const seconds = timestamp % 60;
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

function Chapitres({ chapters, onChapterClick }) {
  const chapitresPerRow = 6;

  const renderChapitres = () => {
    const rows = Math.ceil(chapters.length / chapitresPerRow);

    return Array.from({ length: rows }, (_, rowIndex) => (
      <Row key={rowIndex} className="chapitres-row">
        {chapters.slice(rowIndex * chapitresPerRow, (rowIndex + 1) * chapitresPerRow).map((chapter, colIndex) => (
          <Col key={colIndex} md={12 / chapitresPerRow}>
            <Card onClick={() => onChapterClick(chapter.pos)}>
              <Card.Body>
                <Card.Title>{chapter.title}</Card.Title>
                <Card.Text>Temps: {formatTime(chapter.pos)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    ));
  };

  return (
    <div>
      <h3>Chapitres</h3>
      <div className="chapitres-container">
        {renderChapitres()}
      </div>
    </div>
  );
}

export default Chapitres;
