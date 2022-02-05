import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SettingsIcon from "@mui/icons-material/Settings";
// import Switch from "@mui/material/Switch";
import { TemplateTypes } from "types";

interface Column {
  id: "index" | "name" | "active" | "edit";
  label: string | JSX.Element;
  minWidth: number;
}

const columns: readonly Column[] = [
  { id: "index", label: "序號", minWidth: 1 },
  { id: "name", label: "模板名稱", minWidth: 5 },
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

const createData = (index: number, data: TemplateTypes) => {
  return {
    index: index,
    name: data.name,
    active: data.active,
    id: data.id,
  };
};

type Props = {
  templates: TemplateTypes[];
  pushPage: (id: string | number) => void;
};
export const StickyHeadTable = ({
  templates,
  pushPage,
}: Props): JSX.Element => {
  if (!templates) return <></>;

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = templates.map((item, index) => createData(index + 1, item));

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
                            {/* <button
                              type="button"
                              onClick={() => console.log(row.orderNo)}
                            >
                              <Switch defaultChecked={row.active} />
                            </button> */}
                            {row.active && (
                              <span className="text-green-400">啟用中</span>
                            )}
                            {!row.active && (
                              <span className="text-red-400">已關閉</span>
                            )}
                          </TableCell>
                        );

                      if (column.id === "edit")
                        return (
                          <TableCell key={column.id} align="center">
                            <button
                              type="button"
                              className="underline"
                              onClick={() => pushPage(row.id)}
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
