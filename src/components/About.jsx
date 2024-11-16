import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'justify', // Updated alignment
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  profileImage: {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    borderRadius: '50%',
  },
};

function About({ header }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const parseIntro = (text) => <ReactMarkdown>{text}</ReactMarkdown>;

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => setData(res))
      .catch((err) => {
        console.error('Failed to fetch about data:', err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <Container>
        <Header title={header} />
        <p style={{ color: 'red', textAlign: 'center' }}>
          Unable to load data. Please try again later.
        </p>
      </Container>
    );
  }

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              <Row>
                <Col style={styles.introTextContainer}>
                  {data.about ? parseIntro(data.about) : <p>No description available.</p>}
                </Col>
                <Col style={styles.introImageContainer}>
                  {data.imageSource ? (
                    <img
                      src={data.imageSource}
                      alt="profile"
                      style={styles.profileImage}
                    />
                  ) : (
                    <p>No image available.</p>
                  )}
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
