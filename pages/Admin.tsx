import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';

const Admin: React.FC = () => {
    const { theme } = useTheme();
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Simple Client-Side Security
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin";

    // MOVE ALL HOOKS HERE - BEFORE ANY RETURN
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        name: '',
        price: 0,
        category: 'Cultural',
        origin: '',
        description: '',
        image: '',
        images: [],
        materials: '',
        stripeProductId: '',
        stripePriceId: ''
    });
    const [isSyncing, setIsSyncing] = useState(false);

    const [extraImageInput, setExtraImageInput] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect Password");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Auto-fix local paths for image inputs
        let cleanValue = value;
        if (name === 'image') {
            cleanValue = sanitizePath(value);
        }

        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) : cleanValue
        }));
    };

    const sanitizePath = (path: string) => {
        // If user pastes a full local path containing "public", strip everything before it
        if (path.includes('public')) {
            // Replace backslashes with forward slashes first
            const normalized = path.replace(/\\/g, '/');
            // Extract part after "/public/"
            const match = normalized.match(/\/public\/(.*)/i);
            if (match && match[1]) {
                return '/' + match[1];
            }
        }
        return path;
    };

    const handleAddExtraImage = () => {
        if (!extraImageInput) return;
        const cleanPath = sanitizePath(extraImageInput);
        setFormData(prev => ({
            ...prev,
            images: [...(prev.images || []), cleanPath]
        }));
        setExtraImageInput('');
    };

    const handleRemoveExtraImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: (prev.images || []).filter((_, i) => i !== index)
        }));
    };

    const handleSyncToStripe = async () => {
        if (!formData.name || !formData.price) {
            alert("Please provide at least a name and price to sync.");
            return;
        }

        setIsSyncing(true);
        try {
            const response = await fetch('http://localhost:4242/api/products/sync-stripe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setFormData(prev => ({
                    ...prev,
                    stripeProductId: data.stripeProductId,
                    stripePriceId: data.stripePriceId
                }));
                alert(`Successfully synced! Stripe ID: ${data.stripeProductId}`);
            } else {
                alert(`Sync failed: ${data.error}`);
            }
        } catch (error) {
            console.error("Sync Error:", error);
            alert("Failed to connect to server. Is custom-server running?");
        } finally {
            setIsSyncing(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const finalData = {
            ...formData,
            // Fallback: if main image is empty but extra images exist, use first extra as main
            image: formData.image || (formData.images && formData.images.length > 0 ? formData.images[0] : '')
        };

        if (editingProduct) {
            updateProduct({ ...finalData, id: editingProduct.id } as Product);
            setEditingProduct(null);
        } else {
            addProduct({ ...finalData, id: Math.random().toString(36).substr(2, 9) } as Product);
        }

        // Reset form
        setFormData({
            name: '',
            price: 0,
            category: 'Cultural',
            origin: '',
            description: '',
            image: '',
            images: [],
            materials: ''
        });
        setExtraImageInput('');
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            origin: product.origin,
            description: product.description,
            image: product.image,
            images: product.images || [],
            materials: product.materials
        });
    };

    const handleExport = () => {
        const exportString = `export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};`;
        navigator.clipboard.writeText(exportString);
        alert('Product configuration copied to clipboard! Paste this into constants.ts');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-40 px-6 flex items-start justify-center">
                <form onSubmit={handleLogin} className="text-center space-y-4">
                    <h2 className="text-2xl font-serif text-asl-espresso dark:text-asl-dark-text">Admin Access</h2>
                    <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Enter Password"
                        className="p-2 border border-asl-stone/50 bg-transparent outline-none focus:border-asl-gold text-asl-espresso dark:text-asl-dark-text"
                    />
                    <button type="submit" className="block w-full py-2 bg-asl-espresso text-white text-xs uppercase tracking-widest hover:bg-asl-gold transition-colors">
                        Enter
                    </button>
                    <p className="text-xs opacity-50 text-asl-espresso dark:text-asl-dark-text">Default password is: admin</p>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto" >
            <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-serif text-asl-espresso dark:text-asl-dark-text">Admin Dashboard</h2>
                <button
                    onClick={handleExport}
                    className="px-6 py-2 bg-asl-gold text-white uppercase tracking-widest text-xs hover:bg-asl-gold/80 transition-colors"
                >
                    Export Config
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form Section */}
                <div className={`p-8 border ${theme === 'light' ? 'border-asl-stone/50 bg-white' : 'border-asl-dark-bronze/50 bg-asl-dark-walnut/20'}`}>
                    <h3 className="text-xl font-serif text-asl-espresso dark:text-asl-dark-text mb-6">
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-asl-espresso/60 dark:text-asl-dark-text/60 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border border-asl-stone/30 bg-transparent focus:border-asl-gold outline-none transition-colors dark:text-asl-dark-text dark:border-asl-dark-bronze"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-asl-espresso/60 dark:text-asl-dark-text/60 mb-2">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-asl-stone/30 bg-transparent focus:border-asl-gold outline-none transition-colors dark:text-asl-dark-text dark:border-asl-dark-bronze"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-asl-espresso/60 dark:text-asl-dark-text/60 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-asl-stone/30 bg-transparent focus:border-asl-gold outline-none transition-colors dark:text-asl-dark-text dark:border-asl-dark-bronze"
                                >
                                    <option value="Cultural">Cultural</option>
                                    <option value="Unique">Unique</option>
                                    <option value="Archive">Archive</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-asl-espresso/60 dark:text-asl-dark-text/60 mb-2">Origin</label>
                            <input
                                type="text"
                                name="origin"
                                value={formData.origin}
                                onChange={handleChange}
                                className="w-full p-2 border border-asl-stone/30 bg-transparent focus:border-asl-gold outline-none transition-colors dark:text-asl-dark-text dark:border-asl-dark-bronze"
                                required
                            />
                        </div>

                        {/* Main Image */}
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-asl-espresso/60 dark:text-asl-dark-text/60 mb-2">Main Image (Auto-formats local paths!)</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Paste local path or URL here"
                                className="w-full p-2 border border-asl-stone/30 bg-transparent focus:border-asl-gold outline-none transition-colors dark:text-asl-dark-text dark:border-asl-dark-bronze"
                                required
                            />
                            {formData.image && <p className="text-[10px] sm:text-xs text-asl-gold mt-1">Preview: {formData.image}</p>}
                        </div>

                        {/* Additional Images */}
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-asl-espresso/60 dark:text-asl-dark-text/60 mb-2">Additional Images</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={extraImageInput}
                                    onChange={(e) => setExtraImageInput(e.target.value)}
                                    placeholder="Add more image paths"
                                    className="flex-1 p-2 border border-asl-stone/30 bg-transparent focus:border-asl-gold outline-none transition-colors dark:text-asl-dark-text dark:border-asl-dark-bronze"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddExtraImage}
                                    className="px-4 py-2 bg-asl-stone/20 hover:bg-asl-stone/40 text-asl-espresso dark:text-asl-dark-text transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="space-y-2">
                                {(formData.images || []).map((img, index) => (
                                    <div key={index} className="flex items-center justify-between text-xs p-2 bg-asl-stone/10 dark:bg-asl-dark-bronze/10">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <img src={img} alt="Preview" className="w-8 h-8 object-cover rounded bg-asl-paper" />
                                            <span className="truncate max-w-[150px] text-asl-espresso dark:text-asl-dark-text" title={img}>{img}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExtraImage(index)}
                                            className="text-red-500 hover:text-red-700 ml-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-asl-espresso/60 dark:text-asl-dark-text/60 mb-2">Materials</label>
                            <input
                                type="text"
                                name="materials"
                                value={formData.materials}
                                onChange={handleChange}
                                className="w-full p-2 border border-asl-stone/30 bg-transparent focus:border-asl-gold outline-none transition-colors dark:text-asl-dark-text dark:border-asl-dark-bronze"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-asl-espresso/60 dark:text-asl-dark-text/60 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full p-2 border border-asl-stone/30 bg-transparent focus:border-asl-gold outline-none transition-colors dark:text-asl-dark-text dark:border-asl-dark-bronze"
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-asl-espresso text-white uppercase tracking-widest text-xs hover:bg-asl-espresso/80 transition-colors"
                            >
                                {editingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                            {editingProduct && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingProduct(null);
                                        setFormData({
                                            name: '',
                                            price: 0,
                                            category: 'Cultural',
                                            origin: '',
                                            description: '',
                                            image: '',
                                            images: [],
                                            materials: '',
                                            stripeProductId: '',
                                            stripePriceId: ''
                                        });
                                    }}
                                    className="px-6 py-3 border border-asl-espresso text-asl-espresso uppercase tracking-widest text-xs hover:bg-asl-espresso hover:text-white transition-colors dark:border-asl-dark-text dark:text-asl-dark-text dark:hover:bg-asl-dark-text dark:hover:text-asl-dark-walnut"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleSyncToStripe}
                                disabled={isSyncing}
                                className={`px-4 py-3 border border-asl-gold text-asl-gold uppercase tracking-widest text-xs hover:bg-asl-gold hover:text-white transition-colors dark:border-asl-gold dark:text-asl-gold ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSyncing ? 'Syncing...' : 'Sync to Stripe'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-serif text-asl-espresso dark:text-asl-dark-text mb-6">Current Inventory</h3>
                    {products.map((product) => (
                        <div key={product.id} className={`flex gap-4 p-4 border ${theme === 'light' ? 'border-asl-stone/30' : 'border-asl-dark-bronze/30'} hover:border-asl-gold transition-colors`}>
                            <div className="w-20 h-24 bg-gray-200 flex-shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-lg font-serif text-asl-espresso dark:text-asl-dark-text">{product.name}</h4>
                                    <span className="text-sm font-sans">${product.price}</span>
                                </div>
                                <p className="text-xs uppercase tracking-widest text-asl-gold mt-1">{product.category}</p>
                                {product.images && product.images.length > 0 && (
                                    <p className="text-[10px] text-asl-espresso/40 dark:text-asl-dark-text/40 mt-1">+{product.images.length} extra images</p>
                                )}
                                <p className="text-sm text-asl-espresso/60 dark:text-asl-dark-text/60 mt-2 line-clamp-2">{product.description}</p>
                                <div className="flex gap-4 mt-4">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="text-xs uppercase border-b border-transparent hover:border-asl-gold hover:text-asl-gold transition-colors dark:text-asl-dark-text"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="text-xs uppercase border-b border-transparent hover:border-red-500 hover:text-red-500 transition-colors text-asl-espresso/40 dark:text-asl-dark-text/40"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default Admin;
