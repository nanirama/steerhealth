"use client";

import React from 'react';
import ContactForm from '@/components/Elements/ContactForm';

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto">
        <ContactForm 
          selected={true} 
          formId="11c0bf42-4a73-40dc-b82a-bc277eef5021"
        />
      </div>
    </div>
  );
}
