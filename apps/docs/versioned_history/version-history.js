import './index.scss';
import { useDocsPreferredVersion } from '@docusaurus/theme-common';
import {
  useVersions,
  useActiveDocContext,
} from '@docusaurus/plugin-content-docs/client';
import { useLocation, useHistory } from '@docusaurus/router';

export default function VersionList(version) {
  const history = useHistory();
  const { search, hash } = useLocation();
  const getVersionMainDoc = (version) => version.docs.find((doc) => doc.id === version.mainDocId);
  const versions = useVersions();
  const activeDocContext = useActiveDocContext();
  const versionLinks = versions.map((version) => {
    const versionDoc =
      activeDocContext.alternateDocVersions[version.name] ??
      getVersionMainDoc(version);
    return {
      label: version.label,
      value: version.label,
      to: `${versionDoc.path}${search}${hash}`,
      isActive: () => version === activeDocContext.activeVersion,
      onClick: () => savePreferredVersionName(version.name),
    };
  });
 
  const _selectHandler = (location) => {
    history.push(location);
  }

  return (
    <>
      <h1>STUDS Versions</h1>
      <p>A directory of all STUDS releases from v1 to present version.</p>
      <hr></hr>
        <div className="version-column">
          <h2>v1.x</h2>
          <p>Every minor and patch release from v1 is listed below.</p>
          <div className="list-group">
            {versionLinks.map((item) => {
              return <a className="list-group-item" onClick={()=> _selectHandler(item.to)}>{item.label}</a>
            })}
          </div>
      </div>
   </>
  );
}
