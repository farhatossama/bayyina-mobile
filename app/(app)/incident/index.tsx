import { StyleSheet, View, StatusBar, SafeAreaView, I18nManager } from 'react-native';
import { Button, Card, Text } from '@ui-kitten/components';

import IncidentListComponent from '@/components/incident/IncidentListComponent';
import { getIncidents } from '@/components/incident/IncidentApi';
import { useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/native";

export default function IncidentScreen() {
  const [incidents, setIncidents] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [noMore, setNoMore] = useState(false);
  const isFocused = useIsFocused();

  const requestIncidents = async () => {
    if (currentPage === 1) {
      setRefreshing(true)
    }
    setLoading(true)
    const localIncidents: any[] = await getIncidents(currentPage)
    if (localIncidents) {

      if (localIncidents?.length === 0) {
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
    }else{
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (isFocused) {
      requestIncidents()
    } else {
      setCurrentPage(1)
    }
  }, [isFocused, currentPage])


  return (
    <SafeAreaView style={styles.container2}>

      <View>
        <Text style={styles.title} category='h6' >أحداث</Text>
      </View>

      <IncidentListComponent
        loadingContent={loading}
        refreshing={refreshing}
        noMore={noMore}
        dataSource={incidents}
        requestMore={() => setCurrentPage((prevState: number) => prevState + 1)}
        refreshIncidents={() => setCurrentPage(1)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    paddingTop: 20,
  },
  container2: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
