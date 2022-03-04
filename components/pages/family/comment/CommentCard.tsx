import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
// import Switch from "@mui/material/Switch";
import { TemplateTypes } from "types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { MessageTypes } from "types";
import { DateStringFormat } from "functions";

type Props = {
  messages: MessageTypes[];
  changeStatus: (id: number, e: boolean) => void;
};

export const CommentCard = ({ messages, changeStatus }: Props): JSX.Element => {
  if (!messages) return <></>;

  return (
    <>
      {messages.map((message, index) => (
        <div
          key={`message-${index}`}
          className="rounded-lg shadow-md mb-8 md:mb-4 break-after-avoid"
        >
          <div className="px-4 py-2 flex items-center justify-between bg-brown-cis text-white rounded-t-lg">
            <span>{message.author}</span>
            <button
              type="button"
              onClick={() => changeStatus(message.id, !message.public)}
            >
              <span>
                {message.public ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </button>
          </div>
          <div className="p-4 bg-brown-50 text-brown-cis rounded-b-lg">
            {message.content}
          </div>
        </div>
      ))}
    </>
  );
};

interface Column {
  id: "author" | "content" | "createdAt" | "public";
  label: string | JSX.Element;
  minWidth: number;
}

const columns: readonly Column[] = [
  {
    id: "createdAt",
    label: "日期",
    minWidth: 150,
  },
  { id: "author", label: "留言人", minWidth: 150 },
  {
    id: "content",
    label: "留言",
    minWidth: 300,
  },
  {
    id: "public",
    label: "顯示狀態",
    minWidth: 100,
  },
];

const createData = (index: number, data: MessageTypes) => {
  return {
    index: index,
    id: data.id,
    author: data.author,
    content: data.content,
    createdAt: DateStringFormat(data.createdAt),
    public: data.public,
  };
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(113 67 0)",
    color: theme.palette.common.white,
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const CommentTable = ({
  messages,
  changeStatus,
}: Props): JSX.Element => {
  if (!messages) return <></>;

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = messages.map((item, index) => createData(index + 1, item));

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
    <div className="bg-white">
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <StyledTableCell
                  key={`table-head-${index}`}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`message-${row.index}`}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];

                      if (column.id === "public")
                        return (
                          <TableCell key={column.id} align="center">
                            <button
                              type="button"
                              onClick={() => changeStatus(row.id, !row.public)}
                              style={{ minWidth: column.minWidth }}
                            >
                              <span>
                                {row.public ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </span>
                            </button>
                          </TableCell>
                        );

                      return (
                        <TableCell
                          key={column.id}
                          align="center"
                          style={{ minWidth: column.minWidth }}
                        >
                          <p
                            className={
                              column.id === "content"
                                ? "text-left"
                                : "text-center"
                            }
                          >
                            {value}
                          </p>
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
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
