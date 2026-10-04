import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

import CustomerHeader from "../components/CustomerHeader";
import CustomerSideMenu from "../components/CustomerSideMenu";
import { upCommingAppointments } from "@/service/appointment/appointmentService";
import { Appointment } from "@/types/Appointment";

export default function CustomerHome() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const loadUpcomingAppointments = async () => {
      try {
        const response = await upCommingAppointments();

        console.log("Upcoming appointments:", response);

        if (response.success) {
          setAppointments((response.data ?? []).slice(0, 5));
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

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleAppointments = () => {
    router.push("/(customer)/display-all-appointment");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CustomerHeader onProfilePress={openMenu} />

        <View style={styles.welcomeSection}>
          <Text style={styles.helloText}>
            Hello,
          </Text>

          <Text style={styles.nameText}>
            {user?.name || "User"}
          </Text>

          <Text style={styles.welcomeText}>
            Welcome to the Clinic Appointment System
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bookCard}
          activeOpacity={0.85}
          onPress={handleAppointments}
        >
          <View style={styles.bookIconContainer}>
            <Ionicons
              name="calendar-outline"
              size={38}
              color="#12366B"
            />

            <View style={styles.plusIcon}>
              <Ionicons
                name="add"
                size={14}
                color="#ffffff"
              />
            </View>
          </View>

          <View style={styles.bookContent}>
            <Text style={styles.bookTitle}>
              Book Appointment
            </Text>

            <Text style={styles.bookSubtitle}>
              Schedule your next visit with a doctor
            </Text>
          </View>

          <View style={styles.arrowCircle}>
            <Ionicons
              name="arrow-forward"
              size={27}
              color="#12366B"
            />
          </View>
        </TouchableOpacity>

        <View style={styles.featureGrid}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={handleAppointments}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.featureIcon,
                styles.blueIcon,
              ]}
            >
              <Ionicons
                name="calendar"
                size={27}
                color="#12366B"
              />
            </View>

            <Text style={styles.featureTitle}>
              My Appointments
            </Text>

            <Text style={styles.featureDescription}>
              View your booked appointments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.featureIcon,
                styles.greenIcon,
              ]}
            >
              <Ionicons
                name="people"
                size={27}
                color="#12366B"
              />
            </View>

            <Text style={styles.featureTitle}>
              Our Doctors
            </Text>

            <Text style={styles.featureDescription}>
              Find the right doctor for you
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.featureIcon,
                styles.purpleIcon,
              ]}
            >
              <Ionicons
                name="business"
                size={27}
                color="#12366B"
              />
            </View>

            <Text style={styles.featureTitle}>
              Clinic Info
            </Text>

            <Text style={styles.featureDescription}>
              Location, working hours & more
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.featureIcon,
                styles.orangeIcon,
              ]}
            >
              <Ionicons
                name="headset"
                size={27}
                color="#12366B"
              />
            </View>

            <Text style={styles.featureTitle}>
              Need Help?
            </Text>

            <Text style={styles.featureDescription}>
              Contact support
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.appointmentSection}>
          <View style={styles.appointmentHeader}>
            <View style={styles.appointmentHeaderLeft}>
              <Ionicons
                name="calendar"
                size={25}
                color="#12366B"
              />

              <Text style={styles.appointmentHeaderText}>
                Upcoming Appointment
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleAppointments}
            >
              <View style={styles.viewAllContainer}>
                <Text style={styles.viewAllText}>
                  View All
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={19}
                  color="#12366B"
                />
              </View>
            </TouchableOpacity>
          </View>

          {appointments.map((appointment) => (
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
                  {appointment.doctor?.name}
                </Text>

                <Text style={styles.doctorSpecialization}>
                  {appointment.doctor?.qualification}
                </Text>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={18}
                    color="#12366B"
                  />

                  <Text style={styles.detailText}>
                    {appointment.appointmentDate.split("T")[0]}
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
                    Sanha Hospital
                  </Text>
                </View>
              </View>

              <View style={styles.confirmedBadge}>
                <Text style={styles.confirmedText}>
                  {appointment.status}
                </Text>
              </View>
            </View>
          ))}
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
    paddingBottom: 35,
  },

  welcomeSection: {
    marginBottom: 25,
  },

  helloText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#12366B",
  },

  nameText: {
    fontSize: 34,
    fontWeight: "800",
    color: "#12366B",
    marginTop: 1,
  },

  welcomeText: {
    fontSize: 16,
    lineHeight: 23,
    color: "#54749b",
    marginTop: 9,
    maxWidth: 330,
  },

  bookCard: {
    minHeight: 150,
    borderRadius: 22,
    backgroundColor: "#12366B",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginBottom: 22,
    elevation: 5,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  bookIconContainer: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  plusIcon: {
    position: "absolute",
    right: 10,
    bottom: 11,
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: "#12366B",
    alignItems: "center",
    justifyContent: "center",
  },

  bookContent: {
    flex: 1,
    marginLeft: 18,
  },

  bookTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },

  bookSubtitle: {
    color: "#e7f1ff",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },

  arrowCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  featureCard: {
    width: "48%",
    minHeight: 170,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  featureIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },

  blueIcon: {
    backgroundColor: "#e7f1ff",
  },

  greenIcon: {
    backgroundColor: "#e3f8ef",
  },

  purpleIcon: {
    backgroundColor: "#eee8ff",
  },

  orangeIcon: {
    backgroundColor: "#fff0e3",
  },

  featureTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#12366B",
    marginBottom: 7,
  },

  featureDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#66809f",
  },

  appointmentSection: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 22,
    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  appointmentHeader: {
    minHeight: 67,
    paddingHorizontal: 17,
    backgroundColor: "#eaf3ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  appointmentHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  appointmentHeaderText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#12366B",
    marginLeft: 10,
  },

  viewAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAllText: {
    fontSize: 14,
    color: "#12366B",
    fontWeight: "700",
  },

  appointmentBody: {
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  doctorAvatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#e7f1fc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  doctorDetails: {
    flex: 1,
  },

  doctorName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#12366B",
  },

  doctorSpecialization: {
    fontSize: 13,
    color: "#66809f",
    marginTop: 3,
    marginBottom: 8,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  detailText: {
    fontSize: 12,
    color: "#365778",
    marginLeft: 6,
  },

  separator: {
    fontSize: 12,
    color: "#9aadc2",
    marginHorizontal: 7,
  },

  confirmedBadge: {
    position: "absolute",
    right: 15,
    top: 18,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#def7eb",
  },

  confirmedText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#12935d",
  },
});