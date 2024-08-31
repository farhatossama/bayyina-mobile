import { getObjectData, getStringData } from "@/globalStorage/asyncStorage";
import { analyze_api_error_response } from "@/reuseable-functions/api_request_status";
import axios from "axios";
import Toast from "react-native-root-toast";
const BaseURI: any = process.env.EXPO_PUBLIC_API_URL;



// const token = await getStringData('user', user);

const showToast = (text: string) => {
    const config: any = {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
    }
    let toast = Toast.show(text, config);
};
const tableParams: any = { sortField: "incidentStartDate", sortOrder: 'descend' };

const getIncidents = async (page: number, filterParams: string, search: string, token: string) => {

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const keyword: any = search === "" ? `${filterParams}` : `&keyword=${search}${filterParams}`
    console.log(keyword)
    const URI: string = `${BaseURI}/api/Incidents?page=${page}&pageSize=${10}&orderBy=${tableParams.sortField}&order=${tableParams.sortOrder}${keyword}`
    try {
        const result = await axios.get(URI, config)
        if (result.data.success) {
            return result.data.dataList;
        }
    } catch (e: any) {
        const message = analyze_api_error_response(e)
        showToast(message);
    }
};
// const incidentReserve = async (id: number) => {
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     const URI: string = `${BaseURI}/api/Incidents/IncidentReserve/${id}`
//     try {
//         const result = await axios.put(URI, undefined, config)
//         if (result.data.success) {
//             messageApi.success("تم الحجز");
//             GetTable()
//         }
//     } catch (e: any) {
//         const error: string = analyze_api_error_response(e)
//         messageApi.error(error);
//         GetTable()
//     }
// };



// const incidentUnreserve = async (id: number) => {
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     const URI: string = `${BaseURI}/api/Incidents/IncidentUnreserve/${id}`
//     try {
//         const result = await axios.put(URI, undefined, config)
//         if (result.data.success) {
//             messageApi.success(result.data.message);
//             GetTable()
//         }
//     } catch (e: any) {
//         const error: string = analyze_api_error_response(e)
//         messageApi.error(error);
//         GetTable()
//     }
// };
// const getIncidentCreator = async (str: string) => {
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     const URI: any = `${BaseURI}/api/Incidents/GetIncidentCreator/${str}`;
//     const result = await axios.get(URI, config);
// };


export { getIncidents };

const dataToSelectOptions = (data: any[]) => {
    const selectOptions: any[] = []

    data.forEach((element: any) => {
        selectOptions.push({ value: element.id, label: element.nameArabic });
    });

    return selectOptions;
};