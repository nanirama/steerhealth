import React from "react";

const FooterSocialIcons = () => {
  return (
    <nav aria-label="Social media links" role="navigation">
      <ul className="flex gap-8 mt-2 list-none p-0 m-0">
        <li>
          <a 
            href="https://www.facebook.com/steerhealth/" 
            aria-label="Visit Steer Health on Facebook (opens in new tab)" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2 rounded transition-colors hover:opacity-75"
          >
            <svg 
              width="20" 
              height="22" 
              viewBox="0 0 20 22" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <title>Facebook</title>
              <path 
                d="M10.0013 2.34277C5.39893 2.34277 1.66797 6.07373 1.66797 10.6761C1.66797 14.8355 4.71534 18.283 8.69924 18.9082V13.0849H6.58333V10.6761H8.69924V8.84017C8.69924 6.75163 9.94332 5.59798 11.8468 5.59798C12.7586 5.59798 13.7122 5.76074 13.7122 5.76074V7.81152H12.6614C11.6262 7.81152 11.3034 8.45389 11.3034 9.11294V10.6761H13.6146L13.2452 13.0849H11.3034V18.9082C15.2872 18.283 18.3347 14.8355 18.3347 10.6761C18.3347 6.07373 14.6037 2.34277 10.0013 2.34277Z" 
                fill="currentColor" 
              />
            </svg>
          </a>
        </li>
        <li>
          <a 
            href="https://twitter.com/Steer_Health" 
            aria-label="Visit Steer Health on X (formerly Twitter) (opens in new tab)" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block focus:outline-none focus:ring-0 focus:ring-gray-800 focus:ring-offset-2 rounded transition-colors hover:opacity-75"
          >
            <svg 
              width="20" 
              height="22" 
              viewBox="0 0 20 22" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <title>X (formerly Twitter)</title>
              <path 
                d="M14.3134 4.21094H16.6135L11.5884 9.85877L17.5 17.5443H12.8713L9.24592 12.8831L5.09769 17.5443H2.7962L8.17097 11.5033L2.5 4.21094H7.24621L10.5232 8.47146L14.3134 4.21094ZM13.5061 16.1904H14.7807L6.55367 5.49367H5.186L13.5061 16.1904Z" 
                fill="currentColor" 
              />
            </svg>
          </a>
        </li>
        <li>
          <a 
            href="https://www.linkedin.com/company/steerhealth/" 
            aria-label="Visit Steer Health on LinkedIn (opens in new tab)" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block focus:outline-none focus:ring-0 focus:ring-gray-800 focus:ring-offset-2 rounded transition-colors hover:opacity-75"
          >
            <svg 
              width="20" 
              height="22" 
              viewBox="0 0 20 22" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <title>LinkedIn</title>
              <path 
                d="M15.8678 16.5437H13.3987V12.677C13.3987 11.7545 13.382 10.567 12.1145 10.567C10.8278 10.567 10.6312 11.572 10.6312 12.6087V16.5437H8.16199V8.59032H10.532V9.67782H10.5653C10.8028 9.27228 11.1456 8.93866 11.5575 8.7124C11.9694 8.48614 12.4349 8.3757 12.9045 8.39282C15.4078 8.39282 15.8695 10.0395 15.8695 12.1812L15.8678 16.5437ZM5.37533 7.50365C4.58866 7.50365 3.94199 6.85698 3.94199 6.07032C3.94199 5.28448 4.58866 4.63698 5.37533 4.63698C6.16116 4.63698 6.80783 5.28448 6.80866 6.07032C6.80866 6.85615 6.16116 7.50365 5.37533 7.50365ZM6.60866 16.5428H4.13783V8.59032H6.60949V16.5437L6.60866 16.5428ZM17.1003 2.34365H2.89699C2.57484 2.34141 2.26484 2.46652 2.03448 2.69173C1.80412 2.91694 1.67204 3.22403 1.66699 3.54615V17.8078C1.67533 18.4745 2.22949 19.017 2.89699 19.0103H17.0995C17.4222 19.0128 17.7329 18.8878 17.964 18.6625C18.1951 18.4371 18.328 18.1297 18.3337 17.807V3.54448C18.3277 3.22199 18.1948 2.91487 17.9637 2.68985C17.7326 2.46484 17.422 2.34013 17.0995 2.34282V2.34448L17.1003 2.34365Z" 
                fill="currentColor" 
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default FooterSocialIcons;