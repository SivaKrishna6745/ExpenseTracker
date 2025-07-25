import { useState } from 'react';
import type { Invoice, InvoiceStatus, LineItem } from '../types/invoice';
import { Plus, Trash2 } from 'lucide-react';
import InvoiceModalInput from './InvoiceModalInput';
import StatusSelect from './StatusSelect';

type InvoiceModalProps = {
    open: boolean;
    onClose: () => void;
    invoice?: Invoice;
    onSubmit: (invoice: Invoice) => void;
};

const itemFields: { key: keyof LineItem; type: string; placeholder: string }[] = [
    { key: 'description', type: 'text', placeholder: 'item name / description' },
    { key: 'quantity', type: 'number', placeholder: 'quantity' },
    { key: 'rate', type: 'number', placeholder: 'rate' },
];

const InvoiceModal = ({ open, onClose, onSubmit }: InvoiceModalProps) => {
    const [formData, setFormData] = useState<Invoice>({
        id: '',
        date: '',
        client: '',
        items: [],
        status: '',
    });
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
        setTimeout(() => {
            setErr({
                date: '',
                client: '',
                items: '',
                status: '',
            });
            onSubmit(formData);
            setIsSubmitting(false);
            onClose();
        }, 1500);
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-50">
                    <h2 className="text-2xl text-center text-white"> Add Invoice </h2>
                    <form
                        className="flex flex-col gap-12 text-white bg-black/60 p-8 rounded-lg"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div className="flex flex-col gap-4">
                            <InvoiceModalInput
                                label="Date"
                                type="text"
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
                            <InvoiceModalInput
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
                                            <InvoiceModalInput
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
                            <StatusSelect
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
