import { useState } from 'react';

import { Board, OrdersContainer } from './styles';

import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';

interface OrderBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrderBoard({ icon, title, orders }: OrderBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order  | null>(null);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);

    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onCLose={handleCloseModal}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        orders.map((order) => (
          <OrdersContainer key={order._id}>
            <button type='button' onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          </OrdersContainer>
        ))
      )}


    </Board>
  );
}
