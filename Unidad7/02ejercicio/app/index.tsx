import { AuthProvider } from "./componets/authProvider";
import { AuthStatus } from "./componets/authStatus";

function App() {
  return (
    <AuthProvider>
      <div style={{ padding: 40 }}>
        <AuthStatus />
      </div>
    </AuthProvider>
  );
}

export default App;