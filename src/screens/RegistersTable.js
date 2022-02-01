import React from "react"
import { useState, useEffect } from "react";
import { getCities, getCityById } from "../api/Service"
import Modal from "react-modal";

function RegistersTable(props) {
    const [cities, setCities] = useState({ results: [], pagination: { total: 0 } });
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cityDetail, setCityDetail] = useState({});

    useEffect(() => {
        async function fetchCities() {
            setCities(await getCities(page, perPage))
        }
        fetchCities();
    }, [page, perPage])

    function willItRain(city) {
        return city.probabilityofprecip > 60 || city.relativehumidity > 50;
    }

    async function showDetail(cityId) {
        setSelectedCity(cityId);
        setCityDetail(await getCityById(cityId))
        setShowModal(true);
    }

    function renderCityDetail() {
        return (<div>
            <p onClick={() => setShowModal(false)} className="text-left underline-text">Cerrar descripción X</p>
            <p>Detalles de la ciudad con _id: {selectedCity}</p>
            <p>Nombre: {cityDetail.name || "-"}</p>
            <p>Estado: {cityDetail.state || "-"}</p>
            <p>Probabilidad de precipitación: {cityDetail.probabilityofprecip || "-"}</p>
            <p>Humedad: {cityDetail.relativehumidity || "-"}</p>
            <p>Último reporte: {formatDate(cityDetail.lastreporttime || "")}</p>
        </div>)
    }

    function renderCity(city) {
        return (<tr>
            <td><p onClick={() => showDetail(city._id)} className="underline-text">{city._id}</p></td>
            <td>{city.cityid}</td>
            <td>{city.name}</td>
            <td>{city.state}</td>
            <td>{city.probabilityofprecip}</td>
            <td>{city.relativehumidity}</td>
            <td>{formatDate(city.lastreporttime)}</td>
            <td>{willItRain(city) ? "Sí" : "No"}</td>
        </tr>)
    }

    function formatDate(timestamp) {
        // 20170627T092453Z
        return `${timestamp.substring(0, 4)}/${timestamp.substring(4, 6)}/${timestamp.substring(6, 8)}`;
    }

    function getTotalPages() {
        return Math.ceil(cities.pagination.total / 10);
    }

    async function setPreviousPage() {
        if (page === 1) {
            return
        }
        setPage(page - 1);
    }

    async function setNextPage() {
        if (page < getTotalPages()) {
            setPage(page + 1);
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>cityid</th>
                        <th>name</th>
                        <th>state</th>
                        <th>probability of precip.</th>
                        <th>relative humidity</th>
                        <th>Last report time</th>
                        <th>¿Llueve?</th>
                    </tr>
                </thead>
                <tbody>
                    {cities.results.map(city => renderCity(city))}
                </tbody>
                <div className="flex">
                    <p>Total de registros: {cities.pagination.total} (página {page} de {getTotalPages()})</p>
                    <button
                        disabled={page === 1}
                        onClick={() => setPreviousPage()}
                        style={{ margin: "10px" }}
                    >Página anterior</button>
                    <button
                        onClick={() => setNextPage()}
                        style={{ margin: "10px" }}
                    >Página siguiente</button>
                </div>
            </table>
            <Modal
                isOpen={showModal}
                appElement={document.getElementById('app')}
            >
                {renderCityDetail()}
            </Modal>
        </div>
    );
}

export default RegistersTable;
