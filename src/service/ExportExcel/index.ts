import * as Excel from 'exceljs';
import saveAs from 'file-saver';
import moment from 'moment';
import { Notify } from 'quasar';

const ExportExcel = async <T>(data: Array<T> | undefined) => {
  if (!data || data.length === 0) {
    Notify.create({
      type: 'negative',
      message: 'There was no data to export',
    });
    return;
  }

  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Raw Data');
  const columns = Object.keys(data[0]).map((key) => ({
    key,
    header: key,
  }));

  worksheet.columns = columns;

  data.forEach((item) => {
    worksheet.addRow(item);
  });

  workbook.xlsx
    .writeBuffer()
    .then((buffer) =>
      saveAs(
        new Blob([buffer]),
        `${moment().format('YYYYMMDDhhmmss')}_rawdata.xlsx`,
      ),
    )
    .then(() => {
      Notify.create({
        type: 'positive',
        message: 'Export excel success',
      });
    })
    .catch(() =>
      Notify.create({
        type: 'negative',
        message: 'Error writing excel export',
      }),
    );
};

export default ExportExcel;
