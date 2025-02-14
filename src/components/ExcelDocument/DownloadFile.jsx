import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import styles from "../../common/styles/upfile.css";
import * as XLSX from "xlsx";
const DownloadFile = ({keys, name}) => {
  
  const downloadFile = async (e) => {
    const dataSV = [
      [],
      [],
      [],
      [],
      [],
      ['STT', 'Họ tên', 'MSSV', 'Khóa nhập học', 'Trạng thái', 'Ngành', 'Email', 'Bổ sung'],
    ];
    const dataBS = [
      [],
      ['STT', 'Nhóm ngành', 'Tên Doanh nghiệp', 'Địa chỉ doanh nghiệp', 'Vị trí tuyển dụng', 'Số lượng', 'Mô tả', 'Yêu cầu ứng viên', 'Mã ứng tuyển'],
    ];
    const worksheetSV = XLSX.utils.aoa_to_sheet(dataSV);
    const worksheetBS = XLSX.utils.aoa_to_sheet(dataBS);
    const workbook = {
      SheetNames: ['Sheet1'],
      Sheets: {
        Sheet1: keys && keys === 'status' ? worksheetSV : worksheetBS,
      }
    };
    return XLSX.writeFile(workbook, 'sheet_example.xlsx');
  }
  return (
    <>
      <div className={styles.header}>
        <Button onClick={downloadFile} style={{ width: "95%" }}>
          <label htmlFor="down-file">
              <div className={styles.buttonUpfile}>
                <DownloadOutlined   className={styles.icon} /> Tải file excel {name}
              </div>
          </label>
        </Button>
      </div>
    </>
  )
}

export default DownloadFile
