import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { scaleH, scaleV, ColorConst } from '../ultis'

export const CustomDropDownPicker = ({
    open,
    selectedValue,
    listItems,
    setOpen,
    setSelectedValue,
    setItems,
    borderColor,
    placeholder,
    disableSearch
}) => {
    return (
        <DropDownPicker
            open={open}
            value={selectedValue}
            items={listItems}
            setOpen={setOpen}
            placeholder={placeholder ? placeholder : "Chọn ..."}
            setValue={setSelectedValue}
            setItems={setItems}
            searchable={disableSearch ? false : true}
            showArrowIcon={false}
            style={{
                borderColor: borderColor ? borderColor : open ? ColorConst.DEEP_GREEN : ColorConst.NEUTRAL_LIGHT,
                height: scaleV(48),
                marginBottom: scaleV(16),
                borderRadius: 5,
                fontSize: 16
            }}
            dropDownContainerStyle={{
                borderColor: ColorConst.NEUTRAL_LIGHT,
                backgroundColor: "#000"
            }}
            textStyle={{
                color: ColorConst.NEUTRAL_GREY,
                fontSize: scaleH(12),
                fontWeight: '700',
                lineHeight: scaleV(21.6)
            }}
            selectedItemLabelStyle={{
                color: ColorConst.DEEP_GREEN
            }}
            listItemLabelStyle={{
                fontWeight: '400'
            }}
            arrowIconStyle={{
                width: scaleH(24),
                height: scaleH(24)
            }}
            showTickIcon={false}
        />
    )
}