import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {MDBCard, MDBCardBody, MDBCardHeader} from "mdb-react-ui-kit";

function formatTime(timestamp) {
  const hours = Math.floor(timestamp / 3600);
  const minutes = Math.floor((timestamp % 3600) / 60);
  const seconds = timestamp % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function Chapitres({ chapters, onChapterClick }) {
  return (
    <div>
      {/*<ListGroup>*/}
      {/*  {chapters.map((chapter, index) => (*/}
      {/*    <ListGroup.Item*/}
      {/*      key={index}*/}
      {/*      action*/}
      {/*      onClick={() => onChapterClick(chapter.pos)}*/}
      {/*    >*/}
      {/*      <div>*/}
      {/*        <strong>{chapter.title}</strong>*/}
      {/*        <p>Temps: {formatTime(chapter.pos)}</p>*/}
      {/*      </div>*/}
      {/*    </ListGroup.Item>*/}
      {/*  ))}*/}
      {/*</ListGroup>*/}
        <MDBCard id="chat2" style={{ height: "90vh", borderRadius: "15px" }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                <h5 className="mb-0">Chapitres</h5>
            </MDBCardHeader>
            <MDBCardBody style={{ maxHeight: "80vh", overflowY: "auto" }}>
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
            </MDBCardBody>
        </MDBCard>
    </div>
  );
}

export default Chapitres;
