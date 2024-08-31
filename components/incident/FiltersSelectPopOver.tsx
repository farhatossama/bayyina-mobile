import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';

import { Button, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, View, TextInput, I18nManager, SafeAreaView } from 'react-native';
import axios from "axios";
import { useAppSelector } from '@/redux/hooks'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { dataToSelectOptionsSimpleNoRender } from '@/reuseable-functions/select-options-mappers';
import { Picker } from 'react-native-ui-lib';

const BaseURI: any = process.env.EXPO_PUBLIC_API_URL;


function FiltersSelectPopOver(props: any) {
    const { resetRemovedFilter, removedFilter, open, filtersParmas, setSelectedFiltersParmas, filtersParmasCount, setFilterParams }: { setFilterParams: any, resetRemovedFilter: any, open: boolean, removedFilter: any, filtersParmas: any, setSelectedFiltersParmas: any, filtersParmasCount: any } = props;
    const token = useAppSelector((state) => state.authorized.token);
    const [form, setForm] = useState([]);
    const [newsLetters, setNewsLetters] = useState<any>([]);
    const [incidentPriorities, setIncidentPriorities] = useState<any>([]);
    const [culturalCases, setCulturalCases] = useState<any>([]);
    const [incidentSources, setIncidentSources] = useState<any>([]);
    const [entityFigures, setEntityFigures] = useState<any>([]);
    const [characterFigures, setCharacterFigures] = useState<any>([]);
    const [incidentDataTypes, setIncidentDataTypes] = useState<any>([]);
    const [incidentProcessStatuses, setIncidentProcessStatuses] = useState<any>([]);
    const [observationCircles, setObservationCircles] = useState<any>([]);
    const [incidentEvaluations, setIncidentEvaluations] = useState<any>([]);
    const [bayyinaUsers, setBayyinaUsers] = useState<any>([]);
    const [culturalStrategicVentures, setCulturalStrategicVentures] = useState<any>([]);
    const [incidentAssessments, setIncidentAssessments] = useState<any>([]);
    const [selectedIndex, setSelectedIndex] = useState<any>([]);
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
    const [selectedIncidentAssessments, setSelectedIncidentAssessments] = useState<number[]>([]);
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
            setCulturalCases(dataToSelectOptionsSimpleNoRender(result.data.data.culturalCases, 'id', "nameArabic"));
            setNewsLetters(dataToSelectOptionsSimpleNoRender(result.data.data.newsLetters, 'id', "nameArabic"));
            setIncidentDataTypes(dataToSelectOptionsSimpleNoRender(result.data.data.bayyinaDataTypes, "id", "nameArabic"));
            setEntityFigures(dataToSelectOptionsSimpleNoRender(result.data.data.entityFigures, 'id', "fullName"));
            setCharacterFigures(dataToSelectOptionsSimpleNoRender(result.data.data.characterFigures, 'id', "fullName"));
            setIncidentSources(dataToSelectOptionsSimpleNoRender(result.data.data.incidentSources, "id", "nameArabic"));
            setIncidentPriorities(dataToSelectOptionsSimpleNoRender(result.data.data.incidentPriorities, "id", "nameArabic"));
            setIncidentProcessStatuses(dataToSelectOptionsSimpleNoRender(result.data.data.incidentProcessStatuses, "id", "nameArabic"));
            setCulturalStrategicVentures(dataToSelectOptionsSimpleNoRender(result.data.data.culturalStrategicVentures, "id", "nameArabic"));
            setObservationCircles(dataToSelectOptionsSimpleNoRender(result.data.data.observationCircles, "id", "nameArabic"));
            setIncidentEvaluations(dataToSelectOptionsSimpleNoRender(result.data.data.incidentEvaluations, "id", "nameArabic"));
            setBayyinaUsers(dataToSelectOptionsSimpleNoRender(result.data.data.bayyinaUsers, 'id', "fullName"))
            setIncidentAssessments(dataToSelectOptionsSimpleNoRender(result.data.data.incidentAssessments, "id", "nameArabic"));
        }

    }
    const serachFilter = (value: string) => {
        setIncidentAssessments((prevState: any[]) => prevState.filter((x: any) => x.label.include(value)));

    }
    useEffect(() => {
        if (open) {
            getIncidentFilters()
        }
    }, [open])
    useEffect(() => {
        prepareFilters()
    }, [
        selectedNewsLetters,
        selectedIncidentPriorities,
        selectedIncidentSources,
        selectedIncidentDataTypes,
        selectedIncidentProcessStatuses,
        selectedObservationCircles,
        selectedCulturalStrategicVentures,
        selectedIncidentAssessments,
        selectedIncidentIncidentDate,
        selectedIncidentIncidentEvaluations,
        selectedInitiatedCountries,
        selectedTargetedCountries,
        selectedTargetedCharacterFigures,
        selectedTargetedEntityFigures,
        selectedInitiatedEntityFigures,
        selectedIncidentCulturalCases,
        selectedProcessors,
        selectedObserves,
        selectedInitiatedCharacterFigures
    ])


    return (
        <ScrollView>

            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                what - الحدث - تصنيف اول
            </ThemedText>

            <Picker
                style={styles.container}
                onChange={(items: any) =>setSelectedIncidentAssessments(items)}
                useDialog
                value={selectedIncidentAssessments}
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='what - الحدث - تصنيف اول'
                items={incidentAssessments.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />

            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                القضايا الثقافية البارزة
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='القضايا الثقافية البارزة'
                onChange={() => console.log('changed')}
                items={culturalCases.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                المشاريع الثقافية الكبرى
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='المشاريع الثقافية الكبرى'
                onChange={() => console.log('changed')}
                items={culturalStrategicVentures.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                الطرف الرئيسي - who
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='الطرف الرئيسي - who'
                onChange={() => console.log('changed')}
                items={characterFigures.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                حالة الحدث
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='حالة الحدث'
                onChange={() => console.log('changed')}
                items={incidentProcessStatuses.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                جغرافيا الحدث (المتأثرة)
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='جغرافيا الحدث (المتأثرة)'
                onChange={() => console.log('changed')}
                items={incidentAssessments.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                المعالج
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='المعالج'
                onChange={() => console.log('changed')}
                items={bayyinaUsers.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                المدرج
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='المدرج'
                onChange={() => console.log('changed')}
                items={bayyinaUsers.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                جغرافيا الحدث
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='جغرافيا الحدث'
                onChange={() => console.log('changed')}
                items={incidentAssessments.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                what - الحدث - تصنيف اول
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='what - الحدث - تصنيف اول'
                onChange={() => console.log('changed')}
                items={incidentAssessments.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />

            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                الطرف المستهدف - whom
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='الطرف المستهدف - whom'
                onChange={() => console.log('changed')}
                items={characterFigures.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                أهمية الحدث
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='what - الحدث - تصنيف اول'
                onChange={() => console.log('changed')}
                items={incidentPriorities.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                المصدر
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='المصدر'
                onChange={() => console.log('changed')}
                items={incidentSources.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                طبيعة المادة
            </ThemedText>

            <Picker
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='طبيعة المادة'
                onChange={() => console.log('changed')}
                items={incidentDataTypes.options}
                customPickerProps={{ migrateDialog: true, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />

        </ScrollView >
    );

}

const styles = StyleSheet.create({
    container: {
        margin: 40,
        padding: 40,
        height: 50,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#4096ff",
    },
    title: {
        marginLeft: '25%',
    },
});
export default FiltersSelectPopOver
