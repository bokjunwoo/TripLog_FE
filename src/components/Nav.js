import { useState } from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faFaceSmile,
  faArrowRightFromBracket,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import Logout from '../pages/Login/Logout';
import { logout } from '../store/modules/users';

export default function NavHeader() {
  const state = useSelector((state) => state.users);
  // console.log(state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const reduxLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Navbar expand="lg" className="shadow-sm">
        <Container className="text-center">
          <Navbar.Brand href="/" className="fw-bolder col-4">
            <img src="/images/tripLogLogo.png" style={{ width: '30px' }}></img>{' '}
            TripLog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '70px' }}
              navbarScroll
            >
              {/* <NavDropdown title="여행지" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">여행지</NavDropdown.Item>
                <NavDropdown.Item href="#action4">여행지</NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link href="/lists/seoul/sightseeing" className="ms-4">
                서울
              </Nav.Link>
              <Nav.Link href="/lists/busan/sightseeing" className="ms-4">
                부산
              </Nav.Link>
              <Nav.Link href="/lists/gangneung/sightseeing" className="ms-4">
                강원
              </Nav.Link>
              <Nav.Link href="/lists/gyeonju/sightseeing" className="ms-4">
                경주
              </Nav.Link>
              <Nav.Link href="/lists/junju/sightseeing" className="ms-4">
                전주
              </Nav.Link>
              <Nav.Link href="/lists/jeju/sightseeing" className="ms-4">
                제주
              </Nav.Link>
            </Nav>

            <Nav
              className="d-flex flex-sm-row justify-content-sm-center"
              style={{ fontSize: '20px' }}
            >
              <Nav.Link
                href="/Login"
                variant="outline-success"
                className="fs-5"
                style={{ marginRight: '10px' }}
              >
                {state.isLogin === false ? (
                  <FontAwesomeIcon icon={faUser} />
                ) : null}
              </Nav.Link>

              <Nav.Link
                variant="outline-success"
                className="fs-5"
                style={{ marginRight: '10px' }}
              >
                {state.isLogin === true ? (
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    onClick={() => {
                      reduxLogout();
                    }}
                  />
                ) : null}
              </Nav.Link>
              <Nav.Link
                href="/MyPage"
                className="d-sm-none d-md-inline-block text-success"
              >
                {state.isLogin === true ? (
                  <FontAwesomeIcon icon={faCircleUser} />
                ) : null}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
