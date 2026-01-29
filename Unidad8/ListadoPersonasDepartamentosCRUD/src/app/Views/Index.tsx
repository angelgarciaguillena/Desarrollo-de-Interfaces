import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { DrawerNavigationProp } from "@react-navigation/drawer";

type RootDrawerParamList = {
  Inicio: undefined;
  Personas: { screen: string } | undefined;
  Departamentos: { screen: string } | undefined;
};

type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

const Index: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🏢</Text>
          </View>

          <Text style={styles.title}>Sistema de Gestión</Text>
          <Text style={styles.subtitle}>
            Administra personas y departamentos de tu organización de forma eficiente
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={[styles.card, styles.personasCard]}
            onPress={() => navigation.navigate("Personas", { screen: "ListadoPersonas" })}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.cardIconText}>👥</Text>
            </View>
            <Text style={styles.cardTitle}>Personas</Text>
            <Text style={styles.cardDescription}>
              Gestiona el personal de tu organización
            </Text>
            <View style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Ver personas →</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.departamentosCard]}
            onPress={() => navigation.navigate("Departamentos")}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.cardIconText}>🏢</Text>
            </View>
            <Text style={styles.cardTitle}>Departamentos</Text>
            <Text style={styles.cardDescription}>
              Organiza los departamentos de tu empresa
            </Text>
            <View style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Ver departamentos →</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>💡 Usa el menú lateral para navegar</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    fontSize: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  cardsContainer: {
    marginBottom: 32,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  personasCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  departamentosCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#34C759",
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f7ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  cardIconText: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: "#666",
    marginBottom: 16,
    lineHeight: 22,
  },
  cardButton: {
    backgroundColor: "#f0f7ff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  cardButtonText: {
    color: "#007AFF",
    fontSize: 15,
    fontWeight: "700",
  },
  featuresContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  featureRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  feature: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  featureIcon: {
    fontSize: 18,
    color: "#34C759",
    marginRight: 8,
    fontWeight: "bold",
  },
  featureText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  footer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default Index;