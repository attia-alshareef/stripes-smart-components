import { useState, useEffect, useCallback } from 'react';

import makeRequest from './makeRequest';

const useSectionTitleFetch = (okapi, moduleName) => {
  const [sectionTitleLoaded, setSectionTitleLoaded] = useState(false);
  const [sectionTitle, setSectionTitle] = useState({});
  const [sectionTitleFetchFailed, setSectionTitleFetchFailed] = useState(false);

  const makeOkapiRequest = useCallback(
    makeRequest(okapi)(),
    [okapi.token, okapi.tenant, okapi.url]
  );

  useEffect(() => {
    const url = `configurations/entries?query=(module==${moduleName} and configName==custom_fields_label)`;
    const fetchCustomFields = async () => {
      const response = await makeOkapiRequest(url)({
        method: 'GET',
      });

      if (response.ok) {
        const { configs } = await response.json();

        setSectionTitle({ ...configs[0] });
        setSectionTitleLoaded(true);
      } else {
        setSectionTitleFetchFailed(true);
      }
    };

    fetchCustomFields();
  }, [makeOkapiRequest, moduleName, sectionTitleLoaded]);

  return {
    sectionTitle,
    sectionTitleLoaded,
    sectionTitleFetchFailed,
  };
};

export default useSectionTitleFetch;