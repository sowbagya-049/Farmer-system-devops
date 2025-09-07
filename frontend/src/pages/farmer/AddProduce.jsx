import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Calendar, Package, DollarSign, FileText, IndianRupee } from 'lucide-react';
import { produceService } from '../../services/produceService';

const AddProduce = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const categories = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Herbs',
    'Dairy',
    'Meat',
    'Other',
  ];

  const units = [
    'kg',
    'lb',
    'pieces',
    'bunches',
    'bags',
    'boxes',
    'liters',
    'gallons',
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await produceService.addProduce(data);
      toast.success('Produce added successfully!');
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add produce');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add New Produce</h2>
        <p className="mt-2 text-gray-600">
          Register your daily available produce with quantity limits.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Produce Name
            </label>
            <div className="mt-1 relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('name', { required: 'Produce name is required' })}
                type="text"
                className="input-field pl-10"
                placeholder="e.g., Fresh Tomatoes"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="input-field mt-1"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity Available
            </label>
            <input
              {...register('quantity', {
                required: 'Quantity is required',
                min: { value: 1, message: 'Quantity must be at least 1' },
              })}
              type="number"
              min="1"
              className="input-field mt-1"
              placeholder="e.g., 50"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="unit"
              className="block text-sm font-medium text-gray-700"
            >
              Unit
            </label>
            <select
              {...register('unit', { required: 'Unit is required' })}
              className="input-field mt-1"
            >
              <option value="">Select unit</option>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            {errors.unit && (
              <p className="mt-1 text-sm text-red-600">{errors.unit.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="pricePerUnit"
              className="block text-sm font-medium text-gray-700"
            >
              Price per Unit (₹)
            </label>
            <div className="mt-1 relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('pricePerUnit', {
                  required: 'Price is required',
                  min: { value: 0.01, message: 'Price must be greater than 0' },
                })}
                type="number"
                step="0.01"
                min="0.01"
                className="input-field pl-10"
                placeholder="e.g., 2.50"
              />
            </div>
            {errors.pricePerUnit && (
              <p className="mt-1 text-sm text-red-600">
                {errors.pricePerUnit.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="availableDate"
              className="block text-sm font-medium text-gray-700"
            >
              Available Date
            </label>
            <div className="mt-1 relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('availableDate', {
                  required: 'Available date is required',
                })}
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="input-field pl-10"
              />
            </div>
            {errors.availableDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.availableDate.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mt-1 relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              {...register('description')}
              rows={4}
              className="input-field pl-10"
              placeholder="Describe your produce quality, growing methods, etc..."
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding Produce...' : 'Add Produce'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduce;
