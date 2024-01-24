import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function formatTime(timestamp) {
  const hours = Math.floor(timestamp / 3600);
  const minutes = Math.floor((timestamp % 3600) / 60);
  const seconds = timestamp % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function Chapitres({ chapters, onChapterClick }) {
  return (
    <div>
      <h4 style={{color: "red"}}>Chapitres</h4>
      <ListGroup>
        {chapters.map((chapter, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => onChapterClick(chapter.pos)}
          >
            <div>
              <strong>{chapter.title}</strong>
              <p>Temps: {formatTime(chapter.pos)}</p>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Chapitres;
