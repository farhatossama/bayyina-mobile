

export interface labelOptions {
    key: string;
    label: string;
    type?: string;
}
export interface options {
    data: any;
    options: selectOption[];
}
export interface selectOption {
    value: any;
    label: string;
}

function dataToSelectOptionsSimpleNoRender(data: any[], key: string, labelKey: string): options {
    const options: options = { data: data, options: [] };
    for (let i = 0; i < data.length; i++) {
        options.options.push(
            { value: data[i][key], label: data[i][labelKey] }
        )
    }
    return options;
}


export { dataToSelectOptionsSimpleNoRender }