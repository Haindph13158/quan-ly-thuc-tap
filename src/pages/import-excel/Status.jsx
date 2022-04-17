import React, { useState, useEffect } from "react";
import { EyeOutlined } from "@ant-design/icons";
import "../../common/styles/status.css";
import { Select, Input, Table, Button, Row, Col, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getStudent } from "../../features/StudentSlice/StudentSlice";
import {
  updateReviewerListStudent,
  updateStatusListStudent,
} from "../../features/reviewerStudent/reviewerSlice";
import { Link, useNavigate } from "react-router-dom";

import { filterBranch, filterStatuss } from "../../ultis/selectOption";
import { omit } from "lodash";
import UpFile from "./UpFile";
const { Column, ColumnGroup } = Table;

const { Option } = Select;

const Status = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { infoUser } = useSelector((state) => state.auth);
  const {
    listStudent: { list, total },
    loading,
  } = useSelector((state) => state.students);
  const [chooseIdStudent, setChooseIdStudent] = useState([]);
  const [listIdStudent, setListIdStudent] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    limit: 20,
    campus_id: infoUser.manager.campus_id,
  });
  const [filter, setFiler] = useState({});
  useEffect(() => {
    dispatch(getStudent(page));
  }, [page]);
  const columns = [
    {
      title: "MSSV",
      dataIndex: "mssv",
      width: 100,
      fixed: "left",
    },
    {
      title: "Họ và Tên",
      dataIndex: "name",
      width: 150,
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Điện thoại",
      dataIndex: "phoneNumber",
      width: 160,
    },
    {
      title: "Ngành",
      dataIndex: "majors",
      width: 100,
    },
    {
      title: "Phân loại",
      dataIndex: "support",
      width: 90,
      render: (val) => {
        if (val === 1) {
          return "Hỗ trợ";
        } else if (val === 0) {
          return "Tự tìm";
        } else {
          return "";
        }
      },
    },
    {
      title: "CV",
      dataIndex: "CV",
      width: 50,
      render: (val) =>
        val ? (
          <EyeOutlined className="icon-cv" onClick={() => window.open(val)} />
        ) : (
          ""
        ),
    },
    {
      title: "Người review",
      dataIndex: "reviewer",
      width: 230,
    },
    {
      title: "Trạng thái",
      dataIndex: "statusCheck",
      render: (status) => {
        if (status === 0) {
          return (
            <span className="status-fail" style={{ color: "orange" }}>
              Chờ kiểm tra
            </span>
          );
        } else if (status === 1) {
          return (
            <span className="status-up" style={{ color: "grey" }}>
              Sửa lại CV
            </span>
          );
        } else if (status === 2) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Nhận CV
            </span>
          );
        } else if (status === 3) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Trượt
            </span>
          );
        } else if (status === 4) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Đã nộp biên bản <br />
            </span>
          );
        } else if (status === 5) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Sửa biên bản <br />
            </span>
          );
        } else if (status === 6) {
          return (
            <span className="status-fail" style={{ color: 'red' }}>
              Đang thực tập <br />
            </span>
          );
        } else if (status === 7) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Đã nộp báo cáo <br />
            </span>
          );
        } else if (status === 8) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Sửa báo cáo <br />
            </span>
          );
        } else if (status === 9) {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Hoàn thành <br />
            </span>
          );
        } else {
          return (
            <span className="status-fail" style={{ color: "red" }}>
              Chưa đăng ký
            </span>
          );
        }
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setListIdStudent(selectedRowKeys);
      setChooseIdStudent(selectedRows);
    },
  };

  const handleStandardTableChange = (key, value) => {
    const newValue =
      value.length > 0 || value > 0
        ? {
          ...filter,
          [key]: value,
        }
        : omit(filter, [key]);
    setFiler(newValue);
  };
  const handleSearch = () => {
    const data = {
      ...page,
      ...filter,
    };
    dispatch(getStudent(data));
  };

  const comfirm = () => {
    dispatch(
      updateReviewerListStudent({
        listIdStudent: listIdStudent,
        email: infoUser?.manager?.email,
      })
    );
    alert("Thêm thành công ");
    navigate("/review-cv");
  };


  return (
    <div className="status">
      <div className="flex-header">
        {
          window.innerWidth < 739 ?
            <h4 style={{ fontSize: ".9rem" }}>Sinh viên đăng ký thực tập</h4>
            : <>
              <h4>Sinh viên đăng ký thực tập</h4>
              <UpFile />
            </>
        }
      </div>
      <div className="filter" style={{ marginTop: "20px" }}>
        {
          window.innerWidth < 739 &&
          <UpFile style={{ fontSize: ".9rem" }} />
        }
        <br />
        <Row>
          <Col xs={24} sm={4} md={12} lg={8} xl={8} style={{ padding: "0 10px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ width: "40%" }}>Ngành: </span>
              <Select
                style={{ width: "100%" }}
                onChange={(val) => handleStandardTableChange("majors", val)}
                placeholder="Lọc theo ngành"
              >
                {filterBranch.map((item, index) => (
                  <>
                    <Option value={item.value} key={index}>
                      {item.title}
                    </Option>
                  </>
                ))}
              </Select>
            </div>
          </Col>
          <br />
          <br />
          <Col xs={24} sm={4} md={12} lg={8} xl={8} style={{ padding: "0 10px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{ width: "40%" }}
              >
                Trạng thái:
              </span>
              <Select
                className="filter-status"
                style={{ width: "100%" }}
                onChange={(val) => handleStandardTableChange("statusCheck", val)}
                placeholder="Lọc theo trạng thái"
              >
                {filterStatuss.map((item, index) => (
                  <Option value={index} key={index}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
          <br />
          <br />
          <Col xs={24} sm={4} md={12} lg={8} xl={8} style={{ padding: "0 10px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{ width: "40%" }}
              >
                Tìm Kiếm:{" "}
              </span>
              <Input
                style={{ width: "100%" }}
                placeholder="Tìm kiếm theo tên"
                onChange={(val) =>
                  handleStandardTableChange("name", val.target.value)
                }
              />
            </div>

          </Col>
          <br />
          <br />
          <Col xs={24} sm={4} md={24} lg={24} xl={4} style={{ padding: "0 10px" }}>
            <Button style={{ marginTop: "10px", color: "#fff", background: "#ee4d2d" }} onClick={handleSearch}>Tìm kiếm</Button>

            {chooseIdStudent.length > 0 && (
              <Button style={{ marginTop: "10px", color: "#fff", background: "#ee4d2d" }} onClick={() => comfirm()}>Xác nhận</Button>
            )}
          </Col>

        </Row>
      </div>


      {
        window.innerWidth > 1024 ?
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            pagination={{
              pageSize: page.limit,
              total: total,
              onChange: (page, pageSize) => {
                setPage({
                  page: page,
                  limit: pageSize,
                  campus_id: infoUser.manager.cumpus,
                  ...filter,
                });
              },
            }}
            rowKey="_id"
            loading={loading}
            columns={columns}
            dataSource={list}
            scroll={{ x: "calc(700px + 50%)" }}
          />
          :
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            pagination={{
              pageSize: page.limit,
              total: total,
              onChange: (page, pageSize) => {
                setPage({
                  page: page,
                  limit: pageSize,
                  campus_id: infoUser.manager.cumpus,
                  ...filter,
                });
              },
            }}
            rowKey="_id"
            loading={loading}
            dataSource={list}
            expandable={{
              expandedRowRender: record =>
                <div style={{ marginTop: "10px" }}>
                  {
                    (window.innerWidth < 1023 && window.innerWidth > 739) ? "" : <><p className="list-detail">Email: {record.email}</p><br /></>
                  }
                  <p className="list-detail">Điện thoại: {record.phoneNumber}</p><br />
                  <p className="list-detail">Ngành: {record.majors}</p><br />
                  <p className="list-detail">Phân loại:
                    {record.support == 1 && "Hỗ trợ"}
                    {record.support == 0 && "Tự tìm"}
                    {(record.support !== 1 && record.support !== 0) && ""}
                  </p><br />
                  <p className="list-detail">CV: {record.CV ? <EyeOutlined style={{ fontSize: ".9rem" }} onClick={() => window.open(record.CV)} /> : ""}</p><br />
                  <p className="list-detail">Người review: {record.reviewer}</p><br />
                </div>
            }}
          >
            <Column title="Mssv" dataIndex="mssv" key="_id" />
            <Column title="Họ và Tên" dataIndex="name" key="_id" />
            {(window.innerWidth > 739 && window.innerWidth < 1023) && <Column title="Email" dataIndex="email" key="_id" />
            }
            <Column title="Trạng thái"
              dataIndex="statusCheck"
              key="_id"
              render={status => {
                if (status === 0) {
                  return (
                    <span className="status-fail" style={{ color: "orange" }}>
                      Chờ kiểm tra
                    </span>
                  );
                } else if (status === 1) {
                  return (
                    <span className="status-up" style={{ color: "grey" }}>
                      Sửa lại CV
                    </span>
                  );
                } else if (status === 2) {
                  return (
                    <span className="status-fail" style={{ color: "red" }}>
                      Nhận CV
                    </span>
                  );
                } else if (status === 3) {
                  return (
                    <span className="status-fail" style={{ color: "red" }}>
                      Trượt
                    </span>
                  );
                } else if (status === 4) {
                  return (
                    <span className="status-fail" style={{ color: "red" }}>
                      Đã nộp biên bản <br />
                    </span>
                  );
                } else if (status === 5) {
                  return (
                    <span className="status-fail" style={{ color: "red" }}>
                      Sửa biên bản <br />
                    </span>
                  );
                } else if (status === 6) {
                  return (
                    <span className="status-fail" style={{ color: 'red' }}>
                      Đang thực tập <br />
                    </span>
                  );
                } else if (status === 7) {
                  return (
                    <span className="status-fail" style={{ color: "red" }}>
                      Đã nộp báo cáo <br />
                    </span>
                  );
                } else if (status === 8) {
                  return (
                    <span className="status-fail" style={{ color: "red" }}>
                      Sửa báo cáo <br />
                    </span>
                  );
                } else if (status === 9) {
                  return (
                    <span className="status-fail" style={{ color: "red" }}>
                      Hoàn thành <br />
                    </span>
                  );
                } else {
                  return (
                    <span className="status-fail" style={{ color: "red" }}>
                      Chưa đăng ký
                    </span>
                  );
                }
              }} />
          </Table>
      }

    </div>
  );
};

export default Status;
