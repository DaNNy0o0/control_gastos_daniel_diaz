import { useState } from "react";

import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  // useState's
  const [mensaje, setMensaje] = useState("");

  // Funciones
  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto <= 0) {
      setMensaje("¡Introduce una cantidad mayor a 0!");
      
      setTimeout(() => {
        setMensaje("");
        setPresupuesto("");
      }, 2500);
    } else {
        setIsValidPresupuesto(true)
    }

  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handlePresupuesto}>
        <div className="campo">
          <label htmlFor="">Definir Presupuesto</label>

          <input
            value={presupuesto}
            type="number"
            className="nuevo-presupuesto"
            placeholder="Añade tu presupuesto"
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>

        <input type="submit" value={"Añadir"} />

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
