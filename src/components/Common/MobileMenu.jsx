'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import classNames from 'classnames';

const MobileMenu = ({ isOpen, onClose }) => {
  const [activeMenu, setActiveMenu] = useState('');
  const [menuClass, setMenuClass] = useState('translate-x-0');

  // Animate transitions when activeMenu changes
    useEffect(() => {
    if (!isOpen) {
      setActiveMenu("main");
      //setPrevMenus([]);
    }
  }, [isOpen]);
  useEffect(() => {
    console.log('activemenu', activeMenu)
    setMenuClass('translate-x-full');
    const timeout = setTimeout(() => {
      setMenuClass('translate-x-0');
    }, 20);
    
    return () => clearTimeout(timeout);
    
  }, [activeMenu]);

  const menuItems = ['Platform', 'Solutions', 'Company', 'Resources'];

  const ChevronRightIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );

  const ChevronLeftIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  );

  const CloseIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const buttonClickHandler = (menuItem) => {
    setActiveMenu(menuItem);
  };

  const renderMainMenu = () => (
    <div className="space-y-6 p-6">
      <div className="flex justify-end">
        <button aria-label='Close' onClick={() => onClose()}>{CloseIcon}</button>
      </div>
      {menuItems.map((item) => (
        <button
          aria-label={item}
          key={item}
          className="flex justify-between w-full text-left text-lg font-medium"
          onClick={() => buttonClickHandler(item.toLowerCase())}
        >
          {item}
          {ChevronRightIcon}
        </button>
      ))}
    </div>
  );

  const renderSubMenu = (title, content) => (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <button aria-label='Back' onClick={() => setActiveMenu('main')}>{ChevronLeftIcon}</button>
        <h2 className="text-lg font-semibold">{title}</h2>
        <button aria-label='Close' onClick={() => setActiveMenu(null)}>{CloseIcon}</button>
      </div>
      {content}
    </div>
  );

  const platformItems = [
  { label: 'Acquire', link: '/platforms/acquire' },
  { label: 'Automate', link: '/platforms/automate' },
  { label: 'Navigate', link: '/platforms/navigate' },
];
 const solutionItems = [
  { label: 'Acquire', link: '/platforms/acquire' },
  { label: 'Automate', link: '/platforms/automate' },
  { label: 'Navigate', link: '/platforms/navigate' },
];

  const platformSubmenu = renderSubMenu('Platform', (
    <div className="space-y-4">
      {platformItems.map((item) => (
        <div key={item.label} className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
          <div>
            <div className="font-semibold">{item.label}</div>
            <Link className="text-sm underline" href={item.link}>Learn</Link>
          </div>
          <Image src="/images/hdr-dd-platform-img.webp" width={54} height={54} alt={item?.label} className="w-12 h-auto" />
        </div>
      ))}
    </div>
  ));

  const solutionsSubmenu = renderSubMenu('Solutions', (
    <div className="space-y-4 border border-red-600">
      {solutionItems.map((item) => (
        <div key={item.label} className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
          <div>
            <div className="font-semibold">{item.label}</div>
            <Link className="text-sm underline" href={item.link}>Learn</Link>
          </div>
          <Image src="/images/hdr-dd-platform-img.webp" width={54} height={54} alt={item?.label} className="w-12 h-auto" />
        </div>
      ))}
      {/* <div>
        <strong>Hospitals</strong>
        <ul className="ml-4 list-disc">
          {['Emergency Room', 'In-Patient', 'Ambulatory', 'Radiology', 'Call Center'].map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>ASC's</strong>
        <ul className="ml-4 list-disc">
          {['Pre-Surgical', 'PeriOperative', 'Post-Surgical', 'Call Center'].map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Medical</strong>
        <ul className="ml-4 list-disc">
          <li>Referral Automation</li>
        </ul>
      </div> */}
    </div>
  ));

  const companySubmenu = renderSubMenu('Company', (
    <div className="space-y-4 text-sm">
      <div>
        <strong>About Us</strong>
        <ul className="ml-4 list-disc">
          <li>Mission & Vision</li>
          <li>Security</li>
          <li>Testimonials</li>
          <li>FAQs</li>
        </ul>
      </div>
      <div>
        <strong>Legal</strong>
        <ul className="ml-4 list-disc">
          <li>Terms of use</li>
          <li>Privacy Policy</li>
          <li>Cookie Notice</li>
          <li>Developer Agreement</li>
        </ul>
      </div>
      <div>
        <strong>Contact Us</strong>
        <p className="ml-4">Drop us a message and we will surely reach out</p>
      </div>
    </div>
  ));

  const resourcesSubmenu = renderSubMenu('Resources', (
    <div className="space-y-4">
      {['Blogs', 'Case Studies', 'EHR Integration'].map(item => (
        <div key={item} className="flex justify-between items-center">
          <span className="text-base font-medium">{item}</span>
          {ChevronRightIcon}
        </div>
      ))}
    </div>
  ));

  const getActiveView = () => {
    switch (activeMenu) {
      case 'platform': return platformSubmenu;
      case 'solutions': return solutionsSubmenu;
      case 'company': return companySubmenu;
      case 'resources': return resourcesSubmenu;
      default: return renderMainMenu();
    }
  };
  if(isOpen){
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
        <div
          className={classNames(
            "transition-transform duration-300 ease-in-out transform w-full",
            menuClass
          )}
        >
          {getActiveView()}
        </div>
      </div>
    );
  }

  
};

export default MobileMenu;
