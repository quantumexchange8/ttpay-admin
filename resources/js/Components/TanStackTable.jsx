import React, { useState, useEffect, Fragment } from 'react';
import { useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getPaginationRowModel, 
  flexRender 
} from '@tanstack/react-table';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ArrowLeft, ArrowRight, DArrowLeft, DArrowRight } from '@/Components/Icon/Icon';
import Button from '@/Components/Button';
import { NoData } from '@/Components/Icon/NoData';
import { tailChase } from 'ldrs'
import { Default, AscIcon, DescIcon } from '@/Components/Icon/Sort';
import formatDateTime from '@/Composables/index';

const TanStackTable = ({ columns, data, actions }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [pageSizeOptions] = useState([10, 15, 20, 25, 50, "All"]); 
  const [pageSize, setPageSize] = useState(10); 

  useEffect(() => {
    if (pageSize === "All") {
      setPagination({ ...pagination, pageSize: data.length });
    } else {
      setPagination({ ...pagination, pageSize: pageSize });
    }
  }, [pageSize, data.length]);

  const totalPages = Math.ceil(data.length / pagination.pageSize);

  const handlePageChange = (pageIndex) => {
    setPagination({ ...pagination, pageIndex });
  };

  const handleFirstPageClick = () => {
    setPagination({ ...pagination, pageIndex: 0 });
  };

  const handleLastPageClick = () => {
    setPagination({ ...pagination, pageIndex: totalPages - 1 });
  };

  const handlePrevPageClick = () => {
    setPagination({ ...pagination, pageIndex: Math.max(pagination.pageIndex - 1, 0) });
  };

  const handleNextPageClick = () => {
    setPagination({ ...pagination, pageIndex: Math.min(pagination.pageIndex + 1, totalPages - 1) });
  };

  const [sorting, setSorting] = useState({
    column: null,
    direction: null,
  });

  const handleSort = (column) => {
    if (column.sortable === false) {
      return; // Skip sorting if the column is not sortable
    }

    if (sorting.column === column.accessor) {
      // Toggle direction if already sorting by this column
      if (sorting.direction === 'asc') {
        setSorting({
          ...sorting,
          direction: 'desc',
        });
      } else if (sorting.direction === 'desc') {
        setSorting({
          column: null,
          direction: null,
        });
      } else {
        setSorting({
          ...sorting,
          direction: 'asc',
        });
      }
    } else {
      // Sort by the clicked column in ascending order by default
      setSorting({
        column: column.accessor,
        direction: 'asc',
      });
    }
  };

  let sortedData = [...data];
  if (sorting.column) {
    sortedData.sort((a, b) => {
      const aValue = parseFloat((a[sorting.column] || '').replace('%', ''));
    const bValue = parseFloat((b[sorting.column] || '').replace('%', '')); 
      if (!isNaN(aValue) && !isNaN(bValue)) {
        
        if (aValue < bValue) return sorting.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sorting.direction === 'asc' ? 1 : -1;
        return 0;
      } else {
        
        return 0;
      }
    });
  }

  tailChase.register()

  return (
    <div>
      <table className='w-full text-xs text-left rounded-xl bg-[#ffffff0d]'>
        {/* Table Header */}
        <thead className='text-xs font-bold text-gray-500 uppercase'>
          <tr className='bg-[#ffffff0d] '>
            {columns.map((column, index) => (
              <th key={index} className='p-3' onClick={() => column.sortable && handleSort(column)}>
                <div className='flex items-center gap-2'>
                  <div>
                    {column.header} 
                  </div>
                  
                  {column.sortable !== false && (
                    <div>
                      {sorting.column === column.accessor && sorting.direction === 'asc' && <AscIcon />}
                      {sorting.column === column.accessor && sorting.direction === 'desc' && <DescIcon />}
                      {!(sorting.column === column.accessor) && <Default />}
                    </div>
                  )}
                </div>
                
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className='py-3 text-center'>Actions</th>
            )}
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {sortedData.length > 0 ? (
            sortedData
              .slice(
                pagination.pageIndex * pagination.pageSize,
                (pagination.pageIndex + 1) * pagination.pageSize
              )
              .map((row, rowIndex) => (
                <tr key={rowIndex} className='p-3 hover:bg-[#ffffff1a]'>
                  {columns.map((column, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`} className='text-sm text-white p-3'>
                      {column.accessor === 'created_at'
                        ? formatDateTime(row[column.accessor])
                        : row[column.accessor] !== null
                        ? row[column.accessor]
                        : '-'}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td className='p-3 flex justify-center items-center gap-3'>
                      {actions.map((action, index) => (
                        <span className='flex justify-center items-center text-white' key={index} onClick={() => action(row)}>
                          {typeof action === 'function' && action(row)}
                        </span>
                      ))}
                    </td>
                  )}
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actions && actions.length > 0 ? 1 : 0)} className='text-center py-20 text-gray-500 text-sm font-medium'>
                <div className='flex flex-col items-center gap-3'>
                  <NoData/>
                  <span>
                    No data to show
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
        {/* Table Footer */}
        <tfoot>
          {data.length > 0 ? (
            <tr>
              <td className='py-5 px-4' colSpan={columns.length + (actions && actions.length > 0 ? 1 : 0)}>
                <div className="flex justify-between items-center">
                  {/* Rows per page dropdown */}
                  <div>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-2 rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                          {pagination.pageSize}
                          <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute mt-2 divide-gray-100 rounded-md bg-[#ffffff0d] backdrop-blur-lg shadow-lg ring-1 ring-black/5 focus:outline-none">
                          <div className="py-2 ">
                            {pageSizeOptions.map((option) => (
                              <Menu.Item key={option}>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active ? 'bg-primary-700 text-white' : 'text-white'
                                    } group flex w-full items-center rounded-md px-4 py-2 text-sm font-medium`}
                                    onClick={() => setPageSize(option)}
                                  >
                                    <span className='w-[43px]'>{option}</span>
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  {/* Pagination controls */}
                  <div className='flex items-center justify-center gap-1'>
                    {/* First Page Icon */}
                    {totalPages > 2 && (
                      <div 
                        className={`flex justify-center items-center py-2 px-[10px] w-9 h-9 ${pagination.pageIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-800 rounded-full'}`}
                        onClick={handleFirstPageClick}
                        disabled={pagination.pageIndex === 0}
                      >
                        <DArrowLeft width={20} height={20} />
                      </div>
                    )}
                    {/* Previous Page Icon */}
                    {totalPages >= 2 && (
                      <div 
                        className={`flex justify-center items-center py-2 px-[10px] w-9 h-9 ${pagination.pageIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-800 rounded-full'}`}
                        onClick={handlePrevPageClick}
                        disabled={pagination.pageIndex === 0}
                      >
                        <ArrowLeft width={20} height={20} />
                      </div>
                    )}
                    
                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, index) => (
                      <span
                        key={index}
                        className={`flex justify-center items-center text-sm text-white font-semibold py-2 px-[10px] w-9 h-9 rounded-full cursor-pointer hover:bg-gray-800 ${index === pagination.pageIndex ? 'bg-primary-700' : ''}`}
                        onClick={() => handlePageChange(index)}
                      >
                        {index + 1}
                      </span>
                    ))}
                    {/* Next Page Icon */}
                    {totalPages >= 2 && (
                      <div 
                        className={`flex justify-center items-center py-2 px-[10px] w-9 h-9 ${pagination.pageIndex === totalPages - 1 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-800 rounded-full'}`}
                        onClick={handleNextPageClick}
                        disabled={pagination.pageIndex === totalPages - 1}
                      >
                        <ArrowRight width={20} height={20} color='currentColor' className='text-white'/>
                      </div>
                    )}
                    
                    {/* Last Page Icon */}
                    {totalPages > 2 && (
                      <div 
                        className={`flex justify-center items-center py-2 px-[10px] w-9 h-9 ${pagination.pageIndex === totalPages - 1 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-800 rounded-full'}`}
                        onClick={handleLastPageClick}
                        disabled={pagination.pageIndex === totalPages - 1}
                      >
                        <DArrowRight width={20} height={20} />
                      </div>
                    )}
                  </div>
                  
                  {/* Showing page number */}
                  <div>
                    <span className="px-4 py-2 text-gray-400">
                      Showing {pagination.pageIndex * pagination.pageSize + 1} to {Math.min((pagination.pageIndex + 1) * pagination.pageSize, data.length)} of {data.length} entries
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          ) : null }
          
        </tfoot>
      </table>
    </div>
  );
};

export default TanStackTable;
