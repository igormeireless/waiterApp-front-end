import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { Container } from './styles';

import { OrderBoard } from '../OrderBoard';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      setOrders((prevState) => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    api.get('/orders')
      .then(({data}) => {
        setOrders(data);
      });
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const in_production = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter((order) => order._id !== orderId));
  }

  function handleOrderStatusChance(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order => (
      order._id === orderId
        ? { ...order, status }
        : order
    ))));
  }

  return (
    <Container>
      <OrderBoard
        icon="🕓️"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChance}
      />

      <OrderBoard
        icon="🧑‍🍳"
        title="Em preparação"
        orders={in_production}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChance}
      />

      <OrderBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChance}
      />
    </Container>
  );
}
