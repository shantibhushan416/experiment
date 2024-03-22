import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { deleteCoursebyId, getCourse } from "./service";
import "./DataTable.css";

export default function DataTableBase({ clicked }) {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([])
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(10);
    const [action] = useState({ fromUser: false }); //this is a way to have an instant-changing state
    const [rowsPerPage, setRowsPerPage] = useState(4); //change to 10 after you remove paginationRowsPerPageOptions
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRowsPerPage, setSelectedRowsPerPage] = useState([]);

    const fetchUsers = async (currentPage, rowsPerPage) => {
        setLoading(true);
        const response = await getCourse(currentPage, rowsPerPage)
        setData(response.queryCourses);
        setFilter(response.queryCourses)
        setTotalRows(response.total);
        setLoading(false);
    };

    const handlePageChange = (currentPage) => {
        fetchUsers(currentPage, rowsPerPage);
        setCurrentPage(currentPage);
    };

    const handleRowsPerPageChange = async (newRows) => {
        if (!data.length) return; //when the table is rendered for the first time, this would trigger, and we don't need to call fetchUsers again
        fetchUsers(1, newRows);
        setRowsPerPage(newRows);
        setCurrentPage(1);
        setSelectedRowsPerPage([]);
    };
    useEffect(() => {
        const result = data.filter((item) => { return item.course.toLowerCase().match(search.toLowerCase()) || item.author.toLowerCase().match(search.toLowerCase()) || item.branch?.name.toLowerCase().match(search.toLowerCase()) });
        setFilter(result);
    }, [search])



    //this applies the selected rows on the page renders, it checks if the id of the row exists in the array
    const handleApplySelectedRows = (row) =>
        selectedRowsPerPage[currentPage]?.filter(
            (selectedRow) => selectedRow.id === row.id
        ).length > 0;


    {/* ------------------------------------------- Deleting Course Api ------------------------------- */ }

    const onDeleting = async (id) => {
        const response = await deleteCoursebyId(id);
        if (response) {
            window.location.reload(true);
        }
    };


    const columns = [
        {
            name: "Avatar",
            cell: (row) => (
                <img
                    height="30px"
                    width="30px"
                    alt={row.first_name}
                    src={row.avatar}
                />
            )
        },
        {
            name: "Course",
            selector: (row) => row.course,
            sortable: true

        },
        {
            name: "Author",
            cell: (row) => row.author,
            sortable: true
        },
        {
            name: "Branch",
            selector: (row) => row.branch?.name,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => (<><button onClick={() => onDeleting(row._id)}>Delete</button>&nbsp;&nbsp;&nbsp;<button onClick={() => clicked(row._id)}>Edit</button></>)
        }
    ]



    return (
        <div className="dataTables_wrapper" >

            <DataTable
                pagination
                paginationServer
                selectableRows
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                columns={columns}
                data={filter}
                progressPending={loading}
                paginationTotalRows={totalRows}
                paginationDefaultPage={currentPage}
                paginationRowsPerPageOptions={[4, 8, 15]} //you can remove it later, just to have more pages
                paginationPerPage={rowsPerPage}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowsPerPageChange}
                selectableRowSelected={handleApplySelectedRows}

                subHeader
                subHeaderComponent={<input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />}
            />

        </div>

    );
}