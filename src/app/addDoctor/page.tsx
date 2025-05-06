'use client'

import React, { useState } from 'react';
import axios from 'axios';


interface DoctorFormData {
    firstName: string;
    lastName: string;
    email: string;
    specialization: string[];
    experience: string;
    fees: string;
    modeOfConsult: string[];
    languages: string[];
    facility: string[];
    likes: number;
    location: string;
    onlineAvailability: boolean;
    offlineAvailability: boolean;
    onlineAvailabilityStart: { hours: string; minutes: string };
    onlineAvailabilityEnd: { hours: string; minutes: string };
    offlineAvailabilityStart: { hours: string; minutes: string };
    offlineAvailabilityEnd: { hours: string; minutes: string };
}

const DoctorForm = () => {
    const [formData, setFormData] = useState<DoctorFormData>({
        firstName: '',
        lastName: '',
        email: '',
        specialization: [],
        experience: '',
        fees: '',
        modeOfConsult: [],
        languages: [],
        facility: [],
        likes: 0,
        location: '',
        onlineAvailability: false,
        offlineAvailability: false,
        onlineAvailabilityStart: { hours: '', minutes: '' },
        onlineAvailabilityEnd: { hours: '', minutes: '' },
        offlineAvailabilityStart: { hours: '', minutes: '' },
        offlineAvailabilityEnd: { hours: '', minutes: '' },
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const isDataValid = () => {
        let isValid = true;
        let newErrors = { firstName: '', lastName: '', email: '' };

        // Check required fields
        const { firstName, lastName, email, specialization, experience, fees, modeOfConsult, languages, facility, location } = formData;
        
        if (!firstName) {
            newErrors.firstName = 'First name is required';
            isValid = false;
        } else if (!/^[a-zA-Z]*$/.test(firstName)) {
            newErrors.firstName = 'First name should contain only letters';
            isValid = false;
        }

        if (!lastName) {
            newErrors.lastName = 'Last name is required';
            isValid = false;
        } else if (!/^[a-zA-Z]*$/.test(lastName)) {
            newErrors.lastName = 'Last name should contain only letters';
            isValid = false;
        }

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!specialization.length || !experience || !fees || !modeOfConsult.length || !languages.length || !facility.length || !location) {
            isValid = false;
            alert('Please fill in all required fields.');
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // Always update the state first to allow typing/deleting
        setFormData({ ...formData, [name]: value });
        
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        
        // Get the current array for the checkbox group
        const currentArray = [...(formData[name as keyof DoctorFormData] as string[])];
        
        if (checked) {
            // Add the value if checked
            setFormData({ 
                ...formData, 
                [name]: [...currentArray, value] 
            });
        } else {
            // Remove the value if unchecked
            const updatedArray = currentArray.filter(item => item !== value);
            setFormData({
                ...formData,
                [name]: updatedArray
            });
        }
    };

    const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name } = e.target;
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({ ...formData, [name]: selectedOptions });
    };

    const handleAvailabilityCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [category, field] = name.split('.');
        setFormData({
            ...formData,
            [category]: {
                ...formData[category as keyof DoctorFormData] as Record<string, string>,
                [field]: value
            }
        });
    };

    const handleSubmit = async () => {
        if (!isDataValid()) return;
        
        // Combine first and last name
        const doctorData = {
            ...formData,
            name: `${formData.firstName} ${formData.lastName}`
        };
        
        try {
            const res = await axios.post('/api/add_doctor', doctorData);
            alert('Doctor information saved successfully!');
            // Optionally handle response here
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again later.');
        }
        console.log('Form submitted:', doctorData);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Add Doctor</h1>
            </div>
            
            <div className="space-y-8">
                {/* Personal Information Section */}
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="first-name"
                                    name="firstName"
                                    type="text"
                                    autoComplete="given-name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={`block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${errors.firstName ? 'border-red-500 outline-red-500' : 'outline-gray-300'} placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errors.firstName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="last-name"
                                    name="lastName"
                                    type="text"
                                    autoComplete="family-name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={`block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${errors.lastName ? 'border-red-500 outline-red-500' : 'outline-gray-300'} placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errors.lastName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${errors.email ? 'border-red-500 outline-red-500' : 'outline-gray-300'} placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Professional Information */}
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold text-gray-900">Professional Information</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="specialization" className="block text-sm font-medium text-gray-900">
                                Specialization
                            </label>
                            <div className="mt-2">
                                <input
                                    id="specialization"
                                    name="specialization"
                                    type="text"
                                    value={formData.specialization.join(',')}
                                    onChange={(e) => setFormData({...formData, specialization: e.target.value.split(',')})}
                                    placeholder="Enter specializations separated by commas"
                                    className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-900">
                                Experience (in years)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="experience"
                                    name="experience"
                                    type="number"
                                    min="0"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="fees" className="block text-sm font-medium text-gray-900">
                                Fees (in INR)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="fees"
                                    name="fees"
                                    type="number"
                                    min="0"
                                    value={formData.fees}
                                    onChange={handleInputChange}
                                    className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Mode of Consultation
                            </label>
                            <div className="flex gap-4">
                                <div className="flex items-center">
                                    <input
                                        id="online-consult"
                                        name="modeOfConsult"
                                        type="checkbox"
                                        value="Online Consult"
                                        checked={formData.modeOfConsult.includes("Online Consult")}
                                        onChange={handleCheckboxChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="online-consult" className="ml-2 text-sm text-gray-700">
                                        Online Consult
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="hospital-visit"
                                        name="modeOfConsult"
                                        type="checkbox"
                                        value="Hospital Visit"
                                        checked={formData.modeOfConsult.includes("Hospital Visit")}
                                        onChange={handleCheckboxChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="hospital-visit" className="ml-2 text-sm text-gray-700">
                                        Hospital Visit
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="languages" className="block text-sm font-medium text-gray-900">
                                Languages
                            </label>
                            <div className="mt-2">
                                <select
                                    id="languages"
                                    name="languages"
                                    multiple
                                    value={formData.languages}
                                    onChange={handleMultiSelectChange}
                                    className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    {["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi", "Gujarati"].map((language) => (
                                        <option key={language} value={language}>
                                            {language}
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-1 text-xs text-gray-500">Hold Ctrl (or Cmd) to select multiple options</p>
                            </div>
                            
                            <label htmlFor="facility" className="block text-sm font-medium text-gray-900 mt-4">
                                Facility
                            </label>
                            <div className="flex gap-4">
                                <div className='flex items-center'>
                                    <input
                                        id="apollo-hospital"
                                        name="facility"
                                        type="checkbox"
                                        value="Apollo Hospital"
                                        checked={formData.facility.includes("Apollo Hospital")}
                                        onChange={handleCheckboxChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                    <label htmlFor="apollo-hospital" className="ml-2 text-sm text-gray-700">
                                        Apollo Hospital
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <input
                                        id="other-clinic"
                                        name="facility"
                                        type="checkbox"
                                        value="Other clinic"
                                        checked={formData.facility.includes("Other clinic")}
                                        onChange={handleCheckboxChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="other-clinic" className="ml-2 text-sm text-gray-700">
                                        Other clinic
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-900">
                                Rating (%)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="rating"
                                    name="likes"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.likes}
                                    onChange={handleInputChange}
                                    className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-900">
                                Location
                            </label>
                            <div className="mt-2">
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Availability Information */}
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold text-gray-900">Availability</h2>
                    <p className="text-sm text-gray-500 mt-1 mb-4">All times should be in 24-hour format (0-23 hours)</p>
                    
                    {/* Online Availability */}
                    <div className="mb-6">
                        <h3 className="text-base font-medium text-gray-900 mb-3">Online Consultation Hours</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                                <div className="mt-2 flex space-x-4">
                                    <div>
                                        <label htmlFor="online-start-hours" className="block text-xs text-gray-500">Hours</label>
                                        <input
                                            id="online-start-hours"
                                            name="onlineAvailabilityStart.hours"
                                            type="number"
                                            min="0"
                                            max="23"
                                            value={formData.onlineAvailabilityStart.hours}
                                            onChange={handleTimeChange}
                                            className="mt-1 block w-20 border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="online-start-minutes" className="block text-xs text-gray-500">Minutes</label>
                                        <input
                                            id="online-start-minutes"
                                            name="onlineAvailabilityStart.minutes"
                                            type="number"
                                            min="0"
                                            max="59"
                                            value={formData.onlineAvailabilityStart.minutes}
                                            onChange={handleTimeChange}
                                            className="mt-1 block w-20 border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Time</label>
                                <div className="mt-2 flex space-x-4">
                                    <div>
                                        <label htmlFor="online-end-hours" className="block text-xs text-gray-500">Hours</label>
                                        <input
                                            id="online-end-hours"
                                            name="onlineAvailabilityEnd.hours"
                                            type="number"
                                            min="0"
                                            max="23"
                                            value={formData.onlineAvailabilityEnd.hours}
                                            onChange={handleTimeChange}
                                            className="mt-1 block w-20 border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="online-end-minutes" className="block text-xs text-gray-500">Minutes</label>
                                        <input
                                            id="online-end-minutes"
                                            name="onlineAvailabilityEnd.minutes"
                                            type="number"
                                            min="0"
                                            max="59"
                                            value={formData.onlineAvailabilityEnd.minutes}
                                            onChange={handleTimeChange}
                                            className="mt-1 block w-20 border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Offline Availability */}
                    <div>
                        <h3 className="text-base font-medium text-gray-900 mb-3">Hospital Visit Hours</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                                <div className="mt-2 flex space-x-4">
                                    <div>
                                        <label htmlFor="offline-start-hours" className="block text-xs text-gray-500">Hours</label>
                                        <input
                                            id="offline-start-hours"
                                            name="offlineAvailabilityStart.hours"
                                            type="number"
                                            min="0"
                                            max="23"
                                            value={formData.offlineAvailabilityStart.hours}
                                            onChange={handleTimeChange}
                                            className="mt-1 block w-20 border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="offline-start-minutes" className="block text-xs text-gray-500">Minutes</label>
                                        <input
                                            id="offline-start-minutes"
                                            name="offlineAvailabilityStart.minutes"
                                            type="number"
                                            min="0"
                                            max="59"
                                            value={formData.offlineAvailabilityStart.minutes}
                                            onChange={handleTimeChange}
                                            className="mt-1 block w-20 border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Time</label>
                                <div className="mt-2 flex space-x-4">
                                    <div>
                                        <label htmlFor="offline-end-hours" className="block text-xs text-gray-500">Hours</label>
                                        <input
                                            id="offline-end-hours"
                                            name="offlineAvailabilityEnd.hours"
                                            type="number"
                                            min="0"
                                            max="23"
                                            value={formData.offlineAvailabilityEnd.hours}
                                            onChange={handleTimeChange}
                                            className="mt-1 block w-20 border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="offline-end-minutes" className="block text-xs text-gray-500">Minutes</label>
                                        <input
                                            id="offline-end-minutes"
                                            name="offlineAvailabilityEnd.minutes"
                                            type="number"
                                            min="0"
                                            max="59"
                                            value={formData.offlineAvailabilityEnd.minutes}
                                            onChange={handleTimeChange}
                                            className="mt-1 block w-20 border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorForm;