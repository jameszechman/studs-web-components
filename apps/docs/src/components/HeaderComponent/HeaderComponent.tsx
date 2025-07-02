import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import { useDocsVersion } from '@docusaurus/theme-common/internal';
import { BASE_URL_GITHUB, BASE_URL_STRB, MAIN_GITHUB_URL } from '@site/src/utils/constants';
import React from 'react';
import styles from './styles.module.scss';

interface HeaderComponent {
  htmlTag: string;
  jsxTag: string;
  urlGithub: string;
  urlStrbook: string;
  status: string;
  folder: 'display' | 'overlays' | 'inputs' | 'navigation';
}

const HeaderComponent = ({ htmlTag, jsxTag, urlGithub, urlStrbook, status, folder }: HeaderComponent) => {
  const { label, version, ...rest } = useDocsVersion();
  const getCDNLink = () => {
    if(version === "current") return;
    const componentTagName = htmlTag.split('-');
    componentTagName.shift();
    const component = componentTagName.join("-");
    const url = `https://unpkg.com/@studs/ui@${version}/dist/components/${folder}/${component}.js`;
    if(folder && component && url) return url;
  }
  const tag = `<${htmlTag}>`;
  return (
    <div className={styles.header}>
      <code>
        {tag} | {jsxTag}
      </code>
      <div className={styles.wrapper}>
        {/* <studs-chip ref={ref} class="custom" variant="infor" size="small">
          {version || versionDefault}
        </studs-chip> */}
        <BrowserOnly>
          {() => {
          const StudsChip =
            require('@studs/react').StudsChip;
          return <StudsChip
          className={`custom ${styles.custom} ${styles[status.toLowerCase()]}`}
          size="small"
          selected
        >
          {status}
        </StudsChip>;
        }}
        </BrowserOnly>
        <Link
          to={urlGithub ? `${BASE_URL_GITHUB}/${urlGithub}`: MAIN_GITHUB_URL}
          target="_blank"
        >
          <studs-button button-type='link' size="small"><img src="/img/github.svg" alt="github" className={styles.img} /> Github</studs-button>
        </Link>
        <Link
          to={`${BASE_URL_STRB}/${urlStrbook}`}
          target="_blank"
        >
          <studs-button button-type='link' size="small">
          <img
            src="/img/storybook.svg"
            alt="storybook"
            className={styles.img}
          />
          Storybook
          </studs-button>
        </Link>
        {getCDNLink() && <Link
          to={getCDNLink() || '#'}
          target="_blank"
        >
          <studs-button button-type="link" size="small">
            <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg" color="#000000">
              <path
                d="M14 11.9976C14 9.5059 11.683 7 8.85714 7C8.52241 7 7.41904 7.00001 7.14286 7.00001C4.30254 7.00001 2 9.23752 2 11.9976C2 14.376 3.70973 16.3664 6 16.8714C6.36756 16.9525 6.75006 16.9952 7.14286 16.9952"
                stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path
                d="M10 11.9976C10 14.4893 12.317 16.9952 15.1429 16.9952C15.4776 16.9952 16.581 16.9952 16.8571 16.9952C19.6975 16.9952 22 14.7577 22 11.9976C22 9.6192 20.2903 7.62884 18 7.12383C17.6324 7.04278 17.2499 6.99999 16.8571 6.99999"
                stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            CDN
          </studs-button>
        </Link>}
      </div>
    </div>
  );
};

export default HeaderComponent;
