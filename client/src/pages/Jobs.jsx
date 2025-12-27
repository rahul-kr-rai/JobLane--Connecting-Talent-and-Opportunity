import React, { useEffect, useState, useMemo } from 'react';
import { MetaData } from '../components/MetaData';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { Loader } from '../components/Loader';
import { JobCard } from '../components/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs, getSingleJob } from '../actions/JobActions';
import { Slider } from '@mantine/core';
import { RxCross2 } from 'react-icons/rx';
import useIsMobile from '../hooks/useIsMobile';

export const Jobs = () => {
    const dispatch = useDispatch();
    const { allJobs, loading } = useSelector(state => state.job);
    const isMobile = useIsMobile();

    // -- State --
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [salary, setSalary] = useState(0);
    const [company, setCompany] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const itemsPerPage = 6; 

    // -- Constants --
    const categories = ["Technology", "Marketing", "Finance", "Sales", "Legal"];
    const companies = ["Google", "Apple", "Paypal", "Samsung", "Amazon", "Oracle"];

    useEffect(() => {
        dispatch(getAllJobs());
    }, [dispatch]);

    // -- Unified Filtering Logic --
    const filteredJobs = useMemo(() => {
        if (!allJobs) return [];

        return allJobs.filter((job) => {
            const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase().trim());
            const matchesCategory = category === "" || job.category.toLowerCase() === category.toLowerCase();
            const matchesSalary = parseInt(job.salary) >= salary;
            const matchesCompany = company === "" || job.companyName.toLowerCase() === company.toLowerCase();

            return matchesSearch && matchesCategory && matchesSalary && matchesCompany;
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
    }, [allJobs, search, category, salary, company]);

    // -- Pagination Logic --
    const totalPageCount = Math.ceil(filteredJobs.length / itemsPerPage);
    const displayedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, salary, company]);

    // -- Reusable Filter Sidebar UI --
    const FilterSection = () => (
        <div className='flex flex-col gap-8'>
            {/* Category Filter */}
            <div>
                <h3 className='text-lg font-semibold underline underline-offset-4 mb-4 text-gray-200 titleT'>Categories</h3>
                <ul className='flex flex-col gap-2 text-gray-400'>
                    {categories.map((c, i) => (
                        <li 
                            key={i} 
                            onClick={() => setCategory(category === c ? "" : c)} 
                            className={`cursor-pointer transition-colors hover:text-[#3803FF] ${category === c ? "text-[#3803FF] font-bold" : ""}`}
                        >
                            {c}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Salary Filter */}
            <div>
                <h3 className='text-lg font-semibold underline underline-offset-4 mb-4 text-gray-200 titleT'>Min Salary</h3>
                <div className="px-2">
                    <Slider
                        color="indigo" // Mantine indigo is close to your #3803FF
                        size="sm"
                        value={salary}
                        onChange={setSalary}
                        min={0}
                        max={2000000}
                        step={50000}
                        label={(val) => `${val / 1000}k`}
                        className='w-full'
                    />
                    <div className='text-xs text-gray-500 mt-2'>Selected:  {salary.toLocaleString()}</div>
                </div>
            </div>

            {/* Company Filter */}
            <div>
                <h3 className='text-lg font-semibold underline underline-offset-4 mb-4 text-gray-200 titleT'>Top Companies</h3>
                <div className='flex flex-col gap-2 text-gray-400 text-sm'>
                    {companies.map((c, i) => (
                        <div 
                            key={i} 
                            onClick={() => setCompany(company === c ? "" : c)} 
                            className={`cursor-pointer hover:text-[#3803FF] ${company === c ? "text-[#3803FF] font-bold" : ""}`}
                        >
                            {c}
                        </div>
                    ))}
                </div>
            </div>

            {/* Reset Button */}
            <button 
                onClick={() => { setCategory(""); setSalary(0); setCompany(""); setSearch(""); }}
                className='text-sm text-red-400 hover:text-red-300 underline text-left'
            >
                Reset All Filters
            </button>
        </div>
    );

    return (
        <>
            <MetaData title="Jobs - Browse Opportunities" />
            <div className='bg-gray-950 min-h-screen pt-20 px-4 md:px-20 pb-20 text-white'>
                
                {loading ? <div className="w-full h-[80vh] flex justify-center items-center"><span className="loader1"></span></div> : (
                    <div className='w-full max-w-7xl mx-auto'>
                        
                        {/* Header & Search Bar */}
                        <div className='flex flex-col items-center mb-10'>
                            <h1 className='text-3xl md:text-5xl font-bold mb-6 text-center titleT'>Find your dream job</h1>
                            
                            <div className='relative w-full md:w-2/3 lg:w-1/2'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <FiSearch className='text-gray-500' size={20} />
                                </div>
                                <input 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)} 
                                    placeholder='Search by job title...' 
                                    type="text" 
                                    className='w-full pl-10 pr-10 py-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3803FF] transition-all' 
                                />
                                {search && (
                                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'>
                                        <RxCross2 onClick={() => setSearch("")} className='text-gray-400 hover:text-[#3803FF]' size={20} />
                                    </div>
                                )}
                            </div>
                            
                            {/* Mobile Filter Toggle */}
                            {isMobile && (
                                <button 
                                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                                    className='mt-4 flex items-center gap-2 text-[#3803FF] border border-[#3803FF] bg-[#3803FF]/10 px-4 py-2 rounded-md'
                                >
                                    <FiFilter /> {showMobileFilters ? "Hide Filters" : "Show Filters"}
                                </button>
                            )}
                        </div>

                        <div className='flex flex-col md:flex-row gap-8'>
                            
                            {/* Sidebar Filters (Desktop) */}
                            {!isMobile && (
                                <div className='w-1/4 min-w-[250px] bg-gray-900/50 p-6 rounded-xl border border-gray-800 h-fit sticky top-24 backdrop-blur-sm'>
                                    <FilterSection />
                                </div>
                            )}

                            {/* Mobile Filters (Collapsible) */}
                            {isMobile && showMobileFilters && (
                                <div className='bg-gray-900 p-6 rounded-xl border border-gray-800 mb-6'>
                                    <FilterSection />
                                </div>
                            )}

                            {/* Jobs List */}
                            <div className='flex-1'>
                                <div className='grid grid-cols-1 gap-4'>
                                    {displayedJobs.length > 0 ? (
                                        displayedJobs.map((job) => (
                                            <JobCard 
                                                key={job._id}
                                                job={job}
                                                onClick={() => dispatch(getSingleJob(job._id))}
                                            />
                                        ))
                                    ) : (
                                        <div className='text-center py-20 bg-gray-900/30 rounded-lg border border-gray-800'>
                                            <p className='text-xl text-gray-400'>No jobs found matching your criteria.</p>
                                            <button 
                                                onClick={() => {setCategory(""); setSalary(0); setCompany(""); setSearch("");}}
                                                className='mt-4 text-[#3803FF] hover:underline'
                                            >
                                                Clear filters
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Pagination */}
                                {filteredJobs.length > itemsPerPage && (
                                    <div className="flex justify-center mt-12 gap-2">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 rounded bg-gray-800 hover:bg-[#3803FF] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            Prev
                                        </button>
                                        <span className='px-4 py-2 text-gray-400'>
                                            Page {currentPage} of {totalPageCount}
                                        </span>
                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPageCount, p + 1))}
                                            disabled={currentPage === totalPageCount}
                                            className="px-4 py-2 rounded bg-gray-800 hover:bg-[#3803FF] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};