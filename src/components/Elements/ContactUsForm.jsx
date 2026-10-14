"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ContactUsForm = ({ data, services }) => {

    const [status, setStatus] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const phoneRegex = /^(?:\(\d{3}\)\s?|\d{3}[-\s]?)\d{3}[-\s]?\d{4}$/;


    const onSubmit = async (data) => {
        setStatus("Sending...");

        const htmlContent = `    
    <p>First Name: ${data.firstname}</p>
    <p>Last Name: ${data.lastname}</p>
    <p>Phone: ${data.phone}</p>
    <p>Company Name: ${data.companyname}</p>
    <p>Job Title: ${data.jobtitle}</p>
    <p>Service: ${data.helptoday}</p>
  `;

        const payload = {
            ...data,
            interestedin: Array.isArray(data.interestedin)
                ? data.interestedin.join(', ')
                : data.interestedin,
        };

        try {
            // Send both requests in parallel
            const [emailRes] = await Promise.all([
                // fetch('/api/createLead', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(payload),
                // }),
                fetch('/api/emailSend', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: data.to,
                        subject: `Service Enquiry: ${data.service}`,
                        text: `Welcome to our newsletter!`,
                        html: htmlContent,
                        subjectreceiver: `New Service Enquiry from ${data.to}`,
                        htmlrevier: htmlContent,
                    }),
                }),
            ]);

            // Check responses
            //const leadResult = await leadRes.json();
            const emailResult = await emailRes.json();

            // if (!leadRes.ok) {
            //     console.error('Lead API error:', leadResult);
            //     setStatus(`Failed to save lead: ${leadResult.message || 'Unknown error'}`);
            //     return;
            // }

            if (!emailRes.ok) {
                console.error('Email API error:', emailResult);
                setStatus(`Failed to send email: ${emailResult.message || 'Unknown error'}`);
                return;
            }

            setStatus("Service enquiry submitted successfully!");
            reset();
        } catch (err) {
            console.error('Unexpected error:', err);
            setStatus("Something went wrong. Please try again.");
        }
    };
    return (
        <>
            <div className="w-full py-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4">
                        <div className="relative flex flex-col gap-1">
                            <label className="text-base text-black/80">First Name*</label>
                            <input
                                {...register("firstname", { required: "First name is required" })}
                                className="sm:mb-4 block w-full bg-[#F7F7F7] text-base py-2.5 px-3 text-black rounded-[6px] focus:outline focus:outline-0"
                            />
                            {errors.firstname && <p className="absolute right-1 bottom-1 text-[12px] text-red-800">{errors.firstname.message}</p>}
                        </div>
                        <div className="relative flex flex-col gap-1">
                            <label className="text-base text-black/80">Last Name*</label>
                            <input
                                {...register("lastname", { required: "Last name is required" })}
                                //placeholder="Last Name*"
                                className="sm:mb-4 block w-full bg-[#F7F7F7] text-base py-2.5 px-3 text-black rounded-[6px] focus:outline focus:outline-0"
                            />
                            {errors.lastname && <p className="absolute right-1 bottom-1 text-[12px] text-red-800">{errors.lastname.message}</p>}
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4">
                        <div className="relative flex flex-col gap-1 md:mt-0 mt-4">
                            <label className="text-base text-black/80">Email*</label>
                            <input
                                {...register("to", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email format",
                                    },
                                })}
                                //placeholder="Email*"
                                className="sm:mb-4 block w-full bg-[#F7F7F7] text-base py-2.5 px-3 text-black rounded-[6px] focus:outline focus:outline-0"
                            />
                            {errors.to && <p className="absolute right-1 bottom-1 text-[12px] text-red-800">{errors.to.message}</p>}
                        </div>
                        <div className="relative flex flex-col gap-1">
                            <label className="text-base text-black/80">Phone*</label>
                            <input
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^(\(\d{3}\)[-\s]?|\d{3}[-\s]?)\d{3}[-\s]?\d{4}$/,
                                        message: "Invalid phone number"
                                    }
                                })}
                                onKeyDown={(e) => {
                                    // Allow control keys like Backspace, Delete, Arrow keys, Tab, etc.
                                    const allowedKeys = [
                                        "Backspace",
                                        "Delete",
                                        "ArrowLeft",
                                        "ArrowRight",
                                        "Tab",
                                        "Home",
                                        "End",
                                    ];

                                    // Allow if it's a control key or not a letter
                                    if (
                                        !allowedKeys.includes(e.key) &&
                                        /[a-zA-Z]/.test(e.key)
                                    ) {
                                        e.preventDefault(); // block A–Z characters
                                    }
                                }}
                                //placeholder="Phone*"
                                className="sm:mb-4 block w-full bg-[#F7F7F7] text-base py-2.5 px-3 text-black rounded-[6px] focus:outline focus:outline-0"
                            />
                            {errors.phone && <p className="absolute right-1 bottom-1 text-[12px] text-red-800">{errors.phone.message}</p>}
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4">
                        {/* {errors.service && <p className="absolute right-1 top-0 text-[12px] text-red-800">{errors.service.message}</p>} */}
                        <div className="relative">
                            {errors.service && (
                                <p className="absolute right-1 -bottom-6 text-[12px] text-red-800">{errors.service.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4">
                        <div className="relative flex flex-col gap-1 md:mt-0 mt-4">
                            <label className="text-base text-black/80">Company name*</label>
                            <input
                                {...register("companyname", { required: "Company name is required" })}
                                //placeholder="Company Name*"
                                className="sm:mb-4 block w-full bg-[#F7F7F7] text-base py-2.5 px-3 text-black rounded-[6px] focus:outline focus:outline-0"
                            />
                            {errors.companyname && <p className="absolute right-1 bottom-1 text-[12px] text-red-800">{errors.companyname.message}</p>}
                        </div>
                        <div className="relative flex flex-col gap-1">
                            <label className="text-base text-black/80">Job title*</label>
                            <input
                                {...register("jobtitle", { required: "Job Title is required" })}
                                //placeholder="Job Title*"
                                className="sm:mb-4 block w-full bg-[#F7F7F7] text-base py-2.5 px-3 text-black rounded-[6px] focus:outline focus:outline-0"
                            />
                            {errors.jobtitle && <p className="absolute right-1 bottom-1 text-[12px] text-red-800">{errors.jobtitle.message}</p>}
                        </div>
                    </div>
                    <div className="relative flex flex-col gap-2 md:mt-0 mt-4">
                        <label className="text-base text-black/80">What we can help you with today?</label>
                        <select
                            {...register("helptoday", { required: "Job Title is required" })}
                            className="sm:mb-4 mb-2 block w-full bg-[#F7F7F7] appearance-none text-base py-2.5 px-3 text-black/80 rounded-[6px] focus:outline focus:outline-0"

                        >
                            <option value="">Please Select</option>
                            <option value="hospitals">Hospitals</option>
                            <option value="ascs">ASC's</option>
                            <option value="medicalgroups">Medical Groups</option>
                            <option value="functional-medicine">Functional medicine</option>
                        </select>
                        {errors.helptoday && <p className="absolute right-1 bottom-1 text-[12px] text-red-800">{errors.helptoday.message}</p>}
                    </div>
                    <div className="relative flex flex-row md:justify-start justify-center">
                    <button
                        aria-label="Submit"
                        type="submit"
                        className="bg-gradient-to-t from-[#5384FF] to-[#2362FF] mt-6 text-[15px] mb-0 inline-flex justify-between items-center gap-10 py-2.5 px-4 flex-row cursor-pointer text-center font-medium rounded-[8px] text-[#F7F7F7]"
                    >
                        Let`s go

                    </button>
                    </div>
                </form>
                {status && (
                    <p className="font-semibold text-sm my-3 text-green-800">
                        {status}
                    </p>
                )}
            </div>
        </>
    );
};
export default ContactUsForm;
