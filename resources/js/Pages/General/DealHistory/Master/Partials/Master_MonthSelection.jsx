import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ArrowDown } from '@/Components/Icon/Icon';

const months = [
  { num: 'All' },
  { num: '2024/01' },
  { num: '2024/02' },
  { num: '2024/03' },
  { num: '2024/04' },
  { num: '2024/05' },
  { num: '2024/06' },
];

export default function MonthSelection({selectedMonth}) {
  const [selected, setSelected] = useState(months[0]);

  const handleMonthChange = (month) => {
    setSelected(month);
    selectedMonth(month.num);
  };

  return (
    <div>
      <Listbox value={selected} onChange={handleMonthChange}>
        <div className="relative">
          <Listbox.Button className="relative flex w-full cursor-default rounded-lg shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <div className="block truncate text-left text-base font-normal w-[280px] md:w-[110px] lg:w-[110px] xl:w-[110px]">{selected.num}</div>
              <div className='pointer pointer-events-none'>
                <ArrowDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute max-h-60 w-[160px] overflow-y-auto rounded-md bg-white/5 backdrop-blur-[60px] py-2 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm mt-5">
              {months.map((monthSelected, monthIdx) => (
                <Listbox.Option
                  key={monthIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 text-white text-left${
                      active ? ' text-amber-200' : ''
                    }`
                  }
                  value={monthSelected}
                >
                  {({ selected }) => (
                    <>
                    <div className='flex items-center justify-between'>
                        <div
                            className={`${
                            selected ? 'font-bold' : 'text-sm font-normal'
                            }`}
                        >
                            {monthSelected.num}
                        </div>
                        {selected ? (
                            <div className=" text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                        ) : null}
                    </div>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
