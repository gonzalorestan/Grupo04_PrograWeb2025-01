import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrdersPage } from '../../services/api';
import './ListaOrdenUsuario.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const ORDERS_PER_PAGE = 10;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrdersPage(currentPage, ORDERS_PER_PAGE);
                setOrders(data.carts);
                setTotal(data.total);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentPage]);

    const totalPages = Math.ceil(total / ORDERS_PER_PAGE);

    if (loading) return <div className="loading">Cargando ordenes... </div>
    if (error) return <div className="error">Error: {error} </div>


    return (
        <div className="order-list">
            <h1>Lista de Órdenes</h1>

            <table className="orders-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario ID</th>
                        <th>Total Productos</th>
                        <th>Total Cantidad</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.userId}</td>
                            <td>{order.totalProducts}</td>
                            <td>{order.totalQuantity}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>
                                <button
                                    onClick={() => navigate(`/user/orders/${order.id}`)}
                                    className="view-button"
                                >
                                    Ver Detalle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? 'active' : ''}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default OrderList;