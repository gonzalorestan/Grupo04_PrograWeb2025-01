import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cancelOrder, getOrder } from '../../services/api';
import "./DetalleOrdenUsuario.css";

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const data = await getOrder(id);
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    const handleCancelOrder = async () => {
        if (!window.confirm('¿Estás seguro que deseas cancelar esta orden?')) return;

        try {
            setIsCancelling(true);
            await cancelOrder(id);
            setOrder(prev => ({ ...prev, isCancelled: true }));
            alert('Orden cancelada exitosamente');
        } catch (err) {
            alert('Error al cancelar la orden: ' + err.message);
        } finally {
            setIsCancelling(false);
        }
    };

    if (loading) return <div className="loading">Cargando detalles de la orden...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!order) return <div>No se encontró la orden</div>;

    return (
        <div className="order-detail">
            <button
                onClick={() => navigate(-1)}
                className="back-button"
            >
                &larr; Volver a órdenes
            </button>

            <h1>Detalle de Orden #{order.id}</h1>

            <div className="order-summary">
                <div className="order-info">
                    <h2>Información del Carrito</h2>
                    <div className="info-grid">
                        <div>
                            <strong>Usuario ID:</strong>
                            <p>{order.userId}</p>
                        </div>
                        <div>
                            <strong>Total Productos:</strong>
                            <p>{order.totalProducts}</p>
                        </div>
                        <div>
                            <strong>Total Cantidad:</strong>
                            <p>{order.totalQuantity}</p>
                        </div>
                        <div>
                            <strong>Total:</strong>
                            <p>${order.total}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-products">
                <h2>Productos ({order.products.length})</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio Unitario</th>
                            <th>Cantidad</th>
                            <th>Descuento</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <div className="product-info">
                                        <span>{product.title}</span>
                                    </div>
                                </td>
                                <td>${product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.discountPercentage}%</td>
                                <td>${product.discountedPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'right' }}><strong>Total del Carrito:</strong></td>
                            <td><strong>${order.total}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {!order.isCancelled && (
                <div className="order-actions">
                    <button
                        onClick={handleCancelOrder}
                        disabled={isCancelling}
                        className="cancel-button"
                    >
                        {isCancelling ? 'Cancelando...' : 'Cancelar Orden'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderDetail;