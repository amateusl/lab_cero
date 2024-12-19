import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    return (
        <nav className="bg-color-1 font-lexend">
            <div className="container mx-auto px-4 py-2 flex flex-wrap justify-between items-center text-color-4">
                <Link to="/" className="w-full sm:w-auto text-center sm:text-left">
                    <span className="font-bold text-5xl">LEROI CRUD</span>
                </Link>

                <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-4 text-2xl w-full sm:w-auto">
                    <li>
                        <Link
                            to="/"
                            className={`px-2 py-1 font-medium rounded ${currentPath === '/' ? 'rounded-3xl border border-color-4' : ''
                                }`}
                        >
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/personas"
                            className={`px-2 py-1 font-medium rounded ${currentPath === '/personas' ? 'rounded-3xl border border-color-4' : ''
                                }`}
                        >
                            Personas
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/municipios"
                            className={`px-2 py-1 font-medium rounded ${currentPath === '/municipios' ? 'rounded-3xl border border-color-4' : ''
                                }`}
                        >
                            Municipios
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/viviendas"
                            className={`px-2 py-1 font-medium rounded ${currentPath === '/viviendas' ? 'rounded-3xl border border-color-4' : ''
                                }`}
                        >
                            Viviendas
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/trabajo"
                            className={`px-2 py-1 font-medium rounded ${currentPath === '/trabajo' ? 'rounded-3xl border border-color-4' : ''
                                }`}
                        >
                            Trabajo
                        </Link>
                    </li>
                    {/* <li> */}
                        {/* <Link
                            to="/planteamiento"
                            className={`px-2 py-1 font-medium rounded ${currentPath === '/planteamiento' ? 'rounded-3xl border border-color-4' : ''
                                }`}
                        >
                            Planteamiento
                        </Link> */}
                    {/* </li> */}
                </ul>
            </div>
        </nav>
    );
}