import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, DatePicker, Radio, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getListTime,
  upTimeDate,
} from "../../features/timeDateSlice/timeDateSlice";

const Formtimepicker = (props) => {
  const { RangePicker } = DatePicker;
  const { times } = useSelector((state) => state.time.formTime);
  console.log(times);
  const [value, setValue] = useState(1);
  const [date, setDate] = useState(new Date().getTime());
  const dispatch = useDispatch();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSetDatePicker = (date) => {
    setDate(date);
  };

  useEffect(() => {
    dispatch(getListTime());
  }, []);

  const onSaveTime = () => {
    const startTime = date[0]._d.getTime();
    const endTime = date[1]._d.getTime();
    const timeObject = {
      typeNumber: Number(value),
      startTime: startTime,
      endTime: endTime,
    };
    dispatch(upTimeDate(timeObject));
  };
  return (
    <div>
      <h3>Chọn thời gian hoạt động của form</h3>
      <Row>
        <Col xs={24} sm={16} md={16} lg={16} xl={12}>
          <Radio.Group onChange={onChange} value={value}>
            {times?.length > 0 && times.map((item) => (
              <Radio value={item.typeNumber} key={item._id}>{item.typeName}</Radio>
            ))}
            
          </Radio.Group>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={12}>
        <RangePicker
            onChange={onSetDatePicker}
            renderExtraFooter={() => "extra footer"}
            showTime
            style={{marginTop:10}}
          />
          <Button style={{marginTop:10}} onClick={onSaveTime} type="primary">
            Đặt thời gian
          </Button>
        </Col>
      </Row>
    </div>
  );
};

Formtimepicker.propTypes = {};

export default Formtimepicker;
