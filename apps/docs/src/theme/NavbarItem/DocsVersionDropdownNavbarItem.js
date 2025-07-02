import React, { useRef, useEffect } from 'react';
import {
  useVersions,
  useActiveDocContext,
} from '@docusaurus/plugin-content-docs/client';
import { useDocsPreferredVersion } from '@docusaurus/theme-common';
import { useLocation, useHistory } from '@docusaurus/router';
import BrowserOnly from '@docusaurus/BrowserOnly';

const getVersionMainDoc = (version) =>
  version.docs.find((doc) => doc.id === version.mainDocId);
export default function DocsVersionDropdownNavbarItem({
  mobile,
  docsPluginId,
  dropdownActiveClassDisabled,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}) {
  const history = useHistory();
  const { search, hash } = useLocation();
  const activeDocContext = useActiveDocContext(docsPluginId);
  const versions = useVersions(docsPluginId);
  const { savePreferredVersionName } = useDocsPreferredVersion(docsPluginId);
  const versionLinks = versions.map((version) => {
    // We try to link to the same doc, in another version
    // When not possible, fallback to the "main doc" of the version
    const versionDoc =
      activeDocContext.alternateDocVersions[version.name] ??
      getVersionMainDoc(version);
    return {
      label: version.label,
      value: version.label,
      // preserve ?search#hash suffix on version switches
      to: `${versionDoc.path}${search}${hash}`,
      isActive: () => version === activeDocContext.activeVersion,
      onClick: () => savePreferredVersionName(version.name),
    };
  });
  const items = [
    ...dropdownItemsBefore,
    ...versionLinks,
    ...dropdownItemsAfter,
  ];

  const [activeVersion, setActiveVersion] = React.useState(items.find(x => x.isActive()));

  const _selectHandler = (event) => {
    const value = event.target.value;
    const version = _items.find((x) => x.value === value);
    const {to} = version;
    if (!to) return;
    setActiveVersion(version)
    history.push(to);
  }

  const _items = items?.map(item => ({
    ...item,
    value: item.label,
  })) || [];

  return (
    <BrowserOnly>
    {() => {
    const StudsDropdown =
      require('@studs/react').StudsDropdown;
      return <StudsDropdown
      class="version-dropdown"
      size="small"
      value={activeVersion?.value}
      onChange={_selectHandler}
      options={_items}
    ></StudsDropdown>;
  }}
  </BrowserOnly>
  );
}
