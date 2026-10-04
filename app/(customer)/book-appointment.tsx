import React, { useEffect, useState } from "react";

import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomerHeader from "../components/CustomerHeader";
import CustomerSideMenu from "../components/CustomerSideMenu";

import { loadDoctors } from "@/service/doctor/doctorService";
import { makeAppoinment } from "@/service/appointment/appointmentService";

import { Doctor } from "@/types/Doctor";
import { MakeAppointmentRequest } from "@/types/MakeAppointmentRequest";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

interface AppointmentDate {
    label: string;
    value: string;
}

const getNextAvailableDates = (
    availableDays: string[],
    count: number = 4
): AppointmentDate[] => {
    const result: AppointmentDate[] = [];

    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const today = new Date();

    for (
        let i = 1;
        i <= 14 && result.length < count;
        i++
    ) {
        const date = new Date(today);

        date.setDate(today.getDate() + i);

        const dayName = dayNames[date.getDay()];

        if (availableDays.includes(dayName)) {
            const label = `${date.getDate()} ${date.toLocaleString(
                "en-US",
                {
                    month: "short",
                }
            )}`;

            const value = `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}-${String(
                date.getDate()
            ).padStart(2, "0")}`;

            result.push({
                label,
                value,
            });
        }
    }

    return result;
};

const calcTimeSlots = (
    startTime: string,
    endTime: string
): string[] => {
    const slots: string[] = [];

    const [startHour, startMinute] = startTime
        .split(":")
        .map(Number);

    const [endHour, endMinute] = endTime
        .split(":")
        .map(Number);

    let currentMinutes =
        startHour * 60 + startMinute;

    const endMinutes =
        endHour * 60 + endMinute;

    while (currentMinutes < endMinutes) {
        const hour = Math.floor(
            currentMinutes / 60
        );

        const minute = currentMinutes % 60;

        const period = hour >= 12 ? "PM" : "AM";

        const displayHour =
            hour % 12 === 0 ? 12 : hour % 12;

        const formattedTime = `${String(
            displayHour
        ).padStart(2, "0")}:${String(
            minute
        ).padStart(2, "0")} ${period}`;

        slots.push(formattedTime);

        currentMinutes += 30;
    }

    return slots;
};

