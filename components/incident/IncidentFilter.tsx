import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState, useEffect } from 'react';
import { StyleSheet, TouchableHighlight, Text, useColorScheme, View, TextInput, I18nManager } from 'react-native';
import axios from "axios";
import { useAppSelector } from '@/redux/hooks'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import IncidentFilterModal from './IncidentFilterModal';
import { Assets, Button, Colors, } from 'react-native-ui-lib';

// import { UserSwitchOutlined, FlagOutlined, PlusSquareOutlined, FieldTimeOutlined, UserAddOutlined, CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
// import AsyncSelect from 'react-select/async';
// import { dataToSelectOptionsSimpleNoRender, } from "../../../../../reuseable-functions/select-options-mapper";

export default function IncidentFilter({ searchValueOnChange, searchValue, setFilterParams }: { setFilterParams: any, searchValue: string, searchValueOnChange: (value: string) => any, }) {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useColorScheme() ?? 'light';
    const [modalVisible, setModalVisible] = useState(false);
    const settingsIcon: any = <Ionicons

        name={isOpen ? 'filter' : 'filter-outline'}
        size={20}
        color='#fff'
    />

    return (
        <View style={styles.rowContainer}>
            <TextInput
                placeholder="بحث"
                style={styles.input}
                onChangeText={searchValueOnChange}
                value={searchValue}
            />
            <Button
                style={styles.filterBtn}
                size='xSmall'
                onPress={() => setModalVisible(true)}
            >
                {settingsIcon}
            </Button>

            <IncidentFilterModal
                open={modalVisible}
                close={(value: boolean) => setModalVisible(value)}
                setFilterParams={(filter: string) => setFilterParams(filter)}

            />
        </View>
    );
}
const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    filterBtn: {
        margin: 12,
        height: 40,
        marginRight: 15,
        backgroundColor: '#4096ff',
        borderRadius: 6,
    },
    rowContainer: {

        flexDirection: 'row'
    },
    input: {
        height: 40,
        writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
        margin: 12,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#4096ff",
        backgroundColor: "#ffffff",
        padding: 10,
        flex: 1
    },
    content: {
        marginTop: 6,
        marginLeft: 24,
    },
});


