import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="home"
        options={{
          title: "Inicio",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Configuración",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="accessibility" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
