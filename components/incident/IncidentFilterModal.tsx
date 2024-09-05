import { View, Platform, Modal, Text, Button, SafeAreaView } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import FiltersSelectPopOver from './FiltersSelectPopOver';
import { dataToSelectOptionsSimpleNoRender } from '@/reuseable-functions/select-options-mappers';
import axios from 'axios';
import { useAppSelector } from '@/redux/hooks';

const BaseURI: any = process.env.EXPO_PUBLIC_API_URL;

export default function IncidentFilterModal({ open, close, setFilterParams }: { setFilterParams: any, open: boolean, close: (e: boolean) => any }) {

  const isPresented = router.canGoBack();
  const token = useAppSelector((state) => state.authorized.token);
  const [incidentFilters, setIncidentFilters] = useState<any>(null);
  const [selectedIncidentAssessments, setSelectedIncidentAssessments] = useState<number[]>([]);
  const [selectedNewsLetters, setSelectedNewsLetters] = useState<number[]>([]);
  const [selectedIncidentPriorities, setSelectedIncidentPriorities] = useState<number[]>([]);
  const [selectedIncidentSources, setSelectedIncidentSources] = useState<number[]>([]);
  const [selectedInitiatedEntityFigures, setSelectedInitiatedEntityFigures] = useState<number[]>([]);
  const [selectedInitiatedCharacterFigures, setSelectedInitiatedCharacterFigures] = useState<number[]>([]);
  const [selectedTargetedEntityFigures, setSelectedTargetedEntityFigures] = useState<number[]>([]);
  const [selectedTargetedCharacterFigures, setSelectedTargetedCharacterFigures] = useState<number[]>([]);
  const [selectedIncidentDataTypes, setSelectedIncidentDataTypes] = useState<number[]>([]);
  const [selectedIncidentProcessStatuses, setSelectedIncidentProcessStatuses] = useState<[]>([]);
  const [selectedObservationCircles, setSelectedObservationCircles] = useState<number[]>([]);
  const [selectedIncidentCulturalCases, setSelectedIncidentCulturalCases] = useState<number[]>([]);
  const [selectedCulturalStrategicVentures, setSelectedCulturalStrategicVentures] = useState<number[]>([]);
  const [selectedIncidentIncidentDate, setSelectedIncidentIncidentDate] = useState<any>(null);
  const [selectedIncidentIncidentEvaluations, setSelectedIncidentIncidentEvaluations] = useState<number[]>([]);
  const [selectedInitiatedCountries, setSelectedInitiatedCountries] = useState<number[]>([]);
  const [selectedTargetedCountries, setSelectedTargetedCountries] = useState<number[]>([]);
  const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);
  const [selectedObserves, setSelectedObserves] = useState<string[]>([]);

  const prepareFilters = () => {
    const selectedDate: string = selectedIncidentIncidentDate ? `&startDate=${selectedIncidentIncidentDate[0]?.toLocaleString()}&endDate=${selectedIncidentIncidentDate[1]?.toLocaleString()}` : ""
    const selectedInitiatedCountriesTemp: string = `${selectedInitiatedCountries.length > 0 ? `&initiatedCountries=${selectedInitiatedCountries.map((x: any) => x.value).join(',')}` : ""}`
    const selectedTargetedCountriesTemp: string = `${selectedTargetedCountries.length > 0 ? `&targetedCountries=${selectedTargetedCountries.map((x: any) => x.value).join(',')}` : ""}`
    const selectedInitiatedEntityFiguresTemp: string = `${selectedInitiatedEntityFigures.length > 0 ? `&initiatedEntityFigures=${selectedInitiatedEntityFigures.join(',')}` : ""}`
    const selectedInitiatedCharacterFiguresTemp: string = `${selectedInitiatedCharacterFigures.length > 0 ? `&initiatedCharacterFigures=${selectedInitiatedCharacterFigures.join(',')}` : ""}`
    const selectedTargetedEntityFiguresTemp: string = `${selectedTargetedEntityFigures.length > 0 ? `&targetedEntityFigures=${selectedTargetedEntityFigures.join(',')}` : ""}`
    const selectedTargetedCharacterFiguresTemp: string = `${selectedTargetedCharacterFigures.length > 0 ? `&targetedCharacterFigures=${selectedTargetedCharacterFigures.join(',')}` : ""}`
    const selectedIncidentCulturalCasesTemp: string = `${selectedIncidentCulturalCases.length > 0 ? `&culturalCases=${selectedIncidentCulturalCases.join(',')}` : ""}`
    const createdByIdsTemp: string = `${selectedObserves.length > 0 ? `&createdByIds=${selectedObserves.join(',')}` : ""}`
    const processedByIdsTemp: string = `${selectedProcessors.length > 0 ? `&processedByIds=${selectedProcessors.join(',')}` : ""}`

    setFilterParams(`${createdByIdsTemp}${processedByIdsTemp}${selectedIncidentCulturalCasesTemp}${selectedTargetedEntityFiguresTemp}${selectedTargetedCharacterFiguresTemp}${selectedInitiatedEntityFiguresTemp}${selectedInitiatedCharacterFiguresTemp}${selectedInitiatedCountriesTemp}${selectedTargetedCountriesTemp}${selectedDate}${selectedNewsLetters.length > 0 ? `&newsLetters=${selectedNewsLetters.join(',')}` : ""}${selectedIncidentIncidentEvaluations.length > 0 ? `&incidentEvaluations=${selectedIncidentIncidentEvaluations.join(',')}` : ""}${selectedIncidentAssessments.length > 0 ? `&incidentAssessments=${selectedIncidentAssessments.join(',')}` : ""}${selectedCulturalStrategicVentures.length > 0 ? `&culturalStrategicVentures=${selectedCulturalStrategicVentures.join(',')}` : ""}${selectedObservationCircles.length > 0 ? `&observationCircles=${selectedObservationCircles.join(',')}` : ""}${selectedIncidentProcessStatuses.length > 0 ? `&incidentProcessStatuses=${selectedIncidentProcessStatuses.join(',')}` : ""}${selectedIncidentDataTypes.length > 0 ? `&incidentDataTypes=${selectedIncidentDataTypes.join(',')}` : ""}${selectedIncidentPriorities.length > 0 ? `&incidentPriorities=${selectedIncidentPriorities.join(',')}` : ""}${selectedIncidentSources.length > 0 ? `&incidentSources=${selectedIncidentSources.join(',')}` : ""}`);
  }
  const getIncidentFilters = async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const mainContollerURI: any = "api/Incidents"

    const URI: string = `${BaseURI}/${mainContollerURI}/GetIncidentFilters`
    let result: any = {}
    result = await axios.get(URI, config)
    if (result.status === 200) {
      const filters: any = {
        culturalCases: dataToSelectOptionsSimpleNoRender(result.data.data.culturalCases, 'id', "nameArabic"),
        newsLetters: dataToSelectOptionsSimpleNoRender(result.data.data.newsLetters, 'id', "nameArabic"),
        bayyinaDataTypes: dataToSelectOptionsSimpleNoRender(result.data.data.bayyinaDataTypes, "id", "nameArabic"),
        entityFigures: dataToSelectOptionsSimpleNoRender(result.data.data.entityFigures, 'id', "fullName"),
        characterFigures: dataToSelectOptionsSimpleNoRender(result.data.data.characterFigures, 'id', "fullName"),
        incidentSources: dataToSelectOptionsSimpleNoRender(result.data.data.incidentSources, "id", "nameArabic"),
        incidentPriorities: dataToSelectOptionsSimpleNoRender(result.data.data.incidentPriorities, "id", "nameArabic"),
        incidentProcessStatuses: dataToSelectOptionsSimpleNoRender(result.data.data.incidentProcessStatuses, "id", "nameArabic"),
        culturalStrategicVentures: dataToSelectOptionsSimpleNoRender(result.data.data.culturalStrategicVentures, "id", "nameArabic"),
        observationCircles: dataToSelectOptionsSimpleNoRender(result.data.data.observationCircles, "id", "nameArabic"),
        incidentEvaluations: dataToSelectOptionsSimpleNoRender(result.data.data.incidentEvaluations, "id", "nameArabic"),
        bayyinaUsers: dataToSelectOptionsSimpleNoRender(result.data.data.bayyinaUsers, 'id', "fullName"),
        incidentAssessments: dataToSelectOptionsSimpleNoRender(result.data.data.incidentAssessments, "id", "nameArabic"),
      }
      setIncidentFilters(filters);
    }

  }

  useEffect(() => {
    if (open) {
      getIncidentFilters()
    }
  }, [open])

  useEffect(() => {
    prepareFilters()
  }, [
    selectedObserves,
    selectedProcessors,
    selectedNewsLetters,
    selectedIncidentSources,
    selectedTargetedCountries,
    selectedIncidentDataTypes,
    selectedIncidentPriorities,
    selectedObservationCircles,
    selectedInitiatedCountries,
    selectedIncidentAssessments,
    selectedIncidentIncidentDate,
    selectedIncidentCulturalCases,
    selectedTargetedEntityFigures,
    selectedInitiatedEntityFigures,
    selectedIncidentProcessStatuses,
    selectedTargetedCharacterFigures,
    selectedInitiatedCharacterFigures,
    selectedCulturalStrategicVentures,
    selectedIncidentIncidentEvaluations
  ])

  return (
    <Modal
      animationType="fade"
      style={{ flex: 1 }}
      visible={open}>

      <SafeAreaView>

        <Button title="Close" onPress={() => close(false)} />

        <FiltersSelectPopOver
          incidentFilters={incidentFilters}
          selectedObserves={selectedObserves}
          selectedProcessors={selectedProcessors}
          selectedNewsLetters={selectedNewsLetters}
          selectedIncidentSources={selectedIncidentSources}
          selectedTargetedCountries={selectedTargetedCountries}
          selectedIncidentDataTypes={selectedIncidentDataTypes}
          selectedIncidentPriorities={selectedIncidentPriorities}
          selectedObservationCircles={selectedObservationCircles}
          selectedInitiatedCountries={selectedInitiatedCountries}
          selectedIncidentAssessments={selectedIncidentAssessments}
          selectedIncidentIncidentDate={selectedIncidentIncidentDate}
          selectedIncidentCulturalCases={selectedIncidentCulturalCases}
          selectedTargetedEntityFigures={selectedTargetedEntityFigures}
          selectedInitiatedEntityFigures={selectedInitiatedEntityFigures}
          selectedIncidentProcessStatuses={selectedIncidentProcessStatuses}
          selectedTargetedCharacterFigures={selectedTargetedCharacterFigures}
          selectedInitiatedCharacterFigures={selectedInitiatedCharacterFigures}
          selectedCulturalStrategicVentures={selectedCulturalStrategicVentures}
          selectedIncidentIncidentEvaluations={selectedIncidentIncidentEvaluations}
          
          setSelectedObserves={(e: any) => setSelectedObserves(e)}
          setSelectedProcessors={(e: any) => setSelectedProcessors(e)}
          setSelectedNewsLetters={(e: any) => setSelectedNewsLetters(e)}
          setSelectedIncidentSources={(e: any) => setSelectedIncidentSources(e)}
          setSelectedIncidentDataTypes={(e: any) => setSelectedIncidentDataTypes(e)}
          setSelectedTargetedCountries={(e: any) => setSelectedTargetedCountries(e)}
          setSelectedIncidentPriorities={(e: any) => setSelectedIncidentPriorities(e)}
          setSelectedObservationCircles={(e: any) => setSelectedObservationCircles(e)}
          setSelectedInitiatedCountries={(e: any) => setSelectedInitiatedCountries(e)}
          setSelectedIncidentAssessments={(e: any) => setSelectedIncidentAssessments(e)}
          setSelectedIncidentIncidentDate={(e: any) => setSelectedIncidentIncidentDate(e)}
          setSelectedIncidentCulturalCases={(e: any) => setSelectedIncidentCulturalCases(e)}
          setSelectedTargetedEntityFigures={(e: any) => setSelectedTargetedEntityFigures(e)}
          setSelectedInitiatedEntityFigures={(e: any) => setSelectedInitiatedEntityFigures(e)}
          setSelectedIncidentProcessStatuses={(e: any) => setSelectedIncidentProcessStatuses(e)}
          setSelectedTargetedCharacterFigures={(e: any) => setSelectedTargetedCharacterFigures(e)}
          setSelectedInitiatedCharacterFigures={(e: any) => setSelectedInitiatedCharacterFigures(e)}
          setSelectedCulturalStrategicVentures={(e: any) => setSelectedCulturalStrategicVentures(e)}
          setSelectedIncidentIncidentEvaluations={(e: any) => setSelectedIncidentIncidentEvaluations(e)}

        />
      </SafeAreaView >
    </Modal >
  );
}
