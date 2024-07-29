import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Filter } from './Icon/Icon'
import { XIcon } from './Icon/Outline';
import Checkbox from './Checkbox';
import Input from './Input';
import Button from '@/Components/Button';

export default function FilterTable({ onApply, statuses }) {

  const [filters, setFilters] = useState({
    amount_min: '',
    amount_max: '',
    fee_min: '',
    fee_max: '',
    success: false,
    reject: false,
  });

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (id) => {
    setFilters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      amount_min: '',
      amount_max: '',
      fee_min: '',
      fee_max: '',
      success: false,
      reject: false,
    };
    setFilters(resetFilters);
    onApply(resetFilters);
  };

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center border-l border-gray-800 rounded-r-lg bg-[#ffffff0d] px-4 py-3 text-sm font-semibold text-white hover:bg-[#ffffff1a] focus:outline-none">
            <div className='flex gap-2'>
              <Filter />
              <span>Filter</span>
            </div>
            
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
          <Menu.Items className="absolute z-10 right-0 md:left-0 mt-2 w-60 origin-top-right rounded-lg bg-[#ffffff0d] backdrop-blur-3xl shadow-lg ring-1 ring-black/5 focus:outline-none">
            
            <div className="py-4 flex flex-col gap-6">
              <div className="flex justify-between items-center px-4">
                <span className="text-base font-semibold text-white">Filters Options</span>
                <Menu.Button as="button" className="text-gray-400 hover:text-gray-500">
                  <XIcon className="w-5 h-5" aria-hidden="true" />
                </Menu.Button>
              </div>

              <div className='flex flex-col gap-5'>
                {/* status */}
                <div className='flex flex-col gap-3 px-4'>
                  <div className='text-gray-300 text-xs font-bold uppercase'>
                    Status
                  </div>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                      <Checkbox 
                        value={filters.success}
                        checked={filters.success}
                        onChange={() => handleCheckboxChange('success')}
                      />
                      <span className='text-white text-base font-medium'>Success</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Checkbox 
                        value={filters.reject}
                        checked={filters.reject}
                        onChange={() => handleCheckboxChange('reject')}
                      />
                      <span className='text-white text-base font-medium'>{statuses}</span>
                    </div>
                  </div>
                </div>
                {/* Amount range */}
                <div className='flex flex-col gap-3 px-4'>
                  <div className='text-gray-300 text-xs font-bold uppercase'>
                    Amount Range
                  </div>
                  <div className='flex items-center gap-3'>
                    <Input 
                      placeholder='Min'
                      className=''
                      id="amount_min" 
                      type='number' 
                      value={filters.amount_min}
                      handleChange={e => handleInputChange('amount_min', e.target.value)}
                      min='0'
                    />
                    <div className='text-white text-base font-bold'> - </div>
                    <Input 
                      placeholder='Max'
                      id="amount_max" 
                      type='number' 
                      value={filters.amount_max}
                      handleChange={e => handleInputChange('amount_max', e.target.value)}
                    />
                  </div>
                </div>

                <div className='h-[1px] bg-gray-700'></div>

                <div className='flex flex-col gap-3 px-4'>
                  <div className='text-gray-300 text-xs font-bold uppercase'>
                    Fee Range
                  </div>
                  <div className='flex items-center gap-3'>
                    <Input 
                      placeholder='Min'
                      className=''
                      id="fee_min" 
                      type='number' 
                      value={filters.fee_min}
                      handleChange={e => handleInputChange('fee_min', e.target.value)}
                      min='0'
                    />
                    <div className='text-white text-base font-bold'> - </div>
                    <Input 
                      placeholder='Max'
                      id="fee_max" 
                      type='number' 
                      value={filters.fee_max}
                      handleChange={e => handleInputChange('fee_max', e.target.value)}
                    />
                  </div>
                </div>
               
                <div className='h-[1px] bg-gray-700'></div>

              </div>

              <div className='flex items-center gap-3 px-4'>
                <Button 
                  variant='secondary' 
                  size='lg'
                  className='w-full flex justify-center'
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button 
                  size='lg'
                  className='w-full flex justify-center'
                  onClick={handleApply}
                >
                  Apply
                </Button>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
