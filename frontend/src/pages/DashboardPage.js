import React, { useEffect, useState } from 'react';
import API from '../api';
import { logout, getUserEmail } from '../auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardPage = () => {
    const [inventory, setInventory] = useState([]);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [reorderLevel, setReorderLevel] = useState(0);
    const [expiryDate, setExpiryDate] = useState('');
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const res = await API.get('/inventory');
            setInventory(res.data);
        } catch (err) {
            logout();
            navigate('/');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAdd = async () => {
        if (!name || !quantity || !reorderLevel || !expiryDate) {
            toast.warn('Please fill in all fields');
            return;
        }

        try {
            await API.post('/inventory', {
                name,
                quantity,
                reorderLevel,
                expiryDate
            });
            fetchData();
            setName('');
            setQuantity(0);
            setReorderLevel(0);
            setExpiryDate('');
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong while adding item.');
        }
    };


    const handleDelete = async (id) => {
        await API.delete(`/inventory/${id}`);
        toast.success("Deleted SuccessFully!")
        fetchData();
    };

    return (
        <div className="app-container">
            {/* Header Section */}
            <div className="top-bar">
                <h1 className="app-title">📦 Inventory</h1>
                <div className="user-info">
                    <span className="user-email">👤 {getUserEmail()}</span>
                    <button className="logout" onClick={() => { logout(); navigate('/', { replace: true }); }}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="dashboard">
                <h2>📋 Add New Item</h2>

                <div className="form">
                    <div className="form-group">
                        <label>Item Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter item name" required />
                    </div>

                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Reorder Level</label>
                        <input type="number" value={reorderLevel} onChange={(e) => setReorderLevel(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                    </div>
                </div>

                <div className="button-wrapper">
                    <button className="add-item" onClick={handleAdd}>➕ Add Item</button>
                </div>

                <h3 className="items-heading">📦 Items List</h3>

                <div className="list">
                    {inventory.map(item => (
                        <div key={item._id} className="item">
                            <strong>{item.name}</strong>
                            <div>Quantity: {item.quantity} pcs</div>
                            <div>Expiry Date: {item.expiryDate?.slice(0, 10)}</div>
                            <button onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
