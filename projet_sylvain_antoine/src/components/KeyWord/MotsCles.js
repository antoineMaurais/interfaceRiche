import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function MotsCles({ keywords, currentTime }) {
  const filterKeywordsByTime = (keywords, currentTime) => {
    return keywords
      .filter((keywordGroup) => keywordGroup.pos <= currentTime)
      .slice(-1);
  };

  const filteredKeywords = filterKeywordsByTime(keywords, currentTime);

  return (
    <div className="centered-container">
      <Row className="keywords-container">
        <Col md={{ span: 2, offset: 3 }}><h4 style={{color: "red"}}>Mots-clés : </h4></Col>
        {filteredKeywords.map((keywordGroup, index) => (
          <Col key={index} className="keyword-group">
            {keywordGroup.data.map((item, idx) => (
              <Button
              style={{ margin: '5px' }}
                key={idx}
                variant="outline-danger"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </Button>
            ))}
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MotsCles;
