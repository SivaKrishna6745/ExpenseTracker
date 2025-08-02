import { useEffect, useState } from 'react';
import type { Expense, ExpenseCategory } from '../types/expense';
import CustomSelect from './CustomSelect';
import ModalInput from './ModalInput';
import { CircleX } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateExpense } from '../features/expenses/expenseSlice';

type ExpenseModalProps = {
    isOpen: boolean;
    onClose: () => void;
    expense?: Expense;
    onSubmit: (exp: Expense) => void;
    isEdit?: boolean;
    selectedExp: Expense | undefined;
};

const ExpenseModal = ({ isOpen, onClose, onSubmit, isEdit, selectedExp }: ExpenseModalProps) => {
    const dispatch = useDispatch();
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
    useEffect(() => {
        if (isEdit && selectedExp) {
            setExpFormData({
                id: selectedExp.id || '',
                title: selectedExp.title || '',
                amount: selectedExp.amount || 0,
                category: selectedExp.category || '',
                date: selectedExp.date || '',
            });
        }
    }, [isEdit, selectedExp]);
    const validateDate = (ExpDate: string) => {
        const date = new Date(ExpDate);
        const now = new Date();
        const earliest = new Date('2010-01-01');
        return date >= earliest && date <= now;
    };

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [err, setErr] = useState({
        title: '',
        amount: '',
        category: '',
        date: '',
    });
    const handleSubmit = () => {
        if (!expFormData.title) {
            setErr({ ...err, title: 'Please enter a valid title' });
            return;
        }
        if (expFormData.amount <= 0) {
            setErr({ ...err, amount: 'Please enter a valid amount' });
            return;
        }
        if (
            expFormData.category !== 'food' &&
            expFormData.category !== 'travel' &&
            expFormData.category !== 'software'
        ) {
            setErr({ ...err, category: 'Please select either food or travel or software' });
            return;
        }
        if (!expFormData.date || !validateDate(expFormData.date)) {
            setErr({ ...err, date: 'Please enter a valid date' });
            return;
        }
        setIsSubmitting(true);
        const validateExpense: Expense = {
            ...expFormData,
            id: crypto.randomUUID(),
        };
        if (isEdit) {
            dispatch(updateExpense(validateExpense));
        } else {
            onSubmit(validateExpense);
        }
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
            setExpFormData({
                id: '',
                title: '',
                amount: 0,
                category: '',
                date: '',
            });
        }, 1500);
        setErr({
            title: '',
            amount: '',
            category: '',
            date: '',
        });
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-50">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="flex flex-col gap-12 text-white bg-black/60 p-8 rounded-lg"
                    >
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
                            {err.title && (
                                <p className="text-red-500 bg-red-100 p-2 rounded-md transition-opacity duration-300">
                                    {err.title}
                                </p>
                            )}
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
                            {err.amount && (
                                <p className="text-red-500 bg-red-100 p-2 rounded-md transition-opacity duration-300">
                                    {err.amount}
                                </p>
                            )}
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
                            {err.category && (
                                <p className="text-red-500 bg-red-100 p-2 rounded-md transition-opacity duration-300">
                                    {err.category}
                                </p>
                            )}
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
                            {err.date && (
                                <p className="text-red-500 bg-red-100 p-2 rounded-md transition-opacity duration-300">
                                    {err.date}
                                </p>
                            )}
                        </div>
                        <button
                            className="bg-blue-400 text-slate-900 text-xl p-4 w-30 rounded-lg cursor-pointer"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default ExpenseModal;
