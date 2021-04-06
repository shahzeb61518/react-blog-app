/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Row } from 'reactstrap';
import Select from 'react-select';
import IntlMessages from '../../helpers/IntlMessages';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import { Colxx } from '../../components/common/CustomBootstrap';

const selectData = [
  { label: 'Cake', value: 'cake', key: 0 },
  { label: 'Cupcake', value: 'cupcake', key: 1 },
  { label: 'Dessert', value: 'dessert', key: 2 },
];

const ReactSelectExample = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <Row>
      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Profile created for </p>
        <p className="mb-3">My Self</p>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Name </p>
        <p className="mb-3">Rajesh Kamat</p>
      </Colxx>

      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Body Type </p>
        <p className="mb-3">Average</p>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Age </p>
        <p className="mb-3"> 39 Years</p>
      </Colxx>

      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Physical Status </p>
        <p className="mb-3"> Normal</p>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Height </p>
        <p className="mb-3"> 5 Ft 4 In / 163 Cms</p>
      </Colxx>

      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Weight </p>
        <p className="mb-3"> 69 Kgs / 152 lbs</p>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Mother Tongue </p>
        <p className="mb-3"> Marathi</p>
      </Colxx>

      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Marital Status </p>
        <p className="mb-3"> Widowed</p>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">No.of Children </p>
        <p className="mb-3"> None</p>
      </Colxx>

      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Child Living Status </p>
        <p className="mb-3"> N/A</p>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Eating Habits </p>
        <p className="mb-3"> Non Vegetarian</p>
      </Colxx>

      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Drinking Habits </p>
        <p className="mb-3"> Never drinks</p>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <p className="text-muted text-small mb-2">Smoking Habits </p>
        <p className="mb-3"> Never smokes</p>
      </Colxx>
    </Row>
  );
};
export default ReactSelectExample;
