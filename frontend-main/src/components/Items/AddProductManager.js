import React, { useState }from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import AddProductManagerViewDisplay from "../Modals/AddProductManagerViewDisplay";
import UpdateProductManagerViewDisplay from "../Modals/UpdateProductManagerViewDisplay";




export default function AddEmployee() {

    const [addClickInfo, setAddClickInfo] =React.useState(false);
    const [updateClickInfo, setUpdateClickInfo] =React.useState(false);


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'FirstName', headerName: 'First Name', width: 290 },
        { field: 'LastName', headerName: 'Last Name', width: 150 },
        { field: 'Username', headerName: 'Username', width: 130 },
        { field: 'Email', headerName: 'Email', width: 130 },
        { field: 'Password', headerName: 'Password', width: 130 },



    ];

    const rows = [
        { id: 1, FirstName: "hshsh", LastName: "22.07.2022", Username: 'Jon', Email: "Started", Password: "123" },
        { id: 2, FirstName: "hshsh", LastName: "22.07.2022", Username: 'Jon', Email: "Started", Password: "123" },
        { id: 3, FirstName: "hshsh", LastName: "22.07.2022", Username: 'Jon', Email: "Started", Password: "123" },
        { id: 4, FirstName: "hshsh", LastName: "22.07.2022", Username: 'Jon', Email: "Started", Password: "123" },
        { id: 5, FirstName: "hshsh", LastName: "22.07.2022", Username: 'Jon', Email: "Started", Password: "123" },
        { id: 6, FirstName: "hshsh", LastName: "22.07.2022", Username: 'Jon', Email: "Started", Password: "123" },
        { id: 7, FirstName: "hshsh", LastName: "22.07.2022", Username: 'Jon', Email: "Started", Password: "123" },

    ];


    return (

        <main className="">

        <div className="flex items-center justify-center px-8 py-8">

                <div classname="flex">
                    <Box sx={{ mx: "15", width: 400 }}>
                       
                    </Box>
                    <span className="w-full"></span>
                    <span className="w-full">
                        <Stack direction="center" spacing={5}>
                            <Button variant="contained" color="secondary"
                                onClick={() => {
                                    setAddClickInfo(true);
                              }}>
                                Add a New Product Manager
                            </Button>
                        </Stack>
                    </span>


                    {addClickInfo &&  ( 
                    <AddProductManagerViewDisplay handleClose={setAddClickInfo}
                    />
                       )}
                    <span className="w-full"></span>
                </div>
            </div>

            <div className="flex items-center justify-center px-8 py-8">

                    <Typography variant="h6" gutterBottom component="div">
                            To edit a product manager's information click on that product manager's cell on the below product manager table.
                        </Typography>
                        </div>

            <div className="mb-10 flex items-center justify-center px-8 py-6">
                
                <div style={{ height: 400, width: '66%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        /* checkboxSelection   can be added if needed?*/
                        onCellClick={() => {
                            setUpdateClickInfo(true);
                          }}
                    />
                    {updateClickInfo &&  ( 
                    <UpdateProductManagerViewDisplay handleClose={setUpdateClickInfo}
                    />
                       )}
                   
                </div>

            </div>
        </main>

    );

};

