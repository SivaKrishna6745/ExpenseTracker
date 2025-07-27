import { useState } from 'react';
import type { Expense, ExpenseCategory } from '../types/expense';
import CustomSelect from './CustomSelect';
import ModalInput from './ModalInput';
import { CircleX } from 'lucide-react';

type ExpenseModalProps = {
    isOpen: boolean;
    onClose: () => void;
    expense?: Expense;
    onSubmit?: (exp: Expense) => void;
};

const ExpenseModal = ({ isOpen, onClose, expense, onSubmit }: ExpenseModalProps) => {
    const [expFormData, setExpFormData] = useState<Expense>({
        id: '',
        title: '',
        amount: 0,
        category: '',
        date: '',
    });
    const handleClose = () => {
        setExpFormData({
            id: '',
            title: '',
            amount: 0,
            category: '',
            date: '',
        });
        onClose();
    };
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-50">
                    <form className="flex flex-col gap-12 text-white bg-black/60 p-8 rounded-lg">
                        <div className="relative flex justify-between items-center text-white dark:text-slate-800">
                            <h2 className="text-2xl"> Add Expense </h2>
                            <button className="absolute top-0 right-0 cursor-pointer" onClick={handleClose}>
                                <CircleX size={32} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <ModalInput
                                label="Title"
                                type="text"
                                id="title"
                                placeholder="French Fries"
                                value={expFormData.title}
                                onChange={(e) => setExpFormData({ ...expFormData, title: e.target.value })}
                                className={'w-md md:w-lg lg:w-xl'}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <ModalInput
                                label="Amount"
                                type="number"
                                id="amount"
                                placeholder="0"
                                value={expFormData.amount}
                                onChange={(e) => setExpFormData({ ...expFormData, amount: parseInt(e.target.value) })}
                                className={'w-md md:w-lg lg:w-xl'}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <CustomSelect
                                label="Category"
                                id="category"
                                value={expFormData.category}
                                onChange={(e) =>
                                    setExpFormData({ ...expFormData, category: e.target.value as ExpenseCategory })
                                }
                                options={[
                                    { value: 'travel', label: 'Travel' },
                                    { value: 'food', label: 'Food' },
                                    { value: 'software', label: 'Software' },
                                ]}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <ModalInput
                                label="Date"
                                type="date"
                                id="date"
                                placeholder="2025-07-23"
                                value={expFormData.date}
                                onChange={(e) => setExpFormData({ ...expFormData, date: e.target.value })}
                                className={'w-md md:w-lg lg:w-xl'}
                            />
                        </div>
                        <button className="bg-blue-400 text-slate-900 text-xl p-4 w-30 rounded-lg cursor-pointer">
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default ExpenseModal;
