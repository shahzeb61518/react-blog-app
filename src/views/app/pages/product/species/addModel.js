import React, { useState } from 'react';
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from '../../../../../components/common/CustomSelectInput';
import axios from 'axios';

const AddNewModal = ({ modalOpen, toggleModal, fetchData }) => {
  const [name, setName] = useState('');
  const [nameS, setNameS] = useState('');
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const postData = async () => {
    setLoading(true);
    if (name === '' || nameS === '') {
      setWarning(true);
      setLoading(false);
      return;
    }
    axios({
      method: 'post',
      url: 'https://feedbackendfiver.herokuapp.com/api/v1/species/create',
      data: {
        name: name,
        scientific_name: nameS,
      },
    }).then((data) => {
      fetchData();
      setLoading(false);
      toggleModal();
    });
  };
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>Add Specie</ModalHeader>
      <ModalBody>
        {warning ? (
          <p style={{ color: 'red' }}>Both fields are required</p>
        ) : (
          ''
        )}
        <Label>Name</Label>
        <Input onChange={(e) => setName(e.target.value)} />

        <Label className="mt-4">Scientific Name</Label>
        <Input onChange={(e) => setNameS(e.target.value)} />
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          outline
          onClick={toggleModal}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button color="primary" onClick={() => postData()} disabled={loading}>
          Add Specie
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
