import { useState, useEffect } from "react";

// Import de los componentes
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import Filtros from "./components/Filtros";

// Import funciones/helpers
import { generarId } from "./helpers";

// Import de imagenes
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  // State del presupuesto (Comprobando si hay algun presupuesto guardado en Local Storage)
  const [presupuesto, setPresupuesto] = useState(
    +localStorage.getItem("presupuesto") ?? 0
  );

  //State con valida si el presupuesto es correcto o no
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  // State para el contnrol del modal
  const [modal, setModal] = useState(false);

  // State para animar el modal
  const [animarModal, setAnimarModal] = useState(false);

  // State para guardar todos los gastos
  const [gastos, setGastos] = useState([
    ...(JSON.parse(localStorage.getItem("gastos")) ?? []),
  ]);

  // State para editar el gasto seleccionado
  const [gastoEditar, setGastoEditar] = useState({});

  // State para filtrar las categorias
  const [filtro, setFiltro] = useState('')

  // State para mostrar los gastos filtrados
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  // useEffect que reacciona al editar un gasto
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  // useEffect para añadir a Local Storage
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  // useEffect para añadir los gastos a Local Sotrage
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  // useEffect que compruebe si hay algo en Local Storage, para no mostrar la pantalla de Introducir Presupuesto
  useEffect(() => {
    const presupuestoLS = +localStorage.getItem("presupuesto") ?? 0;

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  // useEffect que escuche por los filtros
  useEffect(() => {
    if (filtro) {
      // Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter((gasto) => gasto.categoria === filtro)

      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])
  

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  // Funcion que se encarga de guardar el gasto registrado en el modal

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      // Nuevo Gasto

      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  // Funcion para eliminar un gasto
  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
              
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono de nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
