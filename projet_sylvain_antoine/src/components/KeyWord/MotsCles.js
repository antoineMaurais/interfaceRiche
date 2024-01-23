import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MotsCles({ keywords, currentTime }) {
  const filterKeywordsByTime = (keywords, currentTime) => {
    return  keywords
    .filter((keywordGroup) => keywordGroup.pos <= currentTime)
    .slice(-1);
  };

  const filteredKeywords = filterKeywordsByTime(keywords, currentTime);

  return (
    <div>
        <Row>
            <Col>Mots-clés</Col>
            {filteredKeywords.map((keywordGroup, index) => (
            <Col key={index}>
            <h4>Position: {keywordGroup.pos}</h4>
            <ul>
                {keywordGroup.data.map((item, idx) => (
                <li key={idx}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                    </a>
                </li>
                ))}
            </ul>
            </Col>
      ))}
        </Row>
      
    </div>
  );
}

export default MotsCles;
