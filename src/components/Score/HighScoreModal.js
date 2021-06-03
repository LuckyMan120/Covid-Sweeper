import React, { useState } from 'react';
import history from '../../history';
import { addScore } from '../../actions/scoring';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

export const HighScoreModal = ({ score, toggle, modal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');

  async function submitScore(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await addScore({ username: username, score: score });
      history.push('/scores');
      toggle();
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  const onChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        style={modalStyle}
        size='lg'
        backdrop={'static'}
      >
        <ModalHeader style={modalHeader}>
          <h2>High Score!!</h2>
        </ModalHeader>
        <ModalBody style={modalBody}>
          <Form style={formStyle} onSubmit={submitScore}>
            <FormGroup style={{ margin: 'auto' }}>
              <Input
                type='text'
                name='username'
                id='username'
                placeholder='Enter Username...'
                maxLength='12'
                style={inputStyle}
                onChange={(e) => onChangeHandler(e)}
              />
            </FormGroup>
            <Button
              type='submit'
              loading={isLoading}
              style={buttonStyle}
              color='primary'
            >
              Submit Score!
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const modalStyle = {
  width: '36rem',
};

const buttonStyle = {
  width: '28.1rem',
  height: '3.5rem',
  margin: '1rem auto',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  borderRadius: '1rem',
  backgroundColor: '#0e1a49',
};

const modalBody = {
  display: 'flex',
  justifyContent: 'flex-start',
};

const modalHeader = {
  display: 'flex',
  justifyContent: 'center',
  padding: '0 2rem',
  borderRadius: '1rem',
};

const formStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignContent: 'center',
  padding: '1.8rem',
};

const inputStyle = {
  width: '28rem',
  height: '3rem',
  borderRadius: '0.5rem',
  fontSize: '1.3rem',
  marginBottom: '0.5rem',
};

export default HighScoreModal;
