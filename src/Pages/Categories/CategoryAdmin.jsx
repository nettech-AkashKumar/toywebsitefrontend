import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'

const CategoriesAdd = () => {
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])

    const [target, setTarget] = useState('');
    const [targets, setTargets] = useState([]);



    //load categories from localstorage
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('categories')) || [];
        setCategories(stored)
    }, []);

    //load categories from localstorage
    useEffect(() => {
        const storedTarget = JSON.parse(localStorage.getItem('targets')) || [];
        setTargets(storedTarget)
    }, []);

    //get categories
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/categories/all");
            setCategories(res.data.categories);
            console.log('resdata', res.data.categories)
        } catch (error) {
            console.error('Failed to fetch categories', error)
        }
    };

    //get target
    const fetchTargets = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/target/all");
            setTargets(res.data.targets);
            console.log('targetdata', res.data.targets)
        } catch (error) {
            console.log('Failed to fetch target', error)
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchTargets();
    }, []);

    //submit form handler
    const handleSubmit = async () => {
        const trimmedCategory = category.trim();
        const trimmedTarget = target.trim()
        try {
            if (trimmedCategory) {
                const resCat = await axios.post('http://localhost:8081/api/categories/add', { name: trimmedCategory })
                setCategories(prev => Array.isArray(prev) ? [...prev, resCat.data.category] : [resCat.data.category]);
                setCategory('')
            }

            if (trimmedTarget) {
                const resTar = await axios.post("http://localhost:8081/api/target/add", { target: trimmedTarget })
                setTargets(prev => Array.isArray(prev) ? [...prev, resTar.data.target] : [resTar.data.target])
                setTarget('')
            }
            fetchCategories();
            fetchTargets();
        } catch (error) {
            console.error('Failed to add category', error)
        }
    }

    //delete category
    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/categories/${id}`)
            fetchCategories();  //call your fetch function to reload the list
        } catch (error) {
            console.error('Failed to delete category', error)
        }
    }

    //delete target
    const handleDeleteTarget = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/target/${id}`)
            fetchTargets();
        } catch (error) {
            console.error('Failed  to delete category', error)
        }
    }

    return (
        <>
            <div className='p-4 max-w-3xl mx-auto' style={{ maxWidth: '1200px' }}>
                {/* Single combined form */}
                <div className='bg-white p-4 shadow-md rounded mb-6'>
                    <h2 className='text-2xl font-semibold mb-4 text-center' style={{ fontWeight: 'bold', fontSize: '20px' }}>Add Category or Target</h2>
                    <div className='d-flex flex-column'>
                        <label className='block mb-2 font-medium'>Category(Optional)</label>
                        <input
                            type="text"
                            placeholder='Product Category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='w-full px-3 py-2 border rounded mb-4'
                        />

                        <label className='block mb-2 font-medium'>Target(Optional)</label>
                        <input
                            type="text"
                            placeholder='Product Target'
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            className='w-full px-3 py-2 border rounded mb-4'
                        />

                        <button
                            onClick={handleSubmit}
                            className='w-full text-white px-4 py-2 rounded'
                            style={{ backgroundColor: '#8565d1' }}
                        >
                            Submit
                        </button>
                    </div>
                </div>

                {/* Categories list */}
                <div className='d-flex flex-row' style={{ gap: '30px', marginTop: '20px' }}>
                    <div className="p-4 rounded shadow mb-6" style={{ width: '400px', backgroundColor: 'white' }}>
                        <h3 className="text-xl font-medium mb-2">Available Categories</h3>
                        <div className="flex flex-wrap gap-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <div key={cat._id} className=' gap-2 border p-2 rounded' style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '10px' }}>
                                        <span>{cat?.name}</span>
                                        <button className='' style={{ color: 'red', backgroundColor: 'transparent' }} onClick={() => handleDeleteCategory(cat._id)}><MdDelete /></button>
                                    </div>
                                ))
                            ) : (
                                <p className='text-gray-500'>No categories added yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Targets list */}
                    <div className="p-4 rounded shadow mb-6" style={{ width: '400px', backgroundColor: 'white' }}>
                        <h3 className="text-xl font-medium mb-2">Available Targets</h3>
                        <div className="flex flex-wrap gap-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            {targets.length > 0 ? (
                                targets.map((tar) => (
                                    <div key={tar._id} className=' gap-2 border p-2 rounded' style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '10px' }}>
                                        <span>{tar?.target}</span>
                                        <button className='' style={{ color: 'red', backgroundColor: 'transparent' }} onClick={() => handleDeleteTarget(tar._id)}><MdDelete /></button>

                                    </div>
                                ))
                            ) : (
                                <p className='text-gray-500'>No targets added yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoriesAdd;
