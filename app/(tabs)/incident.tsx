import { StyleSheet } from 'react-native';

import IncidentListComponent from '@/components/incident/IncidentListComponent';
import { getIncidents } from '@/components/incident/IncidentApi';
import { useEffect, useState } from 'react';

export default function IncidentScreen() {
  const [incidents, setIncidents] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [noMore, setNoMore] = useState(false);

  const requestIncidents = async () => {
    if (currentPage === 1) {
      setRefreshing(true)
    }
    setLoading(true)
    const localIncidents: any = await getIncidents(currentPage)
    if (localIncidents.length === 0) {
      setNoMore(true);
      return
    }
    setLoading(false)
    if (currentPage === 1) {
      setIncidents(localIncidents)
      setRefreshing(false)
    } else {
      setIncidents((prevState: any) => [...prevState, ...localIncidents])
    }
  }

  useEffect(() => {
    requestIncidents()
  }, [currentPage])

  return (

    <IncidentListComponent
      loadingContent={loading}
      refreshing={refreshing}
      noMore={noMore}
      dataSource={incidents}
      requestMore={() => setCurrentPage((prevState: number) => prevState + 1)}
      refreshIncidents={() => setCurrentPage(1)}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    paddingTop: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
