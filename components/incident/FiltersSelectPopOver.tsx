import { StyleSheet, ScrollView, } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Picker } from 'react-native-ui-lib';

function FiltersSelectPopOver(props: any) {
    const { incidentFilters, selectedIncidentDataTypes, setSelectedIncidentDataTypes, selectedIncidentAssessments, setSelectedIncidentAssessments, open, filtersParmas, setSelectedFiltersParmas, filtersParmasCount }:
        { selectedIncidentDataTypes: any, setSelectedIncidentDataTypes: any, incidentFilters: any, selectedIncidentAssessments: any, setSelectedIncidentAssessments: any, open: boolean, removedFilter: any, filtersParmas: any, setSelectedFiltersParmas: any, filtersParmasCount: any } = props;



    // incidentFilters={incidentFilters}
    // selectedObserves={selectedObserves}
    // selectedProcessors={selectedProcessors}
    // selectedNewsLetters={selectedNewsLetters}
    // selectedIncidentSources={selectedIncidentSources}
    // selectedTargetedCountries={selectedTargetedCountries}
    // selectedIncidentDataTypes={selectedIncidentDataTypes}
    // selectedIncidentPriorities={selectedIncidentPriorities}
    // selectedObservationCircles={selectedObservationCircles}
    // selectedInitiatedCountries={selectedInitiatedCountries}
    // selectedIncidentAssessments={selectedIncidentAssessments}
    // selectedIncidentIncidentDate={selectedIncidentIncidentDate}
    // selectedIncidentCulturalCases={selectedIncidentCulturalCases}
    // selectedTargetedEntityFigures={selectedTargetedEntityFigures}
    // selectedInitiatedEntityFigures={selectedInitiatedEntityFigures}
    // selectedIncidentProcessStatuses={selectedIncidentProcessStatuses}
    // selectedTargetedCharacterFigures={selectedTargetedCharacterFigures}
    // selectedInitiatedCharacterFigures={selectedInitiatedCharacterFigures}
    // selectedCulturalStrategicVentures={selectedCulturalStrategicVentures}
    // selectedIncidentIncidentEvaluations={selectedIncidentIncidentEvaluations}

    // setSelectedObserves={(e: any) => setSelectedObserves(e)}
    // setSelectedProcessors={(e: any) => setSelectedProcessors(e)}
    // setSelectedNewsLetters={(e: any) => setSelectedNewsLetters(e)}
    // setSelectedIncidentSources={(e: any) => setSelectedIncidentSources(e)}
    // setSelectedIncidentDataTypes={(e: any) => setSelectedIncidentDataTypes(e)}
    // setSelectedTargetedCountries={(e: any) => setSelectedTargetedCountries(e)}
    // setSelectedIncidentPriorities={(e: any) => setSelectedIncidentPriorities(e)}
    // setSelectedObservationCircles={(e: any) => setSelectedObservationCircles(e)}
    // setSelectedInitiatedCountries={(e: any) => setSelectedInitiatedCountries(e)}
    // setSelectedIncidentAssessments={(e: any) => setSelectedIncidentAssessments(e)}
    // setSelectedIncidentIncidentDate={(e: any) => setSelectedIncidentIncidentDate(e)}
    // setSelectedIncidentCulturalCases={(e: any) => setSelectedIncidentCulturalCases(e)}
    // setSelectedTargetedEntityFigures={(e: any) => setSelectedTargetedEntityFigures(e)}
    // setSelectedInitiatedEntityFigures={(e: any) => setSelectedInitiatedEntityFigures(e)}
    // setSelectedIncidentProcessStatuses={(e: any) => setSelectedIncidentProcessStatuses(e)}
    // setSelectedTargetedCharacterFigures={(e: any) => setSelectedTargetedCharacterFigures(e)}
    // setSelectedInitiatedCharacterFigures={(e: any) => setSelectedInitiatedCharacterFigures(e)}
    // setSelectedCulturalStrategicVentures={(e: any) => setSelectedCulturalStrategicVentures(e)}
    // setSelectedIncidentIncidentEvaluations={(e: any) => setSelectedIncidentIncidentEvaluations(e)}



    return (
        <ScrollView>

            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                what - الحدث - تصنيف اول
            </ThemedText>

            <Picker
                useDialog
                selectionLimit={3}
                style={styles.container}
                mode={Picker.modes.MULTI}
                value={selectedIncidentAssessments}
                placeholder='what - الحدث - تصنيف اول'
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                items={incidentFilters ? incidentFilters?.incidentAssessments.options : []}
                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />

            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                القضايا الثقافية البارزة
            </ThemedText>

            <Picker
                value={selectedIncidentAssessments}
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                style={styles.container}
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                placeholder='القضايا الثقافية البارزة'
                items={incidentFilters ? incidentFilters?.culturalCases.options : []}

                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                المشاريع الثقافية الكبرى
            </ThemedText>

            <Picker
                value={selectedIncidentAssessments}
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='المشاريع الثقافية الكبرى'

                items={incidentFilters ? incidentFilters?.culturalStrategicVentures.options : []}

                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                الطرف الرئيسي - who
            </ThemedText>

            <Picker
                value={selectedIncidentAssessments}
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='الطرف الرئيسي - who'

                items={incidentFilters ? incidentFilters?.characterFigures.options : []}

                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                حالة الحدث
            </ThemedText>

            <Picker
                value={selectedIncidentAssessments}
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='حالة الحدث'

                items={incidentFilters ? incidentFilters?.incidentProcessStatuses.options : []}
                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                جغرافيا الحدث (المتأثرة)
            </ThemedText>

            <Picker
                value={selectedIncidentAssessments}
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='جغرافيا الحدث (المتأثرة)'

                items={incidentFilters ? incidentFilters?.incidentProcessStatuses.options : []}

                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                المعالج
            </ThemedText>

            <Picker
                value={selectedIncidentAssessments}
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='المعالج'

                items={incidentFilters ? incidentFilters?.bayyinaUsers.options : []}

                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                المدرج
            </ThemedText>

            <Picker
                value={selectedIncidentAssessments}
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='المدرج'

                items={incidentFilters ? incidentFilters?.bayyinaUsers.options : []}

                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                جغرافيا الحدث
            </ThemedText>

            <Picker
                value={selectedIncidentAssessments}
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='جغرافيا الحدث'

                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                what - الحدث - تصنيف اول
            </ThemedText>

            <Picker
                value={selectedIncidentAssessments}
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='what - الحدث - تصنيف اول'

                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />

            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                الطرف المستهدف - whom
            </ThemedText>

            <Picker
                value={selectedIncidentAssessments}
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='الطرف المستهدف - whom'

                items={incidentFilters ? incidentFilters?.characterFigures.options : []}

                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                أهمية الحدث
            </ThemedText>

            <Picker
                value={selectedIncidentAssessments}
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='what - الحدث - تصنيف اول'

                items={incidentFilters ? incidentFilters?.incidentPriorities.options : []}

                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                المصدر
            </ThemedText>

            <Picker
                value={selectedIncidentAssessments}
                onChange={(items: any) => setSelectedIncidentAssessments(items)}
                style={styles.container}
                // showSearch
                useDialog
                mode={Picker.modes.MULTI}
                selectionLimit={3}
                // onSearchChange={serachFilter}
                placeholder='المصدر'

                items={incidentFilters ? incidentFilters?.incidentSources.options : []}

                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

            />
            <ThemedText
                type='defaultSemiBold'
                style={styles.title}
            >
                طبيعة المادة
            </ThemedText>

            <Picker
                useDialog
                selectionLimit={3}
                style={styles.container}
                mode={Picker.modes.MULTI}
                placeholder='طبيعة المادة'
                value={selectedIncidentDataTypes}
                onChange={(items: any) => setSelectedIncidentDataTypes(items)}
                items={incidentFilters ? incidentFilters?.incidentDataTypes.options : []}
                customPickerProps={{ migrateDialog: false, dialogProps: { bottom: true, width: '100%', height: '60%' } }}

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
