import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export default function AboutUs() {

    return (
        <main className="">
            <div className=" min-h-screen flex items-center justify-center px-5">
                <Box sx={{ width: '100%', maxWidth: 4000, color: 'primary.main' }} style={{ justifyContent: 'center' }}>
                    <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span class="block">Who are we?</span>
                        <span class="block text-indigo-600">
                            Increase efficiency in workplace with Manage-IT
                        </span>
                    </h2>
                    <h5 class="text-m font-bold tracking-tight text-gray-900 sm:text-xl">
                        <span class="block">
                            Manage-IT is an online project management platform to help newly founded as well as established firms
                            to manage their projects by providing an easy-to-use,
                            cost-effective cloud solution with tailored features, such as task tracking, scheduling,
                            reporting and project analysis, wth the ability to get ongoing personal assistance
                            from our experienced business analysts.
                        </span>
                    </h5>
                    <Box>
                        <Stack spacing={5} direction="column" sx={{ m: 10 }} style={{ justifyContent: 'center' }}>
                            <Link to="/verification">
                                <Button variant="contained" style={{background: 'purple'}}>Register Your Company</Button>
                            </Link>
                        </Stack>
                    </Box>
                </Box>
                <Divider />
            </div>
        </main >
    );
};