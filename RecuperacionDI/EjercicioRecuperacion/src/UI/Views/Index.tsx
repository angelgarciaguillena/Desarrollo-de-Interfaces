import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Modal, Animated } from 'react-native';
import { container } from '../../Core/Container';
import { TYPES } from '../../Core/Types';
import { JuegoViewModel } from '../ViewModels/JuegoViewModel';
import { PersonaConColor } from '../Models/PersonaConColor';
import { Departamento } from '../../Domain/Entities/Departamento';

const JuegoView: React.FC = () => {
  const [personas, setPersonas] = useState<PersonaConColor[]>([]);
  const [selecciones, setSelecciones] = useState<Map<number, number>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const [checking, setChecking] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [personaSeleccionada, setPersonaSeleccionada] = useState<PersonaConColor | null>(null);
  const [resultado, setResultado] = useState<string>('');
  const [tipoResultado, setTipoResultado] = useState<'victoria' | 'intento' | ''>('');
  const [triggerAnimation, setTriggerAnimation] = useState<number>(0);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const viewModel = container.get<JuegoViewModel>(TYPES.JuegoViewModel);

  useEffect(() => {
    cargarPersonas();
  }, []);

  useEffect(() => {
    if (resultado !== '') {
      slideAnim.setValue(-50);
      fadeAnim.setValue(0);
      
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [triggerAnimation]);

  const cargarPersonas = async () => {
    try {
      setLoading(true);
      const data = await viewModel.obtenerPersonas();
      setPersonas(data);
      
      const inicialSelecciones = new Map<number, number>();
      data.forEach(p => {
        if (p.departamentos.length > 0) {
          inicialSelecciones.set(p.persona.id, 0);
        }
      });
      setSelecciones(inicialSelecciones);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los datos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeleccion = (personaId: number, departamentoId: number) => {
    const nuevasSelecciones = new Map(selecciones);
    nuevasSelecciones.set(personaId, departamentoId);
    setSelecciones(nuevasSelecciones);
    setModalVisible(false);
  };

  const abrirModal = (persona: PersonaConColor) => {
    setPersonaSeleccionada(persona);
    setModalVisible(true);
  };

  const obtenerNombreDepartamento = (idDepartamento: number, departamentos: Departamento[]): string => {
    if (idDepartamento === 0) return 'Seleccione un departamento';
    const dept = departamentos.find(d => d.id === idDepartamento);
    return dept ? dept.nombre : 'Seleccione un departamento';
  };

  const comprobarRespuestas = () => {
    setChecking(true);
    
    const todasSeleccionadas = Array.from(selecciones.values()).every(id => id !== 0);

    if (!todasSeleccionadas) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      
      setTimeout(() => {
        setResultado('Debe seleccionar un departamento para cada empleado antes de comprobar los aciertos.');
        setTipoResultado('');
        setTriggerAnimation(prev => prev + 1);
        setChecking(false);
      }, 250);
      return;
    }

    const aciertos = viewModel.verificarAciertos(personas, selecciones);
    
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    
    setTimeout(() => {
      if (aciertos === personas.length) {
        setResultado(`¡Felicidades! Has acertado correctamente todos los departamentos.`);
        setTipoResultado('victoria');
        
        reiniciarSelecciones();
      } else {
        setResultado(`Has acertado ${aciertos} de ${personas.length} departamentos. Inténtalo de nuevo.`);
        setTipoResultado('intento');
      }
      setTriggerAnimation(prev => prev + 1);
      setChecking(false);
    }, 250);
  };

  const reiniciarSelecciones = () => {
    const nuevasSelecciones = new Map<number, number>();
    personas.forEach(p => {
      nuevasSelecciones.set(p.persona.id, 0);
    });
    setSelecciones(nuevasSelecciones);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Cargando sistema...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Sistema de Asignación de Departamentos</Text>
            <Text style={styles.subtitle}>Identifica el departamento al que pertenece cada empleado</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.pista}>
              <Text style={styles.pistaTitle}>Información importante</Text>
              <Text style={styles.pistaText}>
                Las filas con el mismo color de fondo corresponden a empleados del mismo departamento. 
                Utilice esta información como guía para realizar las asignaciones correctas.
              </Text>
            </View>

            {resultado !== '' && (
              <Animated.View 
                style={[
                  styles.resultado,
                  tipoResultado === 'victoria' && styles.resultadoVictoria,
                  tipoResultado === 'intento' && styles.resultadoIntento,
                  tipoResultado === '' && styles.resultadoValidacion,
                  {
                    transform: [{ translateY: slideAnim }],
                    opacity: fadeAnim,
                  }
                ]}
              >
                <Text style={[
                  styles.resultadoText,
                  tipoResultado === 'victoria' && styles.resultadoTextVictoria,
                  tipoResultado === 'intento' && styles.resultadoTextIntento,
                  tipoResultado === '' && styles.resultadoTextValidacion
                ]}>
                  {resultado}
                </Text>
              </Animated.View>
            )}

            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.colNombre]}>Nombre</Text>
                <Text style={[styles.tableHeaderText, styles.colApellidos]}>Apellidos</Text>
                <Text style={[styles.tableHeaderText, styles.colDepartamento]}>Departamento Asignado</Text>
              </View>

              {personas.map((personaConColor) => (
                <View
                  key={personaConColor.persona.id}
                  style={[
                    styles.tableRow,
                    { backgroundColor: personaConColor.colorDepartamento }
                  ]}
                >
                  <Text style={[styles.tableCell, styles.nombreCell, styles.colNombre]}>
                    {personaConColor.persona.nombre}
                  </Text>
                  <Text style={[styles.tableCell, styles.apellidosCell, styles.colApellidos]}>
                    {personaConColor.persona.apellidos}
                  </Text>
                  <TouchableOpacity
                    style={[styles.selectButton, styles.colDepartamento]}
                    onPress={() => abrirModal(personaConColor)}
                  >
                    <Text style={[
                      styles.selectButtonText,
                      selecciones.get(personaConColor.persona.id) === 0 && styles.selectButtonTextPlaceholder
                    ]}>
                      {obtenerNombreDepartamento(
                        selecciones.get(personaConColor.persona.id) || 0,
                        personaConColor.departamentos
                      )}
                    </Text>
                    <Text style={styles.selectArrow}>▼</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[styles.btnComprobar, checking && styles.btnComprobarDisabled]}
                onPress={comprobarRespuestas}
                disabled={checking}
              >
                <Text style={styles.btnComprobarText}>
                  {checking ? 'COMPROBANDO...' : 'COMPROBAR ASIGNACIONES'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Departamento</Text>
            <ScrollView style={styles.modalScroll}>
              <TouchableOpacity
                style={[
                  styles.modalOption,
                  selecciones.get(personaSeleccionada?.persona.id || 0) === 0 && styles.modalOptionSelected
                ]}
                onPress={() => personaSeleccionada && handleSeleccion(personaSeleccionada.persona.id, 0)}
              >
                <Text style={[
                  styles.modalOptionText,
                  selecciones.get(personaSeleccionada?.persona.id || 0) === 0 && styles.modalOptionTextSelected
                ]}>
                  Seleccione un departamento
                </Text>
              </TouchableOpacity>
              {personaSeleccionada?.departamentos.map((dept) => (
                <TouchableOpacity
                  key={dept.id}
                  style={[
                    styles.modalOption,
                    selecciones.get(personaSeleccionada.persona.id) === dept.id && styles.modalOptionSelected
                  ]}
                  onPress={() => handleSeleccion(personaSeleccionada.persona.id, dept.id)}
                >
                  <Text style={[
                    styles.modalOptionText,
                    selecciones.get(personaSeleccionada.persona.id) === dept.id && styles.modalOptionTextSelected
                  ]}>
                    {dept.nombre}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00527A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  innerContainer: {
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 60,
    elevation: 20,
    padding: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00527A',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 40,
    borderRadius: 8,
    marginBottom: 30,
    borderBottomWidth: 4,
    borderBottomColor: '#3498db',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#bdc3c7',
    fontWeight: '300',
    textAlign: 'center',
  },
  content: {
    padding: 0,
  },
  pista: {
    backgroundColor: '#e8f4f8',
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  pistaTitle: {
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    fontSize: 16,
  },
  pistaText: {
    color: '#34495e',
    fontSize: 14,
    lineHeight: 20,
  },
  resultado: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 100,
    position: 'sticky',
    top: 20,
    zIndex: 100,
  },
  resultadoVictoria: {
    backgroundColor: '#d4edda',
    borderLeftColor: '#28a745',
  },
  resultadoIntento: {
    backgroundColor: '#f8d7da',
    borderLeftColor: '#dc3545',
  },
  resultadoValidacion: {
    backgroundColor: '#fff3cd',
    borderLeftColor: '#ffc107',
  },
  resultadoText: {
    fontSize: 15,
    lineHeight: 22,
  },
  resultadoTextVictoria: {
    color: '#155724',
  },
  resultadoTextIntento: {
    color: '#721c24',
  },
  resultadoTextValidacion: {
    color: '#856404',
  },
  tableContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
    marginBottom: 30,
  },
  tableHeader: {
    backgroundColor: '#2c3e50',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  tableHeaderText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  colNombre: {
    flex: 2,
  },
  colApellidos: {
    flex: 2,
  },
  colDepartamento: {
    flex: 3,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 14,
  },
  nombreCell: {
    fontWeight: '600',
    color: '#2c3e50',
  },
  apellidosCell: {
    color: '#555',
  },
  selectButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 14,
    color: '#2c3e50',
    flex: 1,
  },
  selectButtonTextPlaceholder: {
    color: '#999',
  },
  selectArrow: {
    fontSize: 10,
    color: '#666',
    marginLeft: 8,
  },
  btnContainer: {
    paddingBottom: 10,
  },
  btnComprobar: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  btnComprobarDisabled: {
    backgroundColor: '#95a5a6',
    shadowColor: '#95a5a6',
  },
  btnComprobarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
    width: '90%',
    maxWidth: 400,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  modalOptionSelected: {
    backgroundColor: '#e8f4f8',
  },
  modalOptionText: {
    fontSize: 15,
    color: '#2c3e50',
  },
  modalOptionTextSelected: {
    color: '#3498db',
    fontWeight: '600',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#95a5a6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default JuegoView;