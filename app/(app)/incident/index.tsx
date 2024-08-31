import { StyleSheet, View, StatusBar, SafeAreaView, I18nManager } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { useAppSelector } from '@/redux/hooks';

import IncidentListComponent from '@/components/incident/IncidentListComponent';
import { getIncidents } from '@/components/incident/IncidentApi';
import IncidentFilter from '@/components/incident/IncidentFilter';

export default function IncidentScreen() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [search, setSearch] = useState('');
  const [filterParams, setFilterParams] = useState<string>("");
  const isFocused = useIsFocused();
  const token: string = useAppSelector((state) => state.authorized.token!);

  // Debounce search input to prevent too many API calls
  const debounce = (func: (...args: any) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: any) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const requestIncidents = useCallback(async (pageNumber = 1, isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const localIncidents: any[] = await getIncidents(pageNumber, filterParams, search, token);

      if (localIncidents.length === 0 && pageNumber !== 1) {
        setNoMore(true);
      } else {
        setNoMore(false);
        setIncidents((prevIncidents) =>
          pageNumber === 1 ? localIncidents : [...prevIncidents, ...localIncidents]
        );
      }
    } catch (error) {
      console.error("Failed to fetch incidents:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filterParams, search, token]);

  // Load incidents on component mount and when dependencies change
  useEffect(() => {
    if (isFocused) {
      requestIncidents(1, true);
    }
  }, [isFocused, filterParams, search]);

  // Handle pagination
  const handleLoadMore = () => {
    if (!loading && !noMore) {
      setCurrentPage((prevPage) => prevPage + 1);
      requestIncidents(currentPage + 1);
    }
  };

  // Refresh incidents list
  const handleRefresh = () => {
    setCurrentPage(1);
    requestIncidents(1, true);
  };

  // Debounce search to prevent multiple API calls
  const handleSearchChange = debounce((text: string) => {
    setSearch(text);
  }, 500);

  return (
    <SafeAreaView style={styles.container2}>
      <View>
        <IncidentFilter
          searchValueOnChange={handleSearchChange}
          searchValue={search}
          setFilterParams={(filter: string) => setFilterParams(filter)}
        />
      </View>

      <IncidentListComponent
        loadingContent={loading}
        refreshing={refreshing}
        noMore={noMore}
        dataSource={incidents}
        requestMore={handleLoadMore}
        refreshIncidents={handleRefresh}
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
