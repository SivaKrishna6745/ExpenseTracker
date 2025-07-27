import { useEffect, useState } from 'react';
import type { Invoice, InvoiceStatus, LineItem } from '../types/invoice';
import { CircleX, Plus, Trash2 } from 'lucide-react';
import ModalInput from './ModalInput';
import { useDispatch } from 'react-redux';
import { updateInvoice } from '../features/invoices/invoiceSlice';
import CustomSelect from './CustomSelect';

type InvoiceModalProps = {
    open: boolean;
    onClose: () => void;
    invoice?: Invoice;
    onSubmit: (invoice: Invoice) => void;
    isEdit?: boolean;
    selectedInv?: Invoice;
};

const itemFields: { key: keyof LineItem; type: string; placeholder: string }[] = [
    { key: 'description', type: 'text', placeholder: 'item name / description' },
    { key: 'quantity', type: 'number', placeholder: 'quantity' },
    { key: 'rate', type: 'number', placeholder: 'rate' },
];

const InvoiceModal = ({ open, onClose, onSubmit, isEdit, selectedInv }: InvoiceModalProps) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<Invoice>({
        id: '',
        date: '',
        client: '',
        items: [],
        status: '',
    });
    const handleClose = () => {
        setFormData({
            id: '',
            date: '',
            client: '',
            items: [],
            status: '',
        });
        onClose();
    };

    const [item, setItem] = useState({
        id: '',
        description: '',
        quantity: 0,
        rate: 0,
    });
    const addItem = () => {
        const itemObj = {
            id: crypto.randomUUID(),
            description: item.description,
            quantity: item.quantity,
            rate: item.rate,
        };
        setFormData({
            ...formData,
            items: [...formData.items, itemObj],
        });
        setItem({ id: '', description: '', quantity: 0, rate: 0 });
    };
    const removeItem = (id: string) => {
        const newItems = [...formData.items].filter((item) => item.id !== id);
        setFormData({
            ...formData,
            items: newItems,
        });
    };

    useEffect(() => {
        if (isEdit && selectedInv) {
            setFormData({
                id: selectedInv?.id || '',
                date: selectedInv?.date || '',
                client: selectedInv?.client || '',
                items: selectedInv?.items ? [...selectedInv?.items] : [],
                status: selectedInv?.status || '',
            });
        }
    }, [isEdit, selectedInv]);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [err, setErr] = useState({
        date: '',
        client: '',
        items: '',
        status: '',
    });
    const handleSubmit = () => {
        if (!formData.date) {
            setErr({ ...err, date: 'Please enter a valid date' });
            return;
        }
        if (!formData.client) {
            setErr({ ...err, client: 'Please enter a valid client' });
            return;
        }
        if (formData.items.length === 0) {
            setErr({ ...err, items: 'Please enter valid item data' });
            return;
        }
        if (formData.status !== 'draft' && formData.status !== 'pending' && formData.status !== 'paid') {
            setErr({ ...err, status: 'Please select either draft or pending or paid' });
            return;
        }
        setIsSubmitting(true);
        const validateInvoice: Invoice = {
            ...formData,
            id: crypto.randomUUID(),
        };
        if (isEdit) {
            dispatch(updateInvoice(formData));
        } else {
            onSubmit(validateInvoice);
        }
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
            setFormData({
                id: '',
                date: '',
                client: '',
                items: [],
                status: '',
            });
        }, 1500);
        setErr({
            date: '',
            client: '',
            items: '',
            status: '',
        });
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-50">
                    <form
                        className="flex flex-col gap-12 text-white bg-black/60 p-8 rounded-lg"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div className="relative flex justify-between items-center text-white dark:text-slate-800">
                            <h2 className="text-2xl"> Add Invoice </h2>
                            <button className="absolute top-0 right-0 cursor-pointer" onClick={handleClose}>
                                <CircleX size={32} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <ModalInput
                                label="Date"
                                type="date"
                                id="date"
                                placeholder="2025-07-23"
                                value={formData.date}
                                onChange={(e) => {
                                    setFormData({ ...formData, date: e.target.value });
                                    setErr({ ...err, date: '' });
                                }}
                            />
                            {err.date && (
                                <p className="text-red-500 bg-red-100 p-2 rounded-md transition-opacity duration-300">
                                    {err.date}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <ModalInput
                                label="Client"
                                type="text"
                                id="client"
                                placeholder="Burger King"
                                value={formData.client}
                                onChange={(e) => {
                                    setFormData({ ...formData, client: e.target.value });
                                    setErr({ ...err, client: '' });
                                }}
                            />
                            {err.client && (
                                <p className="text-red-500 bg-red-100 p-2 rounded-md transition-opacity duration-300">
                                    {err.client}
                                </p>
                            )}
                        </div>
                        <div>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="items">Items</label>
                                <div className="flex gap-4">
                                    {itemFields.map(({ key, type, placeholder }) => {
                                        return (
                                            <ModalInput
                                                key={key}
                                                type={type}
                                                placeholder={placeholder}
                                                value={String(item[key])}
                                                onChange={(e) => {
                                                    setItem({
                                                        ...item,
                                                        [key]:
                                                            type === 'number'
                                                                ? parseInt(e.target.value)
                                                                : e.target.value,
                                                    });
                                                    setErr({ ...err, items: '' });
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                                {err.items && (
                                    <p className="text-red-500 bg-red-100 p-2 rounded-md transition-opacity duration-300">
                                        {err.items}
                                    </p>
                                )}
                                <button
                                    type="button"
                                    className="bg-green-400 text-slate-900 p-2 rounded-lg cursor-pointer w-max flex justify-center items-center gap-2"
                                    onClick={addItem}
                                >
                                    <Plus />
                                    Add Item
                                </button>
                            </div>
                            {formData.items.map((item) => {
                                return (
                                    <div key={item.id} className="flex bg-white/30 p-3 rounded-lg my-2">
                                        <div className="flex-1 flex gap-10">
                                            <p>{item.description}</p>
                                            <p>{item.quantity}</p>
                                            <p>{item.rate}</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="cursor-pointer ml-10"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-col gap-4">
                            <CustomSelect
                                label="Status"
                                id="status"
                                value={formData.status}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        status: e.target.value as InvoiceStatus,
                                    });
                                    setErr({ ...err, status: '' });
                                }}
                                options={[
                                    { value: 'paid', label: 'Paid' },
                                    { value: 'pending', label: 'Pending' },
                                    { value: 'draft', label: 'Draft' },
                                ]}
                            />
                        </div>
                        {err.status && (
                            <p className="text-red-500 bg-red-100 p-2 rounded-md transition-opacity duration-300">
                                {err.status}
                            </p>
                        )}
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

export default InvoiceModal;
