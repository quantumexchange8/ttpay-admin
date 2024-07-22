import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import InputIconWrapper from '@/Components/InputIconWrapper';
import { Search, AddIcon } from '@/Components/Icon/Icon';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import { ArrowDown } from '@/Components/Icon/Icon';
import { EmptyFilter, FilledFilter } from "@/Components/Icon/Outline";
import { Tab } from '@headlessui/react';

export default function Client({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    })

    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filtersApplied, setFiltersApplied] = useState(false); // state to track if filters are applied
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('All'); // state to track the selected month
    const [appliedFilters, setAppliedFilters] = useState({
        success: false,
        rejected: false,
        minAmount: '',
        maxAmount: '',
        minFee: '',
        maxFee: ''
    });

    const searchVal = data.search;

    const openFilterModal = () => {
        setFilterIsOpen(true);
    };

    const closeFilterModal = () => {
        setFilterIsOpen(false);
    };

    const applyFilters = (filters) => {
        setAppliedFilters(filters);
        setFiltersApplied(true);
        closeFilterModal();
    };

    const resetFilters = () => {
        setAppliedFilters({
            success: false,
            rejected: false,
            minAmount: '',
            maxAmount: '',
            minFee: '',
            maxFee: ''
        });
        setFiltersApplied(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Deal History"
        >
            
        </AuthenticatedLayout>
    )
}