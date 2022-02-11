import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";
import { OrderListTypes } from "types";

interface Column {
  id:
    | "index"
    | "createdAt"
    | "orderNo"
    | "contact"
    | "mobile"
    | "active"
    | "edit";
  label: string | JSX.Element;
  minWidth: number;
}

const columns: readonly Column[] = [
  { id: "index", label: "序號", minWidth: 1 },
  { id: "orderNo", label: "訂單編號", minWidth: 3 },
  {
    id: "contact",
    label: "聯絡人",
    minWidth: 2,
  },
  {
    id: "mobile",
    label: "聯絡人手機",
    minWidth: 3,
  },
  {
    id: "createdAt",
    label: "創建日期",
    minWidth: 3,
  },
  {
    id: "active",
    label: "啟用狀態",
    minWidth: 1,
  },
  {
    id: "edit",
    label: (
      <span>
        <SettingsIcon />
      </span>
    ),
    minWidth: 1,
  },
];

type DataType = {
  index: number;
  orderId: number;
  orderNo: string;
  contact: string;
  mobile: string;
  createdAt: string;
  active: boolean;
  edit: number;
};
const createData = (index: number, data: OrderListTypes): DataType => {
  return {
    index: index,
    orderId: data.orderId,
    orderNo: data.orderNo.substring(
      0,
      data.orderNo.includes("?")
        ? data.orderNo.indexOf("?")
        : data.orderNo.length
    ),
    contact: data.contact,
    mobile: data.mobile,
    createdAt: new Date(data.createdAt).toLocaleDateString(),
    active: data.active,
    edit: data.orderId,
  };
};

type Props = {
  orders: OrderListTypes[];
  pushPage: (id: string | number) => void;
  changeStatus: (id: number, isOpen: boolean, orderNo: string) => void;
};
export const StickyHeadTable = ({
  orders,
  pushPage,
  changeStatus,
}: Props): JSX.Element => {
  if (!orders) return <></>;

  const [page, setPage] = useState(0);

  const [rows, setRows] = useState<DataType[]>(
    orders.map((item, index) => createData(index + 1, item))
  );

  useEffect(() => {
    setRows(orders.map((item, index) => createData(index + 1, item)));
  }, [orders]);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={`table-head-${index}`}
                  align="center"
                  style={{ minWidth: column.minWidth, maxWidth: 300 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      if (column.id === "active")
                        return (
                          <TableCell key={column.id} align="center">
                            <button
                              type="button"
                              onClick={() =>
                                changeStatus(
                                  row.orderId,
                                  !row.active,
                                  row.orderNo
                                )
                              }
                            >
                              <Switch checked={row.active} />
                            </button>
                          </TableCell>
                        );

                      if (column.id === "edit")
                        return (
                          <TableCell key={column.id} align="center">
                            <button
                              type="button"
                              className="underline"
                              onClick={() => pushPage(row.orderId)}
                            >
                              編輯
                            </button>
                          </TableCell>
                        );

                      return (
                        <TableCell key={column.id} align="center">
                          <p className=" max-w-48 truncate mx-auto">{value}</p>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="顯示行數"
      />
    </div>
  );
};
