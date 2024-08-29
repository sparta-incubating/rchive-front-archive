import OrderByButton from '@/components/atoms/category/orderByButton';
import { OrderByEnum } from '@/types/posts.types';

interface OrderByButtonGroupProps {
  orderBy: OrderByEnum;
  onClick: () => void;
}

const OrderByButtonGroup = ({ orderBy, onClick }: OrderByButtonGroupProps) => {
  return (
    <section className="flex w-[126px] justify-between">
      <OrderByButton active={orderBy === OrderByEnum.NEW} onClick={onClick}>
        최신순
      </OrderByButton>
      <OrderByButton active={orderBy === OrderByEnum.POPULAR} onClick={onClick}>
        인기순
      </OrderByButton>
    </section>
  );
};

export default OrderByButtonGroup;
