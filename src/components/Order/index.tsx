import { Container } from './styles';

import { OrderBoard } from '../OrderBoard';
import { Order } from '../../types/Order';

const orders: Order[] = [
  {
    _id: '6373aa1832dce8d93a2daa19',
    table: '2',
    status: 'WAITING',
    products: [
      {
        product: {
          name: 'Coca cola',
          imagePath: '1668523389666-coca-cola.png',
          price: 7,
        },
        quantity: 1,
        _id: '6373aa1832dce8d93a2daa1a'
      },
      {
        product: {
          name: 'Coca cola',
          imagePath: '1668523389666-coca-cola.png',
          price: 7,
        },
        quantity: 1,
        _id: '6373aa1832dce8d93a2daa1b'
      }
    ],
  }
];

export function Orders() {
  return (
    <Container>
      <OrderBoard
        icon="🕓️"
        title="Fila de espera"
        orders={orders}
      />

      <OrderBoard
        icon="🧑‍🍳"
        title="Em preparação"
        orders={[]}
      />

      <OrderBoard
        icon="✅"
        title="Pronto!"
        orders={[]}
      />
    </Container>
  );
}
