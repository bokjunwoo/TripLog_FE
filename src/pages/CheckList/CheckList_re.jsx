import {
  Container,
  Accordion,
  Button,
  Row,
  InputGroup,
  Form,
  Col,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  FaArrowAltCircleRight,
  FaArrowRight,
  FaRegArrowAltCircleRight,
  FaTrash,
} from 'react-icons/fa';
// 리듀서
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

export default function CheckList() {
  const dispatch = useDispatch();
  const nickName = useSelector((state) => state.users.userNickName);
  const check = useSelector((state) => state.check);

  const inputRef = useRef();
  const [checked, setChecked] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [okay, setOkay] = useState(false);
  const [update, setUpdate] = useState(false);
  const [text, setText] = useState('');

  const callApi = async () => {
    axios
      .post('http://13.125.234.1:4000/checklist', { nickName })

      .then((res) => {
        console.log(res.data);
        setChecklist(res.data);
        setChecked(res.data.checked);
        setOkay(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    callApi();
  }, [update]);

  const handleToggle = (b) => () => {
    // console.log(b);
    const currentIndex = checked.indexOf(b);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(b);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  /* 추가 인풋 */
  let input = '';
  const changeHandler = (e) => {
    // console.log(e.target.value);
    // input = e.target.value;
    setText(e.target.value);
  };

  if (okay) {
    return (
      <>
        <Container className="m-auto mt-5 col-9">
          <h1
            className="fw-bold lh-base mt-2 mb-4 m-auto"
            style={{ width: '100%' }}
          >
            <span style={{ color: '#198754' }}>{nickName}</span>
            <span>님의</span>
            <br></br>
            <span>체크리스트📝 입니다.</span>
          </h1>
          <AccordionCustom>
            <Accordion defaultActiveKey={[0]} alwaysOpen className="container">
              {checklist.items.map(function (a, i) {
                return (
                  <>
                    <Accordion.Item eventKey={i}>
                      <Accordion.Header>
                        {checklist.items[i].title}
                      </Accordion.Header>
                      <Accordion.Body className="text-start">
                        <Form>
                          {checklist.items[i].content.map(function (b, j) {
                            return (
                              <>
                                <Form.Check type="checkbox">
                                  <Form.Check.Input
                                    type="checkbox"
                                    onClick={handleToggle(b)}
                                    checked={checked.indexOf(b) !== -1}
                                  />
                                  <Form.Check.Label className="col-10">
                                    {checklist.items[i].content[j]}
                                  </Form.Check.Label>
                                  <FaTrash
                                    className="col-2"
                                    style={{ color: 'grey' }}
                                    onClick={() => {
                                      axios
                                        .delete(
                                          'http://13.125.234.1:4000/checklist/deleteItem',
                                          {
                                            data: {
                                              nickName: nickName,
                                              title: checklist.items[i].title,
                                              item: checklist.items[i].content[
                                                j
                                              ],
                                            },
                                          }
                                        )
                                        .then((res) => {
                                          console.log(res.data);
                                          setUpdate(!update);
                                        })
                                        .catch(() => {
                                          console.log('실패');
                                        });
                                    }}
                                  />
                                </Form.Check>
                              </>
                            );
                          })}
                          <InputGroup className="mt-3">
                            <Form.Control
                              placeholder="아이템 추가하기🤗"
                              // aria-label="Recipient's username"
                              // aria-describedby="basic-addon2"
                              onChange={(e) => changeHandler(e)}
                              value={text}
                            />
                            <Button
                              variant="success"
                              id="button-addon2"
                              onClick={() => {
                                axios
                                  .post(
                                    'http://13.125.234.1:4000/checklist/addItem',
                                    {
                                      nickName: nickName,
                                      title: checklist.items[i].title,
                                      item: text,
                                    }
                                  )
                                  .then((res) => {
                                    console.log(res.data);
                                    setText('');
                                    setUpdate(!update);
                                  })
                                  .catch(() => {
                                    console.log('실패');
                                  });
                              }}
                            >
                              추가
                            </Button>
                          </InputGroup>
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                  </>
                );
              })}
              <Row className="mt-3 mx-1">
                <Col>
                  <h5 calssName="fw-bold text-center">
                    체크리스트 저장하기{' '}
                    <FaArrowRight style={{ color: '#198754' }} />
                  </h5>
                </Col>
                <Col className="text-end">
                  <Button
                    variant="success"
                    onClick={() => {
                      axios
                        .post('http://13.125.234.1:4000/checklist/checked', {
                          nickName: nickName,
                          checked: checked,
                        })
                        .then((res) => {
                          console.log(res.data);
                          setUpdate(!update);
                        })
                        .catch(() => console.log('실패'));
                    }}
                  >
                    저장
                  </Button>
                </Col>
              </Row>
            </Accordion>
          </AccordionCustom>
        </Container>
      </>
    );
  }
}

const AccordionCustom = styled.div`
  .accordion-button:not(.collapsed) {
    color: #ffffff;
    background-color: #198754;
    box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
  }
  .accordion-button:focus,
  .accordion-button:active {
    outline: none !important;
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
  }
  input[type='checkbox']:checked {
    background: #198754;
    border-color: #198754;
  }
`;