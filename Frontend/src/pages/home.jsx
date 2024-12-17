import Header from "../components/layout/header"
export default function Home() {
    return (
        <div className="h-full bg-color-1 relative pb-32">
            <Header className="z-50" />
            <div className="mt-3 h-full max-h-full flex flex-col md:flex-row justify-center bg-color-1">
                <div className="w-full pl-4 md:pl-20 flex flex-col justify-center">
                    <h1 className="text-2xl md:text-5xl font-lato text-color-4">LAB0 : CRUD</h1>
                    <p className="text-xl md:text-2xl font-lato text-color-4 mb-10">Grupo 1 - LEROI</p>
                    <div className="space-y-4 font-lato">
                        <div className="bg-color-3 text-color-4 mr-4 md:mr-20 flex flex-col md:flex-row w-full md:w-3/4 rounded-3xl">
                            <img src="https://raw.githubusercontent.com/jtnvv/LabCRUD-TETO/main/Frontend/src/assets/daniel.png" alt="CRUD-0" className="w-full md:w-1/4 p-0 m-0 rounded-l-3xl object-cover" />
                            <div className="p-4 md:p-10">
                                <p className="text-lg md:text-xl">Sebastián López Silva</p>
                                <p>Ing. de sistemas y computación</p>
                            </div>
                        </div>
                        <div className="bg-color-3 text-color-4 mr-4 md:mr-20 flex flex-col md:flex-row w-full md:w-3/4 rounded-3xl">
                            <img src="https://raw.githubusercontent.com/jtnvv/LabCRUD-TETO/main/Frontend/src/assets/sergio.jpeg" alt="CRUD-0" className="w-full md:w-1/4 p-0 m-0 rounded-l-3xl object-cover" />
                            <div className="p-4 md:p-10">
                                <p className="text-lg md:text-xl">Maria Camila Amaya Rodríguez</p>
                                <p>Ing. de sistemas y computación</p>
                            </div>
                        </div>
                        <div className="bg-color-3 text-color-4 mr-4 md:mr-20 flex flex-col md:flex-row w-full md:w-3/4 rounded-3xl">
                            <img src="https://raw.githubusercontent.com/jtnvv/LabCRUD-TETO/main/Frontend/src/assets/acevedo.jpg" alt="CRUD-0" className="w-full md:w-1/4 p-0 m-0 rounded-l-3xl object-cover" />
                            <div className="p-4 md:p-10">
                                <p className="text-lg md:text-xl">Anderson Steven Mateus López</p>
                                <p>Ing. de sistemas y computación</p>
                            </div>
                        </div>
                        <div className="bg-color-3 text-color-4 mr-4 md:mr-20 flex flex-col md:flex-row w-full md:w-3/4 rounded-3xl">
                            <img src="https://raw.githubusercontent.com/jtnvv/LabCRUD-TETO/main/Frontend/src/assets/jonathan.jpeg" alt="CRUD-0" className="w-full md:w-1/4 p-0 m-0 rounded-l-3xl object-cover" />
                            <div className="p-4 md:p-10">
                                <p className="text-lg md:text-xl">Juan David Rodríguez Gómez</p>
                                <p>Ing. de sistemas y computación</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 md:mt-0">
                    <img src="https://i.etsystatic.com/22453858/r/il/96c2da/3680644333/il_fullxfull.3680644333_s0lo.jpg" alt="CRUD-0" className="w-full md:w-2/3 mr-4 object-cover" />
                </div>
            </div>
        </div>
    )
}