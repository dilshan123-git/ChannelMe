import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Appointment } from "@/types/Appointment";
import { upCommingAppointments } from "@/service/appointment/appointmentService";
import CustomerHeader from "../components/CustomerHeader";

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<
    Appointment[]
  >([]);

  const openMenu = () => {
    console.log("Open menu");
  };

  useEffect(() => {
    const loadUpcomingAppointments = async () => {
      try {
        const response = await upCommingAppointments();

        console.log(
          "All upcoming appointments:",
          response
        );

        if (response.success) {
          setAppointments(response.data ?? []);
        }
      } catch (error) {
        console.error(
          "Load upcoming appointments error:",
          error
        );
      }
    };

    loadUpcomingAppointments();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CustomerHeader onProfilePress={openMenu} />

        <Text style={styles.title}>
          Upcoming Appointments
        </Text>

        {appointments.length === 0 ? (
          <Text style={styles.emptyText}>
            No upcoming appointments
          </Text>
        ) : (
          appointments.map((appointment) => (
            <View
              key={appointment._id}
              style={styles.appointmentBody}
            >
              <View style={styles.doctorAvatar}>
                <Ionicons
                  name="person"
                  size={42}
                  color="#12366B"
                />
              </View>

              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>
                  Dr. {appointment.doctor?.name}
                </Text>

                <Text
                  style={styles.doctorSpecialization}
                >
                  {appointment.doctor?.qualification}
                </Text>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={18}
                    color="#12366B"
                  />

                  <Text style={styles.detailText}>
                    {appointment.appointmentDate.split(
                      "T"
                    )[0]}
                  </Text>

                  <Text style={styles.separator}>
                    |
                  </Text>

                  <Text style={styles.detailText}>
                    {appointment.appointmentTime}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color="#12366B"
                  />

                  <Text style={styles.detailText}>
                    Sahansa Hospital
                  </Text>
                </View>
              </View>

              <View style={styles.confirmedBadge}>
                <Text style={styles.confirmedText}>
                  {appointment.status}
                </Text>
              </View>
            </View>
          ))
        )}
        <View style={{paddingBottom:40}}>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#12366B",
    marginBottom: 20,
  },

  appointmentBody: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },

  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E8EEF7",
    justifyContent: "center",
    alignItems: "center",
  },

  doctorDetails: {
    flex: 1,
    marginLeft: 14,
  },

  doctorName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#12366B",
  },

  doctorSpecialization: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
    marginBottom: 8,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  detailText: {
    fontSize: 13,
    color: "#444",
    marginLeft: 7,
  },

  separator: {
    marginHorizontal: 8,
    color: "#999",
  },

  confirmedBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },

  confirmedText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#2E7D32",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#777",
    fontSize: 16,
  },
});