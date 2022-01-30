import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { getScheduleDoctorByDate } from '../services'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { CustomDropDownPicker } from './CustomDropDownPicker';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { EmptyComponent } from '../ultis';

function DoctorSchedule({
	doctorIdFromParent,
	navigation
}) {
	const [allDays, setAllDays] = useState([])
	const [allAvailableTimes, setAllAvailableTimes] = useState([])
	const [dataScheduleTimeModal, setDataScheduleTimeModal] = useState(null)
	const [isOpenDropDown, setIsOpenDropDown] = useState(false)

	const getArrayDays = () => {
		let arrDate = []
		for (let i = 0; i < 3; i++) {
			let obj = {}
			if (i === 0) {
				let label = moment(new Date()).format('DD/MM')
				let today = `Hôm nay - ${label}`
				obj.label = today;
			} else {
				obj.label = capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'))
			}
			obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

			arrDate.push(obj)
		}

		return arrDate
	}

	useEffect(() => {
		let mounted = false;
		function initializing() {
			const allDays = getArrayDays()
			if (allDays && allDays.length > 0 && !mounted) {
				setAllDays(allDays)
				getScheduleDoctorByDate(doctorIdFromParent, allDays[0].value).then(res => {
					if (res && res.errCode === 0) {
						setAllAvailableTimes(res.data)
					}
				})
			}
		}
		initializing()
		return () => {
			mounted = true
		}

	}, [])

	useEffect(() => {
		if (doctorIdFromParent && dataScheduleTimeModal) {
			getScheduleDoctorByDate(doctorIdFromParent, dataScheduleTimeModal).then(res => {
				if (res && res.errCode === 0) {
					setAllAvailableTimes(res.data)
				}
			})
		}
	}, [dataScheduleTimeModal, doctorIdFromParent]);

	const onHandleChoose = (time) => {
		if (!time) return

		navigation.navigate("BookingScreen", {
			dataSchedule: time,
			doctorId: doctorIdFromParent
		})
	}

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}


	return (
		<View>
			<CustomDropDownPicker
				disableSearch
				open={isOpenDropDown}
				setOpen={setIsOpenDropDown}
				listItems={allDays}
				setItems={setAllDays}
				selectedValue={dataScheduleTimeModal}
				setSelectedValue={setDataScheduleTimeModal}
			/>

			<View style={styles.allAvailableTime}>
				<View style={styles.calendar}>
					<IonIcon name='calendar-outline' size={24} />
					<Text style={styles.textCalendar}>Lịch</Text>
				</View>

				<View style={styles.timeContent}>
					<FlatList
						data={allAvailableTimes}
						keyExtractor={() => Math.random()}
						renderItem={({ item }) => {
							return (
								<TouchableOpacity style={styles.btnSchedule} onPress={() => onHandleChoose(item || {})}>
									<Text style={styles.btnScheduleText}>{item?.timeTypeData?.valueVi || ""}</Text>
								</TouchableOpacity>
							)
						}}
						ListEmptyComponent={EmptyComponent("Bác sĩ không có lịch khám")}
					/>
					<View style={styles.foo}>
						<IonIcon name="thumbs-up-outline" size={16} />
						<Text style={styles.bookFee}>Chọn và đặt lịch ( miễn phí )</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default DoctorSchedule

const styles = StyleSheet.create({
	allAvailableTime: {
		width: "100%"
	},
	calendar: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 12
	},
	textCalendar: {
		color: "#333",
		marginLeft: 10,
		marginTop: 4,
		width: "100%"
	},
	btnSchedule: {
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderWidth: 0,
		backgroundColor: "#fff04b",
		minWidth: 120,
		borderRadius: 5,
		marginRight: 15,
		marginBottom: 15,
		fontWeight: "600",
		color: "#333",
		width: "100%"
	},
	btnScheduleText: {
		fontWeight: '600'
	},
	bookFee: {
		color: "#23887c",
		marginLeft: 10
	},
	foo: {
		display: "flex",
		flexDirection: 'row',
		marginTop: 12
	}
})