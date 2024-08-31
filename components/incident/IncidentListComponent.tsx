import React, { useEffect } from 'react';
import { I18nManager, FlatList, StatusBar, SafeAreaView, StyleSheet, View, TouchableOpacity, RefreshControl, Share, Text, Alert, useColorScheme } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Colors } from '@/constants/Colors';

export default function IncidentListComponent(props: any) {
    const theme = useColorScheme() ?? 'light';
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    }
    const loadMoreIncidents = () => {
        props.requestMore()
    }
    const shareItem = async () => {
        await onShare()
    }

    const renderItemHeader = (props: any, title: string): React.ReactElement => (
        <View {...props} style={[...props?.style, styles.header]} >
            <Text style={styles.title}>
                {title}
            </Text>
            <TouchableOpacity onPress={shareItem} style={styles.linkButton}>
                <View style={styles.buttonContent}>
                    <Fontisto name="more-v-a" size={22} color="black" />
                </View>
            </TouchableOpacity>

        </View>
    );

    const renderItemFooter = (props: any, data: any): React.ReactElement => (
        <Text  {...props} style={styles.footerDate}>
            تاريخ الحدث: {new Date(data.item?.incidentStartDate).toLocaleDateString()}
        </Text>
    );

    const renderItem = (itemInfo: any): React.ReactElement => {
        return (

            <View
                style={[styles.item]}

            // status='basic'
            // header={headerProps => renderItemHeader(headerProps, itemInfo.item.title)}
            // footer={(e: any) => renderItemFooter(e, itemInfo)}
            >

                <Text style={styles.descriptionText}>
                    {itemInfo.item.description}
                </Text>
            </View>
        )
    };
    useEffect(() => {
        console.log('list count', props.dataSource.length)
    }, [props.dataSource])

    return (
        <FlatList
            keyExtractor={item => item.id + ""}
            data={props.dataSource}
            renderItem={renderItem}

            refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.refreshIncidents} />}
            ListFooterComponent={() => (
                <TouchableOpacity
                    disabled={props.noMore}
                    style={[styles.loadMoreButton]}
                    onPress={loadMoreIncidents}>
                    <Text style={[styles.btnTextColor]}>
                        {props.noMore ? 'تم تحميل جميع الأحداث' : props.loadingContent ? 'جاري التحميل...' : 'تحميل'}
                    </Text>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    loadMoreButton: {
        alignItems: 'center',
        padding: 16
    },
    btnTextColor: {
        color: '#4096ff',
    },
    header: {
        flex: 1,
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
        justifyContent: 'space-around', // Distribute space between items
    },
    mainContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },

    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
        fontSize: 20,
    },
    descriptionText: {
        writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
    },
    icon: {
        marginRight: 8,
    },
    linkButton: {
        // Remove default button styling
        padding: 0,
        margin: 0,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkText: {
        fontSize: 16, // Adjust font size as needed
    },
    footerDate: {
        writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
    },
});