export default function BookAppointment() {
    const { user } = useAuth();

    const [selectedDoctor, setSelectedDoctor] =
        useState("");

    const [selectedDate, setSelectedDate] =
        useState("");

    const [selectedTime, setSelectedTime] =
        useState("");

    const [reason, setReason] = useState("");

    const [menuVisible, setMenuVisible] =
        useState(false);

    const [doctors, setDoctors] =
        useState<Doctor[]>([]);

    const [doctor, setDoctor] =
        useState<Doctor | undefined>();

    const [dates, setDates] =
        useState<AppointmentDate[]>([]);

    const [times, setTimes] =
        useState<string[]>([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const result = await loadDoctors();

                if (result.success && result.data) {
                    setDoctors(result.data);
                }
            } catch (error) {
                console.error(
                    "Failed to load doctors:",
                    error
                );
            }
        };

        fetchDoctors();
    }, []);

    const handleConfirm = async () => {
        if (!selectedDoctor) {
            return;
        }

        if (!selectedDate) {
            return;
        }

        if (!selectedTime) {
            return;
        }

        try {
            const appointmentData: MakeAppointmentRequest = {
                doctor: selectedDoctor,
                appointmentDate: selectedDate,
                appointmentTime: selectedTime,
                reason,
            };

            const result = await makeAppoinment(appointmentData);
            if (result.success) {
                Alert.alert(
                    "Appointment Booked",
                    "Your appointment has been successfully booked.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                router.replace(
                                    "/(customer)/home"
                                );
                            },
                        },
                    ]
                );
            }
        } catch (error) {
            console.log(error);
            Alert.alert(
                "Error",
                "Failed to book appointment."
            );
        }
    };

    const openMenu = () => {
        setMenuVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const setDoctorDetails = (_id: string) => {
        setSelectedDoctor(_id);

        const doctorData = doctors.find(
            (doc) => doc._id === _id
        );

        setDoctor(doctorData);

        if (doctorData) {
            const availableDates =
                getNextAvailableDates(
                    doctorData.availableDays
                );

            setDates(availableDates);

            setTimes(
                calcTimeSlots(
                    doctorData.startTime,
                    doctorData.endTime
                )
            );
        } else {
            setDates([]);
            setTimes([]);
        }

        setSelectedDate("");
        setSelectedTime("");
    };

    const handleDateSelection = (
        date: AppointmentDate
    ) => {
        setSelectedDate(date.value);

        setSelectedTime("");

        if (doctor) {
            const calculatedTimes =
                calcTimeSlots(
                    doctor.startTime,
                    doctor.endTime
                );

            setTimes(calculatedTimes);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={
                    styles.content
                }
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <CustomerHeader
                    onProfilePress={openMenu}
                />

                <View style={styles.formCard}>
                    <View style={styles.formHeader}>
                        <View
                            style={
                                styles.formHeaderIcon
                            }
                        >
                            <Ionicons
                                name="calendar-outline"
                                size={25}
                                color="#12366B"
                            />
                        </View>

                        <View>
                            <Text
                                style={
                                    styles.formTitle
                                }
                            >
                                Book an Appointment
                            </Text>

                            <Text
                                style={
                                    styles.formSubtitle
                                }
                            >
                                Select your preferred
                                doctor and time
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Select Doctor
                    </Text>

                    {doctors.map(
                        (doctorItem) => {
                            const isSelected =
                                selectedDoctor ===
                                doctorItem._id;

                            return (
                                <TouchableOpacity
                                    key={
                                        doctorItem._id
                                    }
                                    style={[
                                        styles.doctorOption,
                                        isSelected &&
                                        styles.selectedDoctor,
                                    ]}
                                    onPress={() =>
                                        setDoctorDetails(
                                            doctorItem._id
                                        )
                                    }
                                    activeOpacity={
                                        0.8
                                    }
                                >
                                    <View
                                        style={
                                            styles.doctorIcon
                                        }
                                    >
                                        <Ionicons
                                            name="person"
                                            size={22}
                                            color="#12366B"
                                        />
                                    </View>

                                    <Text
                                        style={[
                                            styles.doctorText,
                                            isSelected &&
                                            styles.selectedDoctorText,
                                        ]}
                                    >
                                        {
                                            doctorItem.name
                                        }
                                    </Text>

                                    {isSelected && (
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={23}
                                            color="#12366B"
                                        />
                                    )}
                                </TouchableOpacity>
                            );
                        }
                    )}

                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Select Date
                    </Text>

                    <View
                        style={
                            styles.dateContainer
                        }
                    >
                        {dates.map((date) => {
                            const isSelected =
                                selectedDate ===
                                date.value;

                            return (
                                <TouchableOpacity
                                    key={
                                        date.value
                                    }
                                    style={[
                                        styles.dateButton,
                                        isSelected &&
                                        styles.selectedDate,
                                    ]}
                                    onPress={() =>
                                        handleDateSelection(
                                            date
                                        )
                                    }
                                    activeOpacity={
                                        0.8
                                    }
                                >
                                    <Ionicons
                                        name="calendar-outline"
                                        size={17}
                                        color={
                                            isSelected
                                                ? "#ffffff"
                                                : "#12366B"
                                        }
                                    />

                                    <Text
                                        style={[
                                            styles.dateText,
                                            isSelected &&
                                            styles.selectedDateText,
                                        ]}
                                    >
                                        {date.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Select Time
                    </Text>

                    <View
                        style={
                            styles.timeContainer
                        }
                    >
                        {times.map((time) => {
                            const isSelected =
                                selectedTime ===
                                time;

                            return (
                                <TouchableOpacity
                                    key={time}
                                    style={[
                                        styles.timeButton,
                                        isSelected &&
                                        styles.selectedTime,
                                    ]}
                                    onPress={() =>
                                        setSelectedTime(
                                            time
                                        )
                                    }
                                    activeOpacity={
                                        0.8
                                    }
                                >
                                    <Ionicons
                                        name="time-outline"
                                        size={18}
                                        color={
                                            isSelected
                                                ? "#ffffff"
                                                : "#12366B"
                                        }
                                    />

                                    <Text
                                        style={[
                                            styles.timeText,
                                            isSelected &&
                                            styles.selectedTimeText,
                                        ]}
                                    >
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Reason for Visit
                    </Text>

                    <TextInput
                        style={
                            styles.reasonInput
                        }
                        placeholder="Enter reason for your visit"
                        placeholderTextColor="#91a3b7"
                        value={reason}
                        onChangeText={setReason}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />

                    <TouchableOpacity
                        style={
                            styles.bookButton
                        }
                        onPress={handleConfirm}
                        activeOpacity={0.85}
                    >
                        <Ionicons
                            name="calendar"
                            size={21}
                            color="#ffffff"
                        />

                        <Text
                            style={
                                styles.bookButtonText
                            }
                        >
                            Confirm Appointment
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <CustomerSideMenu
                visible={menuVisible}
                onClose={closeMenu}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f5f9ff",
    },

    container: {
        flex: 1,
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    formCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 18,
        elevation: 3,
        shadowOpacity: 0.07,
        shadowRadius: 7,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    formHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    formHeaderIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: "#eaf3ff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    formTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: "#12366B",
    },

    formSubtitle: {
        fontSize: 12,
        color: "#66809f",
        marginTop: 4,
    },

    divider: {
        height: 1,
        backgroundColor: "#e8eef5",
        marginVertical: 18,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: "#12366B",
        marginBottom: 12,
        marginTop: 5,
    },

    doctorOption: {
        minHeight: 65,
        borderWidth: 1,
        borderColor: "#e1e9f2",
        borderRadius: 13,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        marginBottom: 10,
    },

    selectedDoctor: {
        borderColor: "#12366B",
        backgroundColor: "#eaf3ff",
    },

    doctorIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#e7f1fc",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    doctorText: {
        flex: 1,
        fontSize: 13,
        fontWeight: "600",
        color: "#365778",
    },

    selectedDoctorText: {
        color: "#12366B",
        fontWeight: "800",
    },

    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    dateButton: {
        width: "23%",
        height: 58,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#dce6f0",
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },

    selectedDate: {
        backgroundColor: "#12366B",
        borderColor: "#12366B",
    },

    dateText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#365778",
        marginTop: 4,
    },

    selectedDateText: {
        color: "#ffffff",
    },

    timeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 20,
    },

    timeButton: {
        height: 44,
        paddingHorizontal: 13,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#dce6f0",
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    selectedTime: {
        backgroundColor: "#12366B",
        borderColor: "#12366B",
    },

    timeText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#365778",
        marginLeft: 6,
    },

    selectedTimeText: {
        color: "#ffffff",
    },

    reasonInput: {
        minHeight: 105,
        borderWidth: 1,
        borderColor: "#dce6f0",
        borderRadius: 13,
        paddingHorizontal: 14,
        paddingVertical: 13,
        fontSize: 14,
        color: "#243f61",
        marginBottom: 22,
    },

    bookButton: {
        height: 54,
        borderRadius: 14,
        backgroundColor: "#12366B",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    bookButtonText: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "800",
        marginLeft: 9,
    },
});