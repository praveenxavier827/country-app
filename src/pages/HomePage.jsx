import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './HomePage.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../features/countries/countriesSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: countries, status } = useSelector((state) => state.countries);

  const [visible, setVisible] = useState(6);
  const [continent, setContinent] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const sliderImages = [
    'https://picsum.photos/800/300?random=1',
    'https://picsum.photos/800/300?random=2',
    'https://picsum.photos/800/300?random=3',
  ];

  const toggleMenu = () => setShowMenu(!showMenu);
  const handleFilter = (c) => {
    setContinent(c);
    setShowMenu(false);
  };
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCountries());
    }
  }, [dispatch, status]);

  const filtered = continent === 'All'
    ? countries
    : countries.filter((country) => country.region === continent);

  return (
    <Container className="home-container">
      {/* Header */}
      <div className="home-header d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-bold">Countries</h5>

        <div className="filter-dropdown d-md-none">
          <button className="menu-toggle" onClick={toggleMenu}>☰</button>
          {showMenu && (
            <div className="dropdown-menu-custom">
              {['All', 'Asia', 'Europe'].map(c => (
                <div
                  key={c}
                  className={`dropdown-item-custom ${continent === c ? 'active' : ''}`}
                  onClick={() => handleFilter(c)}
                >
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="filter-tabs d-none d-md-flex">
          {['All', 'Asia', 'Europe'].map(c => (
            <span
              key={c}
              className={`tab ${continent === c ? 'active' : ''}`}
              onClick={() => setContinent(c)}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Welcome Title */}
      <div className="welcome-title">
        <div className="line line-left" />
        <h2>WELCOME</h2>
        <div className="line line-right" />
      </div>

      {/* Slider */}
      <Row className="mb-4 align-items-stretch flex-column-reverse flex-md-row">
        <Col xs={12} md={8}>
          <div className="slider-wrapper position-relative">
            <img src={sliderImages[currentSlide]} alt="Slide" className="slider-img" />
            <button className="slider-btn prev" onClick={prevSlide}><FaArrowLeft /></button>
            <button className="slider-btn next" onClick={nextSlide}><FaArrowRight /></button>
            <div className="slider-dots">
              {sliderImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${currentSlide === idx ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                />
              ))}
            </div>
          </div>
        </Col>
        {/* Side Image */}
        <Col xs={12} md={4}>
          <div className="side-image-wrapper">
            <img
              src="https://picsum.photos/400/300?grayscale"
              alt="Side"
              className="side-image"
            />
          </div>
        </Col>
      </Row>

      {/* Countries Listing */}
      <Row>
        {filtered.slice(0, visible).map((country, index) => (
          <Col md={6} key={index} className="mb-3">
            <div className="country-card d-flex">
              <img src={country.flag} alt={country.name} className="flag-img" />
              <div className="country-info">
                <h6>{country.name}</h6>
                <p>{country.region}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Load More */}
      {visible < filtered.length && (
        <div className="text-center mt-3">
          <Button variant="dark" onClick={() => setVisible(visible + 4)}>Load more</Button>
        </div>
      )}

      {/* Footer */}
      <div className="footer-section text-center mt-5">
        <div className="social-icons mb-3">
          <span className="icon"><i className="fab fa-facebook-f"></i></span>
          <span className="icon"><i className="fab fa-twitter"></i></span>
          <span className="icon"><i className="fab fa-linkedin-in"></i></span>
          <span className="icon"><i className="fab fa-youtube"></i></span>
        </div>
        <p className="email">Example@email.com</p>
        <p className="copyright">Copyright © 2020 Name. All rights reserved.</p>
      </div>
    </Container>
  );
};

export default HomePage;
