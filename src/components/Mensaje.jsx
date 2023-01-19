

const Mensaje = ({children, tipo}) => {     // 'tipo' es lo que se inyecta dentro de la clase
  return (
    <div className={`alerta ${tipo}`}>
        {children}
    </div>
  )
}

export default Mensaje