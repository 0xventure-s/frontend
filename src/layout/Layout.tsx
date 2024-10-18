import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <>
    
    <header className="bg-blue-950 w-full p-10"> <h1 className="text-white text-4xl font-black text-center">Administrador de Productos</h1></header>
    
    <main className="mt-20 max-w-6xl bg-white rounded p-10 mx-auto"> 
    <Outlet/>

    </main>
    
    
    </>
  )
}
