import React, { useEffect, useRef } from "react";

import {
    Animated,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "@/context/AuthContext";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MENU_WIDTH = SCREEN_WIDTH * 0.78;

interface CustomerSideMenuProps {
    visible: boolean;
    onClose: () => void;
}

export default function CustomerSideMenu({
    visible,
    onClose,
}: CustomerSideMenuProps) {
    const { user, logout } = useAuth();

    const slideAnim = useRef(
        new Animated.Value(MENU_WIDTH)
    ).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 280,
                useNativeDriver: true,
            }).start();
        } else {
            slideAnim.setValue(MENU_WIDTH);
        }
    }, [visible]);

    const closeMenu = () => {
        Animated.timing(slideAnim, {
            toValue: MENU_WIDTH,
            duration: 220,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });
    };

    const handleLogout = async () => {
        closeMenu();

        await logout();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={closeMenu}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={closeMenu}
                />

                <Animated.View
                    style={[
                        styles.sideMenu,
                        {
                            transform: [
                                {
                                    translateX: slideAnim,
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.menuHeader}>
                        <View style={styles.menuProfile}>
                            <View style={styles.largeProfileCircle}>
                                <Ionicons
                                    name="person"
                                    size={35}
                                    color="#12366B"
                                />
                            </View>

                            <View style={styles.profileInfo}>
                                <Text style={styles.menuUserName}>
                                    {user?.name || "User"}
                                </Text>

                                <Text style={styles.menuUserEmail}>
                                    {user?.email || "Customer"}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeMenu}
                        >
                            <Ionicons
                                name="close"
                                size={25}
                                color="#12366B"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.menuDivider} />

                    <Text style={styles.menuSectionTitle}>
                        ACCOUNT
                    </Text>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={closeMenu}
                    >
                        <View style={styles.menuIcon}>
                            <Ionicons
                                name="person-outline"
                                size={22}
                                color="#12366B"
                            />
                        </View>

                        <Text style={styles.menuText}>
                            My Profile
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#9aaabd"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={closeMenu}
                    >
                        <View style={styles.menuIcon}>
                            <Ionicons
                                name="calendar-outline"
                                size={22}
                                color="#12366B"
                            />
                        </View>

                        <Text style={styles.menuText}>
                            My Appointments
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#9aaabd"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={closeMenu}
                    >
                        <View style={styles.menuIcon}>
                            <Ionicons
                                name="notifications-outline"
                                size={22}
                                color="#12366B"
                            />
                        </View>

                        <Text style={styles.menuText}>
                            Notifications
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#9aaabd"
                        />
                    </TouchableOpacity>

                    <View style={styles.menuDivider} />

                    <Text style={styles.menuSectionTitle}>
                        APP
                    </Text>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={closeMenu}
                    >
                        <View style={styles.menuIcon}>
                            <Ionicons
                                name="settings-outline"
                                size={22}
                                color="#12366B"
                            />
                        </View>

                        <Text style={styles.menuText}>
                            Settings
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#9aaabd"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={closeMenu}
                    >
                        <View style={styles.menuIcon}>
                            <Ionicons
                                name="information-circle-outline"
                                size={22}
                                color="#12366B"
                            />
                        </View>

                        <Text style={styles.menuText}>
                            About ChannelMe
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#9aaabd"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={closeMenu}
                    >
                        <View style={styles.menuIcon}>
                            <Ionicons
                                name="help-circle-outline"
                                size={22}
                                color="#12366B"
                            />
                        </View>

                        <Text style={styles.menuText}>
                            Help & Support
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#9aaabd"
                        />
                    </TouchableOpacity>

                    <View style={styles.menuBottom}>
                        <TouchableOpacity
                            style={styles.logoutMenuButton}
                            onPress={handleLogout}
                        >
                            <Ionicons
                                name="log-out-outline"
                                size={23}
                                color="#dc2626"
                            />

                            <Text style={styles.logoutMenuText}>
                                Logout
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.versionText}>
                            ChannelMe v1.0.0
                        </Text>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: "row",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
    },

    sideMenu: {
        width: MENU_WIDTH,
        height: "100%",
        backgroundColor: "#ffffff",
        paddingTop: 55,
        paddingHorizontal: 20,
        elevation: 15,
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: {
            width: -5,
            height: 0,
        },
    },

    menuHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 22,
    },

    menuProfile: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    largeProfileCircle: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: "#e7f1fc",
        alignItems: "center",
        justifyContent: "center",
    },

    profileInfo: {
        marginLeft: 13,
        flex: 1,
    },

    menuUserName: {
        fontSize: 18,
        fontWeight: "800",
        color: "#12366B",
    },

    menuUserEmail: {
        fontSize: 12,
        color: "#7188a0",
        marginTop: 4,
    },

    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#f1f6fc",
        alignItems: "center",
        justifyContent: "center",
    },

    menuDivider: {
        height: 1,
        backgroundColor: "#e8eef5",
        marginVertical: 17,
    },

    menuSectionTitle: {
        fontSize: 11,
        fontWeight: "800",
        color: "#91a3b7",
        letterSpacing: 1,
        marginBottom: 8,
    },

    menuItem: {
        height: 55,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        paddingHorizontal: 5,
        marginBottom: 4,
    },

    menuIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#edf5ff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 13,
    },

    menuText: {
        flex: 1,
        fontSize: 15,
        fontWeight: "600",
        color: "#243f61",
    },

    menuBottom: {
        marginTop: "auto",
        paddingBottom: 25,
    },

    logoutMenuButton: {
        height: 52,
        borderWidth: 1,
        borderColor: "#fecaca",
        backgroundColor: "#fff7f7",
        borderRadius: 13,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    logoutMenuText: {
        color: "#dc2626",
        fontSize: 15,
        fontWeight: "700",
        marginLeft: 9,
    },

    versionText: {
        textAlign: "center",
        color: "#9aaabd",
        fontSize: 11,
        marginTop: 14,
    },
});